# Bank Backend | Real-Time ATM Transaction Logging

An **express** application for processing and logging ATM transactions.

<br>

## Getting Started

This project was developed using `Node.js` and `Express`.

<br>

To get `bank-backend` running locally, follow the following steps:

<br>

1. Setup your gmail account for use as a transport for nodemailer.

- Instructions on how to do that can be found [here](https://miracleio.me/snippets/use-gmail-with-nodemailer).

- Take note of the `password`, as it will be used in configuring the project.

- You may also opt in for a [different `transport`](https://nodemailer.com/usage/), in which case, you would have to change how nodemailer transport is setup in [app.js](./app.js) accordingly (lines 150 - 158).

<br>

2. Create a `.env` file in the project directory with the following information:

```bash

EMAIL=<email> # email address used for node mailer gmail transport
PASSWORD=<node_mailer_gmail_transport_password>

mongodburl=<mongodb_database_uri> # MongoDB database URI (You'd need to create a mongodb database)

error_logging_page_url=http://localhost:5173/ # Base url for bank-transaction-logging page
bank_interface_url=http://localhost:3000 # Base url for bank-atm-interface page
transaction_logging_screen_url=http://localhost:5174/ # Base url for bank-transaction-logging page

JWT_ISSUER=<string> # eg. Bank
JWT_AUDIENCE=<string> # eg. bank.com
JWT_SECRET=<string> # eg. MySecret

```

3. Proceed to spin up the development server by running the following command in the project directory in the terminal:

```bash
npm run start:dev
```

## Application Endpoints - Bank Clients

### POST /signup

Creates a new **bank client** user (bank) account.

**Sample Request Body**

```json
{
  "email": "michaelquarcoo04@gmail.com", // Valid email address
  "password": "password1234",
  "pin": "7218", // Must be 4 digits
  "name": "Michael Quarcoo"
}
```

**Sample Response**

```json
{
  "success": true,
  "data": {
    "name": "Michael Quarcoo",
    "email": "michaelquarcoo04@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTVkMDY4Y2E4Y2U2NDE4MWZmZDJlZSIsImlhdCI6MTY5NTkyODQyNCwiZXhwIjoxNjk2OTI4NDI0LCJhdWQiOiJiYW5rLmNvbSIsImlzcyI6IkJhbmtfSW50ZXJuYXRpb25hbCJ9.X0EOUok2KW8fdwYI9msQxXMkwAYhPCEBjSWZmslCFV4"
}
```

<br>

### POST /login

**Sample Request Body**

```json
{
  "email": "michaelquarcoo04@gmail.com",
  "password": "password1234"
}
```

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "name": "Michael Quarcoo",
    "email": "michaelquarcoo04@gmail.com"
  },
  "message": "Michael Quarcoo, you have been logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzY5MmQxZDVmMWJlYTlmYzgxOGU5NSIsImlhdCI6MTY5NTkyODg5NCwiZXhwIjoxNjk2OTI4ODk0LCJhdWQiOiJiYW5rLmNvbSIsImlzcyI6IkJhbmtfSW50ZXJuYXRpb25hbCJ9.yjgbN0O8yiLV4Fw15eybmZzR0uucyovUa5393mc0hB0"
}
```

<br>

### POST /deposit

Endpoint for depositing money into bank account (ATM).

**Sample Request Body**

```json
{
  "amount": 200.39,
  "pin": "7218"
}
```

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "currentBalance": "730.39"
  }
}
```

### POST /account-balance

Retrieve account balance of bank client.

**Sample Request Body**

```json
{
  "pin": "7218"
}
```

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "accountBalance": "730.39"
  }
}
```

<br>

### POST /account-info

Retrieve account related information for a client's bank account.

**Sample Request Body**

```json
{
  "pin": "7218"
}
```

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "name": "Michael Quarcoo",
    "accountNumber": "120000000003",
    "accountBalance": "730.39",
    "email": "michaelquarcoo04@gmail.com"
  }
}
```

<br>

### POST /change-pin

Change ATM PIN

**Sample Request Body**

```json
{
  "pin": "7218",
  "newPIN": "3456"
}
```

**Sample Response Body**

```json
{
  "success": true,
  "message": "PIN was changed successfully"
}
```

<br>

### POST /withdraw

Withdraw money from ATM

**Sample Request Body**

```json
{
  "amount": 400,
  "pin": "3456"
}
```

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "currentBalance": "330.39"
  }
}
```

<br>

### POST /verify-pin

Validate ATM PIN

**Sample Request Body**

```json
{
  "pin": "3456"
}
```

**Sample Response Body**

```json
{
  "success": true,
  "message": "PIN verified"
}
```

<br>

<hr>

<br>

## Application Endpoints - Bank Staff

### GET /active-staff

Retrieve active staff `name` and `email`

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "name": "Michael Quarcoo",
    "email": "michaelquarcoo04@gmail.com"
  }
}
```

<br>

