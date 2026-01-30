# 🍽️ TasteTrail – Personalized Recipe Recommendation & Smart Meal Planner

TasteTrail is a full-stack web application designed to help users discover recipes, plan meals efficiently, track cooking activities, and receive personalized food recommendations.  
The system focuses on improving everyday cooking decisions using data-driven insights and smart automation.

---

## 🔐 Admin Credentials
- **Admin Email:** khairul@gmail.com 
- **Admin Password:** 123456 

---

## 🔐 user Credentials
- **user Email:** sristy@gmail.com 
- **user Password:** 123456 

---

## 🚀 Project Overview

TasteTrail provides an interactive platform where users can:

- Discover and search recipes
- Plan weekly meals
- Track cooking progress
- Submit reviews and ratings
- Receive personalized food suggestions

Admins manage platform content including recipes, categories, users, and reviews.

---

## 🎯 Project Objectives

- Develop a secure authentication-based web application  
- Implement recipe discovery and management functionality  
- Create a personalized recommendation system  
- Enable meal planning and cooking tracking  
- Design a responsive and user-friendly interface  
- Apply real-world full-stack development practices  

---

## 🏗️ System Architecture

### Technology Stack

| Layer        | Technology |
|-------------|------------|
| Frontend    | Next.js & Typescript |
| Backend     | Node.js, Express.js |
| Database    | MongoDB |
| Authentication | JWT / Session |
| Hosting     | Vercel (Frontend), Cloud Hosting (Backend) |
| Charts      | Chart.js / Recharts |

---

## 👥 User Roles & Permissions

### 🔑 Admin Role

Admins manage platform content.

**Core Responsibilities**

- Recipe management (Create, Read, Update, Delete)
- Category and cuisine management
- Review moderation
- User role management
- Featured recipe control

---

### 👤 Normal User Role

Users interact with the system for cooking and planning.

**Core Capabilities**

- Browse and search recipes
- Save recipes to personal cookbook
- Weekly meal planning
- Cooking progress tracking
- Review and rating submission

---

## 🔐 Authentication & Security

### Registration Requirements

Users must register using:

- Full name  
- Email  
- Profile photo  
- Password  

### Security Measures

- Password encryption
- Input validation
- Duplicate email prevention
- Secure token/session handling

---

### Login Process

Users log in using email and password.  
Successful authentication grants role-based access.

---

## 🛡️ Route Protection & Navigation Logic

### Protected Routes

- All dashboard pages require authentication
- Unauthenticated users are redirected to Login

### Default Redirect Rules

| User Role | Redirect Page |
|----------|---------------|
| Normal User | User Dashboard |
| Admin | Admin Dashboard |

---

## 📦 Core Functional Modules

### 7.1 Recipe Management (Admin)

Admins can:

- Create recipes (name, ingredients, instructions, category, cuisine, cooking time, calories, image)
- Edit recipes
- Delete recipes with confirmation

---

### 7.2 Category & Cuisine Management (Admin)

- Add new categories
- Edit existing categories
- Assign recipes to valid categories

---

### 7.3 Review & Rating System

- Users submit reviews and ratings
- Reviews remain pending until admin approval
- Approved reviews become publicly visible

---

### 7.4 Recipe Discovery & Search

Users can:

- Search by recipe name or ingredient
- Filter by category and cuisine
- Browse recipes with pagination or infinite scroll

---

## ⚙️ Installation & Setup

### Frontend

```bash
npm install
npm run dev
