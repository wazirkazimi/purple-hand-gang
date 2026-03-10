// Mock data for the entire application

export const CATEGORIES = [
  { id: 'traffic', icon: '🚗', label: 'Traffic Violation' },
  { id: 'road_rage', icon: '😤', label: 'Road Rage' },
  { id: 'road_block', icon: '🚧', label: 'Road Block/Damage' },
  { id: 'civic', icon: '🗑️', label: 'Civic Issue' },
  { id: 'animals', icon: '🐄', label: 'Animals on Road' },
  { id: 'corruption', icon: '🏛️', label: 'Corruption' },
  { id: 'other', icon: '⚖️', label: 'Other' },
];

export const BANGALORE_LOCATIONS = [
  { name: 'Silk Board Junction', lat: 12.9170, lng: 77.6227, severity: 'danger', incidents: 24, category: 'traffic' },
  { name: 'KR Puram', lat: 13.0012, lng: 77.6962, severity: 'danger', incidents: 19, category: 'traffic' },
  { name: 'Marathahalli Bridge', lat: 12.9562, lng: 77.7010, severity: 'danger', incidents: 21, category: 'road_rage' },
  { name: 'Hebbal Flyover', lat: 13.0358, lng: 77.5970, severity: 'concerning', incidents: 14, category: 'traffic' },
  { name: 'MG Road', lat: 12.9753, lng: 77.6063, severity: 'moderate', incidents: 8, category: 'civic' },
  { name: 'Whitefield', lat: 12.9698, lng: 77.7500, severity: 'concerning', incidents: 16, category: 'road_block' },
  { name: 'Jayanagar 4th Block', lat: 12.9260, lng: 77.5830, severity: 'safe', incidents: 3, category: 'civic' },
  { name: 'Koramangala', lat: 12.9352, lng: 77.6245, severity: 'moderate', incidents: 9, category: 'road_rage' },
  { name: 'Electronic City', lat: 12.8440, lng: 77.6602, severity: 'concerning', incidents: 15, category: 'traffic' },
  { name: 'Indiranagar', lat: 12.9784, lng: 77.6408, severity: 'moderate', incidents: 7, category: 'civic' },
  { name: 'Yelahanka', lat: 13.1005, lng: 77.5960, severity: 'safe', incidents: 2, category: 'animals' },
  { name: 'Banashankari', lat: 12.9254, lng: 77.5468, severity: 'moderate', incidents: 6, category: 'civic' },
  { name: 'BTM Layout', lat: 12.9166, lng: 77.6101, severity: 'concerning', incidents: 13, category: 'road_rage' },
  { name: 'HSR Layout', lat: 12.9116, lng: 77.6389, severity: 'safe', incidents: 4, category: 'civic' },
  { name: 'Rajajinagar', lat: 12.9900, lng: 77.5576, severity: 'moderate', incidents: 10, category: 'road_block' },
  { name: 'Malleshwaram', lat: 13.0035, lng: 77.5686, severity: 'safe', incidents: 3, category: 'animals' },
  { name: 'Majestic', lat: 12.9767, lng: 77.5713, severity: 'danger', incidents: 22, category: 'traffic' },
  { name: 'Peenya', lat: 13.0280, lng: 77.5157, severity: 'concerning', incidents: 11, category: 'road_block' },
  { name: 'Bellandur', lat: 12.9260, lng: 77.6762, severity: 'moderate', incidents: 8, category: 'civic' },
  { name: 'Sarjapur Road', lat: 12.9107, lng: 77.6843, severity: 'concerning', incidents: 12, category: 'traffic' },
];

export const SEVERITY_COLORS = {
  safe: '#22C55E',
  moderate: '#EAB308',
  concerning: '#F97316',
  danger: '#E63946',
};

export const SEVERITY_LABELS = {
  safe: 'Safe',
  moderate: 'Moderate',
  concerning: 'Concerning',
  danger: 'Danger',
};

export const MOCK_REPORTS = [
  {
    id: 'RPT-3847',
    category: 'traffic',
    location: 'Silk Board Junction, Bangalore',
    date: '2026-03-08',
    description: 'Signal jumping by auto-rickshaw during peak hours',
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=200&fit=crop',
    status: 'submitted',
  },
  {
    id: 'RPT-2916',
    category: 'civic',
    location: 'Koramangala 5th Block, Bangalore',
    date: '2026-03-06',
    description: 'Garbage dumped on footpath near water tank',
    photo: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=200&h=200&fit=crop',
    status: 'submitted',
  },
  {
    id: 'RPT-1452',
    category: 'road_block',
    location: 'Marathahalli Bridge, Bangalore',
    date: '2026-03-04',
    description: 'Large pothole causing traffic slowdown',
    photo: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=200&h=200&fit=crop',
    status: 'submitted',
  },
];

export const MOCK_LOCATIONS_FOR_REPORTS = [
  'Koramangala, Bangalore',
  'Indiranagar, Bangalore',
  'Whitefield, Bangalore',
  'HSR Layout, Bangalore',
  'BTM Layout, Bangalore',
  'Jayanagar, Bangalore',
  'Electronic City, Bangalore',
  'Marathahalli, Bangalore',
];
