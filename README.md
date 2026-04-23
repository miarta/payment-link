# iPaymu Link Payment

A no-login payment link generator built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Sellers create shareable payment links in seconds — buyers pay through a dedicated page, and both parties receive an invoice.

---

## Features

- **No account required** — generate payment links instantly without signing up
- **Multi-step wizard** — guided 4-step form (role selection → buyer info → seller info → product details)
- **15-minute expiry** — payment links automatically expire with a live countdown timer
- **Buyer & seller roles** — collects contact information for both parties
- **Optional product image** — drag-and-drop image upload on the product step
- **Invoice page** — real-time payment status (pending / paid / expired)
- **Responsive design** — mobile-friendly UI with smooth animations

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Storage | In-memory (server-side Map) |
| Linting | ESLint 9 |

---

## Project Structure

```
ipaymu-link-payment/
├── app/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles & design tokens
│   ├── faq/page.tsx             # FAQ page
│   ├── link/page.tsx            # Create payment link (wizard)
│   ├── pay/[slug]/page.tsx      # Customer payment page
│   ├── invoice/[slug]/page.tsx  # Invoice / confirmation page
│   └── api/
│       ├── payment-pages/
│       │   ├── route.ts         # POST  — create payment page
│       │   └── [slug]/route.ts  # GET   — fetch payment page
│       ├── invoices/[slug]/
│       │   └── route.ts         # GET   — fetch invoice
│       └── transactions/
│           └── route.ts         # POST  — process transaction
├── components/
│   ├── landing/                 # Hero, Features, Steps, FAQ, CTA
│   ├── wizard/                  # PaymentLinkWizard, WizardLayout
│   ├── invoice/                 # StatusBadge
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── InputField.tsx
│   ├── ButtonPrimary.tsx
│   ├── Card.tsx
│   ├── CountdownTimer.tsx
│   └── ImageDropzone.tsx
├── lib/
│   └── storage.ts               # In-memory data store
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/your-org/ipaymu-link-payment.git
cd ipaymu-link-payment
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## User Flow

```
Landing page (/)
    └── Create link (/link)
            └── 4-step wizard
                    1. Choose role (Buyer or Seller initiates)
                    2. Buyer information (name, email, phone)
                    3. Seller information (name, email, phone)
                    4. Product details (name, price, optional image)
                            └── Payment link generated
                                    └── Buyer visits /pay/[slug]
                                            └── Confirms payment
                                                    └── Invoice at /invoice/[slug]
```

---

## API Reference

### `POST /api/payment-pages`

Creates a new payment page. Expires after 15 minutes.

**Request body**

```json
{
  "buyerName": "string",
  "buyerEmail": "string",
  "buyerPhone": "string",
  "sellerName": "string",
  "sellerEmail": "string",
  "sellerPhone": "string",
  "productName": "string",
  "price": 150000,
  "productImage": "string | null"
}
```

**Response**

```json
{
  "slug": "abc123",
  "paymentUrl": "/pay/abc123"
}
```

---

### `GET /api/payment-pages/[slug]`

Returns payment page details including expiry status.

---

### `GET /api/invoices/[slug]`

Returns invoice data and payment status (`pending` | `paid` | `expired`).

---

### `POST /api/transactions`

Marks a payment page as paid.

**Request body**

```json
{
  "slug": "abc123"
}
```

---

## Data Storage

All data is kept in a **server-side in-memory Map** (`lib/storage.ts`). This means:

- Data is lost when the server restarts or redeploys
- Suitable for prototyping and demos
- For production, replace `storage.ts` with a persistent database (e.g., PostgreSQL, MongoDB)

---

## Environment Variables

No environment variables are required to run the application in its current state.

When integrating a real payment gateway or database, add a `.env.local` file:

```env
# Example — not required by default
DATABASE_URL=
PAYMENT_GATEWAY_API_KEY=
```

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## Known Limitations

- **No persistent storage** — data resets on every server restart
- **No real payment processing** — transactions are simulated (mock flow)
- **No email notifications** — invoice emails are not sent
- **No authentication** — any user can access any payment page by slug

---

## License

MIT
