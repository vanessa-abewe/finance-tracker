# Finance Tracker

## Overview
The Finance Tracker is a web-based application designed to help users manage their financial records, track transactions, generate reports, and analyze expenses efficiently. Built with modern web technologies, the app ensures a responsive, user-friendly interface and robust backend functionality.

## Features

1. **Transaction Management**:
   - Record income and expenses.
   - Categorize transactions (e.g., Food, Rent, Utilities, etc.).
   - Edit and delete transactions.

2. **Report Generation**:
   - Generate detailed financial reports for specified date ranges.
   - Export reports in PDF or CSV formats.

3. **Expense Analysis**:
   - Track total expenses and categorize spending habits.
   - Set budgets and receive alerts for over-budget spending.

4. **User Authentication**:
   - Secure login and registration.
   - JWT-based authentication.

5. **Responsive Design**:
   - Optimized for all screen sizes and devices.

## Technology Stack

### Frontend
- **Next.js**: React-based framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed JavaScript for better code reliability.
- **Tailwind CSS**: Utility-first CSS framework for custom and responsive styling.
- **@nextui-org/react**: For modern UI components.

### Backend
- **Node.js**: JavaScript runtime for building scalable server applications.
- **Express.js**: Backend framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing financial records.
- **Mongoose**: ODM for MongoDB to define schemas and manage database interactions.

### Other Tools
- **JWT**: For secure user authentication.
- **Swagger**: For API documentation.
- **ESLint & Prettier**: For code linting and formatting.
- **Thunder Client**: For API testing.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vaness-abewe/finance-tracker.git
   cd finance-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=3000
   EMAIL_USER=<your_email>
   EMAIL_PASS=<your_email_password>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.

## Folder Structure

```
finance-tracker/
├── app/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Next.js pages
│   ├── styles/           # Global and module styles
├── public/               # Static assets
├── server/
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── utils/            # Utility functions
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Usage

1. **Add Transactions**:
   - Navigate to the "Transactions" page.
   - Click "Add Transaction" and fill in the details.

2. **Generate Reports**:
   - Go to the "Reports" section.
   - Specify a date range and export the report.

3. **Analyze Expenses**:
   - Visit the "Dashboard" for insights into spending habits.

4. **Manage Budgets**:
   - Set a monthly budget and track expenses against it.

## Common Issues

### Slow Filesystem Detected
- Ensure the `.next` directory is on a local drive, not a network drive.
- Exclude the `.next` directory from antivirus scans.

### Invalid Hook Call
- Ensure hooks like `useState` are only called inside functional components.
- Verify consistent versions of `react` and `react-dom`.
- Run `npm dedupe` to avoid duplicate React installations.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Thanks to the open-source community for their contributions.
- Special thanks to [Your Name/Team Name] for project development.

