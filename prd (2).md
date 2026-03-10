# 📋 Product Requirements Document (PRD)
## Namma Suraksha — Civic Sentinel
**Hackathon MVP | Web App | Citizen-Facing**

---

## 1. App Overview & Objectives

**Namma Suraksha** (meaning "Our Safety" in Kannada) is a civic safety web platform that transforms ordinary Bangalore citizens into the city's first line of defence.

The platform serves two deeply connected purposes:
1. **Empower citizens** to flag civic and traffic violations in a way that reaches the right authority
2. **Give people a fast, discreet way** to signal distress when they feel unsafe on the road or in a public space

### Mission Statement
> "Millions of eyes — now with a unified way to act on what they see."

### Hackathon Goals
- Build a fully functional citizen-facing MVP web app
- Demonstrate core SOS + Reporting + Heatmap flows
- Keep scope lean, impactful, and demo-ready

---

## 2. Target Audience

| Audience | Description |
|---|---|
| **Primary** | Bangalore citizens aged 18–45 who commute daily |
| **Secondary** | Pedestrians, residents facing civic issues (kachra, road damage, animals) |
| **Emergency Users** | Citizens in distress needing immediate help |

---

## 3. Platform

- **Type:** Web Application (Mobile-responsive)
- **Access:** Browser-based, no app install required
- **Priority:** Works well on mobile browsers (most reports will happen on-the-go)

---

## 4. Authentication Model (Hybrid)

| Feature | Login Required? |
|---|---|
| SOS Button | ❌ No — works instantly |
| View Heatmap | ❌ No — publicly accessible |
| Submit Report / Complaint | ✅ Yes — phone/email login |
| View My Reports | ✅ Yes |

**Why Hybrid?**
- SOS must work in panic — no time to login
- Reports need accountability to prevent spam and fake submissions

---

## 5. Core Features & Functionality

---

### 5.1 🚨 SOS — Emergency Distress Signal

**Who can use it:** Anyone, no login required

**User Flow:**
1. Citizen opens the web app
2. Taps the prominent **SOS button** (always visible on homepage)
3. App silently captures their **live GPS location**
4. Two simultaneous actions:
   - 📍 Location alert sent to the **nearest police station** (based on geolocation)
   - 📱 Alert notification sent to **pre-saved emergency contacts** (if user is logged in and has set them)
5. Citizen sees a confirmation: *"Help is on the way. Stay safe."*

**Key Design Principles:**
- Button must be large, prominent, and one-tap
- Works without login
- Silent — no loud sounds triggered that could escalate danger
- Emergency contacts can be added in profile settings (for logged-in users)

---

### 5.2 📋 Report / Raise a Complaint

**Who can use it:** Logged-in citizens only

#### Report Categories:
| Category | Examples |
|---|---|
| 🚗 Traffic Violation | Signal jumping, wrong side driving, no helmet |
| 😤 Road Rage | Assault, threatening behaviour |
| 🚧 Road Block / Damage | Potholes, illegal encroachments, broken dividers |
| 🗑️ Civic Issue | Kachra dumping, gutka stains, open drains |
| 🐄 Animals on Road | Stray cattle, dogs causing accidents |
| 🏛️ Corruption | Bribery, misconduct by officials |
| ⚖️ Other Civic Issue | General complaints |

#### Report Submission Form:
| Field | Required? | Details |
|---|---|---|
| 📸 Photo | ✅ Yes | Geo-tagged; location auto-extracted from photo metadata |
| 🏷️ Category Tag | ✅ Yes | Dropdown selection from categories above |
| 📝 Description | ❌ Optional | Short text, max 200 characters |

**User Flow:**
1. Citizen logs in
2. Taps **"Report an Issue"**
3. Selects category
4. Uploads geo-tagged photo (location auto-detected)
5. Adds optional description
6. Taps **Submit**
7. Sees **confirmation screen**: *"Report submitted! Your report ID is #XXXX"*
8. Report appears in **My Reports** history

---

### 5.3 🗺️ Road Safety Heatmap

**Who can use it:** Everyone, no login required

**What it shows:**
A color-coded interactive map of Bangalore where color intensity is driven by the **volume and severity of reports + SOS triggers** in each zone.

| Color | Meaning |
|---|---|
| 🟢 Green | Safe zone — few or no incidents |
| 🟡 Yellow | Moderate — some incidents reported |
| 🟠 Orange | Concerning — frequent reports |
| 🔴 Red | High danger — hotspot area |

**Data Sources feeding the heatmap:**
- All citizen-submitted reports
- SOS triggers (anonymised, location only)

**User Flow:**
1. Citizen opens the app
2. Navigates to **Heatmap** tab
3. Sees Bangalore map with color-coded zones
4. Can tap/click a zone to see **number of recent reports** in that area
5. Can filter by category (e.g., show only Road Rage hotspots)

