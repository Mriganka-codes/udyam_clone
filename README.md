# Udyam Registration Form

This is a full-stack web application for a simplified Udyam registration process. It includes a frontend form with validation, a backend API for processing the registration, and a PostgreSQL database for storing the data.

# Screenshots
<img width="1920" height="1386" alt="screencapture-file-home-mriganka-Desktop-programming-times-udyam-index-html-2025-08-14-17_30_12" src="https://github.com/user-attachments/assets/2ef9c5ef-f0cd-4466-82fb-8a6521b23331" />
<img width="1920" height="1527" alt="screencapture-file-home-mriganka-Desktop-programming-times-udyam-index-html-2025-08-14-17_34_28" src="https://github.com/user-attachments/assets/f071f9d4-0ed7-4420-bfdb-7c3adaa048f7" />
<img width="1920" height="1432" alt="screencapture-file-home-mriganka-Desktop-programming-times-udyam-index-html-2025-08-14-17_36_33" src="https://github.com/user-attachments/assets/b9f78d67-ab81-4d71-8d47-4282a5210ca3" />
<img width="1920" height="1193" alt="screencapture-file-home-mriganka-Desktop-programming-times-udyam-index-html-2025-08-14-17_36_46" src="https://github.com/user-attachments/assets/d12c552a-df44-4559-8597-19fc47a34716" />
<img width="480" height="389" alt="Screenshot from 2025-08-14 17-37-26" src="https://github.com/user-attachments/assets/ba2a725f-bd96-47e0-b1e5-aa3c29a219df" />
<img width="1920" height="1080" alt="Screenshot from 2025-08-14 17-37-52" src="https://github.com/user-attachments/assets/2e27d663-60f4-4de6-aa00-25254273b1cf" />






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
