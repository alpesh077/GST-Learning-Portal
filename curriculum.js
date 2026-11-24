// Curriculum data and learner progress — shared by dashboard and syllabus views
(function () {
    const STORAGE_KEY = 'gstStudents';
    const TOTAL_CURRICULUM_DAYS = 48;

    const modules = [
        {
            name: 'GST Foundation',
            chapter: 1,
            days: [1, 6],
            focus: 'Tax flow logic, CGST/SGST/IGST, supply concept',
            dailyTasks: [
                'Explain concept using money-flow examples',
                'Conduct oral questioning (who pays / who claims / who gets tax)',
                'Assign 15-20 case scenarios for classification & calculation'
            ],
            pendingTrigger: "Student can't identify tax type -> mark 'Foundation Weak'"
        },
        {
            name: 'GST Registration',
            chapter: 2,
            days: [7, 12],
            focus: 'Eligibility, REG-01, documents, schemes',
            dailyTasks: [
                'Walk through REG-01 step-by-step',
                'Document checklist creation',
                'Scheme selection decision cases'
            ],
            pendingTrigger: "Student selects wrong scheme -> mark 'Registration Logic Gap'"
        },
        {
            name: 'GST Invoicing',
            chapter: 3,
            days: [13, 18],
            focus: 'Invoice structure, HSN/SAC, RCM',
            dailyTasks: [
                'Manual invoice creation',
                'B2B vs B2C identification',
                'Error correction drills'
            ],
            pendingTrigger: 'Invoice missing mandatory fields -> mark \'Compliance Risk\''
        },
        {
            name: 'Input Tax Credit',
            chapter: 4,
            days: [19, 24],
            focus: 'ITC eligibility, GSTR-2B, reversals',
            dailyTasks: [
                'ITC eligibility sorting',
                '2B matching practice',
                'Reversal calculations'
            ],
            pendingTrigger: "Wrong ITC claim logic -> mark 'High Audit Risk'"
        },
        {
            name: 'GST Returns',
            chapter: 5,
            days: [25, 30],
            focus: 'GSTR-1, GSTR-3B, tax payment',
            dailyTasks: [
                'Table-wise return understanding',
                '1 vs 3B reconciliation',
                'Late fee & interest calculations'
            ],
            pendingTrigger: "Mismatch not identified -> mark 'Return Filing Error'"
        },
        {
            name: 'Advanced & Compliance',
            chapter: 6,
            days: [31, 36],
            focus: 'E-way bill, LUT, notices, audit basics',
            dailyTasks: [
                'Compliance flow diagrams',
                'Notice reading practice',
                'Audit checklist creation'
            ],
            pendingTrigger: "Student panics on notice -> mark 'Compliance Handling Weak'"
        },
        {
            name: 'Portal & Software Practical',
            chapter: 7,
            days: [37, 42],
            focus: 'Real GST portal usage, Excel prep',
            dailyTasks: [
                'Portal navigation drill',
                'Excel -> GST workflow',
                'Error fixing simulation'
            ],
            pendingTrigger: "Student stuck on portal -> mark 'Execution Gap'"
        },
        {
            name: 'Real-World Simulation',
            chapter: 8,
            days: [43, 48],
            focus: 'End-to-end client cases',
            dailyTasks: [
                'Trader / Service / Manufacturer case filing',
                'Client communication drafts',
                'Freelancing GST workflow'
            ],
            pendingTrigger: "Can't complete case independently -> mark 'Not Job Ready'"
        }
    ];

    function todayISO() {
        return new Date().toISOString().split('T')[0];
    }

    function getStorageKey() {
        const userStr = localStorage.getItem('gstUser');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user && user.email) {
                    return STORAGE_KEY + '_' + btoa(user.email);
                }
            } catch (e) {}
        }
        return STORAGE_KEY;
    }

    function loadStudents() {
        return JSON.parse(localStorage.getItem(getStorageKey()) || '[]');
    }

    function saveStudents(students) {
        localStorage.setItem(getStorageKey(), JSON.stringify(students));
        document.dispatchEvent(new CustomEvent('gst:progressUpdated'));
    }

    function ensureActiveLearner() {
        const students = loadStudents();
        if (students.length) return students[0];

        const learner = {
            name: 'Learner',
            startDate: todayISO(),
            currentDay: 1,
            lastActivityDate: todayISO(),
            completedTasks: [],
            pendingTasks: []
        };
        saveStudents([learner]);
        return learner;
    }

    function getActiveLearner() {
        const students = loadStudents();
        return students.length ? students[0] : ensureActiveLearner();
    }

    function recordActivity(student) {
        student.lastActivityDate = todayISO();
        return student;
    }

    function getDaysSinceStart(startDate) {
        const start = new Date(startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        const diffTime = today - start;
        return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
    }

    function getCurrentModule(day) {
        for (let i = 0; i < modules.length; i++) {
            const mod = modules[i];
            if (day >= mod.days[0] && day <= mod.days[1]) return mod;
        }
        return null;
    }

    function getCompletedModuleCount(day) {
        return modules.filter(function (mod) {
            return day > mod.days[1];
        }).length;
    }

    function getRemainingModuleCount(day) {
        return modules.length - getCompletedModuleCount(day) - (getCurrentModule(day) ? 1 : 0);
    }

    function getProgressPercent(day) {
        const completed = getCompletedModuleCount(day);
        if (day > TOTAL_CURRICULUM_DAYS) return 100;
        return app.calculatePercent(completed, modules.length);
    }

    function getDaysCompleted(day) {
        return Math.max(0, Math.min(day - 1, TOTAL_CURRICULUM_DAYS));
    }

    function getPendingTasks(student) {
        const mod = getCurrentModule(student.currentDay);
        if (!mod) return ['Review completed curriculum and attempt mock test'];

        const tasks = mod.dailyTasks.slice();
        const currentModIndex = modules.indexOf(mod);

        if (currentModIndex >= 2 && student.currentDay >= 13) {
            tasks.push('Complete Invoice Practice');
        }
        if (currentModIndex >= 4 && student.currentDay >= 25) {
            tasks.push('Review GSTR-3B Filing');
        }
        if (currentModIndex >= 1 && student.currentDay >= 7) {
            tasks.push('Practice Registration');
        }

        return tasks.filter(function (task, index, list) {
            return list.indexOf(task) === index;
        });
    }

    function getDaysSinceLastActivity(student) {
        if (!student.lastActivityDate) return 0;
        const last = new Date(student.lastActivityDate);
        const today = new Date();
        last.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return Math.floor((today - last) / (1000 * 60 * 60 * 24));
    }

    function getCurrentStreak(student) {
        const expectedDay = getDaysSinceStart(student.startDate);
        if (student.currentDay >= expectedDay) {
            return Math.max(1, student.currentDay - 1);
        }
        return Math.max(0, student.currentDay - 1);
    }

    function getRiskFlags(student) {
        const flags = [];
        const pending = getPendingTasks(student);
        const progress = getProgressPercent(student.currentDay);
        const inactiveDays = getDaysSinceLastActivity(student);
        const expectedDay = getDaysSinceStart(student.startDate);

        if (inactiveDays >= 7) {
            flags.push('No activity for ' + inactiveDays + '+ days');
        }
        if (progress < 25 && student.currentDay > 7) {
            flags.push('Low completion rate');
        }
        if (pending.length >= 3) {
            flags.push('Too many pending tasks');
        }
        if (expectedDay > student.currentDay + 2) {
            flags.push('Behind schedule');
        }
        if (pending.length > 0 && inactiveDays >= 3) {
            flags.push('Practice backlog');
        }

        const mod = getCurrentModule(student.currentDay);
        if (mod && mod.pendingTrigger) {
            flags.push(mod.pendingTrigger.replace(/^Student .* -> mark '/, '').replace(/'$/, ''));
        }

        return flags.filter(function (flag, index, list) {
            return list.indexOf(flag) === index;
        });
    }

    function getDashboardStats() {
        const student = getActiveLearner();
        const currentModule = getCurrentModule(student.currentDay);
        const completedModules = getCompletedModuleCount(student.currentDay);
        const remainingModules = Math.max(0, modules.length - completedModules - (currentModule ? 1 : 0));
        const progressPercent = getProgressPercent(student.currentDay);
        const pendingTasks = getPendingTasks(student);
        const riskFlags = getRiskFlags(student);

        return {
            student: student,
            totalModules: modules.length,
            completedModules: completedModules,
            remainingModules: currentModule ? remainingModules : 0,
            progressPercent: progressPercent,
            daysCompleted: getDaysCompleted(student.currentDay),
            totalDays: TOTAL_CURRICULUM_DAYS,
            currentModule: currentModule,
            currentChapter: currentModule ? currentModule.chapter : modules.length,
            currentLesson: currentModule ? currentModule.name : 'Curriculum Completed',
            currentFocus: currentModule ? currentModule.focus : 'All modules completed. Proceed to mock test and revision.',
            pendingTasks: pendingTasks,
            riskFlags: riskFlags,
            currentStreak: getCurrentStreak(student),
            lastActivity: student.lastActivityDate,
            averageProgress: progressPercent
        };
    }

    function markDayCompleted(index) {
        const students = loadStudents();
        if (!students[index]) return;
        students[index].currentDay = Math.min(students[index].currentDay + 1, TOTAL_CURRICULUM_DAYS + 1);
        recordActivity(students[index]);
        saveStudents(students);
    }

    function renderSyllabus() {
        const container = document.getElementById('syllabusList');
        if (!container) return;

        container.innerHTML = '';
        modules.forEach(function (mod, index) {
            const div = document.createElement('div');
            div.className = 'border-b border-gray-200 pb-4';
            div.innerHTML =
                '<h3 class="font-semibold text-blue-600">Chapter ' + (index + 1) + ': ' + mod.name + '</h3>' +
                '<p class="text-sm text-gray-600 mb-2">Days ' + mod.days[0] + '-' + mod.days[1] + '</p>' +
                '<p class="text-sm mb-2"><strong>Focus:</strong> ' + mod.focus + '</p>' +
                '<div class="mb-2"><strong class="text-sm">Topics:</strong><ul class="text-sm list-disc list-inside ml-4">' +
                mod.dailyTasks.map(function (task) { return '<li>' + task + '</li>'; }).join('') +
                '</ul></div>' +
                '<div class="text-sm"><strong>Risk Flag:</strong> ' + mod.pendingTrigger + '</div>';
            container.appendChild(div);
        });
    }

    function renderStudents() {
        const container = document.getElementById('studentsContainer');
        if (!container) return;

        container.innerHTML = '';
        const students = loadStudents();
        students.forEach(function (student, index) {
            const mod = getCurrentModule(student.currentDay);
            const pending = getPendingTasks(student);
            const flags = getRiskFlags(student);
            const div = document.createElement('div');
            div.className = 'bg-white p-6 rounded shadow';
            div.innerHTML =
                '<h3 class="text-xl font-semibold mb-2">' + student.name + '</h3>' +
                '<p>Start Date: ' + student.startDate + '</p>' +
                '<p>Current Day: ' + student.currentDay + '</p>' +
                '<p>Current Module: ' + (mod ? mod.name : 'Completed') + '</p>' +
                '<div class="mt-4"><h4 class="font-medium">Pending Tasks:</h4><ul class="list-disc list-inside">' +
                pending.map(function (task) { return '<li>' + task + '</li>'; }).join('') +
                '</ul></div>' +
                '<div class="mt-4"><h4 class="font-medium">Risk Flags:</h4><ul class="list-disc list-inside">' +
                flags.map(function (flag) { return '<li class="text-red-600">' + flag + '</li>'; }).join('') +
                '</ul></div>' +
                '<button type="button" class="mt-4 bg-green-600 text-white px-4 py-2 rounded" data-student-index="' + index + '">Mark Day Completed</button>';
            container.appendChild(div);
        });

        container.querySelectorAll('[data-student-index]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                markDayCompleted(Number(btn.getAttribute('data-student-index')));
                renderStudents();
            });
        });
    }

    function initStudentForm() {
        const form = document.getElementById('addStudentForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameEl = document.getElementById('studentName');
            const startDateEl = document.getElementById('startDate');
            const students = loadStudents();
            students.push({
                name: nameEl ? nameEl.value : 'Learner',
                startDate: startDateEl ? startDateEl.value : todayISO(),
                currentDay: 1,
                lastActivityDate: todayISO(),
                completedTasks: [],
                pendingTasks: []
            });
            saveStudents(students);
            renderStudents();
            form.reset();
        });
    }

    window.curriculum = {
        modules: modules,
        loadStudents: loadStudents,
        saveStudents: saveStudents,
        ensureActiveLearner: ensureActiveLearner,
        getActiveLearner: getActiveLearner,
        getDaysSinceStart: getDaysSinceStart,
        getCurrentModule: getCurrentModule,
        getCompletedModuleCount: getCompletedModuleCount,
        getProgressPercent: getProgressPercent,
        getPendingTasks: getPendingTasks,
        getRiskFlags: getRiskFlags,
        getDashboardStats: getDashboardStats,
        markDayCompleted: markDayCompleted,
        renderSyllabus: renderSyllabus,
        renderStudents: renderStudents
    };

    document.addEventListener('DOMContentLoaded', function () {
        ensureActiveLearner();
        renderSyllabus();
        renderStudents();
        initStudentForm();
    });
})();
