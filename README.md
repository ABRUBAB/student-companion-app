# 📚 Student Companion App

> **Your AI-Powered Academic Excellence Partner**

A comprehensive mobile application designed for university students to manage their academic journey, track GPA, leverage AI assistance, and plan their future career paths with confidence.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Web-lightgrey.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg)
![Expo](https://img.shields.io/badge/Expo-54-000020.svg)

---

## ✨ Features

### 📋 Task & Assignment Management
- **Comprehensive Task Tracking** - Organize assignments, projects, and presentations
- **Priority-Based Filtering** - Sort tasks by priority (High, Medium, Low) and due dates
- **Smart Due Date Tracking** - Visual countdown timers and overdue alerts
- **Subject Color Coding** - Distinguish tasks by subject with custom color indicators
- **Quick Add Modal** - Rapidly add new tasks with essential details

### 📊 GPA Calculator & Planning
- **SGPA & CGPA Tracking** - Real-time calculation of semester and cumulative GPA
- **Grade Management** - Add, edit, and track grades across multiple semesters
- **Future GPA Planner** - Set target CGPA and calculate required grades
- **Grade Distribution Insights** - Visual breakdown of academic performance
- **Credit-Based Calculation** - Accurate GPA computation based on course credits

### 🤖 AI Chat Assistant
- **Gemini AI Integration** - Powered by Google's advanced language model
- **Context-Aware Responses** - AI understands your tasks, grades, and goals
- **Real-Time Messaging** - Instant responses to academic and career questions
- **Typing Indicators** - Visual feedback during AI processing
- **Message History** - Persistent chat conversations for reference

### 🗺️ Career Roadmap Planning
- **Dual Path Selection** - Choose between domestic career or international studies
- **Milestone Tracking** - Clear timeline of goals and achievements
- **Progress Visualization** - Monitor your journey with progress indicators
- **Domestic Path** - Internship, job placement, and career growth milestones
- **Study Abroad Path** - Language tests, applications, visa preparation

### ✈️ Study Abroad Checklist
- **Document Tracking** - Passport, transcripts, recommendation letters
- **Category Organization** - Documents, applications, financial, health requirements
- **Timeline Management** - Important dates and deadlines for each requirement
- **Completion Status** - Visual checkmarks for completed items
- **Resource Links** - Quick access to helpful resources and guides

### 🧠 Mind Map for Context Management
- **Visual Knowledge Organization** - Prevent AI hallucination with structured context
- **Node-Based Architecture** - Create and manage interconnected concepts
- **Category Tagging** - Organize nodes by task, GPA, career, or custom types
- **Expandable Structure** - Drill down into details or see the big picture
- **AI Integration** - Feed mind map context to AI for better responses

### 🎨 Aesthetic Design
- **Modern UI/UX** - Professional gradient-based design with smooth transitions
- **Dark & Light Modes** - Automatic theme switching based on device settings
- **Haptic Feedback** - Tactile responses for all interactions
- **Smooth Animations** - Polished transitions and micro-interactions
- **Responsive Layout** - Optimized for portrait mobile viewing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode (for native testing)
- Gemini API Key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/ABRUBAB/student-companion-app.git
cd student-companion-app

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Running on Device

**Android:**
```bash
pnpm android
```

**iOS:**
```bash
pnpm ios
```

**Web:**
```bash
pnpm dev:metro
```

### Scanning QR Code
Use Expo Go app on your phone to scan the QR code displayed in the terminal.

---

## 🔑 Configuration

### Setting Up Gemini API

1. **Get Your API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your clipboard

2. **Configure in App**
   - Open the app and navigate to Chat screen
   - Enter your Gemini API key in the settings
   - The key is securely stored using Expo SecureStore

3. **Environment Variables**
   - Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Customizing Theme

Edit `theme.config.js` to customize colors:

```javascript
const themeColors = {
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },
  secondary: { light: '#6366f1', dark: '#818cf8' },
  // ... more colors
};
```

---

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Tab navigation configuration
│   ├── index.tsx            # Home/Dashboard screen
│   ├── tasks.tsx            # Task management screen
│   ├── gpa.tsx              # GPA calculator screen
│   ├── chat.tsx             # AI chat screen
│   └── roadmap.tsx          # Career roadmap screen
├── oauth/                   # OAuth callbacks
└── _layout.tsx              # Root layout with providers

components/
├── screen-container.tsx     # SafeArea wrapper component
├── haptic-tab.tsx          # Tab bar with haptics
└── ui/
    └── icon-symbol.tsx     # Icon mapping component

lib/
├── utils.ts                # Utility functions
├── trpc.ts                 # API client
└── _core/
    ├── theme.ts            # Theme palette builder
    └── nativewind-pressable.ts

hooks/
├── use-colors.ts           # Theme colors hook
├── use-color-scheme.ts     # Dark/light mode detection
└── use-auth.ts             # Authentication hook

constants/
└── theme.ts                # Theme exports
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo SDK 54** | Managed development environment |
| **TypeScript** | Type-safe development |
| **NativeWind** | Tailwind CSS for React Native |
| **Expo Router** | File-based routing |
| **React Query** | Server state management |
| **AsyncStorage** | Local data persistence |
| **Expo SecureStore** | Secure credential storage |
| **Google Gemini API** | AI chat integration |

---

## 📚 Core Features Explained

### Task Management System
Tasks are stored in AsyncStorage and automatically persist. Each task includes:
- Title and description
- Subject with color coding
- Due date with countdown calculation
- Priority level (High/Medium/Low)
- Completion status toggle

**Subject Color Mapping:**
- Math: Blue (#3b82f6)
- Physics: Purple (#8b5cf6)
- Chemistry: Pink (#ec4899)
- English: Teal (#14b8a6)
- History: Amber (#f59e0b)
- Computer Science: Cyan (#06b6d4)

### GPA Calculation Engine
The app uses credit-weighted GPA calculation:

```
SGPA = (Σ(Grade × Credits)) / (Σ Credits)
CGPA = (Σ(All Grades × Credits)) / (Σ All Credits)
```

Grades are stored per semester, allowing accurate CGPA tracking across multiple semesters.

### AI Chat Context
The AI assistant has access to:
- Current task list and deadlines
- GPA and academic performance
- Career roadmap selections
- Mind map knowledge base
- Historical chat context

This enables intelligent, context-aware responses for academic guidance.

### Career Roadmap Paths

**Domestic Path Milestones:**
1. Complete current semester
2. Prepare for internship
3. Secure job offer
4. Start first job

**Study Abroad Path Milestones:**
1. Maintain high CGPA (3.8+)
2. Take IELTS/TOEFL
3. Prepare GRE/GMAT
4. Apply to universities
5. Get admission & visa

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
- Primary Blue: `#0a7ea4` - Main actions and headers
- Secondary Indigo: `#6366f1` - Accents and secondary actions
- Tertiary Pink: `#ec4899` - Important highlights

**Semantic Colors:**
- Success Green: `#22c55e` - Completed tasks, good grades
- Warning Amber: `#f59e0b` - Upcoming deadlines, average grades
- Error Red: `#ef4444` - Overdue tasks, low grades
- Info Blue: `#3b82f6` - Information and tips

### Typography

- **Headers**: Bold, 24-28px
- **Subheaders**: Semibold, 18-20px
- **Body**: Regular, 14-16px
- **Labels**: Medium, 12-14px
- **Captions**: Regular, 12px

### Spacing System
- Base unit: 16px
- Consistent padding throughout
- Proper gap spacing for components

---

## 🔐 Security & Privacy

- **API Keys**: Stored securely using Expo SecureStore
- **Local Storage**: All data stored locally on device
- **No Cloud Sync**: Optional server integration available
- **Data Privacy**: No personal data sent to external services
- **HTTPS Only**: All API communications encrypted

---

## 📊 Development Roadmap

### Phase 1: ✅ Core Foundation
- [x] Project setup and scaffolding
- [x] Theme and design system
- [x] Navigation structure
- [x] App icon and branding

### Phase 2: ✅ Main Features
- [x] Task management
- [x] GPA calculator
- [x] Chat interface
- [x] Career roadmap

### Phase 3: 🔄 AI Integration
- [ ] Gemini API setup
- [ ] Context-aware responses
- [ ] Mind map integration
- [ ] Message history persistence

### Phase 4: 🔄 Polish & Optimization
- [ ] Animations and transitions
- [ ] Performance optimization
- [ ] Data persistence
- [ ] Error handling

### Phase 5: 🔄 Advanced Features
- [ ] Push notifications
- [ ] Study abroad resources
- [ ] GPA prediction
- [ ] Study schedule planner

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind classes for styling
- Maintain component modularity
- Add proper error handling
- Test on both Android and iOS

---

## 🐛 Troubleshooting

### App Won't Start
```bash
# Clear cache and reinstall
pnpm install
pnpm dev
```

### Gemini API Not Working
- Verify API key is correct
- Check internet connection
- Ensure API is enabled in Google Cloud Console
- Review API usage limits

### Performance Issues
- Clear app cache
- Restart development server
- Check device storage space
- Review task list size

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**ABRUBAB**
- GitHub: [@ABRUBAB](https://github.com/ABRUBAB)
- Project: Student Companion App

---

## 🙏 Acknowledgments

- **Expo** - For the amazing development framework
- **Google Gemini** - For AI capabilities
- **React Native** - For cross-platform development
- **NativeWind** - For Tailwind CSS support
- **Community** - For feedback and contributions

---

## 📞 Support

For issues, questions, or suggestions:
1. Open an issue on GitHub
2. Check existing documentation
3. Review troubleshooting section
4. Contact the development team

---

## 🎯 Vision

Student Companion App aims to revolutionize how university students manage their academic life. By combining task management, GPA tracking, AI assistance, and career planning in one intuitive platform, we empower students to achieve their academic and professional goals with confidence.

**Built with ❤️ for students, by developers who understand the academic journey.**

---

<div align="center">

### ⭐ If you find this project helpful, please consider giving it a star!

[GitHub](https://github.com/ABRUBAB/student-companion-app) • [Issues](https://github.com/ABRUBAB/student-companion-app/issues) • [Discussions](https://github.com/ABRUBAB/student-companion-app/discussions)

</div>
