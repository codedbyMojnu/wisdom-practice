# Wisdom Compass - React Application

A modern React application for personal wisdom practice and growth tracking, converted from HTML templates to React components using Tailwind CSS v4.

## 🚀 Features

- **Landing Page**: Beautiful introduction to the Wisdom Compass application
- **Authentication**: Login and signup with form validation
- **Dashboard**: Personal wisdom tracking with statistics and progress visualization
- **Wisdom Library**: Browse and search wisdom templates from various sources
- **Profile Management**: User settings and custom wisdom creation
- **Responsive Design**: Mobile-first design with Tailwind CSS v4
- **Protected Routes**: Authentication-based access control

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks and functional components
- **React Router** - Client-side routing and navigation
- **Tailwind CSS v4** - Utility-first CSS framework
- **Context API** - State management for authentication
- **Vite** - Fast build tool and development server

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   ├── layout/
│   │   └── Sidebar.jsx
│   └── ui/
├── contexts/
│   └── AuthContext.jsx
├── hooks/
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── WisdomTemplatesPage.jsx
│   └── ProfilePage.jsx
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Design System

### Colors

- **Primary**: Forest Green (#388E3C) - Growth and reflection
- **Background**: Soft Beige (#F5F5DC) - Calm atmosphere
- **Card Background**: Warm Cream (#F5F9EB) - Content areas
- **Accent**: Warm Gold (#D4AC0D) - Highlights and insights
- **Destructive**: Red (#D32F2F) - Errors and warnings

### Typography

- **Headlines**: Alegreya (serif) - Elegant and intellectual
- **Body Text**: PT Sans (sans-serif) - Modern and readable

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd wisdompractice
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🔐 Authentication

The application includes a demo authentication system:

- **Login**: Use any email/password combination
- **Signup**: Create a new account with validation
- **Protected Routes**: Dashboard, Wisdom Templates, and Profile require authentication
- **Local Storage**: User session is persisted locally

## 📱 Pages & Components

### LandingPage

- Hero section with Wisdom Compass branding
- Feature highlights and philosophy quotes
- Call-to-action buttons for login/signup

### LoginPage & SignupPage

- Form validation and error handling
- Google OAuth integration (UI only)
- Responsive design with background imagery

### DashboardPage

- Welcome message and user statistics
- Progress tracking and category breakdown
- Daily wisdom practice logging
- AI-powered suggestions
- Custom wisdom creation modal

### WisdomTemplatesPage

- Searchable wisdom library
- Category filtering and pagination
- Wisdom detail modals
- Add to practice functionality

### ProfilePage

- User profile editing
- Custom wisdom management (CRUD operations)
- Notification preferences
- Account statistics

### Sidebar

- Responsive navigation menu
- Active route highlighting
- Logout functionality
- Mobile-friendly design

## 🎯 Key Features

### Form Validation

- Real-time password strength indicators
- Required field validation
- Error message display

### Responsive Design

- Mobile-first approach
- Collapsible sidebar navigation
- Touch-friendly interactions

### State Management

- React Context for authentication
- Local state for forms and UI
- Optimistic updates for better UX

### Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- High contrast color scheme

## 🔧 Customization

### Adding New Routes

1. Create a new page component in `src/pages/`
2. Add the route to `App.jsx`
3. Wrap with `ProtectedRoute` if authentication is required

### Styling

- Use Tailwind CSS utility classes
- Custom colors defined in `tailwind.config.js`
- Component-specific styles in individual files

### Data Management

- Replace mock data with actual API calls
- Implement proper error handling
- Add loading states and optimistic updates

## 🚧 Future Enhancements

- **Real Authentication**: Integrate with backend services
- **Data Persistence**: Database integration for wisdom entries
- **Charts & Analytics**: Chart.js integration for progress visualization
- **Notifications**: Push notifications and email reminders
- **Social Features**: Wisdom sharing and community features
- **Mobile App**: React Native or PWA implementation

## 📝 Notes

- All components are functional components using React hooks
- Tailwind CSS v4 provides modern CSS features
- Google Fonts are loaded dynamically for better performance
- The application is fully responsive and accessible
- Mock data is used for demonstration purposes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Wisdom Compass** - Navigate your personal growth journey with ancient wisdom and modern technology.
