# Project Tech Plan

## Overview

This project is a web application designed for mobile view that includes features like user authentication, monthly budget tracking, transaction history, and category tagging. The backend is managed using Supabase, which will handle database management, authentication, and custom functions. The frontend is built with Next.js, using `pages` router for mobile responsiveness, and includes a design system for consistent UI elements.

---

## Tech Stack

### Backend (Supabase)

- **Database**: PostgreSQL (Managed by Supabase)
- **Authentication**: Supabase Auth
- **Database Relations**: For linking transactions with budget entries
- **APIs**: Supabase REST API, Supabase Functions for custom logic

### Frontend (Next.js)

- **Framework**: Next.js with `pages` routing
- **Styling**: Sass/LESS for design system and component styling
- **Mobile-First Design**: Ensures responsive layout for mobile devices
- **Design System**: Custom components for buttons, headings, inputs, and cards
- **Fonts**: Google Fonts via `@next/font`

---

## Features and Functionality

### Backend (Supabase)

1. **User Management**

   - **Authentication**: Use Supabase Auth for signup, login, and session management.
   - **User Profiles**: Store additional user data in a `profiles` table.

2. **Monthly Income and Expense Tracking**

   - **Tables**:
     - `monthly_income`: Stores each user's monthly income, filtered by month and year.
     - `transactions`: Linked to `monthly_income` via `monthly_income_id`, logs each transaction.
     - `tags`: Stores category tags for transactions, e.g., “Essentials,” “Savings,” etc.

3. **Accumulated Balance Calculation**

   - Use a Supabase Function to calculate an accumulated balance by summing up the income and subtracting transaction amounts. This balance should roll over each month.

4. **Reporting and Analytics**

   - Monthly, daily, and yearly reports for tracking user spending and balance.
   - Export functionality in formats like CSV or PDF.

5. **Database Indexing**
   - Add indexing on key columns (`user_id`, `month`, `year`, etc.) for fast query performance.

### Frontend (Next.js)

1. **Pages and Routes**

   - **Authentication Pages**: Sign Up, Login, and Profile.
   - **Budget Dashboard**: Monthly overview of budget, balance, and expense categories.
   - **Transaction History**: Displays the transaction log with filtering options by tag and date.
   - **Report Page**: Shows spending analytics with visualizations.

2. **Design System Components**

   - **Button**: Primary, secondary, and icon button styles.
   - **Heading**: Styled headings for different sections.
   - **Input**: Standard input fields with icons, error handling, and success states.
   - **Card**: Card layouts for displaying transactions, income, and expense categories.

3. **Fonts and Styling**
   - **Font Family**: Load Google Fonts using `@next/font`.
   - **Sass/LESS**: Organize styling into modular files, following a mobile-first approach.
   - **Responsive Design**: Use media queries to ensure a clean mobile view.

---

## Database Structure

### Tables

#### `profiles`

| Column       | Type      | Description           |
| ------------ | --------- | --------------------- |
| `id`         | UUID      | Primary key           |
| `user_id`    | UUID      | Supabase Auth user ID |
| `created_at` | Timestamp | Account creation date |
| `name`       | Text      | User's name           |

#### `monthly_income`

| Column    | Type    | Description            |
| --------- | ------- | ---------------------- |
| `id`      | UUID    | Primary key            |
| `user_id` | UUID    | Foreign key (profiles) |
| `month`   | Integer | Income month           |
| `year`    | Integer | Income year            |
| `amount`  | Numeric | Monthly income amount  |

#### `transactions`

| Column              | Type    | Description                    |
| ------------------- | ------- | ------------------------------ |
| `id`                | UUID    | Primary key                    |
| `monthly_income_id` | UUID    | Foreign key (monthly_income)   |
| `amount`            | Numeric | Transaction amount             |
| `tag_id`            | UUID    | Foreign key (tags)             |
| `note`              | Text    | Description of the transaction |
| `date`              | Date    | Date of the transaction        |

#### `tags`

| Column | Type | Description                          |
| ------ | ---- | ------------------------------------ |
| `id`   | UUID | Primary key                          |
| `name` | Text | Tag name (e.g., Essentials, Savings) |

### Indexing Strategy

- Add indexing on `user_id`, `month`, and `year` columns in `monthly_income`.
- Add indexing on `monthly_income_id` and `tag_id` columns in `transactions`.

---

## APIs

### Supabase APIs

- **User Management**: Signup, Login, Logout, Fetch Profile.
- **Budget Management**: CRUD operations on `monthly_income`, `transactions`, and `tags`.
- **Reports and Analytics**: Custom Supabase functions for balance calculations.

---

## Development Workflow

### Backend Development

1. **Set up Supabase Project**: Create a new project in Supabase and configure authentication and database tables.
2. **Database Design and Seeding**: Define schema and seed data for testing.
3. **Supabase Functions**: Create custom SQL functions for balance calculations and accumulated balance.
4. **API Integration**: Expose database and function APIs to Next.js.

### Frontend Development

1. **Initialize Next.js Project**: Set up pages routing with `pages`.
2. **Component Development**: Create design system components (Button, Input, Card).
3. **API Integration**: Connect Supabase APIs for user login, budget, and transactions.
4. **Styling and Responsiveness**: Implement mobile-first styling using Sass/LESS and Google Fonts.

---

## Deployment

1. **Backend**: Deploy Supabase as a managed backend service.
2. **Frontend**: Deploy Next.js app on Vercel for optimized mobile performance.
3. **Environment Variables**: Securely configure environment variables for Supabase API keys.

---

## Conclusion

This tech plan outlines the structure and flow for a mobile-focused budget management app with Supabase and Next.js. This system provides a scalable, responsive, and efficient way for users to track budgets and transactions with a strong backend and clean mobile-first design.
