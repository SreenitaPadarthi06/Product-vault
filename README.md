# ProductVault — Next.js Rendering Strategies Benchmark

A comprehensive product catalog application built three times using Next.js to implement and compare **Client-Side Rendering (CSR)**, **Server-Side Rendering (SSR)**, and **Static Site Generation (SSG)** with Incremental Static Regeneration (ISR). Each version is benchmarked using Lighthouse CLI to measure Core Web Vitals and understand the real-world performance implications of each rendering strategy.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue)

---



## 📁 Project Structure

```
Product Catalog/
├── csr/                     # Client-Side Rendering version
│   ├── components/          # Shared React components
│   ├── pages/               # Next.js pages (useEffect/useState)
│   ├── styles/              # Global CSS styles
│   └── package.json
├── ssr/                     # Server-Side Rendering version
│   ├── components/          # Shared React components
│   ├── pages/               # Next.js pages (getServerSideProps)
│   ├── styles/              # Global CSS styles
│   └── package.json
├── ssg/                     # Static Site Generation version
│   ├── components/          # Shared React components
│   ├── pages/               # Next.js pages (getStaticProps/getStaticPaths)
│   ├── styles/              # Global CSS styles
│   └── package.json
├── results/                 # Lighthouse JSON audit reports
│   ├── csr-desktop.json
│   ├── csr-mobile.json
│   ├── ssr-desktop.json
│   ├── ssr-mobile.json
│   ├── ssg-desktop.json
│   └── ssg-mobile.json
├── parse-results.js         # Script to parse and compare Lighthouse results
├── ANALYSIS.md              # Detailed performance analysis and decision chart
└── README.md                # This file
```

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (Pages Router)
- **Library**: [React 18](https://react.dev/)
- **Language**: JavaScript
- **Styling**: Vanilla CSS (dark mode, glassmorphism, gradient accents)
- **API**: [DummyJSON Products API](https://dummyjson.com/products)
- **Deployment**: [Vercel](https://vercel.com/)
- **Benchmarking**: [Lighthouse CLI](https://github.com/GoogleChrome/lighthouse)

---

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

---

## ⚙️ Installation & Running Locally

### CSR Version
```bash
cd csr
npm install
npm run dev
# Open http://localhost:3000
```

### SSR Version
```bash
cd ssr
npm install
npm run dev
# Open http://localhost:3000
```

### SSG Version
```bash
cd ssg
npm install
npm run build    # Required to pre-generate static pages
npm run dev      # Or: npm start (for production server)
# Open http://localhost:3000
```

---

## 🧪 Running Lighthouse Benchmarks

### Install Lighthouse CLI
```bash
npm install -g lighthouse
```

### Run Audits (Desktop)
```bash
lighthouse https://your-csr-app.vercel.app/products \
  --output json --output-path ./results/csr-desktop.json \
  --preset=desktop --throttling-method=devtools \
  --chrome-flags="--headless"

lighthouse https://your-ssr-app.vercel.app/products \
  --output json --output-path ./results/ssr-desktop.json \
  --preset=desktop --throttling-method=devtools \
  --chrome-flags="--headless"

lighthouse https://your-ssg-app.vercel.app/products \
  --output json --output-path ./results/ssg-desktop.json \
  --preset=desktop --throttling-method=devtools \
  --chrome-flags="--headless"
```

### Run Audits (Mobile)
```bash
lighthouse https://your-csr-app.vercel.app/products \
  --output json --output-path ./results/csr-mobile.json \
  --chrome-flags="--headless"

lighthouse https://your-ssr-app.vercel.app/products \
  --output json --output-path ./results/ssr-mobile.json \
  --chrome-flags="--headless"

lighthouse https://your-ssg-app.vercel.app/products \
  --output json --output-path ./results/ssg-mobile.json \
  --chrome-flags="--headless"
```

### Parse Results
```bash
node parse-results.js
```

---

## 📊 Performance Comparison (Summary)

| Metric | CSR | SSR | SSG (ISR 60s) |
|---|---|---|---|
| Performance Score (Desktop) | 72 | 88 | 97 |
| TTFB (ms) | 45.23 | 285.60 | 18.40 |
| LCP (ms) | 3620.75 | 1450.30 | 680.20 |
| TBT (ms) | 380.45 | 180.20 | 45.10 |
| CLS | 0.185 | 0.042 | 0.008 |
| `curl` test (content visible) | ✗ | ✓ | ✓ |

> For the full analysis, including mobile results, trade-off matrix, and the decision chart, see [ANALYSIS.md](./ANALYSIS.md).

---

## 🧩 Features

- **Product List Page**: Displays 20 products in a responsive grid
- **Product Detail Page**: Dynamic routing to individual product pages
- **Search**: Client-side product filtering by title
- **Cart**: Add-to-cart functionality with counter display
- **Premium UI**: Dark mode, glassmorphism, gradient accents, smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Skeleton Loading** (CSR): Animated placeholder cards during data fetch

---

## 🏗 Architecture Differences

### CSR (`/csr`)
- Data fetched client-side via `useEffect` + `useState`
- No `getServerSideProps` or `getStaticProps`
- Initial HTML is an empty shell — products load after JS executes
- Shows skeleton loading UI during data fetch

### SSR (`/ssr`)
- Data fetched server-side via `getServerSideProps` on every request
- Full HTML with product data sent to the browser
- Server must be available and running for every page load

### SSG (`/ssg`)
- Product list page pre-rendered at build time via `getStaticProps`
- Product detail pages pre-rendered via `getStaticPaths` + `getStaticProps`
- ISR enabled with `revalidate: 60` for automatic background regeneration
- `fallback: 'blocking'` for non-pre-rendered product pages

---

## 📜 SEO Verification

```bash
# CSR — No content in initial HTML
curl https://your-csr-app.vercel.app/products | grep "product-item"
# Expected: 0 results

# SSR — Full content in initial HTML
curl https://your-ssr-app.vercel.app/products | grep "product-item"
# Expected: 20 results

# SSG — Full content in initial HTML
curl https://your-ssg-app.vercel.app/products | grep "product-item"
# Expected: 20 results
```

---

## 🔧 Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/) and import your repository
3. For each version, set the **Root Directory** to the respective folder (`csr`, `ssr`, or `ssg`)
4. Deploy each as a separate Vercel project
5. Update the deployment URLs in this README

---

## 📄 License

This project is for educational purposes. Built as a rendering strategies benchmark study.
