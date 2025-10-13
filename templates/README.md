# Wisdom Compass HTML Templates

This folder contains polished HTML templates for the Wisdom Compass application, featuring consistent design and color schemes.

## 🎨 Design System

### Colors

- **Primary**: Forest Green (#388E3C) - Growth, reflection, and nature
- **Background**: Soft Beige (#F5F5DC) - Calm and contemplative atmosphere
- **Card Background**: Warm Cream (#F9F9EB) - Main content areas and cards
- **Accent**: Warm Gold (#D4AC0D) - Highlight key elements and insights
- **Border**: Light Gray (#CCCCCC) - Subtle borders and dividers
- **Muted**: Light Gray (#E0E0E0) - Secondary text and muted elements
- **Destructive**: Red (#D32F2F) - Error states and warnings

### Typography

- **Headlines**: Alegreya (serif) - Literary, elegant, and intellectual feel
- **Body Text**: PT Sans (sans-serif) - Modern, warm, and readable

## 📱 Templates

### 1. **index.html** - Landing Page

- Hero section with Wisdom Compass branding
- Feature highlights (Daily Tracking, AI Insights, Custom Wisdom)
- Philosophy quote section
- Call-to-action buttons for login/signup

### 2. **login.html** - Authentication

- Clean login form with email/password
- Google OAuth integration
- Remember me checkbox
- Forgot password link
- Sign up redirect

### 3. **signup.html** - Account Creation

- Full registration form (first name, last name, email, password)
- Password strength indicator
- Terms and conditions checkbox
- Google OAuth integration
- Login redirect

### 4. **dashboard.html** - Main Application

- Welcome card with inspirational message
- Wisdom progress charts (yearly/monthly views)
- Daily wisdom logging (applied/missed)
- AI-powered wisdom suggestions
- Category breakdown and lifetime stats
- Custom wisdom creation modal
- Responsive sidebar navigation

### 5. **wisdom-templates.html** - Wisdom Library

- Global wisdom entries table
- Search and filter functionality
- Category-based organization
- Pagination support
- Wisdom detail modal
- Add to practice functionality

### 6. **profile.html** - User Management

- Personal information editing
- Custom wisdom entries management
- Add/edit/delete custom wisdom
- Profile customization

## 🚀 Features

### Consistent Design Elements

- Unified color palette across all templates
- Consistent typography hierarchy
- Responsive design for mobile and desktop
- Smooth transitions and hover effects
- Toast notification system

### Interactive Components

- Responsive sidebar navigation
- Modal dialogs for forms
- Chart visualizations (Chart.js integration)
- Form validation and feedback
- Loading states and animations

### Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly

## 🛠️ Technical Details

### Dependencies

- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Data visualization library
- **Google Fonts**: Alegreya and PT Sans
- **Vanilla JavaScript**: No heavy frameworks

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach

### File Structure

```
wisedom_html_templates/
├── index.html              # Landing page
├── login.html              # Login form
├── signup.html             # Registration form
├── dashboard.html          # Main dashboard
├── wisdom-templates.html   # Wisdom library
├── profile.html            # User profile
└── README.md              # This file
```

## 🎯 Usage

1. **Start with index.html** - Landing page for new users
2. **Navigate to login.html or signup.html** - User authentication
3. **Access dashboard.html** - Main application interface
4. **Use wisdom-templates.html** - Browse wisdom library
5. **Manage profile.html** - User settings and custom wisdom

## 🔧 Customization

### Adding New Colors

Update the `tailwind.config.js` section in each HTML file:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      },
    },
  },
};
```

### Modifying Typography

Update the font classes in the CSS:

```css
.font-headline {
  font-family: "Your-Headline-Font", serif;
}
.font-body {
  font-family: "Your-Body-Font", sans-serif;
}
```

### Adding New Features

Each template is self-contained and can be extended with:

- Additional JavaScript functionality
- New UI components
- Enhanced form validation
- Additional chart types

## 📝 Notes

- All templates use consistent naming conventions
- Color scheme follows the Wisdom Compass brand guidelines
- Responsive design ensures mobile compatibility
- Templates are optimized for performance and accessibility
- No external dependencies beyond CDN resources

---

**Wisdom Compass** - Navigate your personal growth journey with ancient wisdom and modern technology.
