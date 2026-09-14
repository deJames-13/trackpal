# AGENTS.md — TrackPal Monorepo Architecture Guide

Welcome to the **TrackPal** codebase. This document serves as the authoritative operational manual and structural reference for AI coding agents and engineering contributors working across both the **Web Frontend** (`/web`) and **Server Backend** (`/server`).

---

## 1. Monorepo Overview

TrackPal (also referred to as Schedly) is a modern, transparent **Rotating Savings and Credit Association (ROSCA / Paluwagan)** platform. It enables trusted social circles to pool funds, automate payout rotations (*sahod*), record contributions (*hulog*), verify digital receipts (GCash/Maya/Bank), and maintain verifiable peer trust scores.

```
trackpal/
├── web/                     # Frontend: Vite + React 19 + TanStack Start (SSR) + TanStack Router
├── server/                  # Backend: Laravel 13 + PHP 8.3 REST API & Authentication Engine
├── .draft/                  # Standalone pure React prototype reference
├── .gitignore               # Root git exclusions for monorepo
├── AGENTS.md                # This operational architecture guide
└── README.md                # Project showcase, setup instructions & product roadmap
```

---

## 2. Frontend Architecture (`/web`)

The frontend is built with **Vite**, **React 19**, **TanStack Start** (SSR/Nitro server), **TanStack Router** (file-based routing), **Tailwind CSS**, **Lucide Icons**, and **Motion** (Framer Motion).

### 2.1 Directory Structure & SRP Vertical Slices

Code is organized strictly into domain-driven vertical slices. Every file must adhere to the **Single Responsibility Principle (SRP)**:

```
web/src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx               # Responsive application wrapper (desktop sidebar + mobile top nav)
│   │   ├── FluentSidebar.tsx          # Collapsible desktop/mobile drawer navigation
│   │   └── FluentTopNav.tsx           # Header bar with user profile switcher, search, and theme toggle
│   └── ui/
│       ├── CoinIcon.tsx               # Custom TrackPal coin SVG icon
│       ├── EmptyState.tsx             # Standard empty state with icon, title, description, and CTA
│       ├── LoadingSkeleton.tsx        # Pulse skeleton loader for cards and table rows
│       └── TrustScoreBadge.tsx        # Visual trust score rating component (5.0, 4.9, etc.)
├── context/
│   ├── CalendarContext.tsx            # Calendar events & schedule state
│   ├── GroupsContext.tsx              # Paluwagan circles, contributions & rotation state
│   ├── ModalContext.tsx               # Global modal state dispatcher
│   ├── SocialContext.tsx              # Peer network, trust scores & friend directory
│   └── ThemeContext.tsx               # SSR-safe dark/light mode controller with localStorage persistence
├── features/
│   ├── auth/
│   │   ├── AuthContext.tsx            # Auth adapter (instant demo switcher + Better-Auth hook points)
│   │   └── AuthModal.tsx              # Modal for login, registration & quick persona switching
│   ├── calendar/
│   │   └── CalendarTab.tsx            # Interactive calendar grid with side inspector for payouts/hulog
│   ├── groups/
│   │   ├── ContributionModal.tsx      # Payment submission modal (GCash, Maya, BDO, receipt upload)
│   │   ├── GroupDetailTab.tsx         # Circle detail view: rotation order, cycle roster, rules
│   │   ├── GroupsListTab.tsx          # Circles directory: active & completed savings groups
│   │   ├── NewGroupModal.tsx          # Modal for creating a new Paluwagan circle
│   │   └── OverviewTab.tsx            # Main dashboard: Sunflower Sahod hero, balances, bento switcher
│   ├── landing/
│   │   └── GuestLanding.tsx           # Public landing page with hero, bento value props, and FAQ
│   ├── onboarding/
│   │   └── OnboardingModal.tsx        # Motion-animated 3-step carousel for new users
│   ├── settings/
│   │   └── SettingsTab.tsx            # Theme settings, user preferences & API schema viewer
│   └── social/
│       └── SocialTab.tsx              # Friends list, trust ratings, and invitation modal
├── lib/
│   ├── auth-client.ts                 # Better-Auth client configuration
│   ├── auth.ts                        # Better-Auth server configuration
│   └── mockData.ts                    # Canonical seed data for groups, members, calendar, and friends
├── routes/
│   ├── __root.tsx                     # Root document layout with meta, providers & global styles
│   ├── index.tsx                      # Public landing route (/)
│   ├── _app.tsx                       # Pathless layout wrapping authenticated dashboard shell
│   ├── _app/
│   │   ├── overview.tsx               # /overview — Dashboard overview
│   │   ├── groups/
│   │   │   ├── index.tsx              # /groups — Paluwagan groups list
│   │   │   └── $groupId.tsx           # /groups/$groupId — Group rotation & payment roster
│   │   ├── calendar.tsx               # /calendar — Financial events calendar
│   │   ├── friends.tsx                # /friends — Social network & trust scores
│   │   └── settings.tsx               # /settings — User settings & API docs
│   └── api/auth/
│       └── $.ts                       # Catch-all API handler for Better-Auth endpoints
├── styles.css                         # Swiss design tokens, --sunflower CSS variables, custom scrollbars
├── types/
│   └── index.ts                       # Domain TypeScript interfaces and union types
├── router.tsx                         # TanStack Router instance creation
├── routeTree.gen.ts                   # Generated route manifest (via pnpm run generate-routes)
└── server.ts                          # Nitro server entrypoint for TanStack Start SSR
```

