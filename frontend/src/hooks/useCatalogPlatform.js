'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'

// ── Catalog Leads (quote requests from the cabinet catalog platform) ──────

export function useCatalogLeads(params = {}) {
  return useQuery({
    queryKey: ['catalog-leads', params],
    queryFn: async () => {
      const { data } = await api.get('/catalog-platform/leads', { params })
      return data
    },
  })
}

export function useCatalogLeadStats() {
  return useQuery({
    queryKey: ['catalog-leads-stats'],
    queryFn: async () => {
      const { data } = await api.get('/catalog-platform/leads/stats')
      return data.data
    },
  })
}

export function useCatalogLead(id) {
  return useQuery({
    queryKey: ['catalog-lead', id],
    queryFn: async () => {
      const { data } = await api.get(`/catalog-platform/leads/${id}`)
      return data.data
    },
    enabled: !!id,
  })
}

export function useUpdateCatalogLead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const { data } = await api.patch(`/catalog-platform/leads/${id}`, updateData)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog-leads'] })
      queryClient.invalidateQueries({ queryKey: ['catalog-leads-stats'] })
    },
  })
}

export function useDeleteCatalogLead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/catalog-platform/leads/${id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalog-leads'] })
      queryClient.invalidateQueries({ queryKey: ['catalog-leads-stats'] })
    },
  })
}

// ── Catalog Planner Leads ───────────────────────────────────────────────────

export function useCatalogPlannerLeads(params = {}) {
  return useQuery({
    queryKey: ['catalog-planner-leads', params],
    queryFn: async () => {
      const { data } = await api.get('/catalog-platform/planner', { params })
      return data
    },
  })
}

export function useCatalogPlannerLead(id) {
  return useQuery({
    queryKey: ['catalog-planner-lead', id],
    queryFn: async () => {
      const { data } = await api.get(`/catalog-platform/planner/${id}`)
      return data.data
    },
    enabled: !!id,
  })
}

export function useUpdateCatalogPlannerLead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await api.patch(`/catalog-platform/planner/${id}`, { status })
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['catalog-planner-leads'] }),
  })
}
