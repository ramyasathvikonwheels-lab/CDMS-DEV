# CDMS Design System

This document outlines the design and UI/UX of the Case & Dispute Management System (CDMS).

## Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Green | #087B36 | Primary CTA buttons, active states, links |
| Light Gray | #F0F0F0 | Secondary buttons, neutral backgrounds |
| Dark Gray | #2a2a2a | Sidebar background |
| Text Dark | #222 | Main text, headings |
| Text Medium | #666 | Secondary text |
| Text Light | #888 | Placeholder text, disabled states |
| Border Gray | #ddd | Form borders, dividers |
| Background | #f5f5f5 | Page background |
| White | #ffffff | Cards, containers |
| Error Red | #e74c3c | Required field indicators |

## Typography

- **Font Family**: System UI, Avenir, Helvetica, Arial, sans-serif
- **Button Font Family**: Dubai
- **Headings**: 600 weight, varying sizes
- **Body**: 400 weight, 14px default
- **Small Text**: 12px for secondary information
- **Button Labels**: Dubai font, 16px weight for User/EVP toggles

## Spacing & Layout

- **Base Unit**: 8px
- **Common Gaps**: 12px, 16px, 20px, 24px, 30px, 40px
- **Card Padding**: 24px - 40px
- **Border Radius**: 6px (inputs, buttons), 12px (cards)

---

## Screens

### 1. Landing Page

**Purpose**: Initial entry point for users. Displays DEWA branding and provides access to the application.

