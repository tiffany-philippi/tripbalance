# TripBalance

> Plan your budget, track your expenses, and focus on the moments.

TripBalance is a mobile-first app for travelers who want to stay on top of their finances without the stress. Organize your trip budget by category, track expenses in real time, and always know how much you have left.

---

<img height="650" alt="Login Page" src="https://github.com/user-attachments/assets/7caa5531-66f4-422c-a4e0-fc4b61c4996a" />
<img height="650" alt="Trips List Page" src="https://github.com/user-attachments/assets/aeaf95f3-2caf-41f5-9d82-511baed9552f" />
<img height="650" alt="Dashboard Page" src="https://github.com/user-attachments/assets/27e6ee31-02cd-4789-927f-11ade8afe5df" />


---

## Features

- **Trip management** — Create and manage multiple trips with destination, dates, and cover image
- **Budget by category** — Set planned amounts per category (flights, accommodation, food, etc.)
- **Expense tracking** — Log expenses and see exactly where your money is going
- **Real-time summary** — Instant overview of total spent, saved, and remaining budget
- **Authentication** — Secure login with email and password via Supabase Auth
- **Cross-platform** — Runs on web, iOS, and Android via Ionic + Capacitor

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 18 + Ionic 8 |
| Mobile | Capacitor 8 |
| Backend / DB | Supabase (PostgreSQL + Auth) |
| Language | TypeScript |
| Styling | SCSS |
| Testing | Karma + Jasmine |
| Linting | ESLint + Angular ESLint |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI
- Ionic CLI
- A Supabase project

### Installation

```bash
# Clone the repository
git clone https://github.com/tiffany-philippi/tripbalance.git
cd tripbalance

# Install dependencies
npm install
```

### Environment Setup

Copy the environment template and fill in your Supabase credentials:

```bash
cp src/environments/environment.template.ts src/environments/environment.ts
```

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
};
```

### Running locally

```bash
ionic serve
```

---

## Database Schema

The app uses the following tables in Supabase:

- `trips` — Trip details (name, destination, dates, status, cover image)
- `categories` — Default and custom expense categories
- `trip_categories` — Categories selected per trip
- `budgets` — Planned amount per category per trip
- `expenses` — Individual expense entries

Views: `trip_summary`, `trip_category_summary`, `trip_expenses_list`, `trip_balance`

---

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/        # Auth guard
│   │   └── services/      # Supabase, Auth, Trips, Categories, Budget, Toast, Header
│   ├── models/            # TypeScript interfaces
│   ├── pages/
│   │   ├── home/          # Trip list
│   │   ├── trip-details/  # Trip overview with budget and expenses
│   │   ├── trip-setup/    # 3-step trip creation stepper
│   │   └── expenses/      # Expense creation
│   └── shared/
│       └── components/    # Reusable components (empty-state, budget-overview, etc.)
└── environments/
```

---

## Roadmap

### v1 (current)
- [x] Email + password authentication
- [x] Trip creation with 3-step flow (info → categories → budget)
- [x] Budget per category
- [x] Expense tracking
- [x] Real-time budget summary (spent, saved, left)
- [x] Route protection with Auth Guard
- [x] Row Level Security (RLS) on all tables

### v2 (planned)
- [ ] Full visual redesign with new color palette
- [ ] Edit budget per category
- [ ] Edit and delete expenses
- [ ] User registration screen
- [ ] User profile page
- [ ] City search with autocomplete (Nominatim API)
- [ ] Trip cover image (Unsplash integration)
- [ ] Budget charts — horizontal bar chart planned vs spent (ngx-charts)
- [ ] Draft trips — save and continue later
- [ ] Date picker UX improvement — start date selection flows directly to end date
- [ ] Fix price input fields — remove default 0, use placeholder only
- [ ] Auto-select category on expense creation when trip has only one
- [ ] i18n — English + Portuguese
- [ ] Passcode login

### v3 (future)
- [ ] Google OAuth
- [ ] Custom categories with color picker
- [ ] Add members to trip
- [ ] Split expenses between members with cost calculation per user
- [ ] Multi-currency support — track expenses in local currency and convert to base currency
- [ ] Real-time currency conversion
- [ ] PWA with offline mode (Capacitor + Supabase sync)

---

## Author

**Tiffany Philippi** — Frontend Developer  
[GitHub](https://github.com/tiffany-philippi) · [LinkedIn](https://www.linkedin.com/in/tiffany-o-philippi/)
