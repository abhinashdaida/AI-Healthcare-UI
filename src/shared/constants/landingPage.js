import React from 'react';
import { Icon } from '@iconify/react';

// Services Assets
import recordsImg from "../../assets/LandingPage/Records.svg";
import insuranceImg from "../../assets/LandingPage/Insurance.svg";
import monitorImg from "../../assets/LandingPage/Monitor.svg";

// Features Assets
import AiHealthInsightsImage from "../../assets/LandingPage/AiHealthInsights.png";
import ConnectedMedicalRecordsImage from "../../assets/LandingPage/ConnectedMedicalRecords.png";
import SecureHealthcareNetworkImage from "../../assets/LandingPage/SecureHealthcareNetwork.png";
import ContinuousCareImage from "../../assets/LandingPage/ContinuousCare.png";

export const NAVBAR_ITEMS = ['Home', 'Solutions', 'For Patients', 'For Providers', 'Pricing', 'Resources'];

export const HERO_FEATURES = [
  { icon: 'codicon:workspace-trusted', title: 'Trusted by', desc: '1M+ Patients' },
  { icon: 'si:verified-duotone', title: 'Verified', desc: 'Healthcare Experts' },
  { icon: 'grommet-icons:secure', title: 'Secure & Confidential', desc: 'Your data is protected' },
  { icon: 'streamline:customer-support-1', title: '24/7 Care', desc: "We're here for you" }
];

export const SEARCH_LOCATIONS = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

export const POPULAR_SEARCHES = [
  "Dermatologist",
  "Gynecologist",
  "Paediatrician",
  "Orthopaedic",
  "Dentist",
];

export const SERVICES = [
  {
    title: "Doctor\nConsultation",
    description: "Book appointments\nwith verified doctors\nacross specialities.",
    icon: <Icon icon="hugeicons:doctor-01" width={24} height={24} className="text-primary" />
  },
  {
    title: "Lab Tests",
    description: "Book lab tests at\nhome with certified\nlaboratories.",
    icon: <Icon icon="hugeicons:ai-dna" width={24} height={24} className="text-primary" />
  },
  {
    title: "Online\nPharmacy",
    description: "Order medicines\nonline and get them\ndelivered to your doorstep.",
    icon: <Icon icon="mage:tablet" width={24} height={24} className="text-primary" />
  },
  {
    title: "Health\nRecords",
    description: "Access prescriptions,\nreports and medical\nhistory securely.",
    icon: <img src={recordsImg} alt="Records" style={{ width: 24, height: 24 }} />
  },
  {
    title: "Insurance\nClaims",
    description: "Verify coverage, file\nclaims and track\napprovals.",
    icon: <img src={insuranceImg} alt="Insurance" style={{ width: 24, height: 24 }} />
  },
  {
    title: "Remote\nMonitoring",
    description: "Track your vitals and\nstay connected with\nyour care team.",
    icon: <img src={monitorImg} alt="Monitor" style={{ width: 24, height: 24 }} />
  },
];

export const PARTICIPANTS = [
  { role: 'Patients', desc: 'Manage your health and\naccess care' },
  { role: 'Doctors', desc: 'Doctor care and\nconsultations' },
  { role: 'Hospitals', desc: 'Streamline operations and\npatient care' },
  { role: 'Laboratories', desc: 'Accurate tests and timely\nreports' },
  { role: 'Pharmacies', desc: 'Dispense and deliver\nmedicine with ease' },
  { role: 'Insurance', desc: 'Simplify policies and\nclaims' }
];

export const FEATURES = [
  {
    title: "AI Health\nInsights",
    image: AiHealthInsightsImage,
    icon: <Icon icon="hugeicons:ai-dna" width="24" height="24" className="text-primary" />,
    desc: "Receive personalized health\nrecommendations and risk assessments.",
    bullets: ["Instant symptom analysis", "Health risk assessment", "Personalized recommendations"],
  },
  {
    title: "Connected\nMedical Records",
    image: ConnectedMedicalRecordsImage,
    icon: <Icon icon="tabler:clipboard-text" width="24" height="24" className="text-primary" />,
    desc: "Access prescriptions, reports, and\nconsultations from one place.",
    bullets: ["All records in one place", "Easy access anytime", "100% secure & private"],
  },
  {
    title: "Secure Healthcare\nNetwork",
    image: SecureHealthcareNetworkImage,
    icon: <Icon icon="tabler:ambulance" width="24" height="24" className="text-primary" />,
    desc: "Enterprise-grade security\nand privacy protection.",
    bullets: ["Instant symptom analysis", "Health risk assessment", "Personalized recommendations"],
  },
  {
    title: "Continuous\nCare",
    image: ContinuousCareImage,
    icon: <Icon icon="tabler:user-heart" width="24" height="24" className="text-primary" />,
    desc: "From appointments to\nfollow-ups and monitoring.",
    bullets: ["Health tips & articles", "Lifestyle recommendations", "Connect with experts"],
  },
];

export const STATS = [
  { end: 1,    suffix: 'M+',   label: 'Patients Supported',       iconColor: '#6B0953', bgColor: '#F4EEF3' },
  { end: 50,   suffix: 'K+',   label: 'Appointments Completed',   iconColor: '#093D6B', bgColor: '#EBF4FC' },
  { end: 500,  suffix: '+',    label: 'Healthcare Providers',     iconColor: '#22096B', bgColor: '#F6F4FC' },
  { end: 99.9, suffix: '%',    label: 'Platform Availability',    iconColor: '#6B3309', bgColor: '#FEF2E9' },
];

export const TESTIMONIALS = [
  {
    title: 'Fast & Reliable Lab Tests',
    text: '“I scheduled my lab test online and received reports quickly.”',
    name: 'John Smith',
    role: 'Business Analyst',
    avatar: 'https://i.pravatar.cc/150?u=john',
  },
  {
    title: 'Consult Online',
    text: '“Convenient online consultations from home.”',
    name: 'Vikram Rao',
    role: 'Accountant',
    avatar: 'https://i.pravatar.cc/150?u=vikram',
  },
  {
    title: 'Insurance Support',
    text: '“Smooth and hassle-free insurance support.”',
    name: 'Kavya',
    role: 'Teacher',
    avatar: 'https://i.pravatar.cc/150?u=kavya',
  },
  {
    title: 'Hospital Care',
    text: '“Quick booking and quality care.”',
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/150?u=rahul',
  }
];

export const FOOTER_LINKS = [
  {
    title: "Platform",
    links: [
      "Hospital Management",
      "Telemedicine",
      "Pharmacy System",
      "Lab Management",
      "Health Insurance",
      "Appointment and Scheduling",
      "Remote monitoring",
      "AI & Analytics",
    ],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Integration", "Case studies"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Partners", "Blog", "Contact Us"],
  },
];
