# CanvaPro Store

A premium SaaS-style landing page and checkout flow for Canva Pro upgrades, built with modern web technologies.

## 🏗️ Architecture & Tech Stack

This project is built for performance, aesthetics, and conversion optimization.

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphism Effects
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **UI Components**: `shadcn/ui` inspired components
-   **Deployment**: Optimized for Cloudflare Pages / Vercel

## 🔭 Project Scope

The application consists of three main modules:

1.  **Landing Page**: high-conversion homepage with:
    -   Dynamic Hero Section with gradient effects
    -   Pricing Table with toggle (Team vs Custom Email)
    -   Social Proof (Testimonials, Stats)
    -   FAQ and Trust Signals
2.  **Checkout Flow**: Multi-step checkout process
    -   Plan selection
    -   User details collection
    -   Payment method selection (PayPal disabled/Coming Soon, Card enabled)
3.  **Admin Dashboard ( /admin )**:
    -   Overview/Analytics
    -   Package Management
    -   Order Management

## ☁️ How to Deploy on Cloudflare Pages

Follow these steps to deploy this project to Cloudflare's global edge network:

1.  **Log in** to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Navigate to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3.  Select the repository: `CanvaPro-Store`.
4.  **Configure Build Settings**:
    -   **Framework Preset**: Select `Next.js (Static HTML Export)` or `None`.
    -   **Build Command**: `npm run build`
    -   **Build output directory**: `out`
5.  **Environment Variables** (Optional):
    -   Add any API keys or secrets here if needed in the future.
6.  Click **Save and Deploy**.

Your site will be live on a `*.pages.dev` subdomain in minutes!
