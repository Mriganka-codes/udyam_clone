# Udyam Registration Form

This is a full-stack web application for a simplified Udyam registration process. It includes a frontend form with validation, a backend API for processing the registration, and a PostgreSQL database for storing the data.

## Features

-   **Two-Step Registration Form:** A user-friendly two-step registration form with Aadhaar and OTP verification.
-   **Real-time Validation:** Real-time validation for form fields to provide immediate feedback to the user.
-   **Responsive Design:** The application is fully responsive and works on all devices.
-   **REST API:** A RESTful API for handling the registration process.
-   **Database:** The registration data is stored in a PostgreSQL database.
-   **Unit and Integration Tests:** The application includes unit and integration tests for both the frontend and backend.

## Technologies Used

-   **Frontend:** HTML, CSS, JavaScript
-   **Backend:** Node.js, Express.js
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Testing:** Jest, Supertest, JSDOM

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Set up the database:
    -   Create a PostgreSQL database.
    -   Create a `.env` file in the root of the project and add the following line:
        ```
        DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
        ```
    -   Run the following command to create the database schema:
        ```bash
        npx prisma migrate dev --name init
        ```

## Running the Application

1.  Start the backend server:
    ```bash
    node index.js
    ```
    The server will start on `http://localhost:3000`.

2.  Open the `index.html` file in your browser to view the frontend.

## Running the Tests

To run the tests, run the following command:

```bash
npm test
