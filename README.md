# Real-Time ATM Transaction Logging

A simulation of real-time transaction logging for Automated Teller Machines (ATMs).

<br>

Research indicates that customers of various banks (especially in Africa) have issues with the reliability of ATMs.

In order to improve ATM fault detection, transaction logging is key. However, some of the current systems used in logging ATM transactions are not real-time systems. This delays ATM fault detection and increases ATM downtime.

This project simulates real-time transaction logging at ATMs and the notification of bank authorities in the event of ATM failure.

Here is a link to a [demo of the application](https://drive.google.com/file/d/16HYuTJNgKF7H_t64_i7Ynwc_3NP7LT7i/view?usp=sharing)

<br>

## Getting Started

This project was built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [Node.js](https://nodejs.org/en) and [Express](https://expressjs.com/).

<br>

The projects consists primarily of two interfaces;

- an interface for bank clients to [perform transactions](./bank-atm-interface/)
- an interface for bank staff to [view transaction logs](./bank-transaction-logs/)

<br>

There is also an interface for [selecting errors to simulate](./bank-error-selection/).

<br>

Visit [ATM Interface README](./bank-atm-interface/README.md), [Error Selection README](./bank-error-selection/README.md), [Transaction Logging README](./bank-transaction-logs/README.md) and [Backend README](./bank-backend/README.md) for information on how to setup each of the interfaces and the backend, respectively.

<br>

## Deployment Links

You may visit the links below to interact with the application.

- [Bank ATM Interface](https://bank-atm-banking.vercel.app/)
- [Bank Transaction Logging](https://bank-transaction-logs.vercel.app/)
- [Bank Error Selection](https://bank-error-selection.vercel.app/)
