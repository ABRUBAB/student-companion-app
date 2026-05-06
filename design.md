# Student Companion App - Design Plan

## App Overview
A comprehensive mobile app for university students to manage academic life, track GPA, leverage AI assistance, and plan their future career paths (domestic or abroad).

## Screen List

1. **Onboarding Screen** - Initial setup with API key configuration
2. **Dashboard/Home** - Quick overview of tasks, GPA, upcoming deadlines
3. **Tasks & Assignments** - Manage assignments, projects, presentations with due dates
4. **GPA Calculator** - View SGPA/CGPA, calculate future GPA targets
5. **AI Chat** - Chat interface with GPT/Gemini with app context awareness
6. **Mind Map** - Visual mind map for AI context and memory management
7. **Career Roadmap** - Path selection (domestic/abroad) and future planning
8. **Study Abroad Checklist** - Documents, requirements, timeline for going abroad
9. **Profile & Settings** - User preferences, API key management, theme settings

## Primary Content and Functionality

### Dashboard/Home Screen
- **Quick Stats Card**: Current SGPA, CGPA, target GPA
- **Upcoming Tasks**: Next 5 assignments with due dates
- **AI Suggestion**: Quick tip from AI based on current workload
- **Navigation Cards**: Quick access to main features (Tasks, GPA, Chat, Roadmap)
- **Color Scheme**: Gradient background (primary to secondary), white cards with subtle shadows

### Tasks & Assignments Screen
- **List View**: Assignments grouped by subject/due date
- **Card Design**: Title, subject, due date, priority badge, completion status
- **Add Button**: Floating action button for new assignment
- **Filters**: By subject, priority, due date, completion status
- **Each Task Card**: Shows subject color indicator, due date countdown, priority level
- **Color Palette**: Primary color for overdue, warning for due soon, success for completed

### GPA Calculator Screen
- **Current Stats Section**: Display SGPA, CGPA in large, readable format
- **Grade Input Form**: Subject name, credits, grade selection
- **Calculation Display**: Real-time SGPA/CGPA calculation
- **Future Planner**: Input target CGPA and see required grades
- **Grade Distribution Chart**: Visual breakdown of grades across subjects
- **Color Coding**: Green for good grades, yellow for average, red for low

### AI Chat Screen
- **Chat Interface**: Message bubbles (user on right, AI on left)
- **Context Indicator**: Show active context (tasks, GPA, roadmap)
- **Mind Map Toggle**: Quick access to mind map view
- **Input Field**: Text input with send button
- **Typing Indicator**: Show when AI is thinking
- **Color Scheme**: Primary color for user messages, muted for AI responses

### Mind Map Screen
- **Visual Mind Map**: Central node with branches for different topics
- **Node Types**: Task nodes, GPA nodes, Career nodes, Custom nodes
- **Interactive**: Tap to expand/collapse branches
- **Add Node**: Button to add new mind map entries
- **Color Coding**: Different colors for different node types

### Career Roadmap Screen
- **Path Selection**: Toggle between "Stay in Country" and "Go Abroad"
- **Timeline View**: Milestones and checkpoints for chosen path
- **Action Items**: Specific tasks for each milestone
- **Progress Indicator**: Visual progress through roadmap
- **Color Scheme**: Primary for current milestone, muted for future, success for completed

### Study Abroad Checklist Screen
- **Document Checklist**: Passport, visa, IELTS/TOEFL, etc.
- **Timeline**: Important dates and deadlines
- **Resources**: Links to helpful resources
- **Progress Bar**: Overall completion percentage
- **Color Coding**: Red for urgent, yellow for upcoming, green for completed

## Key User Flows

### Flow 1: Setup & API Configuration
1. User launches app → Onboarding screen
2. User enters Gemini/GPT API key
3. User sets academic info (current CGPA, target CGPA, semester)
4. Redirects to Dashboard

### Flow 2: Add Assignment
1. User taps "+" on Dashboard or Tasks screen
2. Assignment form opens (subject, title, due date, priority)
3. User saves → Assignment appears in list
4. AI gets notified of new task

### Flow 3: Check GPA & Plan Future
1. User navigates to GPA Calculator
2. Views current SGPA/CGPA
3. Enters target CGPA
4. App calculates required grades
5. User can adjust and see impact

### Flow 4: Chat with AI
1. User opens Chat screen
2. AI shows current context (tasks, GPA, roadmap)
3. User asks question (e.g., "What should I focus on?")
4. AI responds with context-aware advice
5. Mind map updates with key points

### Flow 5: Plan Career Path
1. User selects "Go Abroad" or "Stay in Country"
2. Views personalized roadmap
3. Completes milestones
4. For abroad: accesses study abroad checklist

## Color Choices

### Primary Brand Colors
- **Primary**: `#0a7ea4` (Professional Blue) - Main actions, headers, highlights
- **Secondary**: `#6366f1` (Indigo) - Accents, secondary actions
- **Tertiary**: `#ec4899` (Pink) - Highlights, important alerts

### Semantic Colors
- **Success**: `#22c55e` (Green) - Completed tasks, good grades
- **Warning**: `#f59e0b` (Amber) - Upcoming deadlines, average grades
- **Error**: `#ef4444` (Red) - Overdue tasks, low grades
- **Info**: `#3b82f6` (Blue) - Information, tips

### Background & Surface
- **Background**: `#ffffff` (Light), `#0f172a` (Dark)
- **Surface**: `#f8fafc` (Light), `#1e293b` (Dark)
- **Border**: `#e2e8f0` (Light), `#334155` (Dark)

### Subject Color Indicators
- **Math/Science**: `#3b82f6` (Blue)
- **Humanities**: `#8b5cf6` (Purple)
- **Languages**: `#ec4899` (Pink)
- **Engineering**: `#f59e0b` (Amber)
- **Arts**: `#14b8a6` (Teal)

## Animation Guidelines

### Subtle & Professional
- **Screen Transitions**: Fade in (200ms) with slight slide (50px)
- **Button Press**: Scale down to 0.95 (80ms) with haptic feedback
- **Card Appearance**: Stagger animation for list items (50ms delay between each)
- **Loading States**: Pulse animation for loading indicators
- **Success Feedback**: Brief scale-up animation (200ms) with success haptic

### Interaction Feedback
- **Tap Feedback**: Opacity change (0.7) on press
- **Swipe Actions**: Smooth slide-out for delete/archive
- **Expandable Sections**: Smooth height animation (250ms)
- **Mind Map Nodes**: Gentle scale animation on tap

### Avoid
- Bouncy springs (too playful for academic app)
- Long animations (>400ms for interactions)
- Excessive motion (can distract from content)

## Typography

- **Headers**: Bold, 24-28px, primary color
- **Subheaders**: Semibold, 18-20px, foreground
- **Body**: Regular, 14-16px, foreground
- **Labels**: Medium, 12-14px, muted
- **Captions**: Regular, 12px, muted

## Layout Principles

### Mobile-First (9:16 Portrait)
- **Top Navigation**: Minimal, only essential info
- **Bottom Tab Bar**: 5 main sections (Home, Tasks, GPA, Chat, Roadmap)
- **Safe Areas**: Respect notch and home indicator
- **Spacing**: 16px base unit, consistent padding throughout
- **Cards**: Full width minus 16px margins, rounded corners (12-16px)

### One-Handed Usage
- **Action Buttons**: Positioned in bottom half of screen
- **Swipe Gestures**: Left/right for navigation, up for details
- **Thumb-Friendly**: Main content in center, secondary in corners
- **Tap Targets**: Minimum 44x44pt for interactive elements
