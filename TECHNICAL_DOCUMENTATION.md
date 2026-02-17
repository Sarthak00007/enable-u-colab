# Technical Documentation - EnableU Colab

## 1. Project Overview
EnableU Colab is a gamified, inclusion-first learning platform designed to be accessible to all users, including those with visual, motor, or cognitive impairments. The application demonstrates high-standard accessibility (A11y) practices integrated into a modern React architecture.

## 2. Technical Stack

### Frontend
- **Framework**: React.js (Vite)
- **State Management**: 
  - **Global/UI State**: React Context API (for Accessibility settings)
  - **Server State**: TanStack Query (React Query) for efficient data fetching and caching
- **Forms & Validation**: Formik with Yup schema validation
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS with a centralized CSS Variable system to support real-time theme switching
- **HTTP Client**: Axios with interceptors for JWT injection

### Backend (Planned/API Ready)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)

---

## 3. Architecture & Core Systems

### 3.1 Accessibility Engine (A11y-First)
The heart of the application is the `AccessibilityContext`, which manages 5 major user preferences:
1. **Dynamic Font Scaling**: Global scale from 80% to 240%.
2. **High Contrast Mode**: WCAG Level AAA compliant (Yellow on Black).
3. **Dyslexic-Friendly Font**: Specialized typography and spacing for cognitive assistance.
4. **Reduced Motion**: Instant global suppression of CSS animations.
5. **Large Cursor**: Enhanced visibility for motor or visual impairments.

### 3.2 UI/Component Strategy
- **Layout-Driven Design**: The `AuthLayout` component handles repetitive structures like skip links, semantic main regions, and automated focus management.
- **Atomic Components**: Reusable `AccessibilityToolbar` provide persistent controls across the entire application.
- **Self-Documenting HTML**: Strict adherence to Semantic HTML5 and ARIA Relationship mapping (e.g., `aria-describedby` for form errors).

### 3.3 Data Layer
- **Service Pattern**: API calls are abstracted into separate service files (`authService`, `gameService`).
- **Hook-Based Integration**: Custom hooks (`useAuth`, `useGame`) decouple business logic from UI components.
- **Offline Reliability**: The game engine includes a "Mock Logic" fallback, allowing full functionality even when the API is unreachable.

---

## 4. Key Features

### User Management
- Fully validated Login, Registration, and Password Recovery flows.
- Persistent session management using `localStorage` and JWT.

### Gamified Learning (MCQ Game)
- A state-based game engine that manages 10-question contests.
- **Screen Reader Focus Sync**: Moves focus to questions automatically as the user progresses.
- **Real-time Feedback**: Assertive ARIA live regions for settings and game updates.

### Dashboard
- Global leaderboard and personalized performance statistics.
- Responsive grid layout that maintains readability at high zoom levels.

---

## 5. Coding Standards
1. **Accessibility**: All new features must pass keyboard-only test and VoiceOver/NVDA testing.
2. **CSS Variables**: Hard-coded hex values are avoided; colors must use variables to support High Contrast mode.
3. **Focus Management**: Routing changes must prioritize moving focus to the appropriate page heading.

---

## 6. Directory Structure
```text
enable-u-colab/
├── front-end/
│   ├── src/
│   │   ├── components/       # Reusable UI & Layouts
│   │   ├── context/          # A11y State Management
│   │   ├── hooks/            # Business logic & Page Titles
│   │   ├── pages/            # View components (Game, Login, etc.)
│   │   ├── services/         # API Client & Services
│   │   └── utils/            # Mock data and helpers
│   ├── index.css             # Main Design System & A11y Overrides
│   └── App.jsx               # Router & Provider Configuration
└── back-end/                 # Node/Express API (In Development)
```
