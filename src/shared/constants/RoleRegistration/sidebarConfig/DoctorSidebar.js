// shared/constants/RoleRegistration/sidebarConfig/doctorSidebar.js
const doctorSidebar = [
  {
    key: 'personal',
    label: 'Personal Information',
    icon: 'lucide:user',
    children: [
      { key: 'basic', label: 'Basic Details', icon: 'lucide:user' },
      { key: 'license', label: 'License & Specialization', icon: 'tabler:map-pin' },
      { key: 'availability', label: 'Availability & Schedule', icon: 'tabler:phone' },
    ],
  },
  {
    key: 'qualifications',
    label: 'Qualifications Records',
    icon: 'tabler:clipboard-heart',
    children:[
      { key: 'medical', label: 'Medical Conditions', icon: 'ri:user-line' },
      { key: 'insurance', label: 'Insurance', icon: 'ri:user-line' },
    ],
  },
  {
    key: 'review',
    label: 'Review & Complete',
    icon: 'ri:user-line',
    children:[
      { key: 'information', label: 'Verify Information', icon: 'ri:user-line' },
      { key: 'loginid', label: 'Create Login ID', icon: 'ri:user-line' },
    ],
  },
];

export default doctorSidebar;