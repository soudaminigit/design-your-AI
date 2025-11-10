# LMS Video Platform

A simple Learning Management System (LMS) to upload and view video lessons. This project features an admin panel for content management and a student view for learning, complete with user authentication.

This is a fully client-side application that uses IndexedDB for data persistence and `sessionStorage` for session management.

## Features

- **Student View**: Browse courses, watch videos, and track completion progress.
- **Admin Panel**: Add/delete courses and upload/delete videos for each course.
- **User Authentication**: A complete login/registration flow with support for email/password and simulated social logins (Google/LinkedIn).
- **Data Persistence**: Course content, user accounts, and video completion status are saved in the browser's IndexedDB.
- **Responsive Design**: The UI is built with Tailwind CSS and is responsive across different screen sizes.

## How to Run Locally

Since this is a static web application with no server-side backend, you can run it using any simple HTTP server.

1.  Make sure you have Node.js installed.
2.  Install a simple server package globally:
    ```bash
    npm install -g serve
    ```
3.  Navigate to the project's root directory and run the server:
    ```bash
    serve .
    ```
4.  Open your browser and go to the URL provided by the server (usually `http://localhost:3000`).

## How to Deploy to GitHub Pages

This project can be easily deployed as a static site on GitHub Pages.

1.  **Create a new repository** on GitHub and push the project files to it.
2.  In your repository's settings, go to the **Pages** tab.
3.  Under "Build and deployment", select the **source** as "Deploy from a branch".
4.  Choose the branch you want to deploy from (usually `main` or `master`).
5.  Select the folder as `/ (root)`.
6.  Click **Save**.

GitHub will build and deploy your site. It might take a few minutes for the site to become available at the provided URL (e.g., `https://<your-username>.github.io/<your-repo-name>/`).

---
*This project was developed in a web-based IDE environment where TypeScript/JSX compilation is handled automatically.*