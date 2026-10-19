// Progressive enhancement: anchors and disclosure controls work without this script.
if (!window.__nikaEditorialBound) {
  window.__nikaEditorialBound = true;
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[data-section]'));
  function activate(id) {
    navLinks.forEach(link => {
      if (link.dataset.section === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  document.querySelectorAll('a[href="#top"]').forEach(link => link.addEventListener('click', () => activate('projects')));
  navLinks.forEach(link => link.addEventListener('click', () => activate(link.dataset.section)));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) activate(entry.target.matches('.editorial-hero') ? 'projects' : entry.target.id); });
    }, {rootMargin: '-12% 0px -62% 0px', threshold: 0});
    const hero = document.querySelector('.editorial-hero');
    if (hero) observer.observe(hero);
    navLinks.forEach(link => { const section = document.getElementById(link.dataset.section); if (section) observer.observe(section); });
  }
  // Make the post fallback useful if an embed cannot be loaded.
  document.querySelectorAll('.linkedin-post').forEach(frame => {
    frame.addEventListener('error', () => { frame.hidden = true; });
  });
}
