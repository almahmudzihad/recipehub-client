# RecipeHub 🍲

RecipeHub is a full-stack recipe sharing platform where users can discover, share, favorite, and purchase premium recipes. The platform includes role-based dashboards for users and admins, premium membership functionality, Stripe payment integration, recipe reporting, and featured recipes management.

## Live Website

Client: [Add Client URL Here]

Server: [Add Server URL Here]

## Admin Credentials

Email: [admin@example.com](mailto:admin@example.com)

Password: Admin123

> Replace with your actual admin credentials before submission.

---

## Features

### Public Features

* Browse all recipes
* Search recipes by title
* Filter recipes by category and cuisine
* View featured recipes on the homepage
* View popular recipes based on likes
* Responsive design for mobile, tablet, and desktop

### User Features

* User authentication and authorization
* Create and manage personal recipes
* Add recipes to favorites
* Report inappropriate recipes
* Purchase premium recipes using Stripe
* Upgrade to Premium Membership
* View purchased recipes
* Dashboard statistics
* Profile management

### Admin Features

* Dashboard overview
* Manage users
* Block and unblock users
* Manage recipes
* Edit recipes
* Delete recipes
* Feature recipes on homepage
* Manage reported recipes
* Remove recipes
* Dismiss reports
* View transaction history

### Premium Features

* Premium users can create unlimited recipes
* Free users can create up to 2 recipes
* Premium membership activation after payment

### Payment System

* Stripe Checkout Integration
* Membership Purchase
* Recipe Purchase
* Transaction Tracking
* Payment History

---

## Technologies Used

### Frontend

* Next.js 15
* React
* Tailwind CSS
* HeroUI
* React Icons
* React Toastify
* React Spinners
* Next Themes

### Backend

* Node.js
* Express.js
* MongoDB
* MongoDB Atlas

### Authentication

* Better Auth

### Payment

* Stripe Checkout

---

## Database Collections

### Users

* name
* email
* image
* role
* isPremium
* isBlocked

### Recipes

* title
* image
* ingredients
* instructions
* cuisine
* prepTime
* category
* difficulty
* likes
* userName
* userEmail
* isFeatured

### Favorites

* userEmail
* recipeId

### Reports

* recipeId
* reporterEmail
* reason

### Payments

* userEmail
* userId
* recipeId
* amount
* transactionId
* paymentStatus
* paymentType
* paidAt

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Client Setup

```bash
cd recipehub-client
npm install
npm run dev
```

### Server Setup

```bash
cd recipehub-server
npm install
nodemon index.js
```

---

## Environment Variables

### Client (.env.local)

```env
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
```

### Server (.env)

```env
PORT=5000
MONGODB_URI=
STRIPE_SECRET_KEY=
```

---

## Future Improvements

* Recipe comments and reviews
* Recipe rating system
* Recipe recommendation engine
* Email notifications
* Stripe Webhooks
* AI recipe generation

---

## Author

Al Mahmud Zihad

Full Stack Web Developer