---

### 5.4 📁 My Reports (History Page)

**Who can use it:** Logged-in citizens only

**What it shows:**
- List of all reports submitted by the citizen
- Each entry shows: Category, Date, Location, Photo thumbnail
- Status badge: **Submitted** (MVP only — no resolution tracking in V1)

---

## 6. User Interface & Experience Flows

### 6.1 Homepage (Not Logged In)
```
[ Namma Suraksha Logo ]
[ 🚨 SOS BUTTON — large, red, center ]
[ View Safety Heatmap ] [ Login / Sign Up ]
```

### 6.2 Homepage (Logged In)
```
[ Namma Suraksha Logo ]  [ Profile Icon ]
[ 🚨 SOS BUTTON ]
[ Report an Issue ]  [ View Heatmap ]  [ My Reports ]
```

### 6.3 Report Submission Flow
```
Login → Select Category → Upload Geo-tagged Photo
→ Add Description (optional) → Submit
→ Confirmation Screen ("Report #XXXX Submitted!")
→ Redirect to My Reports
```

### 6.4 SOS Flow
```
Tap SOS → Location captured → Alert sent to nearest station
+ Emergency contacts notified → "Help is on the way" screen
```

### 6.5 Heatmap Flow
```
Open Heatmap Tab → Bangalore map loads
→ Color-coded zones visible → Tap zone → See incident count
→ Optional: Filter by category
```

---

## 7. Key Pages Summary

| Page | Access | Purpose |
|---|---|---|
| Home | Public | SOS button + navigation hub |
| Heatmap | Public | Color-coded safety map |
| Login / Sign Up | Public | Auth via phone/email |
| Report Issue | Logged In | Submit geo-tagged complaint |
| Confirmation | Logged In | Post-submit success screen |
| My Reports | Logged In | History of submitted reports |
| Profile Settings | Logged In | Add emergency contacts |

---

## 8. Security Considerations

| Concern | Approach |
|---|---|
| **Fake/Spam Reports** | Login required for reports; geo-tagged photos add authenticity |
| **SOS Misuse** | SOS is open but location-based — misuse is traceable |
| **User Data Privacy** | SOS location data used only for alert; not stored permanently |
| **Photo Privacy** | Geo-tag used internally; not exposed publicly on heatmap |
| **Account Security** | Standard auth (OTP/email verification) |

---

## 9. Potential Challenges & Solutions

| Challenge | Solution |
|---|---|
| Getting accurate nearest police station | Use a static database of Bangalore police station coordinates + Haversine distance formula |
| Geo-tag not present in all photos | Prompt user to enable location; fallback to browser geolocation |
| Heatmap data is empty at launch | Seed with mock/sample data for demo purposes |
| SOS alert delivery (no backend yet) | For MVP demo: simulate with email/WhatsApp API (e.g., Twilio or WhatsApp Business API) |
| Preventing the SOS button from accidental taps | Add a 2-second press-and-hold or a quick "Are you sure?" micro-confirmation |

---

## 10. Out of Scope for MVP (Future Expansion)

| Feature | Why Deferred |
|---|---|
| Police / Authority Dashboard | Requires institutional integration — post-hackathon |
| Report Status Updates (In Progress / Resolved) | Needs authority-side action |
| In-app video evidence recording | Adds complexity; photos suffice for MVP |
| Fake screen (disguised SOS) | Nice-to-have safety feature for V2 |
| Multi-city expansion | Start with Bangalore, expand later |
| Gamification / citizen points | Engagement feature for V2 |
| Push notifications | Browser notifications possible in V2 |
| AI-powered incident classification | Auto-categorise reports using image AI — V2 |

---

## 11. Success Metrics (for Demo)

| Metric | Target |
|---|---|
| SOS flow completed in | < 3 seconds |
| Report submission steps | ≤ 4 taps |
| Heatmap load time | < 2 seconds |
| Core flows working end-to-end | SOS ✅ Report ✅ Heatmap ✅ My Reports ✅ |

---

## 12. Summary

**Namma Suraksha** is a lean, powerful civic safety platform for Bangalore citizens. The MVP focuses on three high-impact pillars:

1. 🚨 **SOS** — One-tap silent distress signal with dual alerts
2. 📋 **Reporting** — Geo-tagged, categorised civic complaint submission
3. 🗺️ **Heatmap** — Real-time color-coded safety intelligence for the city

By keeping the scope citizen-facing and feature-focused, the hackathon team can build a compelling, demo-ready product that tells a clear story: **Bangalore's citizens, empowered.**

---

*Generated for Hackathon MVP Planning | Namma Suraksha — Civic Sentinel*
