// ── Chuyển trang qua sidebar ──
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item[data-page]');

function showPage(pageId) {
    pages.forEach(p => p.classList.toggle('active', p.dataset.page === pageId));
    navItems.forEach(n => n.classList.toggle('active', n.dataset.page === pageId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();
}

navItems.forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
});

// ── Mobile menu + overlay ──
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openMobileMenu() {
    sidebar?.classList.add('open');
    sidebarOverlay?.classList.add('active');
    document.body.classList.add('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuToggle?.setAttribute('aria-label', 'Đóng menu');
}

function closeMobileMenu() {
    sidebar?.classList.remove('open');
    sidebarOverlay?.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Mở menu');
}

function toggleMobileMenu() {
    if (sidebar?.classList.contains('open')) closeMobileMenu();
    else openMobileMenu();
}

menuToggle?.addEventListener('click', toggleMobileMenu);
sidebarOverlay?.addEventListener('click', closeMobileMenu);

// Đóng menu khi resize lên desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMobileMenu();
});

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
