# Mool Gyan Application: Technical Overview

This is a modern, full-stack web application built to be fast, reliable, and easy to manage. It functions as a **Progressive Web App (PWA)**, meaning it can be installed on a user's phone or computer like a native app and has offline capabilities.

**Application Type:**
*   **Full-Stack Web Application** using the Next.js framework.
*   **Serverless Architecture:** It relies on Google's Firebase services for all backend functionality, meaning we don't have to manage a traditional server.
*   **Progressive Web App (PWA):** It's designed to be installable on devices, work offline, and send push notifications.

**Core Technologies Used:**

1.  **Frontend Framework:**
    *   **Next.js (with React):** A powerful framework for building fast and user-friendly web applications. We use its latest "App Router" feature for efficient page loading and organization.
    *   **React:** The core library for building the user interface with reusable components.
    *   **TypeScript:** A programming language that adds type safety to JavaScript, which helps prevent bugs and makes the code more reliable.

2.  **Styling and User Interface (UI):**
    *   **Tailwind CSS:** A modern CSS framework that allows for rapid styling directly in the code.
    *   **ShadCN UI:** A collection of beautifully designed and accessible UI components (like buttons, cards, and forms) that are built on top of Tailwind CSS. This ensures a consistent and professional look and feel.

3.  **Backend Services (via Google Firebase):**
    *   **Firebase Hosting:** The service used to deploy and serve the live web application to users around the world.
    *   **Firestore Database:** A flexible and scalable NoSQL database used to store all the app's data, such as book information, user orders, news articles, and photo gallery details.
    *   **Firebase Authentication:** Manages the secure login system, specifically for the administrator to access the management dashboard.
    *   **Cloud Storage for Firebase:** Used to store all the media files for the app, including book cover images, photo gallery pictures, and uploaded videos.
    *   **Firebase Cloud Messaging (FCM):** Powers the push notification system, allowing the admin to send updates to all subscribed users.

4.  **Deployment:**
    *   The application is configured to be deployed directly to **Firebase Hosting** with a single command (`firebase deploy`), which handles building the Next.js app and pushing it live.