---

### 2.2 File-Based Routing Guide

TanStack Router handles routing using the file system under `src/routes/`:

| Route Path | File Location | Access | Layout | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/routes/index.tsx` | Public | Root | Public marketing landing page & onboarding entry |
| `_app` | `src/routes/_app.tsx` | App | Root | Pathless layout rendering `<AppShell>` and modals |
| `/overview` | `src/routes/_app/overview.tsx` | App | `_app` | Primary dashboard with next payout hero & metrics |
| `/groups` | `src/routes/_app/groups/index.tsx` | App | `_app` | List of all active/completed savings circles |
| `/groups/$groupId` | `src/routes/_app/groups/$groupId.tsx` | App | `_app` | Circle detail: payout turns, roster, and status toggles |
| `/calendar` | `src/routes/_app/calendar.tsx` | App | `_app` | Monthly calendar of payout dates and contribution deadlines |
| `/friends` | `src/routes/_app/friends.tsx` | App | `_app` | Peer network, trust scores, and invitation dispatch |
| `/settings` | `src/routes/_app/settings.tsx` | App | `_app` | Appearance preferences and REST API schema inspection |
| `/api/auth/*` | `src/routes/api/auth/$.ts` | API | None | Better-Auth authentication endpoints |

> [!IMPORTANT]
> Whenever you add, rename, or delete files in `src/routes/`, always execute:
> ```bash
> pnpm run generate-routes
> ```
> In TanStack Router, `_app` is a **pathless layout prefix**. Its child routes omit `_app` from the URL path (e.g., `_app/overview.tsx` maps to `/overview`).

---

### 2.3 Contexts & Reactive State Layer

The frontend decouples UI presentation from data persistence via dedicated React Contexts in `src/context/`:

#### 1. `GroupsContext` (`src/context/GroupsContext.tsx`)
- **State**: `groups: PaluwaganGroup[]`, `selectedGroupId: string`, `searchQuery: string`.
- **Computed**: `displayedGroups` (filtered by search query), `selectedGroup` (active group object).
- **Actions**:
  - `addGroup(group: Omit<PaluwaganGroup, 'id'>)`: Creates a new savings circle.
  - `togglePaidStatus(groupId: string, memberId: string)`: Marks a member's turn as paid.
  - `submitContribution(groupId: string, paymentMethod: string, referenceNumber: string, receiptProof?: string)`: Submits contribution proof.
  - `inviteMember(groupId: string, email: string)`: Adds a pending member.

#### 2. `CalendarContext` (`src/context/CalendarContext.tsx`)
- **State**: `events: CalendarEvent[]`, `selectedDate: string`.
- **Actions**: `addEvent(event: Omit<CalendarEvent, 'id'>)`.

#### 3. `SocialContext` (`src/context/SocialContext.tsx`)
- **State**: `friends: Friend[]`, `searchQuery: string`.
- **Computed**: `displayedFriends` (filtered by name, email, or handle).
- **Actions**: `sendInvite(email: string, role?: string)`.

#### 4. `ModalContext` (`src/context/ModalContext.tsx`)
- **State**: Central boolean flags and active group references for modals (`isNewGroupOpen`, `isContributionOpen`, `isAuthOpen`, `isOnboardingOpen`).
- **Actions**: `openNewGroup()`, `closeNewGroup()`, `openContribution(group?)`, `closeContribution()`, `openAuth()`, `closeAuth()`, `openOnboarding()`, `closeOnboarding()`.

#### 5. `ThemeContext` (`src/context/ThemeContext.tsx`)
- **State**: `theme: 'light' | 'dark'`.
- **Actions**: `toggleTheme()`.
- **SSR Safety**: Safely initializes theme on the server without `window` access and synchronizes with `document.documentElement.classList` on the client.

#### 6. `AuthContext` (`src/features/auth/AuthContext.tsx`)
- **State**: `currentUser: CurrentUser | null`, `isAuthenticated: boolean`.
- **Actions**: `switchUser(user: CurrentUser)`, `login(email, password)`, `logout()`.
- **Architecture**: Acts as an adapter layer that can seamlessly toggle between mock persona switching and live Better-Auth session tokens.

---

### 2.4 Frontend Design Standards

1. **Color Tokens**:
   - Primary Accent: **Sunflower Yellow** (`#F5B800` light / `#FACC15` dark).
   - High Contrast Base: Neutral grayscale with crisp borders (`border-neutral-200` light / `border-neutral-800` dark).
2. **Layout & Grid**:
   - 4px / 8px spacing rhythm.
   - Swiss Bento Grid cards (`.bento-card`) with subtle elevation and high-contrast typography.
3. **Mandatory 5-State Coverage**:
   Every interactive view and container must handle:
   - **Initial**: Ready state with default view.
   - **Loading**: Pulse skeletons (`<LoadingSkeleton />`) preserving layout dimensions.
   - **Empty**: Informative zero-state with an actionable button (`<EmptyState />`).
   - **Error**: Graceful recovery messaging with retry options.
   - **Filled**: Complete data presentation with interactive micro-states.

---

## 3. Server Architecture (`/server`)

The backend is built with **Laravel 13** on **PHP 8.3+**, serving as the REST API and authentication provider.

```
server/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # API Controllers handling HTTP requests
│   │   │   ├── AuthController.php
│   │   │   ├── GroupController.php
│   │   │   ├── ContributionController.php
│   │   │   ├── CalendarController.php
│   │   │   └── SocialController.php
│   │   ├── Middleware/        # Authentication, CORS & rate limiting middleware
│   │   └── Requests/          # Form Request validators for payloads
│   └── Models/                # Eloquent Models & relationships
│       ├── User.php           # User account & authentication
│       ├── Group.php          # Paluwagan circle details (pot, frequency, rules)
│       ├── Member.php         # Group membership, turn position, payout date, status
│       ├── Contribution.php   # Payment records, receipt attachments, verification status
│       ├── Event.php          # Calendar scheduled events
│       └── TrustScore.php     # Trust rating calculations & historical audits
├── bootstrap/                 # Application bootstrap & providers
├── config/                    # Application, database & auth configuration
├── database/
│   ├── factories/             # Model factories for testing
│   ├── migrations/            # Database schema migrations
│   └── seeders/               # Seeders mirroring mockData.ts
├── routes/
│   ├── api.php                # RESTful API route definitions
│   ├── console.php            # Artisan console commands & scheduled tasks
│   └── web.php                # Web routes & health checks
├── storage/                   # File uploads (receipts), logs, and framework caches
└── tests/                     # Feature and Unit test suites
```

---

### 3.1 REST API & Frontend Context Alignment

The Laravel API endpoints directly map to the frontend context actions:

| HTTP Method | API Endpoint | Responsible Controller | Frontend Context Hook |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/groups` | `GroupController@index` | `useGroups().groups` |
| `POST` | `/api/v1/groups` | `GroupController@store` | `useGroups().addGroup` |
| `GET` | `/api/v1/groups/{id}` | `GroupController@show` | `useGroups().selectedGroup` |
| `POST` | `/api/v1/groups/{id}/contribute`| `ContributionController@store` | `useGroups().submitContribution` |
| `PATCH` | `/api/v1/groups/{id}/members/{mId}`| `GroupController@updateMember` | `useGroups().togglePaidStatus` |
| `GET` | `/api/v1/calendar/events` | `CalendarController@index` | `useCalendar().events` |
| `GET` | `/api/v1/friends` | `SocialController@index` | `useSocial().friends` |
| `POST` | `/api/v1/friends/invite` | `SocialController@invite` | `useSocial().sendInvite` |
| `GET` | `/api/v1/user/me` | `AuthController@me` | `useAuth().currentUser` |

---

### 3.2 Data Models & Core Schema

```
┌─────────────────┐       1:N       ┌─────────────────────┐
│      User       ├─────────────────┤       Member        │
└────────┬────────┘                 └──────────┬──────────┘
         │                                     │
         │ 1:N                                 │ N:1
         ▼                                     ▼
┌─────────────────┐       1:N       ┌─────────────────────┐
│   TrustScore    │                 │        Group        │
└─────────────────┘                 └──────────┬──────────┘
                                               │
                                               │ 1:N
                                               ▼
                                    ┌─────────────────────┐
                                    │    Contribution     │
                                    └─────────────────────┘
```

- **`groups`**: `id`, `name`, `description`, `total_pot`, `contribution_amount`, `frequency` (`daily`, `weekly`, `biweekly`, `monthly`), `cycle_number`, `max_members`, `status` (`recruiting`, `active`, `completed`), `rules`.
- **`members`**: `id`, `group_id`, `user_id`, `turn_position`, `payout_date`, `status` (`paid_pot`, `current_pot`, `waiting_pot`), `current_cycle_paid` (boolean).
- **`contributions`**: `id`, `group_id`, `member_id`, `amount`, `payment_method` (`GCash`, `Maya`, `BDO Bank`), `reference_number`, `receipt_url`, `status` (`pending`, `verified`, `rejected`).
- **`trust_scores`**: `id`, `user_id`, `score` (0.00–5.00), `completed_cycles`, `on_time_rate`, `late_payments`.

---

## 4. Operational Runbook for AI Agents

When executing commands or modifying code in this repository, follow these non-negotiable rules:

### 4.1 Frontend Commands (`/web`)

Always execute commands inside the `web/` directory:

```bash
# Start Vite development server with SSR
pnpm run dev

# Generate TanStack Router route tree after route edits
pnpm run generate-routes

# Run TypeScript compiler check (zero errors allowed)
pnpm exec tsc --noEmit

# Format code with Prettier
pnpm run check
pnpm run format

# Run ESLint validation
pnpm run lint

# Compile production SSR build (client + server + Nitro)
pnpm run build

# Preview production build locally
pnpm run preview --port 4173
```

### 4.2 Backend Commands (`/server`)

Always execute commands inside the `server/` directory:

```bash
# Run local PHP development server
php artisan serve

# Run database migrations
php artisan migrate

# Seed database with sample Paluwagan circles & members
php artisan db:seed

# Run test suite
php artisan test

# Format PHP code with Laravel Pint
composer run lint
```

---

### 4.3 Agent Quality & Style Rules

1. **Verbatim Module Syntax**: `web/tsconfig.json` enforces `verbatimModuleSyntax: true`. Always use explicit `import type { ... }` when importing types or interfaces.
2. **Preserve Single Responsibility**: Do not place new business logic, modals, or API calls directly inside route layout components. Create dedicated feature components in `src/features/*` and state hooks in `src/context/*`.
3. **No AI Design Slop**:
   - Never use gratuitous cyan/purple glowing gradients or ungrounded glassmorphism.
   - Never use placeholder text ("Lorem ipsum"). Use realistic Philippine financial names, GCash/Maya reference codes, and PHP amounts.
   - Always ensure interactive elements have visible `:focus-visible` outlines and accessible WCAG 2.1 AA contrast ratios.
