// XNK Gym OS landing page -- vanilla JS, no dependencies.

// ---- Demo URLs -- edit here, nothing else references these directly ----
const ADMIN_URL = 'https://admin.xnkproduction.web.id';
const OWNER_URL = 'https://owner.xnkproduction.web.id';
const MEMBER_URL = 'https://member.xnkproduction.web.id';

document.querySelectorAll('[data-admin-url]').forEach((el) => { el.href = ADMIN_URL; });
document.querySelectorAll('[data-owner-url]').forEach((el) => { el.href = OWNER_URL; });
document.querySelectorAll('[data-member-url]').forEach((el) => { el.href = MEMBER_URL; });

// ---- Mobile nav ----
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// ---- Inline demo embed ----
// Click "Coba di Sini" (or a tab in the open panel) to load that role's
// live app directly in an iframe on this page -- no new tab needed.
// Lazy: iframe src is only ever set on first click, never on page load.
const EMBED_URLS = { admin: ADMIN_URL, owner: OWNER_URL, member: MEMBER_URL };
const embedPanel = document.getElementById('embedPanel');
const embedFrame = document.getElementById('embedFrame');
const embedLoading = document.getElementById('embedLoading');
const embedTabs = document.querySelectorAll('.embed-tab');
const embedClose = document.getElementById('embedClose');

function openEmbed(role) {
  const url = EMBED_URLS[role];
  if (!url) return;
  embedPanel.hidden = false;
  embedLoading.style.display = 'flex';
  embedTabs.forEach((t) => t.setAttribute('aria-selected', t.getAttribute('data-embed-role') === role ? 'true' : 'false'));
  if (embedFrame.getAttribute('data-loaded-role') !== role) {
    embedFrame.src = url;
    embedFrame.setAttribute('data-loaded-role', role);
  } else {
    embedLoading.style.display = 'none';
  }
  embedPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-embed-role]').forEach((el) => {
  el.addEventListener('click', () => openEmbed(el.getAttribute('data-embed-role')));
});
embedFrame.addEventListener('load', () => { embedLoading.style.display = 'none'; });
if (embedClose) {
  embedClose.addEventListener('click', () => {
    embedPanel.hidden = true;
    embedFrame.src = 'about:blank';
    embedFrame.removeAttribute('data-loaded-role');
  });
}

// ---- Feature explorer tabs ----
const tabs = document.querySelectorAll('.explorer-tab');
const panels = document.querySelectorAll('.explorer-panel');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-target');
    tabs.forEach((t) => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
    panels.forEach((p) => p.classList.toggle('active', p.id === target));
  });
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}
