# 💳 PayTM Clone – Secure Payment System

A **full-stack payment gateway solution** built with modern web technologies, designed to simulate real-world payment flows.  
This project demonstrates secure **on-ramp transactions, P2P transfers, merchant integrations**, and resilient backend processing with rollback guarantees.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js  
- **Frontend**: Next.js (Merchant App + User App)  
- **Database**: PostgreSQL with Prisma ORM  
- **State Management**: Recoil  
- **Monorepo Management**: Turborepo (npm)  

---

## 🔑 Features

- **User & Merchant Management** (authentication & role-based)  
- **On-Ramp Transactions** (tokenized payment flow with HDFC webhook simulation)  
- **P2P Transfers** (send & receive money between users)  
- **Balance Management** (live updates, locked funds, transaction rollback)  
- **Webhook Processing** with transaction-safe updates using Prisma `$transaction`  
- **Resilient Backend** (always-on HTTP server, rollback on failure)  
- **DBMS Concepts Applied**: atomicity, consistency, isolation, durability (ACID)  

---
## 🏗️ Database Schema

Key entities in the system:

- **User** → manages accounts, balances, and transactions  
- **Merchant** → supports different authentication types  
- **OnRampTransaction** → represents payment provider integrations  
- **p2pTransfer** → handles peer-to-peer payments  
- **Balance** → maintains current and locked funds  

👉 [See `prisma/schema.prisma`](./prisma/schema.prisma) for full details.

---

## Get Started

- Clone the repo

```jsx
git clone https://github.com/navneetpathak1/Secure_Payment_System.git
```

- npm install
- Run postgres

```jsx
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
- Update .env files everywhere with the right db url
- Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma db seed
---
---

### ***Thank You😊***

