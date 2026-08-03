# 🎓 Examify — BCA Success Hub

**One Platform. All Study Materials. Pass Together.**

A BCA (Bachelor of Computer Applications) academic resource platform covering all 6 semesters — notes, question papers, AI-powered doubt solving, and a "night-before-exam" prep system.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Branch Strategy](#-branch-strategy)
- [Branch Guides](#-branch-guides)
  - [auth Branch](#1-auth-branch)
  - [frontend Branch](#2-frontend-branch)
  - [backend Branch](#3-backend-branch)
  - [ui-design Branch](#4-ui-design-branch)
- [Workflow Rules](#-workflow-rules)
- [Pull Request Guide](#-pull-request-guide)

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | React framework with SSR/SSG |
| **React 18** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first CSS styling |
| **Git + GitHub** | Version control & collaboration |

---

## 📁 Project Structure

```
Night-Saviour/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main entry point (Landing + Dashboard)
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   └── globals.css               # Global styles & design tokens
│
├── components/                   # All React components
│   ├── Navbar.tsx                # Public Shell (marketing landing page nav)
│   ├── AppNavbar.tsx             # App Shell (authenticated dashboard nav)
│   ├── Footer.tsx                # Public marketing footer
│   ├── AppFooter.tsx             # Authenticated dashboard footer
│   ├── HeroSection.tsx           # Landing page hero banner
│   ├── TrustStrip.tsx            # Trust metrics strip
│   ├── HowItWorks.tsx            # How It Works section
│   ├── AboutSection.tsx          # About Us section
│   ├── FinalCTA.tsx              # Final call-to-action section
│   ├── AuthModal.tsx             # USN + DOB login modal (multi-step)
│   ├── SemesterPortal.tsx        # Main dashboard (3 horizontal rows)
│   ├── ExamSprintModal.tsx       # Rapid Fire Quiz sprint
│   ├── ExamAiModal.tsx           # Exam AI assistant
│   ├── AssignmentHubModal.tsx    # Assignment generator with citations
│   ├── LabVivaViewerModal.tsx    # Lab code & viva Q&A viewer
│   ├── NotesViewerModal.tsx      # Verified notes reader
│   ├── UserProfileModal.tsx      # Student profile & settings
│   ├── AdminDashboardModal.tsx   # Admin analytics panel
│   └── CommunityForumModal.tsx   # Student Q&A discussion board
│
├── src/
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication state & session management
│   └── data/
│       └── bcaData.ts             # Semester data structures (subjects, notes, etc.)
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **Git** installed and configured

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/hizor636/Examify.git
cd Examify

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# → http://localhost:3000
```

### Useful Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server (http://localhost:3000) |
| `npm run build` | Production build (check for errors before pushing) |
| `npm run lint` | Run linter to catch code issues |

---

## 🌿 Branch Strategy

> ⚠️ **RULE: Never commit directly to `main`.** All changes go through feature branches and Pull Requests.

| Branch | Owner/Team | Responsibility |
|---|---|---|
| `main` | **Protected** | Production code — merge-only via PRs |
| `auth` | Auth Team | Firebase Authentication, Login, Register, Forgot Password |
| `frontend` | Frontend Team | Landing Page, Dashboard layout, Navigation components |
| `backend` | Backend Team | Firestore database, API logic, data models |
| `ui-design` | UI/UX Team | Styling, component design, responsive layouts, animations |

---

## 📖 Branch Guides

### 1. `auth` Branch

**Responsibility:** Firebase Authentication, Login, Register, Forgot Password

**Key files you'll work on:**
- `src/context/AuthContext.tsx` — Auth state, login/logout logic, session management
- `components/AuthModal.tsx` — Login UI (USN + DOB verification, password setup)
- `components/UserProfileModal.tsx` — Student profile & account settings

**Your workflow:**
```bash
# Switch to your branch
git checkout auth

# Pull latest changes from main
git pull origin main

# Make your changes (e.g., integrate Firebase Auth)
# ...

# Stage, commit, and push
git add .
git commit -m "feat(auth): integrate Firebase email/password authentication"
git push origin auth

# Then open a Pull Request on GitHub to merge into main
```

**Current auth flow (to understand before changing):**
1. Student enters USN + Date of Birth → verification step
2. Student sets a password/PIN → account creation step
3. Successful auth → auto-redirect to Dashboard

**What to implement next:**
- [ ] Replace mock verification with Firebase Auth (email/password or custom tokens)
- [ ] Add "Forgot Password" flow
- [ ] Add email OTP verification (optional)
- [ ] Persist sessions with Firebase (replace localStorage)

---

### 2. `frontend` Branch

**Responsibility:** Landing Page, Dashboard layout, Navigation components

**Key files you'll work on:**
- `app/page.tsx` — Main page orchestration (Landing vs Dashboard views)
- `components/Navbar.tsx` — Public landing page navigation (marketing links)
- `components/AppNavbar.tsx` — Authenticated dashboard navigation (profile + community)
- `components/HeroSection.tsx` — Landing page hero banner
- `components/SemesterPortal.tsx` — Dashboard with 3 horizontal content rows
- `components/Footer.tsx` / `components/AppFooter.tsx` — Footers

**Important architecture to understand:**

The app uses **two separate navigation shells**:

| Shell | Component | Used where |
|---|---|---|
| Public Shell | `Navbar.tsx` + `Footer.tsx` | Landing page (pre-login visitors) |
| App Shell | `AppNavbar.tsx` + `AppFooter.tsx` | Dashboard (logged-in students) |

> ⚠️ These must stay completely separate. Marketing links should never appear in the dashboard, and profile/community links should never appear on the landing page.

**Single-Semester Access Policy:** Students can only see content for their own semester. There is no semester switcher UI — the dashboard auto-loads `user.semester`.

**Your workflow:**
```bash
git checkout frontend
git pull origin main

# Make your changes
git add .
git commit -m "feat(frontend): redesign hero section with animated stats"
git push origin frontend

# Open a Pull Request on GitHub
```

---

### 3. `backend` Branch

**Responsibility:** Firestore database, API logic, data models

**Key files you'll work on:**
- `src/data/bcaData.ts` — Semester data structures (subjects, notes, PYQs, labs, quizzes)
- `src/context/AuthContext.tsx` — User data model and state management
- Future: API routes in `app/api/` directory

**Current data model (in `bcaData.ts`):**

```typescript
// Each semester has this structure:
{
  title: string;           // "Semester 4 — Web & Security Systems"
  subjects: Subject[];     // Array of subjects with code, name, icon, description
  notes: NoteItem[];       // Verified lecture notes
  pyqs: PYQItem[];         // Previous year question papers
  labs: LabProgramItem[];  // Lab programs with code & viva Q&A
  assignments: Assignment[];
  importantQuestions: ImportantQuestion[];
  quizzes: QuizItem[];     // MCQ questions for Rapid Fire Sprint
}
```

**What to implement next:**
- [ ] Set up Firebase Firestore and replace hardcoded data
- [ ] Create data models/schemas for subjects, notes, PYQs
- [ ] Build API routes for CRUD operations
- [ ] Implement file upload for notes/papers (Firebase Storage)
- [ ] Connect Readiness Score to real completion data

**Your workflow:**
```bash
git checkout backend
git pull origin main

# Make your changes
git add .
git commit -m "feat(backend): set up Firestore collections for semester data"
git push origin backend

# Open a Pull Request on GitHub
```

---

### 4. `ui-design` Branch

**Responsibility:** Styling, component design, responsive layouts, animations

**Key files you'll work on:**
- `app/globals.css` — Global styles, CSS variables, animations, design tokens
- `tailwind.config.ts` — Tailwind theme customization (colors, fonts, etc.)
- Any component file for visual/styling improvements

**Design system basics:**
- **Primary color:** `brand-orange` (defined in Tailwind config)
- **Typography:** System fonts via Tailwind defaults
- **Icons:** Google Material Symbols Outlined (loaded via CDN in `layout.tsx`)
- **Dark sections:** `bg-slate-900` with `border-slate-800`
- **Cards:** `rounded-3xl` with `border border-slate-200 shadow-sm`
- **Buttons:** `rounded-xl` with `text-xs font-bold`

**Key CSS classes to know:**
```css
.btn-primary-glow    /* Orange button with glow effect */
.animate-fade-in     /* Fade-in animation for modals/menus */
.no-scrollbar        /* Hides scrollbar on horizontal scroll rows */
```

**What to improve next:**
- [ ] Add micro-animations for card hover states
- [ ] Improve mobile responsiveness for all modals
- [ ] Add gradient fade masks on horizontal scroll row edges
- [ ] Dark mode support (optional)
- [ ] Loading skeleton states

**Your workflow:**
```bash
git checkout ui-design
git pull origin main

# Make your changes
git add .
git commit -m "feat(ui): add hover animations to subject cards"
git push origin ui-design

# Open a Pull Request on GitHub
```

---

## 📏 Workflow Rules

### The Golden Rules

1. **Never commit directly to `main`** — all changes go through Pull Requests
2. **Always pull latest `main` before starting work** — avoids merge conflicts
3. **Work only on your assigned branch** — keeps responsibilities clean
4. **Run `npm run build` before pushing** — make sure your code compiles
5. **Write clear commit messages** — follow the format below

### Commit Message Format

```
type(scope): short description

# Examples:
feat(auth): add Firebase email authentication
fix(frontend): fix mobile nav menu not closing
style(ui): update card hover animations
docs: update README with setup instructions
refactor(backend): restructure Firestore data models
```

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `style` | Styling/CSS changes (no logic change) |
| `refactor` | Code restructuring (no behavior change) |
| `docs` | Documentation only |
| `chore` | Build config, dependencies, tooling |

---

## 🔀 Pull Request Guide

### How to Create a Pull Request

1. Push your branch to GitHub:
   ```bash
   git push origin your-branch-name
   ```

2. Go to [github.com/hizor636/Examify](https://github.com/hizor636/Examify)

3. Click **"Compare & pull request"** (GitHub will prompt you)

4. Fill in the PR description:
   - **What changed** — brief summary of your work
   - **How to test** — steps to verify your changes
   - **Screenshots** — if you changed any UI

5. Request a review from a teammate

6. Once approved, **merge into `main`**

### Before Opening a PR

- [ ] `npm run build` passes with no errors
- [ ] Your branch is up to date with `main` (`git pull origin main`)
- [ ] Commit messages are clear and descriptive
- [ ] No console errors in the browser

---

## 📞 Quick Reference

| Need to... | Command |
|---|---|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Switch branch | `git checkout branch-name` |
| Pull latest main | `git pull origin main` |
| Push your work | `git push origin branch-name` |
| See all branches | `git branch -a` |
| Check current branch | `git branch` |

---

**Built with ❤️ by Team Night Saviour for BCA students everywhere.**
