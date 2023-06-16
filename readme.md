## Description

This project is an Express application that implements integration with the PayPal API for payment processing. It provides two routes: one for creating a new PayPal order and another for capturing an existing order.

## Prerequisites

Before running the application, make sure you have the following prerequisites:

- Node.js installed on your machine.
- Environment variable configuration:
  - `PORT`: Port on which the application will run.
  - `PAYPAL_API`: Base URL of the PayPal API.
  - `HOST`: Domain name or URL of your application.
  - `CLIENT`: PayPal API client.
  - `SECRET`: PayPal API secret key.

## Usage

```bash
npm install
npm run dev
```

Once the application is up and running, you can access the following routes:

- `GET /create-order`: Creates a new PayPal order and returns the order data in JSON format.
- `GET /capture-order?token=<order-token>`: Captures an existing PayPal order using the provided order token as a query parameter.
- `GET /cancel-payment`: Cancels the payment and redirects to the home page.

## Contribution

If you would like to contribute to this project, follow these steps:

1. Fork this repository.
2. Create a branch with the new feature or bug fix.
3. Make the changes in your branch.
4. Open a pull request to merge the changes into this repository.
