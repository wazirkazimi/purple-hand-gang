<div align="center">
  <img src="./image.png" alt="Purple Hand Gang Logo" width="150" height="150" />

  <h1>🚨 Namma Suraksha 🚨</h1>
  <p><em>ನಮ್ಮ ಸುರಕ್ಷಾ — Our Safety, Our City</em></p>
  
  <p>
    <b>Built by Team 11 (Purple Hand Gang)</b><br/>
    Wazir • Parinith • Sujal
  </p>
</div>

<hr />

## 📖 About The Project

**Namma Suraksha** is a context-aware, mobile-first web application designed specifically for the citizens of Bangalore. It serves as a rapid civic and personal safety tool, enabling users to instantly alert authorities in an emergency and report local civic/safety issues directly from their phone.

Built under the banner of the **Purple Hand Gang**, the application features a deeply customized, dark, and serious modern UI with built-in location intelligence.

## ✨ Key Features

### 🆘 2-Second Hold SOS System
- A prominent, central SOS button designed to prevent accidental presses.
- Holding the button for 2 seconds triggers a pulsing "active" state using SVG ring animations, activating a device vibration feedback loop.
- Instantly displays an unmissable overlay alerting the user that authorities have been contacted with their location.
- **Context-Aware:** If a user is logged in, the SOS overlay actively confirms that their predefined Emergency Contacts (e.g., Mom, Dad) have also been notified.

### 📍 Live Location & Safety Heatmap
- Automatically requests the user's real-time GPS coordinates.
- Interfaces with the **Nominatim (OpenStreetMap) API** to perform reverse-geocoding, effortlessly translating raw GPS coordinates into human-readable locations (e.g., "Koramangala, Bangalore").
- Overlays **Safety Heatmap Data** directly onto the user's live map feed.
- Drops a custom CSS "pulsing radar pin" representing the user, surrounded by severity-colored zones (Safe, Moderate, Concerning, Danger) to indicate past incidents in their immediate vicinity.

### 📸 Civic Issue Reporting
- A streamlined 3-step wizard for reporting issues (Traffic Violations, Road Blockages, Animal Hazards, etc.).
- Includes UI functionality for inline photo uploads and evidence gathering.
- Automatically logs the report under the user's profile and tags it with their live location and timestamp.

### 👤 Profile & Emergency Contacts
- Fully functioning local-storage-based authentication framework (No external backend required for demonstration).
- Requires an emergency contact out-of-the-box upon account creation.
- Profile dashboard allows users to manage up to 3 emergency contacts and review their prior civic reports.

---

## 🛠️ Technology Stack

- **Framework:** React / Vite
- **Styling:** Highly custom Vanilla CSS (CSS Variables, Flexbox, Keyframe Animations, Glassmorphism)
- **Routing:** React Router v6
- **Map & Geography:** Leaflet, React Leaflet, OpenStreetMap CartoDB Dark Tiles
- **Geocoding:** Nominatim API 
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
   *(Note: Core dependencies include `react-router-dom`, `leaflet`, and `react-leaflet`)*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open [http://localhost:3000](http://localhost:3000) in your mobile browser or use browser DevTools (F12) to emulate a mobile device for the best intended experience.

---

## 👥 The Team

Created with ❤️ and caffeine by **Team 11 (Purple Hand Gang)**:
* **Wazir**
* **Parinith**
* **Sujal**