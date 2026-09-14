// XNK Gym OS landing page -- vanilla JS, no dependencies.

// ---- Demo URLs -- edit here, nothing else references these directly ----
const ADMIN_URL = 'https://admin.xnkproduction.web.id';
const OWNER_URL = 'https://owner.xnkproduction.web.id';
const MEMBER_URL = 'https://member.xnkproduction.web.id';

// GAS_EXEC_URL is kept only to warm up the Apps Script backend below --
// the demo buttons themselves now link straight to the wrapper
// subdomains above and open in a new tab.
const GAS_EXEC_URL = 'https://script.google.com/macros/s/AKfycbyPsGZUY8C7uplUdOzQ7ejxpRlMeojonuG0FwJnJTlJa8gBUUDCQqzL7QGdeeUwN2cSag/exec';

// ---- Warm up the Apps Script backend the moment this page loads ----
// Cold-start on script.google.com is real platform latency, not
// something client code removes -- but firing a background request now
// means the container is very likely already warm by the time a visitor
// actually clicks through to Admin/Owner. mode:'no-cors' because we
// don't need (and CORS won't let us read) the response -- we only need
// Google's server to actually run doGet() once, same as a real visit.
[GAS_EXEC_URL + '?view=admin', GAS_EXEC_URL + '?view=owner'].forEach((url) => {
  fetch(url, { mode: 'no-cors' }).catch(() => {});
});

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
