// Keep the selected theme on every page by reading and writing localStorage.
const savedTheme = localStorage.getItem('triad-theme') || 'light';
document.documentElement.dataset.theme = savedTheme;
document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
  button.textContent = savedTheme === 'dark' ? '☾' : '☼';
  button.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('triad-theme', nextTheme);
    document.querySelectorAll('[data-theme-toggle]').forEach((item) => { item.textContent = nextTheme === 'dark' ? '☾' : '☼'; });
  });
});
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
if (menuToggle && siteNav) menuToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
document.querySelectorAll('.reveal').forEach((element) => { element.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,fill:'both',delay:element.classList.contains('delay-1')?140:0,easing:'cubic-bezier(.2,.7,.2,1)'}); });
