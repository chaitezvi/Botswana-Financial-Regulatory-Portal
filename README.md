# Botswana Financial Regulatory Portal

A web portal for centralized access to Botswana’s financial regulatory documents, guidelines, FAQs, compliance checklists, and AI-powered assistance.

**Live Deployment:** [tomosk-group.vercel.app](https://tomosk-group.vercel.app)  
**Author:** Tomosk Group

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Login as Admin](#login-as-admin)
- [Future Improvements](#future-improvements)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Document Management:** Upload, update, categorize, and view regulatory documents (Acts, Regulations, Guidelines, etc.) with metadata and requirements.
- **FAQ Management:** Curate FAQs related to financial regulations by category and authority.
- **AI Compliance Assistant:** Ask regulatory or compliance questions and receive intelligent, document-linked answers.
- **Search & Discovery:** Find documents and FAQs quickly with full-text and tag search.
- **Compliance Checklist Generator:** Generate checklists based on selected regulations.
- **Audit Trail:** Track all admin actions and changes for accountability.
- **User Authentication & Roles:** Secure access for admins and regular users; protected dashboards.
- **Statistics Dashboard:** View system stats, recent activity, and quick links for management.

---

## Architecture

- **Frontend:** React + TypeScript, Tailwind CSS, Vite
- **Routing:** React Router SPA
- **State Management:** React Context API
- **Icons:** Lucide-react

### Main Components

- `src/App.tsx`: Routing and context providers.
- `src/pages/AdminDashboard.tsx`: Admin dashboard for management.
- `src/pages/AIComplianceAssistant.tsx`: AI-powered chat for compliance.
- `src/pages/DocumentPage.tsx`: Document detail view.
- `src/components/DocumentCard.tsx`: Document summary card.
- Contexts for data, auth, notifications.

---

## Tech Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Frontend   | React, TypeScript, Tailwind CSS, Vite        |
| UI Icons   | Lucide-react                                 |
| Routing    | React Router                                 |
| State Mgmt | React Context                                |

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Install & Run

```bash
git clone https://github.com/chaitezvi/Botswana-Financial-Regulatory-Portal.git
cd Botswana-Financial-Regulatory-Portal
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to use the app.

---

## Login as Admin

1. Visit the live deployment: [https://tomosk-group.vercel.app](https://tomosk-group.vercel.app)
2. Click the **Login** button on the homepage or in the navigation bar.
3. Use the demo admin credentials:
    - **Email:** admin@gov.bw
    - **Password:** admin123
4. Alternatively, you can register a new account and request admin access from Tomosk Group.
5. After login, if your account is admin, you will be redirected to the admin dashboard and see management options for Documents, FAQs, Settings, and Audit Trail.

---

## Future Improvements

- **News & Events:** Add modules/pages for regulatory news and events. Admins can post and manage news articles and events (see Technical Proposal for integration steps).
- **Backend Integration:** Move from context/in-memory data to backend APIs and persistent storage.
- **Advanced Search:** Integrate ElasticSearch or Algolia for better search.
- **Notifications:** Email or in-app notifications for updates or events.
- **Mobile Optimization & Accessibility:** Improve mobile experience and WCAG compliance.
- **Analytics Dashboard:** For regulatory bodies to monitor usage and trends.

---

## Roadmap

| Phase                | Tasks                                                                 | Timeline         |
|----------------------|-----------------------------------------------------------------------|------------------|
| Core App             | Document/FAQ management, authentication, AI Assistant, search         | Month 1-2        |
| Testing              | User testing, bug fixes, optimization                                 | Month 3          |
| News/Events          | Develop and integrate News & Events modules                           | Month 4          |
| Backend/API          | Migrate to persistent backend, notifications, analytics               | Month 5-6        |
| Launch               | Final QA, deployment, onboarding, customer rollout                    | Month 6          |

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT License

---

**Contact:** For questions and support, contact [Tomosk Group](mailto:tomoskgroup@gmail.com) or [chaitezvi](https://github.com/chaitezvi).
