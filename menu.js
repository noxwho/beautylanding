const header = document.querySelector('.header');
const toggle = header.querySelector('.menu-toggle');
const nav = document.getElementById('navigation');
const mobile = window.matchMedia('(max-width: 800px)');
header.classList.add('enhanced');

function setMenu(open, restoreFocus = false) {
  header.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  if (restoreFocus) toggle.focus();
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  setMenu(false);
  const target = document.getElementById(link.hash.slice(1));
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
});
document.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
header.addEventListener('focusout', (event) => {
  if (!header.contains(event.relatedTarget)) setMenu(false);
});
mobile.addEventListener('change', () => {
  setMenu(false, mobile.matches && nav.contains(document.activeElement));
  if (!mobile.matches && document.activeElement === toggle) header.querySelector('.logo').focus();
});
