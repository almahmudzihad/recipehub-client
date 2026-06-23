# RecipeHub — Recipe Sharing Platform 🍲

RecipeHub is a full-stack recipe sharing platform where users can discover, share, favorite, purchase premium recipes, and upgrade to premium membership. The platform includes role-based dashboards, JWT authentication, Stripe payment integration, recipe reporting, favorites management, and featured recipe functionality.

## 🌐 Live Links

### Client Side

https://recipehub-client-five.vercel.app/

### Server Side

https://recipehub-server-lake.vercel.app/

---

## 📂 Repository Links

### Client Repository

https://github.com/almahmudzihad/recipehub-client

### Server Repository

https://github.com/almahmudzihad/recipehub-server

---

## 🔑 Admin Credentials

Email: [admin@example.com](mailto:admin@example.com)

Password: Admin123

---

## ✨ Key Features

### Public Features

* Browse all recipes
* Search recipes by title
* Filter recipes by category and cuisine
* View recipe details
* Featured Recipes section
* Popular Recipes section
* Responsive design for all devices

### Authentication & Security

* Email & Password Authentication
* Google Authentication
* JWT Token Based Authorization
* Protected Routes
* Role-Based Access Control
* Unauthorized Access Handling

### User Features

* Create Recipes
* Update Recipes
* Delete Recipes
* Add Recipes to Favorites
* View Favorite Recipes
* Report Recipes
* Purchase Premium Recipes
* Purchase Membership
* View Purchased Recipes
* Dashboard Statistics
* Update Profile Information

### Premium Features

* Premium users can create unlimited recipes
* Free users can create only 2 recipes
* Premium Membership activation after successful payment
* Access premium content

### Admin Features

* Dashboard Analytics
* Manage Users
* Block Users
* Unblock Users
* Manage Recipes
* Delete Recipes
* Feature Recipes
* Manage Reports
* Remove Reported Recipes
* Dismiss Reports
* View Transaction History

### Payment Features

* Stripe Checkout Integration
* Membership Purchase
* Recipe Purchase
* Payment Tracking
* Transaction History
* Premium Activation

---

## 🏗️ Technologies Used

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
* JWT

### Payment

* Stripe Checkout

### Image Hosting

* ImgBB

---

## 🗄️ Database Collections

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

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/almahmudzihad/recipehub-client
git clone https://github.com/almahmudzihad/recipehub-server
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
npm run dev
```

---

## ⚙️ Environment Variables

### Client (.env.local)

```env
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
```

### Server (.env)

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
```

---

## 📈 Future Improvements

* Recipe Comments
* Recipe Ratings & Reviews
* AI Recipe Suggestions
* Email Notifications
* Stripe Webhooks
* Personalized Recommendations
* Recipe Collections
* Social Sharing

---

## 👨‍💻 Developer

### Al Mahmud Zihad

Full Stack Web Developer

* Frontend Development
* Backend Development
* REST API Development
* Authentication & Authorization
* Database Design
* Payment Integration
* UI/UX Design
* Testing & Debugging
* Deployment & Maintenance