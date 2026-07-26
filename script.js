/* =========================================================================
   Mohammad Faiyaz Ansari — HSE Officer Portfolio
   Vanilla JS only. No dependencies. GitHub Pages ready.
   ========================================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Page loader ---------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      setTimeout(() => loader.classList.add("loaded"), 350);
    }
  });

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Dark / Light mode ---------------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("hse-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      themeToggle && themeToggle.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      themeToggle && themeToggle.setAttribute("aria-pressed", "false");
    }
  }
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      const next = isDark ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("hse-theme", next);
    });
  }

  /* ---------------- Sticky nav + scroll progress ---------------- */
  const navWrap = document.getElementById("navWrap");
  const progressBar = document.getElementById("progressBar");

  function onScroll() {
    const scrollY = window.scrollY;
    if (navWrap) navWrap.classList.toggle("scrolled", scrollY > 12);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";

    const toTop = document.getElementById("toTop");
    if (toTop) toTop.style.opacity = scrollY > 500 ? "1" : "0.4";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Back to top ---------------- */
  const toTopBtn = document.getElementById("toTop");
  if (toTopBtn) {
    toTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- Scroll reveal (Intersection Observer) ---------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------------- Typing effect for hero name ---------------- */
  const typeTarget = document.getElementById("typeTarget");
  if (typeTarget && !reduceMotion) {
    const fullText = typeTarget.textContent.trim();
    typeTarget.textContent = "";
    typeTarget.style.borderRight = "3px solid var(--orange)";
    let i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        typeTarget.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 55);
      } else {
        setTimeout(() => (typeTarget.style.borderRight = "none"), 600);
      }
    }
    setTimeout(typeChar, 700);
  }

  /* ---------------- Animated counters ---------------- */
  const statNums = document.querySelectorAll(".stat-num");
  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-target"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    if (reduceMotion) {
      el.textContent = target + suffix;
    } else {
      requestAnimationFrame(step);
    }
  }
  if ("IntersectionObserver" in window) {
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statNums.forEach((el) => countIO.observe(el));
  }

  /* ---------------- Safety Gallery (generated placeholders) ---------------- */
  const galleryData = [
    { cat: "construction", label: "Structural Works Inspection", emoji: "🏗️" },
    { cat: "ppe", label: "PPE Compliance Check", emoji: "🦺" },
    { cat: "fire", label: "Fire Extinguisher Muster", emoji: "🧯" },
    { cat: "height", label: "Working at Height Control", emoji: "🪜" },
    { cat: "scaffold", label: "Scaffold Tag Verification", emoji: "🏢" },
    { cat: "excavation", label: "Excavation Shoring Review", emoji: "⛏️" },
    { cat: "electrical", label: "Electrical Isolation (LOTO)", emoji: "⚡" },
    { cat: "confined", label: "Confined Space Entry Watch", emoji: "🕳️" },
    { cat: "construction", label: "Toolbox Talk on Site", emoji: "📋" },
    { cat: "ppe", label: "Hard Hat & Harness Audit", emoji: "⛑️" },
    { cat: "fire", label: "Emergency Evacuation Drill", emoji: "🚨" },
    { cat: "height", label: "Fall Arrest System Check", emoji: "🧗" },
  ];

  const galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid) {
    galleryData.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "gallery-item show";
      div.setAttribute("data-cat", item.cat);
      div.innerHTML =
        '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.6rem;" aria-hidden="true">' +
        item.emoji +
        '</div><span class="gallery-cap">' +
        item.label +
        "</span>";
      div.style.transitionDelay = (idx % 4) * 60 + "ms";
      galleryGrid.appendChild(div);
    });
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.getAttribute("data-filter");
      document.querySelectorAll(".gallery-item").forEach((item) => {
        const match = filter === "all" || item.getAttribute("data-cat") === filter;
        item.classList.toggle("hide", !match);
        item.classList.toggle("show", match);
      });
    });
  });

  /* ---------------- Copy email / phone ---------------- */
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      const em = btn.querySelector("em");
      try {
        await navigator.clipboard.writeText(value);
        btn.classList.add("copied");
        if (em) em.textContent = "copied!";
        setTimeout(() => {
          btn.classList.remove("copied");
          if (em) em.textContent = "copy";
        }, 1800);
      } catch (e) {
        if (em) em.textContent = "select & copy";
      }
    });
  });

  /* ---------------- Contact form (EmailJS-ready) ---------------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmit");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        formStatus.textContent = "Please fill in all required fields.";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      formStatus.textContent = "";

      /* ---------------------------------------------------------------
         EmailJS integration point.
         1) Include the EmailJS SDK in index.html:
            <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
         2) Initialise once with your public key:
            emailjs.init("YOUR_PUBLIC_KEY");
         3) Replace the setTimeout block below with:
            emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm)
              .then(() => { ...success... })
              .catch(() => { ...error... });
         Until configured, the form runs in demo mode below.
      ------------------------------------------------------------------ */
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        formStatus.style.color = "#16a34a";
        formStatus.textContent = "Thanks — your message has been noted. (Connect EmailJS in script.js to send live.)";
        contactForm.reset();
      }, 900);
    });
  }

  /* ---------------- Cursor glow (desktop only) ---------------- */
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
      cursorGlow.classList.add("active");
    });
    window.addEventListener("mouseleave", () => cursorGlow.classList.remove("active"));
  }

  /* ---------------- Smooth scroll offset for sticky nav ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
        }
      }
    });
  });
})();
