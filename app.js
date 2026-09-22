document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
  }
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    }
  });
  const themeBtn = document.querySelector('.theme-toggle');
  const saved = localStorage.getItem('city-explorer-theme');

  if (saved) {
    document.documentElement.dataset.theme = saved;
  }
  const updateThemeIcon = () => {
    if (themeBtn) {
      themeBtn.textContent =
        document.documentElement.dataset.theme === 'dark' ? '☀' : '☾';
    }
  };
  updateThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const dark = document.documentElement.dataset.theme === 'dark';
      document.documentElement.dataset.theme = dark ? 'light' : 'dark';
      localStorage.setItem('city-explorer-theme', dark ? 'light' : 'dark');
      updateThemeIcon();
    });
  }
  const form = document.querySelector('#bookingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = document.querySelector('#name')?.value?.trim() || 'Traveler';
      const notice = document.querySelector('.notice');

      if (notice) {
        notice.textContent = `Thanks ${n}! Your booking request has been received. This demo does not process real payments.`;
        notice.style.display = 'block';
      }

      form.reset();
    });
  }
  document.querySelectorAll('.filter').forEach((btn) =>
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.filter')
        .forEach((x) => x.classList.remove('active'));
      btn.classList.add('active');

      const v = btn.dataset.filter;
      document.querySelectorAll('[data-category]').forEach((c) => {
        c.style.display =
          v === 'all' || c.dataset.category === v ? 'block' : 'none';
      });
    })
  );
  const top = document.querySelector('.back-top');
  if (top) {
    window.addEventListener('scroll', () =>
      top.classList.toggle('show', window.scrollY > 450)
    );
    top.addEventListener('click', () =>
      scrollTo({ top: 0, behavior: 'smooth' })
    );
  }
});