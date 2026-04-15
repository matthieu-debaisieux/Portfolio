document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('[data-edu]');
    const stats = document.querySelectorAll('[data-stat]');
    const line = document.getElementById('tl-line');
    const yearsEl = document.getElementById('stat-years');
    const diplomesEl = document.getElementById('stat-diplomes');
    const skillsEl = document.getElementById('stat-skills');

    let lineAnimated = false;
    let statsAnimated = false;

    const animateNumber = (el, to, duration = 900) => {
        const start = performance.now();
        const from = 0;

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    const revealItem = (el, delay = 0) => {
        setTimeout(() => {
            el.classList.add('opacity-100', 'translate-y-0');
            const dot = el.querySelector('.tl-dot div');
            if (dot) dot.classList.remove('scale-0');
            if (dot) dot.classList.add('scale-100');
        }, delay);
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            if (el.hasAttribute('data-edu')) {
                const idx = Array.from(items).indexOf(el);
                revealItem(el, idx * 130);

                if (!lineAnimated) {
                    lineAnimated = true;
                    line.classList.add('scale-y-100');
                }

                io.unobserve(el);
            }

            if (el.hasAttribute('data-stat') && !statsAnimated) {
                statsAnimated = true;

                stats.forEach((s, i) => {
                    setTimeout(() => {
                        s.classList.add('opacity-100', 'translate-y-0');
                    }, i * 100);
                });

                animateNumber(yearsEl, 2);
                animateNumber(diplomesEl, 2);
                animateNumber(skillsEl, 8);

                stats.forEach((s) => io.unobserve(s));
            }
        });
    }, { threshold: 0.12 });

    items.forEach((el) => io.observe(el));
    stats.forEach((el) => io.observe(el));
});