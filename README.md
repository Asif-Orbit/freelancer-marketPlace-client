# 🌐 Freelance MarketPlace

**Freelance MarketPlace** is a modern full-stack web application that connects **clients** and **freelancers** to post, browse, and manage freelance jobs seamlessly.  
Built with **React**, **Tailwind CSS**, **DaisyUI**, **Node.js**, and **MongoDB**, it focuses on simplicity, reliability, and elegant design.

---

## 🚀 Live Demo

🔗 **Frontend:** [https://freelance-marketplace-01.netlify.app](https://freelance-marketplace-01.netlify.app])  
🔗 **Backend API:** [https://freelancer-market-place-server.vercel.app/](https://freelancer-market-place-server.vercel.app/)

---

## 🧭 Table of Contents

1. [✨ Features](#-features)
2. [🛠️ Tech Stack](#️-tech-stack)
3. [📁 Folder Structure](#-folder-structure)
4. [⚙️ Environment Variables](#️-environment-variables)
5. [💼 Key Functionalities](#-key-functionalities)
6. [🌙 Theme System](#-theme-system)
7. [🔒 Security & Validation](#-security--validation)



---

## ✨ Features

### 🏠 **Home Page**
- Elegant animated **banner** with call-to-action buttons (`Create Job`, `Why Reliable`)
- **Dynamic Latest Jobs Section** → Fetches latest 6 jobs from MongoDB
- **Static Sections**:
  - 🧩 **Top Categories** (Web Dev, UI/UX, Marketing, etc.)
  - 💡 **About Freelance MarketPlace** with motion animations and platform statistics
- Integrated **Dark/Light Theme Toggle**
- Fully **responsive** for all screen sizes (mobile → desktop)

---

### 💼 **Job Management**
- View all jobs dynamically with **sort by date/time**
- **Add new jobs** with:
  - Title, Category, Summary, Cover Image
  - Auto-filled fields: Posted By, User Email
  - Auto-generated timestamp (server-side)
- **Update & Delete** own jobs (restricted to job owner)
- Each job detail includes **category, description, date, and poster info**

---

### 🧾 **My Added Jobs**
- Displays all jobs added by the logged-in user
- Toggle between **Grid View** and **Table View**
- Supports **update** and **delete** actions
- SweetAlert2 confirmation before deletion
- Instantly updates UI upon modification

---

### ✅ **Accepted Tasks**
- Accept jobs posted by other users only
- Prevents accepting self-posted jobs
- Displays accepted tasks in a clean layout
- Buttons:
  - `✅ DONE` → marks task complete (removes from UI & DB)
  - `❌ CANCEL` → removes task from UI & DB immediately

---

### ⚙️ **Server-Side Features**
- Built with **Express + MongoDB**
- RESTful APIs:
  - `GET /allJobs`
  - `GET /allJobs/:id`
  - `POST /allJobs`
  - `DELETE /allJobs/:id`
  - `GET /myAddedJobs?email=user@example.com`
  - `POST /acceptedTasks`
  - `DELETE /acceptedTasks/:id`
- Auto-adds `postedAt: new Date()` on creation
- Handles errors with clear status codes

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Purpose |
|-------------|----------|
| ⚛️ React (Vite) | Core UI framework |
| 🎨 Tailwind CSS + DaisyUI | Styling and theming |
| 💫 Framer Motion | Animations |
| 🔄 Axios | API requests |
| 🔔 React Toastify / SweetAlert2 | Notifications & alerts |
| 🧭 React Router | Routing |
| 🔌 Context API | Auth & global state |

### **Backend**
| Technology | Purpose |
|-------------|----------|
| 🧩 Node.js + Express | API and server |
| 🍃 MongoDB Atlas | Database |
| ⚙️ dotenv | Environment configuration |
| 🧱 CORS + Middleware | Secure requests |
| 🕒 Server-side timestamps | Job posting date/time |


