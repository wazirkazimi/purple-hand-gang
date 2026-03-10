import React from 'react';

// Shared props helper
const I = ({ children, size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const HomeIcon = (props) => (
  <I {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </I>
);

export const MapIcon = (props) => (
  <I {...props}>
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </I>
);

export const ClipboardIcon = (props) => (
  <I {...props}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </I>
);

export const FolderIcon = (props) => (
  <I {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </I>
);

export const UserIcon = (props) => (
  <I {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </I>
);

export const ShieldIcon = (props) => (
  <I {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </I>
);

export const AlertTriangleIcon = (props) => (
  <I {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </I>
);

export const PhoneIcon = (props) => (
  <I {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </I>
);

export const CameraIcon = (props) => (
  <I {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </I>
);

export const MapPinIcon = (props) => (
  <I {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </I>
);

export const CalendarIcon = (props) => (
  <I {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </I>
);

export const CheckCircleIcon = (props) => (
  <I {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </I>
);

export const ChevronRightIcon = (props) => (
  <I {...props}>
    <polyline points="9 18 15 12 9 6" />
  </I>
);

export const InfoIcon = (props) => (
  <I {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </I>
);

export const XIcon = (props) => (
  <I {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </I>
);

export const PlusIcon = (props) => (
  <I {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </I>
);

export const LogOutIcon = (props) => (
  <I {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </I>
);

export const SaveIcon = (props) => (
  <I {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </I>
);

export const SirenIcon = (props) => (
  <I {...props} fill={props.color || 'currentColor'} stroke="none">
    <path d="M12 2C12.5523 2 13 2.44772 13 3V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3C11 2.44772 11.4477 2 12 2Z" />
    <path d="M4.93 4.93C5.32 4.54 5.95 4.54 6.34 4.93L7.76 6.34C8.15 6.73 8.15 7.37 7.76 7.76C7.37 8.15 6.73 8.15 6.34 7.76L4.93 6.34C4.54 5.95 4.54 5.32 4.93 4.93Z" />
    <path d="M19.07 4.93C19.46 5.32 19.46 5.95 19.07 6.34L17.66 7.76C17.27 8.15 16.63 8.15 16.24 7.76C15.85 7.37 15.85 6.73 16.24 6.34L17.66 4.93C18.05 4.54 18.68 4.54 19.07 4.93Z" />
    <path d="M12 8C8.68629 8 6 10.6863 6 14V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V14C18 10.6863 15.3137 8 12 8Z" />
    <path d="M4 22H20" strokeWidth="2" stroke={props.color || 'currentColor'} fill="none" />
  </I>
);

// Category icons (filled style for impact)
export const CarIcon = (props) => (
  <I {...props}>
    <path d="M16 8l2 4h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" />
    <path d="M6 16H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2l2-4h8" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </I>
);

export const AngryIcon = (props) => (
  <I {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
    <path d="M7.5 8l3 1" />
    <path d="M16.5 8l-3 1" />
  </I>
);

export const ConstructionIcon = (props) => (
  <I {...props}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 6v12" />
    <path d="M10 6v12" />
    <path d="M14 6v12" />
    <path d="M18 6v12" />
  </I>
);

export const TrashIcon = (props) => (
  <I {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </I>
);

export const PawIcon = (props) => (
  <I {...props}>
    <circle cx="11" cy="4" r="2" />
    <circle cx="18" cy="8" r="2" />
    <circle cx="20" cy="16" r="2" />
    <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
  </I>
);

export const LandmarkIcon = (props) => (
  <I {...props}>
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
    <line x1="2" y1="18" x2="22" y2="18" />
  </I>
);

export const ScaleIcon = (props) => (
  <I {...props}>
    <line x1="12" y1="3" x2="12" y2="21" />
    <polyline points="1 12 5 8 9 12" />
    <path d="M1 12a4 4 0 0 0 8 0" />
    <polyline points="15 12 19 8 23 12" />
    <path d="M15 12a4 4 0 0 0 8 0" />
    <line x1="5" y1="8" x2="19" y2="8" />
  </I>
);

export const FilterIcon = (props) => (
  <I {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </I>
);

export const SearchIcon = (props) => (
  <I {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </I>
);

export const UploadIcon = (props) => (
  <I {...props}>
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </I>
);

export const ArrowLeftIcon = (props) => (
  <I {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </I>
);

export const ArrowRightIcon = (props) => (
  <I {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </I>
);