**Layout**:
- Centered card container on diagonal gradient background
- Background: Linear gradient (135deg, #f0f0f5 to #e8e8f0)

**Components**:

#### Header Section
- DEWA Logo (image)
- Arabic text: "هيئة كهرباء وماء دبي"
- English text: "Dubai Electricity & Water Authority"

#### Content Section
- **Title**: "Case & Dispute Management System"
  - Font size: 28px
  - Font weight: 600
  - Color: #222

- **Description**: Lorem ipsum placeholder text
  - Font size: 14px
  - Color: #666
  - Line height: 1.6

#### Action Buttons

**Get Started Button**
- Background: #00a86b (DEWA green)
- Color: White
- Padding: 12px 32px
- Icon: Arrow (➤)
- Hover: Darker green (#008c5a), slight elevation
- Navigation: Navigates to Admin Dashboard

**Language Selector Button**
- Background: Transparent
- Border: 2px solid #e0e0e5
- Color: #666
- Format: Flag icon + "Eng"
- Border-radius: 20px
- Hover: Border color changes to green, text green
- Functionality: Toggles between English and Arabic (EN/AR)

**Responsive Behavior**:
- Desktop: Full card with optimal spacing
- Tablet: Adjusted font sizes
- Mobile: Optimized button layout

---

### 2. Admin Dashboard

**Purpose**: Main application hub. Displays key metrics, charts, and navigation to all features.

**Layout**: Two-column layout
- **Left Column**: Sidebar (70px width)
- **Right Column**: Main content area

#### Header Section

**Sticky Header** (Height: 70px)
- Background: White
- Border-bottom: 1px solid #e0e0e0
- Display: flex, space-between

**Left Side**:
- Hamburger menu button
- DEWA Logo (45px height)

**Right Side**:
- User Profile Card
  - Avatar (36px circle)
  - User name: "Muhammad Ahmad"
  - Dropdown arrow
  - Hover: Background changes to #f5f5f5

#### Sidebar Navigation

**Styling**:
- Width: 70px
- Background: #2a2a2a (dark)
- Height: 70px per item

**Menu Items** (with custom icons):
1. Dashboard
2. Onboard User
3. Manage User
4. Onboard Law Firm
5. Manage Law Firm
6. Logout

**Interactions**:
- Active state: #087B36 background, white text, left border
- Hover state: #3a3a3a background, icon color changes
- Tooltips: Appear on hover, positioned to the right
- Icons: 32px, grayscale inactive, full color on hover/active

#### Main Content Area

**Welcome Section**
- Heading: "Welcome, [User Name]"
  - Font size: 32px
  - Font weight: 600
- Date: "Friday, May 25, 2026"
  - Font size: 14px
  - Color: #888
- Margin-bottom: 40px

**Stats Grid**

Four stat cards in responsive grid:
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 20px

**Stat Card Component**:
- Background: White
- Padding: 24px
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
- Hover: Shadow increases, slight lift

**Card Content**:
- Label (14px, #666)
- Value (36px, #222, font-weight: 600)
- Icon (48px emoji)

**Stat Cards Displayed**:
1. Total Users: 100
2. Active Users: 98
3. Law Firms: 56
4. Total EVP: 56

**Charts Section**

Grid layout:
- Desktop: 2 columns
- Tablet: 1 column
- Gap: 20px

**Users by Department Chart**
- Type: Bar chart
- X-axis: Admin, Management, Legal Department, Others
- Y-axis: Count (0-250)
- Color: #00a86b (DEWA green)
- Year filter: Dropdown showing "2026"
- Height: 250px

**Law Firms Specialization Chart**
- Type: Donut/Pie chart
- Categories: Civil, Criminal, Commercial, Arbitration
- Colors: Multiple (green, red, blue, purple)
- Values displayed instead of percentages
- Legend: Vertical, positioned on right
- Height: 250px

**Chart Container Styling**:
- Background: White
- Padding: 24px
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)

---

### 3. User Onboarding Screen

**Purpose**: Form for creating and onboarding new users into the system.

**Layout**: Full page with sidebar and header

**Screen Title Section**
- **Title**: "Onboarding Screen (Create User / EVP)"
  - Font size: 28px
  - Font weight: 600
- **Breadcrumb**: "Home | Onboarding"
  - Font size: 14px
  - Color: #888
- **Top Right Button**: "+ Create EVP"
  - Background: White
  - Border: 2px solid #087B36
  - Color: #087B36
  - Hover: Background #f5f5f5

**Form Card**

**Card Styling**:
- Background: White
- Padding: 40px
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)

**Form Section Header**
- "User Information"
- Font size: 18px
- Font weight: 600
- Margin-bottom: 24px

**Form Fields Layout**
- Desktop: 3 columns (First Name, Last Name, Email in first row; User Type, Role in second row)
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px between fields

**Input Field Styling**
- Padding: 12px 14px
- Border: 1px solid #ddd
- Border-radius: 6px
- Font size: 14px
- Focus state: Border #087B36, box-shadow with green tint
- Placeholder color: #bbb

**Form Fields**:

1. **First Name** (required)
   - Type: Text input
   - Label: "First Name *"

2. **Last Name** (required)
   - Type: Text input
   - Label: "Last Name *"

3. **Email** (required)
   - Type: Email input
   - Label: "Email *"

4. **User Type** (required)
   - Type: Dropdown/Select
   - Label: "User Type *"
   - Options: -- Select --, Admin, User, EVP
   - Custom styling with dropdown arrow

5. **Role** (required)
   - Type: Dropdown/Select
   - Label: "Role *"
   - Options: -- Select --, Manager, Supervisor, Staff, Consultant
   - Custom styling with dropdown arrow

**Required Field Indicator**:
- Red asterisk (*) after label
- Color: #e74c3c

**Form Actions**
- Positioned at bottom with top border (1px #e0e0e0)
- Padding-top: 30px
- Display: flex, justify-content: flex-end
- Gap: 12px

**Cancel Button**
- Background: #F0F0F0
- Color: #666
- Icon: ⊗
- Padding: 12px 28px
- Hover: Background #e8e8e8, color #333
- Border: None
- Border-radius: 6px
- Font weight: 500
- On click: Returns to Dashboard

**Create Button**
- Background: #087B36 (DEWA green)
- Color: White
- Icon: ✓
- Padding: 12px 28px
- Hover: Background #065a2a (darker green)
- Border: None
- Border-radius: 6px
- Font weight: 500
- On click: Submits form if validation passes, shows warning popup if not

**Validation Warning Popup**
- Appears when Create button clicked without filling mandatory fields
- Modal overlay with semi-transparent background
- White popup card centered on screen
- Red warning icon (exclamation mark in circle)
- Title: (Not shown, implicit from icon)
- Message: "Please fill all the mandatory fields"
- Action Button:
  - Ok: Red button (#d32f2f), closes popup to allow user to complete form

---

### 4. Law Firm Onboarding Screen

**Purpose**: Form for creating and onboarding new law firms into the system.

**Layout**: Full page with sidebar and header

**Screen Title Section**
- **Title**: "Law Firm Onboarding"
  - Font size: 28px
  - Font weight: 600
- **Breadcrumb**: "Home | Law Firm Onboarding"
  - Font size: 14px
  - Color: #888

**Form Card**

**Card Styling**:
- Background: White
- Padding: 40px
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)

**Form Section Header**
- "Law Firm Information"
- Font size: 18px
- Font weight: 600
- Margin-bottom: 24px

**Form Fields Layout**
- Desktop: 2 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px between fields

**Form Fields**:

1. **Firm Name** (required) - Text input
2. **Registration Number** (required) - Text input
3. **Email** (required) - Email input
4. **Contact Phone** (required) - Text input
5. **Country** (optional) - Text input
6. **City** (optional) - Text input
7. **Address** (optional) - Textarea
8. **Specialization** (required) - Multiple checkboxes
   - Options: Civil, Commercial, Arbitration, Criminal
   - Layout: Single line, all on one row
   - Checkbox-to-text gap: 26px (ensures proper alignment)
   - Text properly aligned vertically with checkboxes

**Input Field Styling**
- Padding: 8px 10px
- Border: 1px solid #ddd
- Border-radius: 4px
- Font size: 12px
- Focus state: Border #087B36, box-shadow with green tint
- Background: #fafafa

**Required Field Indicator**:
- Red asterisk (*) after label
- Color: #e74c3c

**Form Actions**
- Positioned at bottom with top border (1px #e0e0e0)
- Padding-top: 12px
- Display: flex, justify-content: flex-end
- Gap: 12px

**Cancel Button**
- Image: /Cancel Button.png (119px × 40px)
- Display: Custom button image

**Create Button**
- Image: /Create Button.png (119px × 40px)
- Display: Custom button image

**Validation Warning Popup**
- Same as User Onboarding (appears when Create clicked without filling mandatory fields)
- Message: "Please fill all the mandatory fields"

---

### 6. Manage User Screen

**Purpose**: Display and manage user accounts with filtering, search, and action options.

**Layout**: Full page with sidebar and header

**Screen Title Section**
- **Title**: "Edit User List"
  - Font size: 28px
  - Font weight: 600
- **Breadcrumb**: "Home | Edit User List"
  - Font size: 14px
  - Color: #888

**Controls Section**
- **Search Bar**
  - Width: 253px
  - Height: 32px
  - Placeholder: "Search" (HTML5 placeholder attribute)
  - Placeholder Color: #999 with 0.7 opacity
  - Border: 1px solid #ddd
  - Border-radius: 6px
  - Background: White
  - Focus state: Border color #087B36
  - Placeholder disappears when typing, reappears when cleared

- **Type Toggle Buttons**
  - Button 1: "User" (89px × 32px)
    - Font: Dubai, 16px
    - Background: #EBEBEB (inactive)
    - Text Color: #087B36 (inactive)
    - Active: Background #087B36, Text Color #FFFFFF
    - Hover: Opacity 0.9
  - Button 2: "EVP" (89px × 32px)
    - Font: Dubai, 16px
    - Background: #EBEBEB (inactive)
    - Text Color: #087B36 (inactive)
    - Active: Background #087B36, Text Color #FFFFFF
    - Hover: Opacity 0.9

**Users Grid**
- Layout: CSS Grid with auto-fill columns
- Min column width: 280px
- Gap: 20px
- Scrollable area with max-height
- Background: White
- Padding: 20px
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)

**User Card**
- Border: 1px solid #e0e0e0
- Border-radius: 8px
- Padding: 16px
- Hover: Border color #087B36, shadow increase

**Card Content**
- Avatar: 50px circle with initials, colored background
- Name: 14px, #222, font-weight: 600
- Email: 12px, #888
- Status: Active (green #087B36) or Inactive (red #e74c3c)
- Action Buttons: View and Edit

**Action Buttons**
- Button Size: 18px × 18px icon
- Background: Transparent
- Border: None
- Padding: 4px
- Hover: Opacity 0.7
- View Icon: /View Icon.png
- Edit Icon: /Edit Icon.png

**Edit User Details Popup**
- Modal overlay with semi-transparent background
- White popup card with rounded corners (12px)
- Green header bar (#087B36)
- Form fields for editing user details
- Close button (✕) in header

**Popup Action Buttons**
- **Cancel Button**
  - Image: /Cancel Button.png (119px × 40px)
  - Display: Custom button image
  - Background: Light gray (#EBEBEB)
  - Hover: Opacity 0.9
  - Click: Closes popup without saving

- **Update Button**
  - Image: /Update button.png (119px × 40px)
  - Display: Custom button image
  - Background: Green (#087B36)
  - Hover: Opacity 0.9
  - Click: Saves changes and shows success message

**Pagination**
- Background: White
- Padding: 20px
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
- Text: "Total Number of Records: 120"
- Controls: Previous/Next buttons, page numbers, page input

---

### 7. Manage Law Firm Screen

**Purpose**: Display and manage law firm accounts with filtering, search, and action options.

**Layout**: Full page with sidebar and header

**Screen Title Section**
- **Title**: "Edit Law Firm List"
  - Font size: 28px
  - Font weight: 600
- **Breadcrumb**: "Home | Edit Law Firm List"
  - Font size: 14px
  - Color: #888

**Controls Section**
- **Search Bar**
  - Width: 253px
  - Height: 32px
  - Placeholder: "Search" (HTML5 placeholder attribute)
  - Placeholder Color: #999 with 0.7 opacity
  - Border: 1px solid #ddd
  - Border-radius: 6px
  - Background: White
  - Focus state: Border color #087B36
  - Placeholder disappears when typing, reappears when cleared

- **Filter Button**
  - Size: 32px × 32px
  - Background: White
  - Border: 1px solid #ddd
  - Border-radius: 6px
  - Icon: /Filter Icon.png (18px)
  - Hover: Border color #087B36
  - Click: Opens filter popup

**Filter Popup**
- Position: Absolute (top: 40px, right: 0)
- Background: White
- Border: 1px solid #ddd
- Border-radius: 8px
- Padding: 16px
- Width: 280px
- Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
- Z-index: 100

**Filter Popup Fields**
1. **Registration Number Dropdown**
   - Label: "Registration Number"
   - Options: -- All --, REG001, REG002, etc.
   - Padding: 8px 12px
   - Border: 1px solid #ddd
   - Focus: Border color #087B36

2. **Specialization Dropdown**
   - Label: "Specialization"
   - Options: -- All --, Civil, Commercial, Arbitration, Criminal
   - Padding: 8px 12px
   - Border: 1px solid #ddd
   - Focus: Border color #087B36

**Popup Action Buttons**
- **Clear Button**
  - Background: #f0f0f0
  - Color: #666
  - Padding: 8px 14px
  - Border: None
  - Border-radius: 6px
  - Hover: Background #e8e8e8

- **Submit Button**
  - Background: #087B36
  - Color: White
  - Padding: 8px 14px
  - Border: None
  - Border-radius: 6px
  - Hover: Background #065a2a

**Law Firms Grid**
- Layout: CSS Grid with auto-fill columns
- Min column width: 300px
- Gap: 20px
- Scrollable area with max-height
- Background: White
- Padding: 20px
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)

**Law Firm Card**
- Border: 1px solid #e0e0e0
- Border-radius: 8px
- Padding: 16px
- Display: flex, space-between
- Hover: Border color #087B36, shadow increase

**Card Content**
- Name: 14px, #222, font-weight: 600
- Email: 12px, #888
- Action Buttons: Edit and Delete

**Action Buttons**
- Button Size: 18px × 18px icon
- Background: Transparent
- Border: None
- Padding: 4px 8px
- Hover: Opacity 0.7
- Edit Icon: /Edit Icon.png
- Delete Icon: /Delete Icon.png

**Delete Confirmation Popup**
- Modal overlay with semi-transparent background
- White popup card centered on screen
- Red warning icon (✕ in circle)
- Title: "Confirm Delete"
- Message: "Are you sure you want to delete [Firm Name]? This action cannot be undone."
- Action Buttons:
  - Cancel: Gray button, closes popup without action
  - Delete: Red button (#d32f2f), confirms and deletes firm

**Edit Law Firm Popup**
- Modal overlay with semi-transparent background
- White popup card with rounded corners (12px)
- Green header bar (#087B36) with "Edit Law Firm" title
- Form fields for editing law firm details
- Close button (✕) in header
- Specialization checkboxes with proper alignment (26px gap between checkbox and text)
- Action Buttons:
  - Cancel: Gray button, closes popup
  - Update: Green button, saves changes

**Pagination**
- Background: White
- Padding: 20px
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
- Text: "Total Number of Records: 120"
- Controls: Previous/Next buttons, page numbers, page input

---

## Navigation Flow

```
Landing Page
    ↓ (Click "Get Started")
Admin Dashboard (Default: Stats & Charts)
    ↓ (Click "Onboard User" in sidebar)
User Onboarding Form
    ↓ (Click "Cancel")
    ↓ Returns to Dashboard
    ↓ (Click "Logout" in sidebar)
Landing Page
```

---

## Component Hierarchy

```
App
├── Landing Page
│   ├── Logo Section
│   ├── Content Section
│   │   ├── Title
│   │   ├── Description
│   │   ├── Get Started Button
│   │   └── Language Selector
│   └── Gradient Background
│
└── Dashboard
    ├── Sidebar
    │   └── Navigation Items (6 items with tooltips)
    ├── Header
    │   ├── Menu Toggle
    │   ├── Logo
    │   └── User Profile
    ├── Dashboard View
    │   ├── Welcome Section
    │   ├── Stats Grid (4 cards)
    │   └── Charts Grid (2 charts)
    ├── User Onboarding View
    │   ├── Screen Title + Breadcrumb
    │   ├── Create EVP Button
    │   └── Form Card
    │       ├── Form Fields (5 fields)
    │       ├── Validation Warning Popup
    │       └── Action Buttons (Cancel, Create)
    ├── Law Firm Onboarding View
    │   ├── Screen Title + Breadcrumb
    │   └── Form Card
    │       ├── Form Fields (8 fields including specializations)
    │       ├── Validation Warning Popup
    │       └── Action Buttons (Cancel, Create)
    ├── Manage User View
    │   ├── Screen Title + Breadcrumb
    │   ├── Controls (Search, User/EVP Toggle)
    │   ├── User Cards Grid
    │   ├── Edit User Popup
    │   └── Pagination
    └── Manage Law Firm View
        ├── Screen Title + Breadcrumb
        ├── Controls (Search, Filter)
        ├── Law Firm Cards Grid
        ├── Edit Law Firm Popup
        ├── Delete Confirmation Popup
        └── Pagination
```

---

## Interactive Elements

### Buttons
- **Primary CTA**: #087B36 background, white text
- **Secondary**: #F0F0F0 background, dark text
- **Hover**: Darker background, shadow increase
- **Active**: Scale down (0.98)
- **Padding**: 12px 20px to 12px 32px depending on context

### Form Elements
- **Inputs**: Border on focus changes to #087B36
- **Dropdowns**: Custom styled with arrow indicator
- **Required**: Red asterisk indicator

### Tooltips
- Dark background (#333)
- White text
- Positioned to right of icons
- Arrow pointing left
- Fade in on hover
- No pointer events while hovering

### Cards
- White background
- 12px border-radius
- Subtle shadow
- Hover: Enhanced shadow, slight lift
- Padding: 24px - 40px

---

## Accessibility

- All interactive elements have proper contrast ratios
- Required field indicators clearly marked with red asterisk
- Form labels associated with inputs
- Keyboard navigation supported
- Focus states clearly visible
- Error states clearly indicated

---

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|-----------|-------|---------|
| Desktop | > 1200px | Full multi-column layouts |
| Tablet | 768px - 1200px | 2-column grids, adjusted font sizes |
| Mobile | < 768px | Single column, stacked buttons, simplified navigation |

---

## Future Enhancements

- Error/Success toast notifications
- Loading states for charts
- Dark mode theme
- Internationalization (i18n) for Arabic/English
- Advanced filtering and sorting options
- Bulk operations on user/law firm records
- Custom date range selectors
- Export/Import functionality

## Recently Completed Features

✅ User and Law Firm Onboarding with validation warnings
✅ Manage User screen with edit popup and User/EVP toggles
✅ Manage Law Firm screen with edit and delete functionality
✅ Delete confirmation popups
✅ Custom button styling with images
✅ Proper HTML5 placeholder support in search boxes
✅ Improved form field alignment (specialization checkboxes)
✅ Button label styling with Dubai font
