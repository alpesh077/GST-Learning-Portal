// js/laws_portal.js
(function () {
    let activeTopicId = null;

    // Categories translation helper
    const FRIENDLY_CATEGORIES = {
        "Introduction & Constitution": "Introduction & Constitution",
        "Supply & Levy": "Supply & Levy",
        "Time, Place & Value": "Time, Place & Value",
        "Input Tax Credit & RCM": "Input Tax Credit & RCM",
        "Registration & Compliance Schemes": "Registration & Compliance",
        "Billing & Returns": "Billing & Returns",
        "Audit & Disputes": "Audit & Disputes",
        "Penalties & Offences": "Penalties & Offences",
        "Specialized Transactions": "Specialized Transactions",
        "Annual Filings & Portal": "Annual Filings & Portal"
    };

    function initPortal() {
        populateSidebarList();
        setupEventListeners();
        loadFromHash();
    }

    function populateSidebarList() {
        const listContainer = document.getElementById('laws-list');
        if (!listContainer) return;

        listContainer.innerHTML = '';

        // Sort keys by numeric index
        const sortedKeys = Object.keys(GST_LAWS_DB).sort((a, b) => {
            const numA = parseInt(a.replace('topic-', ''));
            const numB = parseInt(b.replace('topic-', ''));
            return numA - numB;
        });

        sortedKeys.forEach(key => {
            const topic = GST_LAWS_DB[key];
            const a = document.createElement('a');
            a.href = `#${key}`;
            a.id = `sidebar-${key}`;
            a.className = 'block p-3 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition duration-150 text-left';
            a.dataset.category = topic.category;
            a.dataset.title = topic.title.toLowerCase();

            a.innerHTML = `
                <div class="flex justify-between items-start gap-1">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${FRIENDLY_CATEGORIES[topic.category] || topic.category}</span>
                    <span class="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">#${key.replace('topic-', '')}</span>
                </div>
                <h3 class="text-sm font-semibold text-slate-800 mt-1">${topic.title}</h3>
                <p class="text-xs text-slate-500 mt-1 truncate">${topic.overview}</p>
            `;

            listContainer.appendChild(a);
        });
    }

    function setupEventListeners() {
        // Search bar
        const searchInput = document.getElementById('laws-search');
        if (searchInput) {
            searchInput.addEventListener('input', filterSidebarList);
        }

        // Category filter dropdown
        const categoryFilter = document.getElementById('laws-category');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterSidebarList);
        }

        // Handle hash changes for routing
        window.addEventListener('hashchange', loadFromHash);
    }

    function filterSidebarList() {
        const searchVal = (document.getElementById('laws-search')?.value || '').toLowerCase().trim();
        const categoryVal = document.getElementById('laws-category')?.value || '';
        const listItems = document.querySelectorAll('#laws-list a');

        listItems.forEach(item => {
            const title = item.dataset.title || '';
            const category = item.dataset.category || '';
            
            const matchesSearch = !searchVal || title.includes(searchVal);
            const matchesCategory = !categoryVal || category === categoryVal;

            if (matchesSearch && matchesCategory) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    function loadFromHash() {
        const hash = (location.hash || '#topic-1').replace('#', '');
        
        // Handle special chapter routing
        if (hash === 'cgst-sgst-chapter') {
            showCGSTSGSTChapter();
            return;
        }

        if (GST_LAWS_DB[hash]) {
            renderTopic(hash);
        } else {
            // Default fallback
            renderTopic('topic-1');
        }
    }

    function showCGSTSGSTChapter() {
        // Hide standard reader, show structured chapter
        document.getElementById('laws-reader-default').classList.add('hidden');
        document.getElementById('laws-reader-chapter').classList.remove('hidden');
        
        // Highlight active sidebar item
        document.querySelectorAll('#laws-list a').forEach(el => el.classList.remove('bg-blue-50', 'border-blue-500'));
        const chapterLink = document.getElementById('sidebar-cgst-sgst');
        if (chapterLink) chapterLink.classList.add('bg-blue-50', 'border-blue-500');

        // Scroll to top of right pane
        document.getElementById('laws-content-pane')?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderTopic(topicId) {
        activeTopicId = topicId;
        const topic = GST_LAWS_DB[topicId];
        
        document.getElementById('laws-reader-chapter').classList.add('hidden');
        document.getElementById('laws-reader-default').classList.remove('hidden');

        // Update active highlight on sidebar list
        document.querySelectorAll('#laws-list a').forEach(el => el.classList.remove('bg-blue-50', 'border-blue-500', 'border-l-4'));
        const activeLink = document.getElementById(`sidebar-${topicId}`);
        if (activeLink) {
            activeLink.classList.add('bg-blue-50', 'border-blue-500', 'border-l-4');
        }

        // Fill reader contents
        document.getElementById('topic-title').textContent = topic.title;
        document.getElementById('topic-category').textContent = FRIENDLY_CATEGORIES[topic.category] || topic.category;
        document.getElementById('topic-overview').textContent = topic.overview;
        document.getElementById('topic-legal-def').textContent = topic.legalDefinition;
        document.getElementById('topic-explanation').textContent = topic.explanation;
        document.getElementById('topic-why-exists').textContent = topic.whyExists;
        document.getElementById('topic-example').textContent = topic.example;
        
        // Render Flow Diagram
        const flowchartBlock = document.getElementById('topic-flowchart');
        if (flowchartBlock) {
            flowchartBlock.textContent = topic.flowchart;
        }

        // Render Important Points List
        const pointsList = document.getElementById('topic-points');
        if (pointsList) {
            pointsList.innerHTML = '';
            topic.importantPoints.forEach(p => {
                const li = document.createElement('li');
                li.className = 'flex items-start gap-2 text-sm text-slate-700';
                li.innerHTML = `<span class="text-blue-500 mt-0.5">📌</span> <span>${p}</span>`;
                pointsList.appendChild(li);
            });
        }

        // Render Common Mistakes
        const mistakesList = document.getElementById('topic-mistakes');
        if (mistakesList) {
            mistakesList.innerHTML = '';
            topic.mistakes.forEach(m => {
                const li = document.createElement('li');
                li.className = 'flex items-start gap-2 text-sm text-amber-900';
                li.innerHTML = `<span class="text-amber-600 mt-0.5">⚠️</span> <span>${m}</span>`;
                mistakesList.appendChild(li);
            });
        }

        // Render Collapsible FAQs
        const faqsContainer = document.getElementById('topic-faqs');
        if (faqsContainer) {
            faqsContainer.innerHTML = '';
            topic.faqs.forEach((faq, idx) => {
                const item = document.createElement('details');
                item.className = 'group border border-slate-200 rounded-lg p-3.5 [&_summary::-webkit-details-marker]:hidden cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition duration-150';
                item.innerHTML = `
                    <summary class="flex justify-between items-center font-semibold text-slate-800 text-sm list-none">
                        <span>${faq.q}</span>
                        <span class="transition group-open:rotate-180 text-blue-500">▼</span>
                    </summary>
                    <p class="mt-2 text-xs text-slate-600 leading-relaxed border-t pt-2">${faq.a}</p>
                `;
                faqsContainer.appendChild(item);
            });
        }

        // Render Collapsible Interview Questions
        const interviewContainer = document.getElementById('topic-interview');
        if (interviewContainer) {
            interviewContainer.innerHTML = '';
            topic.interviewQuestions.forEach((q, idx) => {
                const item = document.createElement('details');
                item.className = 'group border border-slate-200 rounded-lg p-3.5 [&_summary::-webkit-details-marker]:hidden cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition duration-150';
                item.innerHTML = `
                    <summary class="flex justify-between items-center font-semibold text-slate-800 text-sm list-none">
                        <span>Q: ${q.q}</span>
                        <span class="transition group-open:rotate-180 text-blue-500">▼</span>
                    </summary>
                    <p class="mt-2 text-xs text-slate-600 leading-relaxed border-t pt-2 bg-emerald-50/20 p-2 rounded border-l-4 border-emerald-500 font-medium">
                        <strong>Suggested CA Answer:</strong> ${q.a}
                    </p>
                `;
                interviewContainer.appendChild(item);
            });
        }

        // Render Interactive MCQs
        const mcqContainer = document.getElementById('topic-mcqs');
        if (mcqContainer) {
            mcqContainer.innerHTML = '';
            topic.mcqs.forEach((mcq, mIdx) => {
                const card = document.createElement('div');
                card.className = 'border rounded-xl p-5 bg-white shadow-sm space-y-4';
                
                const optList = mcq.o.map((opt, oIdx) => `
                    <button class="w-full text-left p-3.5 border rounded-lg hover:bg-slate-50 transition duration-150 text-xs font-semibold text-slate-700 flex items-center justify-between"
                            onclick="window.verifyMCQAnswer(this, ${mIdx}, ${oIdx})">
                        <span>${opt}</span>
                        <span class="opt-indicator hidden text-sm"></span>
                    </button>
                `).join('');

                card.innerHTML = `
                    <h4 class="font-bold text-sm text-slate-800">Q${mIdx+1}: ${mcq.q}</h4>
                    <div class="space-y-2 mt-3 text-slate-700">${optList}</div>
                    <div class="mcq-feedback hidden p-3 rounded-lg text-xs leading-normal font-semibold"></div>
                `;
                mcqContainer.appendChild(card);
            });
        }

        // Render Quick Revision Notes & Takeaways
        document.getElementById('topic-revision').textContent = topic.revisionNotes;
        document.getElementById('topic-takeaway').textContent = topic.keyTakeaways;

        // Scroll to top of right pane
        document.getElementById('laws-content-pane')?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Global verify MCQ click handler
    window.verifyMCQAnswer = function (btn, mIdx, clickedIdx) {
        const topic = GST_LAWS_DB[activeTopicId];
        const mcq = topic.mcqs[mIdx];
        const card = btn.closest('.border');
        const feedbackBlock = card.querySelector('.mcq-feedback');
        const buttons = card.querySelectorAll('button');

        // Disable all options for this question
        buttons.forEach(b => b.disabled = true);

        // Highlight selected
        if (clickedIdx === mcq.a) {
            btn.classList.add('border-green-500', 'bg-green-50', 'text-green-900');
            btn.querySelector('.opt-indicator').innerHTML = '✅';
            btn.querySelector('.opt-indicator').classList.remove('hidden');
            
            feedbackBlock.className = 'mcq-feedback p-3 rounded-lg text-xs leading-normal font-semibold bg-green-50 text-green-900 border border-green-200 mt-3';
            feedbackBlock.innerHTML = `<strong>Correct!</strong> ${mcq.e}`;
        } else {
            btn.classList.add('border-red-500', 'bg-red-50', 'text-red-900');
            btn.querySelector('.opt-indicator').innerHTML = '❌';
            btn.querySelector('.opt-indicator').classList.remove('hidden');
            
            // Highlight correct answer in green outline
            buttons[mcq.a].classList.add('border-green-500', 'bg-green-50/50');
            
            feedbackBlock.className = 'mcq-feedback p-3 rounded-lg text-xs leading-normal font-semibold bg-red-50 text-red-900 border border-red-200 mt-3';
            feedbackBlock.innerHTML = `<strong>Incorrect.</strong> ${mcq.e}`;
        }
        feedbackBlock.classList.remove('hidden');
    };

    // Print active topic helper
    window.printActiveTopic = function () {
        window.print();
    };

    // Initialize portal on load
    document.addEventListener('DOMContentLoaded', initPortal);
})();
