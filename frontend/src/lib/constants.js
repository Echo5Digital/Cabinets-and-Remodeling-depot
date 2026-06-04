export const COMPANY_NAME = 'Cabinets & Remodeling Depot'
export const COMPANY_PHONE = '+1 813-651-2333'
export const COMPANY_EMAIL = 'sales@cabinetsandremodelingdepot.com'
export const COMPANY_ADDRESS = '106 S St Cloud Ave, Valrico, FL 33594'

export const SERVICES = [
  {
    title: 'Kitchen Remodeling',
    href: '/kitchen-remodeling',
    icon: 'ChefHat',
    description: 'Complete kitchen transformations including cabinets, countertops, flooring, and layout redesign.',
  },
  {
    title: 'Bathroom Remodeling',
    href: '/bathroom-remodeling',
    icon: 'Droplets',
    description: 'Luxury bathroom renovations with custom tile, vanities, walk-in showers, and modern fixtures.',
  },
  {
    title: 'Custom Cabinets',
    href: '/cabinets',
    icon: 'Layout',
    description: 'Handcrafted custom and semi-custom cabinetry in hundreds of styles, finishes, and configurations.',
  },
  {
    title: 'Countertops',
    href: '/countertops',
    icon: 'Layers',
    description: 'Premium quartz and granite countertops fabricated and installed by certified professionals.',
  },
  {
    title: 'Flooring',
    href: '/flooring',
    icon: 'Grid3X3',
    description: 'Hardwood, tile, luxury vinyl plank, and laminate flooring expertly installed throughout your home.',
  },
  {
    title: 'Design Consultation',
    href: '/contact',
    icon: 'PencilRuler',
    description: 'Visit our showroom or schedule an in-home consultation with our design experts.',
  },
]

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: SERVICES,
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
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

export const LEAD_STATUSES = [
  { value: 'NEW', label: 'New', color: 'blue' },
  { value: 'CONTACTED', label: 'Contacted', color: 'yellow' },
  { value: 'QUALIFIED', label: 'Qualified', color: 'purple' },
  { value: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'orange' },
  { value: 'WON', label: 'Won', color: 'green' },
  { value: 'LOST', label: 'Lost', color: 'red' },
]

export const SERVICES_LIST_FOR_FORM = [
  { value: 'Kitchen Remodeling', label: 'Kitchen Remodeling' },
  { value: 'Bathroom Remodeling', label: 'Bathroom Remodeling' },
  { value: 'Custom Cabinets', label: 'Custom Cabinets' },
  { value: 'Kitchen Cabinets', label: 'Kitchen Cabinets' },
  { value: 'Stock Cabinets', label: 'Stock Cabinets' },
  { value: 'Quartz Countertops', label: 'Quartz Countertops' },
  { value: 'Granite Countertops', label: 'Granite Countertops' },
  { value: 'Flooring', label: 'Flooring' },
  { value: 'Design Consultation', label: 'Design Consultation' },
  { value: 'Showroom Visit', label: 'Showroom Visit' },
  { value: 'Other', label: 'Other / Not Sure' },
]
