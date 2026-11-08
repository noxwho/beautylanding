const header = document.querySelector('.header');
const toggle = header.querySelector('.menu-toggle');
const navigation = document.getElementById('main-navigation');
const mobile = window.matchMedia('(max-width: 760px)');
header.classList.add('menu-enhanced');

function setMenu(open, returnFocus = false) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    if (returnFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!mobile.matches || !link) return;
    setMenu(false);
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
});

document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target)) setMenu(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false, true);
    }
});

header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setMenu(false);
});

mobile.addEventListener('change', () => {
    const focusWasInMenu = navigation.contains(document.activeElement);
    setMenu(false, mobile.matches && focusWasInMenu);
    if (!mobile.matches && document.activeElement === toggle) {
        header.querySelector('.brand').focus();
    }
});
