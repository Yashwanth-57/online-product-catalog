#  Product Recommendation App (Next.js + MongoDB)

**Author:** Yashwanth  
**Date:** November 2025  

---
##  Overview

This is a full-stack **Next.js application** that demonstrates different **rendering strategies** —  
SSG, ISR, CSR, SSR, and hybrid rendering — using a real product-based use case.

The app includes:
- A **home page** (static rendered)
- A **products page** (client-side rendered)
- A **recommendation page** (hybrid rendering)
- An **inventory dashboard** (server-side rendered)
- An **admin dashboard** with authentication (CSR protected)

---

##  Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **MongoDB** for data storage
- **Tailwind CSS** for UI
- **React Hot Toast** for notifications

---

## Folder Structure

my-product-app/
├── app/
│   ├── page.tsx                  → CSR (Client Side)
│   ├── product/[slug]/page.tsx   → SSR (Server Side)
│   ├── products/page.tsx         → ISR (Incremental Static Regeneration)
│   ├── admin/page.tsx            → CSR (Client Side + Auth)
│   ├── recommendations/page.tsx  → SSG (Static)
│   ├── layout.tsx                → App Router layout
│   ├── api/products/route.ts     → REST API (POST, GET)
│   ├── api/products/[id]/route.ts → PUT, DELETE
│   └── api/auth/route.ts         → Admin Auth (Bonus)
│   
├── components/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── AuthGate.tsx
│   └── AdminForm.tsx (optional)
│
├── lib/
│   ├── db.ts
│   └── inventory.ts
│   |__ auth.ts
| 
├── models/Product.ts
├
│  
│
├── .env.example
├── package.json
├── next.config.mjs
└── tsconfig.json


🔑 Environment Variables

Create a .env.local file in the root directory:

MONGODB_URI=your_mongodb_connection_string
ADMIN_USER=admin
ADMIN_PASS=1234



🧩 How to Run the Project

Clone the repository

git clone https://github.com/yourusername/my-product-app.git
cd my-product-app


Install dependencies

npm install


Add environment variables

Copy .env.example → .env.local

Fill in your MongoDB URI and admin credentials.

Run the development server

npm run dev

Visit the app

http://localhost:3000