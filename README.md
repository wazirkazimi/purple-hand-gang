<div align="center">
  <img src="./image.png" alt="Purple Hand Gang Logo" width="150" height="150" style="border-radius: 50%; object-fit: cover;" />
  
  <h1>🚨 Namma Suraksha 🚨</h1>
  <p><em>ನಮ್ಮ ಸುರಕ್ಷಾ — Our Safety, Our City</em></p>
  
  <p>
    <b>Built by Team 11 (Purple Hand Gang)</b><br/>
    Wazir • Parinith • Sujal
  </p>
  
  <img src="./Bangalore.jpg" alt="Bangalore Map/Safety View" width="800" style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); margin-top: 20px; max-width: 100%; object-fit: cover;" />
</div>

<br />

## 📖 About The Project

**Namma Suraksha** is a context-aware, mobile-first web application designed specifically for the citizens of Bangalore. It serves as a rapid civic and personal safety tool, enabling users to instantly alert authorities in an emergency and report local civic/safety issues directly from their phone.

Built under the banner of the **Purple Hand Gang**, the application features a deeply customized, dark, and serious modern UI powered by **Live GPS Location Tracking** and **Real-Time Reverse Geocoding**.

## ✨ Key Features

### 🆘 2-Second Hold SOS System
- A prominent, central SOS button designed to prevent accidental presses.
- Holding the button for 2 seconds triggers a pulsing "active" state using SVG ring animations, activating a device vibration feedback loop.
- Instantly displays an unmissable overlay alerting the user that authorities have been contacted with their location.
- **Context-Aware Privacy:** Only displays Emergency Contacts if tracking is enabled via the authenticated User Profile.

### 📍 Live Location & Safety Heatmap
- **True Real-time Tracking:** Immediately asks browser permission to grab your exact physical GPS coordinates.
- Interfaces with the **Nominatim (OpenStreetMap) API** to seamlessly translate raw geographic coordinates into precise, human-readable zone data (e.g. from `12.906` Lat to `Kadirenahalli, Bengaluru`).
- **Interactive Layers:** Overlays real-time Safety Incident Heatmap circles right onto your live map feed.
- Beautiful custom UI: Watch your **pulsing blue radar pin** dynamically adjust as you move!

### 📸 Smart Civic Issue Reporting
- A streamlined 3-step wizard for reporting localized issues (Traffic Violations, Road Blockages, Animal Hazards, etc.).
- **Live Auto-Tagging:** Utilizing the identical real-time geographical locator engine from the Home Page, the wizard instantly auto-detects, locks, and attaches your exact physical neighborhood to your incident report.
- Built-in UI layer for inline photo uploads and evidence compilation.

### 👤 Profile & Authenticated Contacts
- Standalone LocalStorage-based authentication state handling (No backend overhead required).
- Requires emergency contact assignment directly into secure LocalStorage during signup.
- Profile dashboard maps to a dedicated "My Reports" view tracking offline issue logs.

---

## 🛠️ Technology Stack

- **Framework:** React / Vite
- **Styling:** Highly custom Vanilla CSS (CSS Variables, Flexbox, Keyframe Animations, Glassmorphism)
- **Routing:** React Router v6
- **Map Infrastructure:** Leaflet, React Leaflet, OpenStreetMap CartoDB Dark Tiles
- **Geography Processing:** Nominatim Reverse Geocoding API 
- **Icons:** Custom SVG Line Icons
- **State Management:** React Context API (with LocalStorage Sync)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd purple-hand-gang
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open [http://localhost:3000](http://localhost:3000) in your mobile browser or use browser DevTools (F12) to emulate a mobile device for the intended experience. Make sure to **ALLOW location permissions** when prompted!

---

## 👥 The Team

Created with ❤️ and caffeine by **Team 11 (Purple Hand Gang)**:
* **Wazir**
* **Parinith**
* **Sujal**