### POST /active-staff

Update active staff info

**Sample Request Body**

```json
{
  "name": "Samuel Quarcoo",
  "email": "samuelquarcoo@gmail.com"
}
```

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "name": "Samuel Quarcoo",
    "email": "samuelquarcoo@gmail.com"
  },
  "message": "Successfully updated active staff details"
}
```

<br>

### GET /atm-balance

Get the amount of money in the ATM

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "atmBalance": "49912.68"
  }
}
```

<br>

### POST /atm-balance

Top-up the money in the ATM by an `amount`

**Sample Request Body**

```json
{
  "amount": 30000
}
```

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "atmBalance": "79912.68"
  }
}
```

<br>

### GET /logs

Get ATM transaction logs

**Sample Response Body**

```json
{
    "success": true,
    "count": 111,
    "failed": 43,
    "passed": 68,
    "data": [
        {
            "_id": "6515d722ca8ce64181ffd318",
            "timestamp": "2023-09-28T19:42:26.798Z",
            "level": "info",
            "message": "Withdrawal successful",
            "meta": {
                "transactionId": 100136,
                "accountNumber": "120000000003",
                "type": "withdrawal",
                "amount": 400,
                "status": "completed",
                "description": "Operation complete",
                "timestamp": "2023-09-28T19:42:26.797Z"
            }
        },
        {
            "_id": "6515d33fca8ce64181ffd300",
            "timestamp": "2023-09-28T19:25:51.169Z",
            "level": "info",
            "message": "Deposit successful",
            "meta": {
                "transactionId": 100135,
                "accountNumber": "120000000003",
                "type": "deposit",
                "amount": 200.39,
                "status": "completed",
                "description": "Operation complete",
                "timestamp": "2023-09-28T19:25:51.162Z"
            }
        },
        {
            "_id": "64dd0f3b753fc0303ad66ca0",
            "timestamp": "2023-08-16T18:02:35.438Z",
            "level": "info",
            "message": "Withdrawal successful",
            "meta": {
                "transactionId": 100134,
                "accountNumber": "120000000003",
                "type": "withdrawal",
                "amount": 20,
                "status": "completed",
                "description": "Operation complete",
                "timestamp": "2023-08-16T18:02:35.426Z"
            }
        },
        {
            "_id": "64d05abf562d7077f478e5e9",
            "timestamp": "2023-08-07T02:45:19.378Z",
            "level": "error",
            "message": "Deposit failed",
            "meta": {
                "transactionId": 100133,
                "accountNumber": "120000000000",
                "type": "deposit",
                "amount": 300,
                "status": "failed",
                "description": "Dispenser Error",
                "timestamp": "2023-08-07T02:45:19.368Z"
            }
        },
        ...
    ]
}
```

<br>

### POST /logs/filter

Return logs that contain a certain `substring`

**Sample Request Body**

```json
{
  "searchString": "error"
}
```

**Sample Response Body**

```json
{
    "success": true,
    "count": 20,
    "data": [
        {
            "_id": "64d05abf562d7077f478e5e9",
            "timestamp": "2023-08-07T02:45:19.378Z",
            "level": "error",
            "message": "Deposit failed",
            "meta": {
                "transactionId": 100133,
                "accountNumber": "120000000000",
                "type": "deposit",
                "amount": 300,
                "status": "failed",
                "description": "Dispenser Error",
                "timestamp": "2023-08-07T02:45:19.368Z"
            }
        },
        {
            "_id": "64d04ce66246d53dcc3fb466",
            "timestamp": "2023-08-07T01:46:14.614Z",
            "level": "error",
            "message": "Withdrawal failed",
            "meta": {
                "transactionId": 100116,
                "accountNumber": "120000000000",
                "type": "withdrawal",
                "amount": 200,
                "status": "failed",
                "description": "Internal Server Error",
                "timestamp": "2023-08-07T01:46:14.614Z"
            }
        },
        {
            "_id": "64d048516246d53dcc3fb455",
            "timestamp": "2023-08-07T01:26:41.578Z",
            "level": "error",
            "message": "Deposit failed",
            "meta": {
                "transactionId": 100115,
                "accountNumber": "120000000000",
                "type": "deposit",
                "amount": 400,
                "status": "failed",
                "description": "Internal Server Error",
                "timestamp": "2023-08-07T01:26:41.577Z"
            }
        },
        ...
    ]
}
```

<br>

<hr>

<br>

## Error Simulation Endpoints

### GET /current-error

Get current error to simulate

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "error": "NO_ERROR"
  }
}
```

<br>

### POST /current-error

Set error to simulate

**Sample Request Body**

```json
{
  "error": "TRANSACTION_TIMEOUT" // NO_ERROR, INTERNAL_SERVER_ERROR, DISPENSER_ERROR
}
```

**Sample Response Body**

```json
{
  "success": true,
  "data": {
    "currentError": "TRANSACTION_TIMEOUT"
  }
}
```

<br>
