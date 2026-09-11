# Cross-Platform User Sync: Depot ↔ Cabinet Catalog Platform

This documents the **implemented** integration between this backend and the
Cabinet Catalog Platform (a separate Next.js/Supabase project at
`D:\USER DOCUMENTS\MYDOCUMENTS\Projects\Cabinet-catalog-platform`, deployed at
`https://cabinet-catalog-platform.vercel.app`). Creating, editing, or deleting
an admin user in either system's Users page now mirrors the change to the
other.

## Role model (identical on both sides)

Both platforms use the same three-tier role model:

| Role | Meaning |
|---|---|
| Super Admin | Full access to everything, including all Users (incl. other Super Admins). |
| Admin | Dashboard/Leads/Catalog Leads/Catalog Planner (Depot) or Dashboard/Leads/Design/Planner (Catalog Platform) **plus** Users management. Cannot see or manage Super Admin accounts. |
| Staff | Same restricted sections as Admin, but **no** Users access. |

Casing differs by platform (Depot: `SUPER_ADMIN`/`ADMIN`/`STAFF`; Catalog
Platform: `owner`/`admin`/`staff`) — translated at the boundary by
`depot-role-map.js` on the Catalog Platform side. Nothing on either side
grants Super Admin as a side effect of the other platform's sync calls or
webhooks — that tier can only be assigned by an existing Super Admin, from
that platform's own Users page.

## Auth

Both directions use the same pre-existing shared secret (Depot backend:
`CATALOG_PLATFORM_SERVICE_KEY`; Catalog Platform: `SERVICE_API_KEY_CABINETS_DEPOT`
— same value on both sides today), sent as:

```
X-Service-Key: <shared secret>
```

Every sync request (either direction) also sends `X-Sync-Source` identifying
which side initiated it (`depot` or `catalog-platform`), so the receiving side
can skip re-firing its own outbound sync/webhook and avoid an infinite loop.

## Depot → Catalog Platform (outbound sync)

`backend/src/services/catalogPlatform.service.js`:
- `createCatalogUser({ email, password, name, role })` → `POST /api/admin/users`
- `updateCatalogUser(catalogPlatformUserId, updates)` → `PATCH /api/admin/users/:id`
- `deleteCatalogUser(catalogPlatformUserId)` → `DELETE /api/admin/users/:id`

Called from `backend/src/controllers/users.controller.js`'s `createUser`/
`updateUser`/`deleteUser` immediately after the Depot's own local write
succeeds. The Depot's `User` model stores the returned Catalog Platform id
(`catalogPlatformUserId`) plus a `catalogSyncStatus`
(`SYNCED`/`PENDING`/`FAILED`) and `catalogSyncError` for UI display.

**Best-effort, non-blocking:** a Catalog Platform outage never fails or rolls
back the Depot's own write — the Depot Users page shows a "sync failed"
indicator with a manual **Retry sync** action
(`POST /api/users/:id/retry-sync`) instead.

On the Catalog Platform side, these routes live at
`app/api/admin/users/route.js` and `app/api/admin/users/[id]/route.js` — a
service-key-authenticated counterpart to the platform's own cookie-session
`app/api/tenant/users/*` routes, sharing the same `tenant_users` table and
Supabase Auth admin calls (`admin.auth.admin.createUser`/`updateUserById`/
`deleteUser` — the Catalog Platform has no password column of its own;
passwords live entirely in Supabase Auth).

## Catalog Platform → Depot (inbound webhook, the "vice versa" direction)

```
POST <DEPOT_WEBHOOK_URL>   (Depot backend: /api/users/catalog-webhook)
X-Service-Key: <shared secret>
X-Sync-Source: catalog-platform
```

```json
{
  "event": "user.created",
  "catalogPlatformUserId": "tenant_users.id",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "role": "STAFF",
  "isActive": true
}
```

Fired by `lib/webhooks/notifyDepot.js` on the Catalog Platform, from the same
three `app/api/admin/users*` routes above, whenever a change did **not**
itself originate from the Depot (checked via the incoming `X-Sync-Source`
header — skips firing when it's `depot`, preventing the round-trip).

Handled by `handleCatalogUserWebhook` in `backend/src/controllers/users.controller.js`:
- Matches an existing Depot user by `catalogPlatformUserId` first, falling
  back to `email` for first-time linkage.
- **Never touches the Depot user's password** — no password is ever included
  in the payload; Depot passwords only ever change via the Depot's own Users
  page.
- **Never grants `SUPER_ADMIN`** via a webhook-driven role change.
- `user.deleted` does **not** delete the Depot account — too destructive to
  do unilaterally from an inbound webhook. It only clears the linkage and
  marks `catalogSyncStatus: 'FAILED'` with an explanatory `catalogSyncError`,
  so a Depot admin decides whether to re-link or remove it manually.
- If no Depot account matches, the webhook just acknowledges (`200`) without
  creating anything — the Depot never creates a login credential it didn't
  itself set a password for.

## Env vars

Depot backend (`backend/.env`): `CATALOG_PLATFORM_API_URL`,
`CATALOG_PLATFORM_SERVICE_KEY` (pre-existing, reused).

Catalog Platform (`.env.local`): `SERVICE_API_KEY_CABINETS_DEPOT` (pre-existing,
reused), `DEPOT_WEBHOOK_URL` (new — points at the Depot backend's
`/api/users/catalog-webhook`).
