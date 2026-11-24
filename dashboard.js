// Dashboard UI — reads live learner data from curriculum.js
(function () {
    function renderPendingTasks(listEl, tasks) {
        if (!listEl) return;
        listEl.innerHTML = '';
        if (!tasks.length) {
            listEl.innerHTML = '<li class="text-sm text-gray-600">No pending tasks. Great progress!</li>';
            return;
        }
        tasks.forEach(function (task) {
            const li = document.createElement('li');
            li.className = 'flex items-center';
            li.innerHTML = '<span class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>' + task;
            listEl.appendChild(li);
        });
    }

    function renderRiskFlags(containerEl, flags) {
        if (!containerEl) return;
        containerEl.innerHTML = '';
        if (!flags.length) {
            containerEl.classList.add('hidden');
            return;
        }
        containerEl.classList.remove('hidden');
        flags.forEach(function (flag) {
            const div = document.createElement('div');
            div.className = 'bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm mb-2';
            div.textContent = flag;
            containerEl.appendChild(div);
        });
    }

    function renderDashboard() {
        if (!window.curriculum || !window.app) return;

        const stats = curriculum.getDashboardStats();
        const progressPercentEl = document.getElementById('progressPercent');
        const progressBarEl = document.getElementById('progressBar');
        const progressTextEl = document.getElementById('progressText');
        const pendingTasksListEl = document.getElementById('pendingTasksList');
        const currentModuleNameEl = document.getElementById('currentModuleName');
        const currentModuleFocusEl = document.getElementById('currentModuleFocus');
        const currentModuleMetaEl = document.getElementById('currentModuleMeta');
        const riskFlagsEl = document.getElementById('riskFlags');
        const statsSummaryEl = document.getElementById('statsSummary');

        const percent = stats.progressPercent;

        if (progressPercentEl) progressPercentEl.textContent = app.formatPercent(percent, 0);
        if (progressBarEl) progressBarEl.style.width = percent + '%';
        if (progressTextEl) {
            progressTextEl.textContent =
                stats.completedModules + ' of ' + stats.totalModules + ' modules completed' +
                ' | Day ' + stats.student.currentDay + ' of ' + stats.totalDays +
                ' | ' + stats.daysCompleted + ' days completed';
        }

        renderPendingTasks(pendingTasksListEl, stats.pendingTasks);

        if (currentModuleNameEl) {
            currentModuleNameEl.textContent = stats.currentModule
                ? 'Chapter ' + stats.currentChapter + ': ' + stats.currentLesson
                : stats.currentLesson;
        }
        if (currentModuleFocusEl) currentModuleFocusEl.textContent = stats.currentFocus;
        if (currentModuleMetaEl) {
            currentModuleMetaEl.textContent =
                'Remaining modules: ' + stats.remainingModules +
                ' | Streak: ' + stats.currentStreak + ' day(s)' +
                ' | Last activity: ' + (stats.lastActivity ? app.formatDate(stats.lastActivity) : 'Today');
        }

        renderRiskFlags(riskFlagsEl, stats.riskFlags);

        if (statsSummaryEl) {
            statsSummaryEl.textContent =
                'Total modules: ' + stats.totalModules +
                ' | Pending tasks: ' + stats.pendingTasks.length +
                ' | Completion: ' + app.formatPercent(stats.averageProgress, 0);
        }
    }

    function bindMarkDayButton() {
        const btn = document.getElementById('markDayCompleteBtn');
        if (!btn) return;
        btn.addEventListener('click', function () {
            curriculum.markDayCompleted(0);
            renderDashboard();
        });
    }

    function renderUserProfile() {
        const token = localStorage.getItem('token') || localStorage.getItem('gst_token') || sessionStorage.getItem('token');
        const userJson = localStorage.getItem('user') || localStorage.getItem('gstUser');
        
        if (!token) {
            // Unauthenticated user attempting to access dashboard
            window.location.href = 'login.html';
            return;
        }

        let user = { name: 'Student Learner', email: 'student@gstportal.com', id: 1 };
        if (userJson) {
            try {
                user = JSON.parse(userJson);
            } catch (e) {}
        }

        const userNameEl = document.getElementById('studentProfileName');
        const userEmailEl = document.getElementById('studentProfileEmail');
        const userBadgeEl = document.getElementById('studentProfileBadge');

        if (userNameEl) userNameEl.textContent = user.name || 'GST Student';
        if (userEmailEl) userEmailEl.textContent = user.email || '';
        if (userBadgeEl) userBadgeEl.textContent = user.role ? user.role.toUpperCase() : 'STUDENT ENROLLED';
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!document.getElementById('progressPercent')) return;
        renderUserProfile();
        renderDashboard();
        bindMarkDayButton();
    });

    document.addEventListener('gst:progressUpdated', renderDashboard);
    window.addEventListener('storage', function (e) {
        if (e.key === 'gstStudents') renderDashboard();
    });

    window.dashboard = { 
        renderDashboard: renderDashboard,
        renderUserProfile: renderUserProfile 
    };
})();
