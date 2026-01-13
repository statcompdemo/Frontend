# SPG User Portal Dashboard

A professional, modern React-based dashboard application for managing SPG user activities, compliance tasks, and employee data processing.

## Features

### 🎯 Core Features

- **Modern Dashboard UI** with dark theme and gradient designs
- **Responsive Layout** that works on all devices
- **Real-time Date Display** in the header
- **Notification System** with badge counter
- **Interactive Navigation** with sidebar menu

### 📊 Dashboard Page

- **Circular Time Cards**
  - Mail Read At (current time)
  - Next Mail Read At (scheduled time)
  - Animated clock icons with gradient backgrounds

- **Comprehensive Data Table**
  - Customer Name
  - Mail Received Status (Yes/No)
  - Current Status with color-coded badges (Processing, On Hold, Completed)
  - Remark/Error Type/Password (clickable for password entry)
  - PF Report Download button
  - Backlog Employee/New Joinee button
  - Backlog Salary/Exit Employee button

- **Password Modal**
  - Popup for entering passwords when needed
  - Triggered by clicking on "Password not found" remarks

### 📋 My Activity Page

- **Clickable Navigation Cards**
  - Daily Work - View and manage daily tasks
  - Assigned Work - Check assigned projects

### 📅 Daily Work Page

- Task list with priorities (High, Medium, Low)
- Status indicators (Completed, In Progress, Pending)
- Due times for each task
- Visual status icons

### 📝 Assigned Work Page

- Detailed project cards
- Assignment information (assigned by, date, deadline)
- Project descriptions
- Status tracking

## Technology Stack

- **React 18** - Modern React with Hooks
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with modern design system

## Installation

1. Navigate to the project directory:
```bash
cd "c:/Users/nitesh kumar/Desktop/Antigravity/spg_user Dashboard"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5174/
```

## Project Structure

```
spg_user Dashboard/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx       # Main dashboard with table and time cards
│   │   ├── MyActivity.jsx      # Activity navigation page
│   │   ├── DailyWork.jsx       # Daily tasks page
│   │   └── AssignedWork.jsx    # Assigned projects page
│   ├── App.jsx                 # Main app with routing and layout
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles and design system
├── package.json
└── README.md
```

## Design System

### Color Palette
- **Primary Gradient**: Purple to violet (#667eea → #764ba2)
- **Success**: Cyan gradient (#4facfe → #00f2fe)
- **Warning**: Pink to yellow gradient (#fa709a → #fee140)
- **Dark Theme**: Deep navy backgrounds (#0f0f23, #1a1a2e, #16213e)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- Rounded corners (8px, 12px, 16px, 24px)
- Smooth transitions (0.3s cubic-bezier)
- Box shadows with multiple depths
- Gradient backgrounds
- Hover effects and animations

## Sample Data

The application includes sample data for demonstration:

### Dashboard Table
1. **Epimoney Private Limited**
   - Status: Processing
   - Remark: "Processing salary sheet for the month (December 2025)"
   - All actions enabled

2. **Stafcon Services LLP**
   - Status: On Hold
   - Remark: "Password not found" (clickable)
   - Actions disabled until password is provided

3. **Flo IT Services Pvt. Ltd**
   - Status: Completed
   - Remark: "Salary process completed successfully"
   - All actions enabled

## Key Features Implementation

### Status Badges
- **Processing**: Blue gradient
- **On Hold**: Orange/yellow gradient
- **Completed**: Purple gradient

### Interactive Elements
- Clickable remarks for password entry
- Download buttons for PF reports
- Employee management buttons
- Navigation cards with hover effects

### Responsive Design
- Mobile-friendly sidebar
- Responsive grid layouts
- Adaptive table display
- Touch-friendly buttons

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Features

1. Create new page components in `src/pages/`
2. Add routes in `src/App.jsx`
3. Update sidebar menu items as needed
4. Use existing CSS classes from `index.css`

## Customization

### Changing Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... more variables */
}
```

### Adding Menu Items
Update the sidebar in `src/App.jsx`:
```jsx
<li className="menu-item">
  <Link to="/new-page" className="menu-link">
    <Icon size={20} />
    <span>New Page</span>
  </Link>
</li>
```

## Performance

- Fast initial load with Vite
- Code splitting with React Router
- Optimized re-renders with React hooks
- Smooth animations with CSS transitions

## Future Enhancements

- [ ] User authentication
- [ ] Real-time data updates
- [ ] Export functionality (PDF, Excel)
- [ ] Advanced filtering and search
- [ ] Dark/Light theme toggle
- [ ] Email notifications
- [ ] Data visualization charts
- [ ] Mobile app version

## License

This project is created for SPG User Portal internal use.

## Support

For issues or questions, contact the development team.

---

**Built with ❤️ using React and modern web technologies**
