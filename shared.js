// Shared nav and footer injected into every page
// Usage: injectNav('page-id'), injectFooter(), initReveal()

const pages = [
  { id: 'index',         label: 'Home',           href: 'index.html' },
  { id: 'how-it-works',  label: 'How It Works',   href: 'how-it-works.html' },
  { id: 'services',      label: 'Services',       href: 'services.html' },
  { id: 'packages',      label: 'Packages',       href: 'packages.html' },
  { id: 'blog',          label: 'Blog',           href: 'blog.html' },
  { id: 'contact',       label: 'Book a Discovery Call', href: 'contact.html', cta: true },
];

const leftIds  = ['index', 'how-it-works', 'services'];
const rightIds = ['packages', 'blog', 'contact'];

function navLink(page, activePage) {
  const classes = [
    page.cta ? 'nav-cta' : '',
    activePage === page.id ? 'active' : '',
  ].filter(Boolean).join(' ');
  return `<li><a href="${page.href}"${classes ? ` class="${classes}"` : ''}>${page.label}</a></li>`;
}

function injectNav(activePage) {
  const leftLinks  = leftIds.map(id => navLink(pages.find(p => p.id === id), activePage)).join('');
  const rightLinks = rightIds.map(id => navLink(pages.find(p => p.id === id), activePage)).join('');

  const mobileLinks = pages.map(p => {
    const classes = [
      'mobile-nav-link',
      p.cta ? 'mobile-cta' : '',
      p.id === activePage ? 'active' : '',
    ].filter(Boolean).join(' ');
    return `<a href="${p.href}" class="${classes}">${p.label}</a>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav>
      <ul class="nav-links-left">${leftLinks}</ul>
      <a href="index.html" class="nav-logo">
        <img src="logo.png" alt="NextLogicAI Consulting" class="nav-logo-img">
      </a>
      <ul class="nav-links-right">${rightLinks}</ul>
      <button class="nav-hamburger" id="hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobileMenu">${mobileLinks}</div>
  `);

  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function injectFooter() {
  const footerLinks = pages.map(p =>
    `<a href="${p.href}">${p.label}</a>`
  ).join('');

  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div>
        <div class="footer-brand">NextLogic<span>AI</span> Consulting</div>
        <div class="footer-sub">AI Integration for Small &amp; Mid-Sized Businesses · © ${new Date().getFullYear()}</div>
      </div>
      <div class="footer-links">${footerLinks}</div>
    </footer>
  `);
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}