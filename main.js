// ── Chuyển trang qua sidebar ──
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item[data-page]');

function showPage(pageId) {
    pages.forEach(p => p.classList.toggle('active', p.dataset.page === pageId));
    navItems.forEach(n => n.classList.toggle('active', n.dataset.page === pageId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach(btn => {
    btn.addEventListener('click', () => {
        showPage(btn.dataset.page);
        document.getElementById('sidebar')?.classList.remove('open');
    });
});

// ── Mobile menu ──
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle?.addEventListener('click', () => sidebar?.classList.toggle('open'));

// ── Typing animation (trang giới thiệu) ──
const roles = [
    'sinh viên Công nghệ Thông tin',
    'người yêu thích lập trình',
    'người học AI mỗi ngày',
    'người làm web & portfolio'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIdx];
    if (!deleting) {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(typeLoop, 2000);
            return;
        }
        setTimeout(typeLoop, 80);
    } else {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(typeLoop, 400);
            return;
        }
        setTimeout(typeLoop, 40);
    }
}

typeLoop();
