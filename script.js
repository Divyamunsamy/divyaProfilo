/* ============================================================
   DIVYA M — Portfolio JavaScript
   Features:
     • Scroll-triggered fade-up animations
     • Typewriter effect in hero
     • Mobile hamburger menu
     • Active nav link highlighting
     • Profile photo upload & preview
     • Smooth scroll for nav links
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SCROLL-TRIGGERED FADE-UP ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });
  fadeEls.forEach(el => fadeObserver.observe(el));


  /* ── 2. TYPEWRITER EFFECT ── */
  const roles = [
    'Python Full Stack Developer',
    'Backend Engineer',
    'Django & REST API Specialist',
    'Computer Vision Enthusiast',
  ];
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    let rIdx = 0, cIdx = 0, deleting = false;
    const speed = { type: 60, delete: 35, pause: 1800 };

    function type() {
      const current = roles[rIdx];
      if (!deleting) {
        typeEl.textContent = current.slice(0, ++cIdx);
        if (cIdx === current.length) {
          deleting = true;
          return setTimeout(type, speed.pause);
        }
      } else {
        typeEl.textContent = current.slice(0, --cIdx);
        if (cIdx === 0) {
          deleting = false;
          rIdx = (rIdx + 1) % roles.length;
        }
      }
      setTimeout(type, deleting ? speed.delete : speed.type);
    }
    type();
  }


  /* ── 3. HAMBURGER / MOBILE NAV ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  /* ── 4. ACTIVE NAV LINK HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--sky)';
          }
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));


  /* ── 5. PROFILE PHOTO UPLOAD ── */
  const photoInput   = document.getElementById('photo-input');
  const profileImg   = document.getElementById('profile-img');
  const placeholder  = document.getElementById('avatar-placeholder');

  if (photoInput && profileImg) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        profileImg.src = ev.target.result;
        profileImg.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    });
  }


  /* ── 6. SMOOTH SCROLL FOR ALL ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── 7. NAVBAR SHRINK ON SCROLL ── */
  const navEl = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navEl.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5)';
    } else {
      navEl.style.boxShadow = 'none';
    }
  }, { passive: true });

});