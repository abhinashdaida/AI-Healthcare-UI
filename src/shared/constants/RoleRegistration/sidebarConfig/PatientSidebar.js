// shared/constants/RoleRegistration/sidebarConfig/PatientSidebar.js
import { DEFAULT_SECTION_SUBTITLE } from '../commonText';

const patientSidebar = [
  {
    key: 'personal',
    label: 'Personal Information',
    icon: 'tabler:user',
    title: 'Personal Information',
    subtitle: DEFAULT_SECTION_SUBTITLE,
    children: [
      {
        key: 'basic',
        label: 'Basic Details',
        icon: 'tabler:user',
        title: 'Basic Details',
        subtitle: 'Tell us a little about yourself so we can personalize your healthcare experience.',
        showSkip: false,
        continueLabel: 'Save & Continue',
      },
      {
        key: 'contact',
        label: 'Contact & Location',
        icon: 'tabler:map-pin',
        title: 'Contact & Location',
        subtitle: 'Choose someone we can contact in case of an emergency. This information stays private and secure.',
        showSkip: false,
        continueLabel: 'Save & Continue',
      },
      {
        key: 'health',
        label: 'Health Overview',
        icon: 'tabler:activity-heartbeat',
        title: 'Health Overview',
        subtitle: "Add your basic health information to help us provide more personalized care and better health recommendations. You can skip any field if you're unsure.",
        showSkip: false,
        continueLabel: 'Save & Continue',
      },
    ],
  },
  {
    key: 'records',
    label: 'Medical Records',
    icon: 'tabler:clipboard-heart',
    title: 'Medical Records',
    subtitle: DEFAULT_SECTION_SUBTITLE,
    children: [
      {
        key: 'medical',
        label: 'Medical Conditions',
        icon: 'tabler:stethoscope',
        optional: true,
        title: 'Medical Conditions',
        subtitle: 'Add your basic health information to help healthcare providers serve you better.',
        showSkip: true,
        continueLabel: 'Upload & Continue',
      },
      {
        key: 'insurance',
        label: 'Insurance',
        icon: 'tabler:building-bank',
        optional: true,
        title: 'Insurance',
        subtitle: 'Add your insurance information for seamless coverage and claims processing.',
        showSkip: true,
        continueLabel: 'Save & Continue',
      },
    ],
  },
  {
    key: 'review',
    label: 'Review & Complete',
    icon: 'tabler:checklist',
    title: 'Review & Complete',
    subtitle: DEFAULT_SECTION_SUBTITLE,
    children: [
      {
        key: 'information',
        label: 'Verify Information',
        icon: 'tabler:file-text',
        title: 'Verify Information',
        subtitle: 'Review all the information you\u2019ve provided and edit any section before continuing.',
        showSkip: false,
        continueLabel: 'Create Login ID',
      },
      {
        key: 'loginid',
        label: 'Create Login ID',
        icon: 'tabler:shield-check',
        title: 'Create Your MediConnect ID',
        subtitle: 'Choose a unique Id that you\u2019ll use to sign in to your account',
        showSkip: false,
        continueLabel: 'Set Password',
      },
    ],
  },
];

export default patientSidebar;