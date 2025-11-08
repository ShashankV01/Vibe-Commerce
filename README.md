Vibe Commerce – Full Stack Shopping Cart App
A basic yet complete full-stack shopping cart application built for Vibe Commerce screening.
This app demonstrates UI, API, and database integration for e-commerce flows like product listing, add/remove from cart, checkout, and mock receipt generation.

<img width="1514" height="1135" alt="Screenshot 2025-11-08 172942" src="https://github.com/user-attachments/assets/53f48e00-4fc7-40df-94b0-1f8206eb5d2a" />
Features:
Product Catalog: Displays a grid of products fetched from the backend.
Database Seeding: Automatically seeds the database with 10 products from the Fake Store API on first launch.
Add to Cart: Users can add products to their shopping cart.
View Cart: A dedicated cart page shows all items, quantities, and the total price.
Remove from Cart: Users can remove items from their cart.
Mock Checkout: A simple checkout form captures user details (name, email) and simulates order placement.
Order Receipt: Displays a (mock) order confirmation receipt in a modal after checkout.
Responsive Design: The frontend is styled with Tailwind CSS and is responsive for mobile and desktop.

Installation & Setup
Prerequisites:Node.js(v16+), npm (v8+), Git (for version control)

Backend Setup:
Open a terminal and navigate to the backend folder:
cd backend

Install dependencies:
npm install

Initialize the SQLite database with sample products:
npm run seed

Start the backend server:
npm run dev
Runs at → http://localhost:5000

Frontend Setup:
Open a new terminal and go to the frontend folder:
cd frontend

Install dependencies:
npm install

Start the development server:
npm start
Frontend runs at → http://localhost:3000

Technical stack:
| Layer                | Technology                 | Description                                   |
| -------------------- | -------------------------- | --------------------------------------------- |
| **Frontend**         | React, Axios, React Modal  | SPA for UI, cart operations, checkout         |
| **Backend**          | Node.js, Express.js        | REST API layer handling cart & checkout logic |
| **Database**         | SQLite (via Sequelize ORM) | Stores products and cart items                |
| **Testing**          | Jest + Supertest           | Automated backend API integration tests       |
| **Optional (Bonus)** | Fake Store API Integration | Alternative dynamic products source           |
| **Version Control**  | GitHub                     | Repository & workflow verification            |

