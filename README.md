# GST Practical Simulator & Training Portal

An interactive, full-stack educational simulation platform designed for accounting students, finance interns, and tax practitioners (B.Com, M.Com, MBA, CA/CMA/CS aspirants) to bridge the gap between theoretical tax rules and real-world compliance workflows. It provides guided practical modules for GST registration, sales invoicing, e-way bills, 18-step accounting simulation, GSTR-1 / 3B returns preparation, 10 industry practice labs, 8 industry case studies, and an integrated 24/7 AI Tutor.

Developed by **Code Crafter Hub** — *Crafting Digital Success.*

---

## 🛠️ Tech Stack

- **Primary Entry**: `index.html` (at project root)
- **Frontend Architecture**:
  - `frontend/pages/`: 30 Secondary screens (Learner Dashboard, Simulators, Chapters 1–7, Returns, AI Tutor)
  - `frontend/css/`: Modular Vanilla CSS (`style.css`) + Tailwind CSS layout tokens
  - `frontend/js/`: 16 Dedicated client controllers (Universal Navigation, Simulator Engine, AI Tutor, GST Calculations)
  - `frontend/images/` & `frontend/assets/`: Logos, presentation slides, diagrams
- **Backend Architecture**: PHP 7.4+ / 8.0+ RESTful JSON API endpoints (`backend/api/`)
- **Database**: MySQL 5.7+ / MariaDB (`database/database.sql` preserving existing student records)
- **Authentication**: Bearer Token Architecture & Local Storage session persistence

---

## 📂 Restructured Project Architecture

```text
GST-Training-Portal/
│
├── index.html                   # PRIMARY ROOT ENTRY POINT (Portal Landing & Curriculum)
├── run.bat                      # 1-Click Windows Development Startup Script
├── config.php                   # Environment & Database Configuration Loader
├── .env.example                 # Environment Variable Template
├── .env                         # Local Environment Settings
├── README.md                    # Project Architecture & Setup Guide
│
├── frontend/                    # PRESENTATION LAYER
│   ├── pages/                   # All 30 secondary views & simulator modules
│   │   ├── dashboard.html       # Learner Progress & Activity Dashboard
│   │   ├── simulator.html       # 18-Step Interactive Accounting & GST Lab
│   │   ├── gst-portal.html      # Simulated Government GST Portal
│   │   ├── practice-labs.html   # 10 Industry Practice Labs
│   │   ├── case-studies.html    # 8 Industry Real-World Case Studies
│   │   ├── ai-tutor.html        # 24/7 AI GST Teacher & Viva Examiner
│   │   ├── gst-laws.html        # Central GST Acts, Rules & Schedules
│   │   ├── chapter-1.html ...   # Structured Theory Chapters (1 to 7)
│   │   ├── gstr3b.html          # GSTR-3B Monthly Return Filing Practice
│   │   ├── einvoice.html        # E-Invoice Portal Simulation
│   │   ├── invoice_sales.html   # Sales Tax Invoice Generator
│   │   ├── login.html           # Standalone Authentication Page
│   │   ├── register.html        # Student Account Registration Page
│   │   └── ...                  # Resources (blog, news, downloads, help, search)
│   ├── css/
│   │   └── style.css            # Master Design System, Grid Layouts & Themes
│   ├── js/
│   │   ├── navigation.js        # Master 7-Pillar SaaS Navbar & Route Highlighter
│   │   ├── simulator.js         # 18-Step Tally-Style Simulation Engine
│   │   ├── ai_tutor.js          # AI Tutor, Viva Engine & Practice Question Gen
│   │   ├── portal_sim.js        # Government Portal Interactive Engine
│   │   ├── practice_labs.js     # Industry Lab Controller & Scorekeeper
│   │   ├── case_studies.js      # Business Case Solution Engine
│   │   ├── app.js               # Central Tax Calculation & Route Guard
│   │   └── dashboard.js         # Student Statistics & Streak Tracker
│   ├── images/                  # Official Logos (Code Crafter Hub, GST) & Media
│   └── assets/                  # Training PPTX Slide Decks & Reference PDFs
│
├── backend/                     # APPLICATION & API LAYER
│   ├── auth.php                 # Bearer Token Authenticator
│   ├── db.php                   # MySQLi Database Connector
│   ├── login.php                # Student Authentication Endpoint
│   ├── register.php             # Student Registration Endpoint
│   └── api/                     # RESTful Service Endpoints
│       ├── simulator.php        # State persistence for 18 simulator steps
│       ├── ai_tutor.php         # AI Tutor prompt routing & analysis
│       ├── save_mock_attempt.php# Mock examination recorder
│       ├── get_mock_attempts.php# Examination history fetcher
│       ├── contact.php          # Student support inquiry handler
│       ├── fetch.php            # Administrative record reader
│       ├── insert.php           # Record creator
│       ├── update.php           # Record modifier
│       └── delete.php           # Record remover
│
└── database/
    └── database.sql             # Preserved MySQL Schema (9 relational tables)
```

---

## 🚀 Quick Startup Guide

### **Option 1: 1-Click Startup (Windows)**
Double-click `run.bat` in the project root directory. It will:
1. Detect PHP.
2. Launch the PHP built-in server on `http://localhost:8000`.
3. Automatically open your browser to the root `index.html`.

### **Option 2: Manual Terminal Startup**
1. **Start MySQL Database** in XAMPP (`C:\xampp\xampp-control.exe`).
2. **Import Database Schema** (if not already imported):
   ```powershell
   C:\xampp\mysql\bin\mysql.exe -u root -e "source d:\Users\Alpesh\business\9. PORTFOLIO\PORTFOLIO\assets\Projects\PROJECT.3 GST AND IT FIILLING\database\database.sql"
   ```
3. **Start the Development Server** from project root:
   ```bash
   php -S localhost:8000
   ```
4. Open your browser to: `http://localhost:8000/index.html`

---

## 🔑 Default Credentials

- **Admin/Demo Account**: `admin@gstportal.com`
- **Password**: `admin123`
- *New students can register freely via `frontend/pages/register.html`.*

---

## 🌐 Server & Production Deployment

### **Deployment to Shared Hosting / cPanel (Apache)**
1. Upload the entire project directory to `public_html/`.
2. The root `index.html` acts as the immediate default landing page.
3. In cPanel > MySQL Databases, create `gst_portal_db` and import `database/database.sql`.
4. Update `.env` or `config.php` with your production DB credentials.

### **Deployment to VPS / Nginx / Linux Server**
Point the Nginx `root` directive to the project root directory:
```nginx
server {
    listen 80;
    server_name gstportal.yourdomain.com;
    root /var/www/gst-portal;
    index index.html index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
    }

    location ~ /\.(env|git|htaccess) {
        deny all;
    }
}
```

---
© 2026 Goods and Services Tax Network (GSTN) Educational Simulation Portal.  
Designed and Developed by **Code Crafter Hub**.
