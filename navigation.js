// js/navigation.js
// Universal Navigation Bar & Information Architecture Controller

(function () {
    document.addEventListener("DOMContentLoaded", () => {
        highlightActiveNavRoute();
        initDropdownHover();
        checkUserSessionNav();
    });

    // 1. Highlight Active Route in Navbar
    function highlightActiveNavRoute() {
        const path = window.location.pathname.toLowerCase();
        const navItems = document.querySelectorAll(".nav-item");

        navItems.forEach(item => {
            const navType = item.dataset.nav;
            if (!navType) return;

            let isActive = false;

            if (navType === "home" && (path.endsWith("index.html") || path.endsWith("/") || path === "")) {
                isActive = true;
            } else if (navType === "learn" && (path.includes("chapter-") || path.includes("gst-laws"))) {
                isActive = true;
            } else if (navType === "practice" && (path.includes("simulator") || path.includes("practice-labs") || path.includes("invoice_sales") || path.includes("services.html"))) {
                isActive = true;
            } else if (navType === "compliance" && (path.includes("gst-portal") || path.includes("gstr3b") || path.includes("einvoice") || path.includes("gst_registration"))) {
                isActive = true;
            } else if (navType === "case-studies" && path.includes("case-studies")) {
                isActive = true;
            } else if (navType === "ai-tutor" && path.includes("ai-tutor")) {
                isActive = true;
            } else if (navType === "resources" && (path.includes("blog") || path.includes("news") || path.includes("downloads") || path.includes("help") || path.includes("income_tax") || path.includes("search.html") || path.includes("about.html") || path.includes("contact.html"))) {
                isActive = true;
            }

            if (isActive) {
                item.classList.add("bg-blue-800", "text-amber-400", "font-bold");
            }
        });
    }

    // 2. Desktop Dropdown hover enhancements
    function initDropdownHover() {
        const containers = document.querySelectorAll(".dropdown-container");
        containers.forEach(container => {
            const menu = container.querySelector(".dropdown-menu");
            if (!menu) return;

            container.addEventListener("mouseenter", () => {
                menu.classList.remove("hidden");
            });

            container.addEventListener("mouseleave", () => {
                menu.classList.add("hidden");
            });
        });
    }

    // 3. User Session Checker
    function checkUserSessionNav() {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token") || localStorage.getItem("gst_token");
        const authContainer = document.getElementById("nav-auth-container");
        if (!authContainer) return;

        const isRoot = window.location.pathname.endsWith("index.html") || !window.location.pathname.includes("/pages/");
        const dashLink = isRoot ? "frontend/pages/dashboard.html" : "dashboard.html";
        const loginLink = isRoot ? "frontend/pages/login.html" : "login.html";

        if (token) {
            authContainer.innerHTML = `
                <a href="${dashLink}" class="bg-blue-800 hover:bg-blue-700 text-amber-300 font-bold px-3.5 py-1.5 rounded-lg border border-blue-600 transition flex items-center gap-1.5 shadow-sm text-xs">
                    <span>📊</span> Dashboard
                </a>
                <button onclick="handleNavLogout()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-lg text-xs transition border border-slate-700">
                    Sign Out
                </button>
            `;
        }
    }

    window.handleNavLogout = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("gst_token");
        localStorage.removeItem("user");
        localStorage.removeItem("gstUser");
        sessionStorage.removeItem("token");
        
        const isRoot = window.location.pathname.endsWith("index.html") || !window.location.pathname.includes("/pages/");
        window.location.href = isRoot ? "frontend/pages/login.html" : "login.html";
    };

    // 4. Mobile Drawer Controls
    window.toggleMobileNavMenu = function () {
        const drawer = document.getElementById("mobile-nav-drawer");
        if (drawer) {
            drawer.classList.toggle("hidden");
        }
    };

    window.toggleMobileAccordion = function (subId) {
        const sub = document.getElementById(subId);
        if (sub) {
            sub.classList.toggle("hidden");
        }
    };
})();
