const pharmacySidebar = [
  {
    key: 'personal',
    label: 'Pharmacy Information',
    children: [
      { key: 'basic', label: 'Basic Details' },
      { key: 'location', label: 'Location' },
      { key: 'inventory', label: 'Inventory Setup', optional: true },
    ],
  },
  { key: 'license', label: 'Drug License' },
  { key: 'review', label: 'Review & Complete' },
];

export default pharmacySidebar;