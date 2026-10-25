(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");
  const mobileQuery = window.matchMedia("(max-width: 760px)");

  function closeNavigation() {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNavigation();
    });

    mobileQuery.addEventListener?.("change", (event) => {
      if (!event.matches) closeNavigation();
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // This is deliberately a prototype-only form. Do not imply that an email was
  // stored or sent until a real mailing-list integration is configured.
  const signupForm = document.querySelector("#signup-form");
  const formMessage = document.querySelector("#form-message");
  if (signupForm && formMessage) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = signupForm.querySelector('input[type="email"]');
      if (!email || !email.checkValidity()) {
        email?.reportValidity();
        return;
      }
      formMessage.textContent = "Thanks for trying the preview. This form is not connected yet, so your email was not sent or saved.";
      formMessage.classList.add("form-message--notice");
    });
  }

  // Staggered editorial reveals, disabled automatically for reduced-motion users.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && "IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(
      ".manifesto > p, .section-heading, .product-card, .origin__copy, .vision__copy, .invitation__main"
    );
    revealTargets.forEach((element, index) => {
      element.classList.add("js-reveal");
      if (element.classList.contains("product-card")) {
        element.style.transitionDelay = index % 2 === 0 ? "0ms" : "100ms";
      }
    });

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: "0px 0px -35px 0px" });

    revealTargets.forEach((element) => observer.observe(element));
  }
})();
