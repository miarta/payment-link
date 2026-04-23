# Payment Link App — Landing Page + Link Creator (Next.js)

## 🧩 Overview

This app is a **single Next.js application** that serves:

1. **Landing Page** → marketing + entry point
2. **Payment Link Creator (`/link`)** → form to generate payment links
3. **Payment Page (`/pay/[slug]`)** → buyer payment page
4. **Invoice Page (`/invoice/[slug]`)** → payment status

Theme:

> **White + Blue (clean, minimal, fintech style)**

---

## 🎯 Goals

* Super fast link creation (no login)
* Clean UX for face-to-face payments
* Mobile-first
* Minimal friction

---

## 🎨 Design System

### Colors

* Primary Blue: `#2563EB`
* Light Blue: `#EFF6FF`
* Dark Text: `#1F2937`
* Gray: `#6B7280`
* Background: `#FFFFFF`

### Style

* Clean (like Stripe / Midtrans)
* Rounded corners (rounded-2xl)
* Soft shadows
* Plenty of whitespace

---

## 📄 Pages Structure

```bash
/                 → Landing Page
/link             → Create Payment Link
/pay/[slug]       → Buyer Payment Page
/invoice/[slug]   → Invoice Status
```

---

## 🏠 Landing Page (`/`)

### Purpose

* Explain product
* Drive user to create payment link

### Sections

#### 1. Navbar

* Logo (left)
* CTA button (right): **"Create Payment Link" → /link**

---

#### 2. Hero Section

Headline:

> "Create Payment Links in Seconds"

Subtext:

> No login. No setup. Just create and get paid.

CTA:

* Primary: **Create Payment Link**
* Secondary (optional): Learn More

Visual:

* Mock payment page / QR illustration

---

#### 3. How It Works

3 Steps:

1. Enter seller & buyer info
2. Add product & price
3. Share link and get paid

---

#### 4. Features

* No login required
* Instant payment links
* Secure via iPaymu
* Email invoice tracking

---

#### 5. CTA Section

> “Start accepting payments now”

Button → `/link`

---

## 🔗 Link Creator Page (`/link`)

### Purpose

Form to create payment page

---

### 🧾 Form Sections

#### 1. Seller Info

* Name (required)
* Email (required)
* Phone (required)

---

#### 2. Buyer Info

* Name (required)
* Email (required)
* Phone (required)

---

#### 3. Product Info

* Product Name (required)
* Price (required)
* Image (optional upload or URL)

---

#### 4. Terms

* Checkbox:

  * “I agree to terms & conditions”

---

#### 5. Submit Button

Label:

> "Create Payment Link"

---

### 🔄 On Submit

Call:

```
POST /payment-pages
```

---

### ✅ Success State

Show:

* Payment Link:

  ```
  /pay/{slug}
  ```

* Expiry:

  * Countdown (15 minutes)

* Copy Button

* CTA:

  * “Open Payment Page”

---

## 💳 Payment Page (`/pay/[slug]`)

### Purpose

Buyer sees product and pays

---

### UI Elements

* Product Name
* Price (highlighted)
* Seller Name
* Expiry countdown

---

### CTA

Button:

> "Pay Now"

---

### Action

On click:

```
POST /transactions
```

Response:

```
payment_url
```

→ Redirect to iPaymu page

---

## 🧾 Invoice Page (`/invoice/[slug]`)

### Purpose

Show payment status

---

### Status Types

* Pending
* Paid
* Expired

---

### Content

* Product info
* Buyer info
* Payment timestamp (if paid)

---

## 📱 UX Notes

* Mobile-first design
* Sticky CTA buttons
* Fast loading (no heavy assets)

---

## 🔐 Basic Protection

* Rate limit form submission
* CAPTCHA on `/link`
* Disable button after submit
* Prevent duplicate clicks

---

## 🧱 Component Structure

### Shared

* `ButtonPrimary`
* `InputField`
* `Card`
* `CountdownTimer`

---

### Landing

* `Navbar`
* `Hero`
* `Steps`
* `Features`
* `CTASection`

---

### Link Page

* `SellerForm`
* `BuyerForm`
* `ProductForm`
* `SubmitSection`

---

### Payment Page

* `ProductSummary`
* `PayButton`

---

### Invoice Page

* `StatusBadge`
* `DetailsCard`

---

## 🧠 UX Principles

* No friction (no login)
* Clear actions
* Fast feedback
* Minimal inputs

---

## 🚀 Future (Optional)

* QRIS inline display
* WhatsApp share button
* Save recent links (local storage)
* Dark mode

---

## ✅ Summary

You are building:

> A **single Next.js app** with:

* Landing page (marketing)
* Payment link generator (`/link`)
* Payment flow via iPaymu
* Simple, fast, no-login UX

---

This spec is ready to:

* Feed into AI (Cursor / Copilot)
* Start UI development immediately

---

