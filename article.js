// Shared behavior for blog article pages.
// - Sets the footer year.
// - Wires up the EN / 中文 language toggle.
//
// Markup contract:
//   <div class="lang-toggle" id="langToggle">
//       <button type="button" data-lang="en">EN</button>
//       <button type="button" data-lang="zh">中文</button>
//   </div>
//   <div class="article-lang" data-lang="en">...English...</div>
//   <div class="article-lang" data-lang="zh">...中文...</div>
//
// English is always the default on load.
(function () {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const toggle = document.getElementById('langToggle');
    const langBlocks = Array.from(document.querySelectorAll('.article-lang'));
    if (!langBlocks.length) return;

    const available = new Set(langBlocks.map(block => block.dataset.lang));

    function setLang(lang) {
        if (!available.has(lang)) lang = 'en';
        langBlocks.forEach(block => {
            block.hidden = (block.dataset.lang !== lang);
        });
        if (toggle) {
            toggle.querySelectorAll('button').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });
        }
        document.documentElement.lang = (lang === 'zh') ? 'zh' : 'en';
    }

    // Default to English on every load.
    setLang('en');

    if (toggle) {
        toggle.addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-lang]');
            if (btn) setLang(btn.dataset.lang);
        });
    }
})();
