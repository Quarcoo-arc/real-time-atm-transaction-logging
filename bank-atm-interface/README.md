# Bank ATM Interface | Real-Time ATM Transaction Logging

A next.js application for `bank clients` to perform transactions (make **deposits** and **withdrawals**) on their bank **accounts**. This application is meant to simulate ATM transactions.

<br>

## Getting Started

This project was developed using [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<br>

In order to get this project running locally:

<br>

1. Add a `.env.local` file in the project directory with the **backend url**.
   Eg.

```bash
NEXT_PUBLIC_BACKEND_BASE_URL="http://localhost:5000"
```

<br>

2. You can proceed to run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Poppins and Dancing Script, custom Google Fonts.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

<br>

3. In order for the functionalities to work as expected, you would need to have the [`backend`](../bank-backend/README.md) running.

## Deployment

Here's a link to the live [web application](https://bank-atm-banking.vercel.app/)
