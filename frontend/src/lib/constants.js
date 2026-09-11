export const COMPANY_NAME = 'Cabinets & Remodeling Depot'
export const COMPANY_PHONE = '+18136512333'
export const COMPANY_PHONE_DISPLAY = '+1 813-651-2333'
export const COMPANY_EMAIL = 'sales@cabinetsandremodelingdepot.com'
export const COMPANY_ADDRESS = '106 S St Cloud Ave, Valrico, FL 33594'

export const SERVICES = [
  {
    title: 'Countertops',
    href: '/countertops-tampa',
    icon: 'Layers',
    description: 'Premium quartz and granite countertops fabricated and installed by certified professionals.',
  },
  {
    title: 'Kitchen Cabinets',
    href: '/kitchen-cabinets-tampa',
    icon: 'Layout',
    description: 'Ready-to-install cabinets in stock at our Valrico showroom — no long waits, fast project turnaround.',
  },
  {
    title: 'Kitchen Remodeling',
    href: '/kitchen-remodel-tampa',
    icon: 'ChefHat',
    description: 'Complete kitchen transformations including cabinets, countertops, flooring, and layout redesign.',
  },
  {
    title: 'Flooring',
    href: '/flooring-in-tampa',
    icon: 'Grid3X3',
    description: 'Hardwood, tile, luxury vinyl plank, and laminate flooring expertly installed throughout your home.',
  },
  {
    title: 'Bathroom Remodeling',
    href: '/bathroom-remodeling-tampa',
    icon: 'Droplets',
    description: 'Luxury bathroom renovations with custom tile, vanities, walk-in showers, and modern fixtures.',
  },
]

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: SERVICES,
  },
  { label: 'Projects', href: '/projects', hidden: true },
  { label: 'Gallery', href: '/showroom-gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const ADMIN_NAV = [
  {
    group: 'Content',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
      { label: 'Pages', href: '/admin/pages', icon: 'FileText' },
      { label: 'Projects', href: '/admin/projects', icon: 'Briefcase' },
      { label: 'Gallery', href: '/admin/gallery', icon: 'Image' },
      { label: 'Blog Posts', href: '/admin/blogs', icon: 'BookOpen' },
    ],
  },
  {
    group: 'Business',
    items: [
      { label: 'Leads', href: '/admin/leads', icon: 'Users' },
      { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
    ],
  },
]

export const GALLERY_CATEGORIES = [
  { value: 'ALL', label: 'All' },
  { value: 'KITCHEN', label: 'Kitchen' },
  { value: 'BATHROOM', label: 'Bathroom' },
  { value: 'CABINETS', label: 'Cabinets' },
  { value: 'COUNTERTOPS', label: 'Countertops' },
  { value: 'FLOORING', label: 'Flooring' },
  { value: 'GENERAL', label: 'General' },
]

export const PROJECT_CATEGORIES = [
  { value: 'KITCHEN_REMODELING', label: 'Kitchen Remodeling' },
  { value: 'BATHROOM_REMODELING', label: 'Bathroom Remodeling' },
  { value: 'CUSTOM_CABINETS', label: 'Custom Cabinets' },
  { value: 'KITCHEN_CABINETS', label: 'Kitchen Cabinets' },
  { value: 'STOCK_CABINETS', label: 'Stock Cabinets' },
  { value: 'QUARTZ_COUNTERTOPS', label: 'Quartz Countertops' },
  { value: 'GRANITE_COUNTERTOPS', label: 'Granite Countertops' },
  { value: 'FLOORING', label: 'Flooring' },
  { value: 'OTHER', label: 'Other' },
]

// Admin role tiers.
// SUPER_ADMIN: full access to everything.
// ADMIN: Dashboard, Leads, Catalog Leads, Catalog Planner, and Users — but
//        cannot see or manage Super Admin accounts.
// STAFF: Dashboard, Leads, Catalog Leads, Catalog Planner only — no Users.
export const ROLE_OPTIONS = [
  { value: 'STAFF', label: 'Staff', description: 'Dashboard and Leads, Catalog Leads, Catalog Planner only' },
  { value: 'ADMIN', label: 'Admin', description: 'Everything Staff has, plus managing Staff/Admin users' },
  { value: 'SUPER_ADMIN', label: 'Super Admin', description: 'Full access to the entire admin panel' },
]

// Hrefs each restricted role may access — everything else is hidden from the
// sidebar and enforced server-side by requireRole on each API route.
export const ROLE_ALLOWED_HREFS = {
  ADMIN: ['/admin/dashboard', '/admin/leads', '/admin/catalog-leads', '/admin/catalog-planner', '/admin/users'],
  STAFF: ['/admin/dashboard', '/admin/leads', '/admin/catalog-leads', '/admin/catalog-planner'],
}
export const ROLE_DEFAULT_PATH = '/admin/dashboard'

export const LEAD_STATUSES = [
  { value: 'NEW', label: 'New', color: 'blue' },
  { value: 'CONTACTED', label: 'Contacted', color: 'yellow' },
  { value: 'QUALIFIED', label: 'Qualified', color: 'purple' },
  { value: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'orange' },
  { value: 'WON', label: 'Won', color: 'green' },
  { value: 'LOST', label: 'Lost', color: 'red' },
]

export const SERVICES_LIST_FOR_FORM = [
  { value: 'Countertops', label: 'Countertops' },
  { value: 'Kitchen Remodeling', label: 'Kitchen Remodeling' },
  { value: 'Bathroom Remodeling', label: 'Bathroom Remodeling' },
  { value: 'Custom Cabinets', label: 'Custom Cabinets' },
  { value: 'Flooring', label: 'Flooring' },
]
