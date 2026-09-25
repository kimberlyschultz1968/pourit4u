/* ==========================================================================
   PourIt4U — main.js
   --------------------------------------------------------------------------
   Everything on the page is built from assets/js/site-config.js.
   To change content, edit that file — not this one.

   Sections
     A.  Helpers
     B.  Icon set
     C.  Renderers (nav, benefits, services, packages, gallery, FAQ, ...)
     D.  Header, mobile menu, scroll spy
     E.  Reveal-on-scroll
     F.  Service detail modal
     G.  Gallery filter + lightbox
     H.  FAQ accordion
     I.  Booking form
     J.  Structured data (SEO)
   ========================================================================== */
(function () {
  'use strict';

  var C = window.SITE;
  if (!C) { console.error('site-config.js did not load — nothing to render.'); return; }

  /* ========================================================================
     A. HELPERS
     ======================================================================== */
  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* A value is a "placeholder" while it is empty or still contains ___ */
  function isPlaceholder(v) {
    return !v || String(v).indexOf('___') !== -1;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========================================================================
     B. ICON SET — elegant gold line icons, drawn inline (no icon font needed)
     ======================================================================== */
  var ICONS = {
    glass:    '<path d="M3.6 4.8h16.8l-8.4 9.2z" stroke-linejoin="round" /><path d="M12 14v5.6M8.2 19.6h7.6" stroke-linecap="round" />',
    sparkle:  '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />',
    calm:     '<circle cx="12" cy="12" r="8.4" /><path d="M8.4 13.4c1 1.4 2.2 2.1 3.6 2.1s2.6-.7 3.6-2.1" /><path d="M9 9.6h.01M15 9.6h.01" stroke-linecap="round" stroke-width="1.8" />',
    star:     '<path d="M12 3.6l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.5 9.8l5.9-.8z" />',
    'star-fill':'<path d="M12 3.6l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.5 9.8l5.9-.8z" fill="currentColor" stroke="none" />',
    rings:    '<circle cx="9" cy="14" r="5.4" /><circle cx="15" cy="14" r="5.4" /><path d="M12 4.2l1.9 2.5h-3.8z" />',
    confetti: '<path d="M4 20l4.4-11.6L15.6 15.6z" /><path d="M14.5 4.5l.9 1.6M18.8 6.2l-1.3 1.4M20 11.2l-1.9-.3M16.6 12.9l1.1 1.6" stroke-linecap="round" />',
    briefcase:'<rect x="3" y="7.5" width="18" height="12.5" rx="2" /><path d="M8.5 7.5V6a2 2 0 012-2h3a2 2 0 012 2v1.5" /><path d="M3 12.5h18" />',
    menu:     '<rect x="4.5" y="3" width="15" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" stroke-linecap="round" />',
    bar:      '<path d="M4 6h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4z" /><path d="M12 13v6M8.5 19h7" stroke-linecap="round" /><path d="M6 3.2h12" stroke-linecap="round" />',
    shield:   '<path d="M12 3.2l7 2.6v5.4c0 4.4-3 8.2-7 9.6-4-1.4-7-5.2-7-9.6V5.8z" /><path d="M9 12.2l2.1 2.1 4-4.2" stroke-linecap="round" stroke-linejoin="round" />',
    smile:    '<circle cx="12" cy="12" r="8.5" /><path d="M8.2 13.6c.9 1.6 2.2 2.4 3.8 2.4s2.9-.8 3.8-2.4" stroke-linecap="round" /><path d="M9.2 9.5h.01M14.8 9.5h.01" stroke-linecap="round" stroke-width="1.9" />',
    diamond:  '<path d="M6 3.6h12l3 5.2-9 11.6L3 8.8z" /><path d="M3 8.8h18M9.4 8.8L12 20.4l2.6-11.6M6 3.6l3.4 5.2M18 3.6l-3.4 5.2" />',
    tailor:   '<path d="M4.5 20.5l7-7" stroke-linecap="round" /><path d="M19.5 20.5l-7-7" stroke-linecap="round" /><circle cx="7" cy="6.5" r="2.6" /><circle cx="17" cy="6.5" r="2.6" /><path d="M9 8.3l6.2 8.4M15 8.3L8.8 16.7" stroke-linecap="round" />',
    phone:    '<path d="M7.5 3.5h3l1.6 4-2 1.4a11.5 11.5 0 005 5l1.4-2 4 1.6v3a2 2 0 01-2.2 2A16.5 16.5 0 015.5 5.7a2 2 0 012-2.2z" stroke-linejoin="round" />',
    mail:     '<rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.6 6.6L12 13l8.4-6.4" />',
    pin:      '<path d="M12 21.5s7.2-6.6 7.2-11.5a7.2 7.2 0 10-14.4 0C4.8 14.9 12 21.5 12 21.5z" /><circle cx="12" cy="10" r="2.7" />',
    clock:    '<circle cx="12" cy="12" r="8.5" /><path d="M12 7.2V12l3.2 2" stroke-linecap="round" />',
    check:    '<path d="M4 12.6l5 5L20 6.4" stroke-linecap="round" stroke-linejoin="round" />',
    plus:     '<path d="M12 5.5v13M5.5 12h13" stroke-linecap="round" />',
    zoom:     '<circle cx="10.5" cy="10.5" r="6.4" /><path d="M15.2 15.2L20 20" stroke-linecap="round" /><path d="M10.5 8v5M8 10.5h5" stroke-linecap="round" />',
    facebook: '<path d="M14.6 8.4h2.2V5.3h-2.6c-2.5 0-4 1.6-4 4.1v2H8v3.1h2.2V21h3.2v-6.5h2.4l.4-3.1h-2.8V9.8c0-.9.4-1.4 1.2-1.4z" fill="currentColor" stroke="none"/>',
    instagram:'<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />',
    tiktok:   '<path d="M14.2 3.5v10.7a3.1 3.1 0 11-3.1-3.1c.3 0 .6 0 .9.1V8.1a6.2 6.2 0 102.2 4.8V9.3a6.5 6.5 0 003.8 1.2V7.4a3.9 3.9 0 01-3.8-3.9z" fill="currentColor" stroke="none"/>'
  };

  function icon(name, size, extra) {
    var body = ICONS[name];
    if (!body) return '';
    var s = size || 22;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.4" aria-hidden="true"' + (extra ? ' ' + extra : '') + '>' +
      body + '</svg>';
  }

  /* ========================================================================
     C. RENDERERS
     ======================================================================== */

  /* ---- Navigation ---- */
  function renderNav() {
    var list = $('#nav-list');
    if (!list) return;
    list.innerHTML = C.nav.map(function (item) {
      return '<li><a class="nav__link" href="' + esc(item.href) + '">' + esc(item.label) + '</a></li>';
    }).join('');
  }

  /* ---- Benefits bar ---- */
  function renderBenefits() {
    var el = $('#benefits-grid');
    if (!el) return;
    el.innerHTML = C.benefits.map(function (b, i) {
      return '<li class="benefit reveal" data-delay="' + (i % 4) + '">' +
        '<span class="benefit__icon">' + icon(b.icon, 21) + '</span>' +
        '<span><span class="benefit__title">' + esc(b.title) + '</span>' +
        '<span class="benefit__text">' + esc(b.text) + '</span></span>' +
      '</li>';
    }).join('');
  }

  /* ---- Services ---- */
  function renderServices() {
    var el = $('#services-grid');
    if (!el) return;
    el.innerHTML = C.services.map(function (s, i) {
      return '<article class="service-card reveal" data-delay="' + (i % 4) + '">' +
        '<span class="service-card__icon">' + icon(s.icon, 24) + '</span>' +
        '<h3 class="service-card__title">' + esc(s.title) + '</h3>' +
        '<p class="service-card__text">' + esc(s.text) + '</p>' +
        '<button class="link-more" type="button" data-service="' + esc(s.id) + '" ' +
          'aria-label="Learn more about ' + esc(s.title) + '">Learn More</button>' +
      '</article>';
    }).join('');
  }

  /* ---- Why choose us ---- */
  function renderWhy() {
    var el = $('#why-points');
    if (!el) return;
    el.innerHTML = C.whyPoints.map(function (p) {
      return '<li class="about__point">' + icon(p.icon, 24) + '<span>' + esc(p.title) + '</span></li>';
    }).join('');
  }

  /* ---- How it works ---- */
  function renderSteps() {
    var el = $('#steps-grid');
    if (!el) return;
    el.innerHTML = C.steps.map(function (s, i) {
      return '<li class="step reveal" data-delay="' + (i % 4) + '">' +
        '<span class="step__num">' + esc(s.n) + '</span>' +
        '<span><span class="step__title">' + esc(s.title) + '</span>' +
        '<span class="step__text">' + esc(s.text) + '</span></span>' +
      '</li>';
    }).join('');
  }

  /* ---- Packages ---- */
  function renderPackages() {
    var el = $('#packages-grid');
    if (!el) return;

    el.innerHTML = C.packages.map(function (p, i) {
      var tbd   = isPlaceholder(p.price);
      var hours = isPlaceholder(p.hours) ? '' :
        '<span class="package__hours">' + esc(p.hours) + '</span>';

      var priceBlock =
        '<div class="package__price' + (tbd ? ' package__price--tbd' : '') + '">' +
          (tbd ? '' : '<span class="package__price-label">' + esc(p.priceLabel) + '</span>') +
          '<span class="package__price-value">' + (tbd ? 'Pricing on request' : esc(p.price)) + '</span>' +
          hours +
        '</div>';

      return '<article class="package reveal' + (p.featured ? ' package--featured' : '') + '" data-delay="' + i + '">' +
        (p.featured ? '<span class="package__badge">Signature</span>' : '') +
        '<h3 class="package__name">' + esc(p.name) + '</h3>' +
        '<p class="package__subtitle">' + esc(p.subtitle) + '</p>' +
        '<p class="package__blurb">' + esc(p.blurb) + '</p>' +
        priceBlock +
        '<ul class="package__list">' + p.includes.map(function (inc) {
          return '<li>' + icon('check', 14) + '<span>' + esc(inc) + '</span></li>';
        }).join('') + '</ul>' +
        '<a class="btn ' + (p.featured ? 'btn--gold' : 'btn--ghost') + ' btn--block" ' +
          'href="#book" data-package="' + esc(p.name) + '">Get a Custom Quote</a>' +
      '</article>';
    }).join('');

    var note = $('#packages-note');
    if (note) note.textContent = C.packagesNote || '';

    /* The extras people ask about once they've seen the headline price */
    var addOns = $('#add-ons');
    if (addOns) {
      var list = C.addOns || [];
      addOns.innerHTML = list.map(function (a) {
        return '<li class="add-on">' +
          '<span class="add-on__label">' + esc(a.label) + '</span>' +
          '<span class="add-on__price">' + esc(a.price) + '</span>' +
          '<span class="add-on__note">' + esc(a.note) + '</span>' +
        '</li>';
      }).join('');
      addOns.hidden = !list.length;
    }
  }

  /* ---- Gallery ---- */
  function renderGallery() {
    var filters = $('#gallery-filters');
    var grid    = $('#gallery-grid');
    if (!grid) return;

    if (filters) {
      filters.innerHTML = C.galleryFilters.map(function (f, i) {
        return '<button class="filter-btn' + (i === 0 ? ' is-active' : '') + '" type="button" ' +
          'data-filter="' + esc(f.key) + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' +
          esc(f.label) + '</button>';
      }).join('');
    }

    grid.innerHTML = C.gallery.map(function (g, i) {
      return '<button class="gallery__item reveal" type="button" data-cat="' + esc(g.cat) + '" ' +
        'data-index="' + i + '" data-delay="' + (i % 4) + '" ' +
        'aria-label="View larger: ' + esc(g.alt) + '">' +
        '<img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" width="800" height="600">' +
        '<span class="gallery__zoom">' + icon('zoom', 16) + '</span>' +
      '</button>';
    }).join('');

    /* Only claim these are stock while at least one still is. */
    var note = $('#gallery-note');
    if (note) {
      var anyStock = C.gallery.some(function (g) { return g.stock; });
      note.textContent = anyStock
        ? 'Images shown are licensed stock photography, used while our own event gallery is being built.'
        : '';
      note.hidden = !anyStock;
    }
  }

  /* ---- Testimonials ---- */
  function renderTestimonials() {
    var el = $('#testimonials-grid');
    if (!el) return;

    el.innerHTML = C.testimonials.map(function (t, i) {
      var stars = '';
      for (var s = 0; s < (t.stars || 5); s++) stars += icon('star-fill', 14);
      return '<article class="testimonial reveal' + (t.placeholder ? ' testimonial--placeholder' : '') + '" data-delay="' + (i % 4) + '">' +
        '<div class="testimonial__stars" role="img" aria-label="' + (t.stars || 5) + ' out of 5 stars">' + stars + '</div>' +
        '<blockquote class="testimonial__quote">' + esc(t.quote) + '</blockquote>' +
        '<footer class="testimonial__meta">' +
          '<p class="testimonial__name">' + esc(t.name) + '</p>' +
          '<p class="testimonial__event">' + esc(t.event) + '</p>' +
        '</footer>' +
      '</article>';
    }).join('');

    /* Be explicit while these are examples — never pass them off as real reviews. */
    var note = $('#testimonials-note');
    if (note) {
      var anyPlaceholder = C.testimonials.some(function (t) { return t.placeholder; });
      note.textContent = anyPlaceholder
        ? 'PourIt4U is newly launched — the cards above are placeholders reserved for real client reviews, not actual customer quotes.'
        : '';
      note.hidden = !anyPlaceholder;
    }
  }

  /* ---- FAQ ---- */
  function renderFaq() {
    var el = $('#faq-list');
    if (!el) return;
    el.innerHTML = C.faqs.map(function (f, i) {
      return '<div class="faq__item reveal">' +
        '<h3 style="margin:0">' +
          '<button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-' + i + '" id="faq-q-' + i + '">' +
            '<span>' + esc(f.q) + '</span>' +
            '<span class="faq__icon">' + icon('plus', 13) + '</span>' +
          '</button>' +
        '</h3>' +
        '<div class="faq__a" id="faq-a-' + i + '" role="region" aria-labelledby="faq-q-' + i + '">' +
          '<div class="faq__a-inner">' + esc(f.a) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ---- Contact ---- */
  function renderContact() {
    var grid = $('#contact-grid');
    var b = C.business;
    if (!grid) return;

    var phoneReady = !isPlaceholder(b.phone) && !isPlaceholder(b.phoneLink);
    var emailReady = !isPlaceholder(b.email);

    var cards = [];

    cards.push('<div class="contact-card reveal">' +
      '<div class="contact-card__icon">' + icon('phone', 21) + '</div>' +
      '<p class="contact-card__label">Phone</p>' +
      (phoneReady
        ? '<a class="contact-card__value" href="tel:+' + esc(b.phoneLink) + '">' + esc(b.phone) + '</a>'
        : '<span class="contact-card__value contact-card__value--muted">Phone number coming soon</span>') +
      '<p class="contact-card__sub">' + (phoneReady ? esc(b.phoneContact || 'Tap to call') : 'Please use the form or email for now') + '</p>' +
    '</div>');

    cards.push('<div class="contact-card reveal" data-delay="1">' +
      '<div class="contact-card__icon">' + icon('mail', 21) + '</div>' +
      '<p class="contact-card__label">Email</p>' +
      (emailReady
        ? '<a class="contact-card__value" href="mailto:' + esc(b.email) + '">' + esc(b.email) + '</a>' +
          (isPlaceholder(b.emailSecondary) ? '' :
            '<br><a class="contact-card__value" href="mailto:' + esc(b.emailSecondary) + '">' + esc(b.emailSecondary) + '</a>')
        : '<span class="contact-card__value contact-card__value--muted">Email coming soon</span>') +
      '<p class="contact-card__sub">We reply to every enquiry</p>' +
    '</div>');

    cards.push('<div class="contact-card reveal" data-delay="2">' +
      '<div class="contact-card__icon">' + icon('pin', 21) + '</div>' +
      '<p class="contact-card__label">Service Area</p>' +
      '<span class="contact-card__value contact-card__value--muted">' + esc(b.serviceAreaShort) + '</span>' +
      '<p class="contact-card__sub">Travelling further? Just ask.</p>' +
    '</div>');

    var socialMarkup = socialLinks();
    cards.push('<div class="contact-card reveal" data-delay="3">' +
      '<div class="contact-card__icon">' + icon('sparkle', 21) + '</div>' +
      '<p class="contact-card__label">Follow Along</p>' +
      (socialMarkup
        ? '<div class="socials" style="margin-top:10px">' + socialMarkup + '</div>'
        : '<span class="socials__soon">Social pages coming soon</span>') +
    '</div>');

    grid.innerHTML = cards.join('');

    /* Action buttons — only offer CALL when there is a real number to call. */
    var actions = $('#contact-actions');
    if (actions) {
      var html = '';
      if (phoneReady) {
        html += '<a class="btn btn--gold" href="tel:+' + esc(b.phoneLink) + '">Call Now</a>';
      }
      if (emailReady) {
        html += '<a class="btn btn--ghost" href="mailto:' + esc(b.email) + '?subject=' +
          encodeURIComponent('Event enquiry — PourIt4U') + '">Email Us</a>';
      }
      html += '<a class="btn ' + (phoneReady ? 'btn--ghost' : 'btn--gold') + '" href="#book">Book Your Event</a>';
      actions.innerHTML = html;
    }

    /* Mobile action bar */
    var actionCall = $('#action-call');
    if (actionCall) {
      if (phoneReady) {
        actionCall.setAttribute('href', 'tel:+' + b.phoneLink);
        actionCall.textContent = 'Call Now';
      } else if (emailReady) {
        actionCall.setAttribute('href', 'mailto:' + b.email);
        actionCall.textContent = 'Email Us';
      } else {
        actionCall.setAttribute('href', '#contact');
        actionCall.textContent = 'Contact';
      }
    }
  }

  function socialLinks() {
    var out = '';
    [['facebook', 'Facebook'], ['instagram', 'Instagram'], ['tiktok', 'TikTok']].forEach(function (pair) {
      var url = C.social[pair[0]];
      if (!url) return;
      out += '<a class="social-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" ' +
        'aria-label="PourIt4U on ' + pair[1] + '">' + icon(pair[0], 19) + '</a>';
    });
    return out;
  }

  /* ---- Footer ---- */
  function renderFooter() {
    var b = C.business;

    var links = $('#footer-links');
    if (links) {
      links.innerHTML = C.nav.map(function (n) {
        return '<a href="' + esc(n.href) + '">' + esc(n.label) + '</a>';
      }).join('');
    }

    var socials = $('#footer-socials');
    if (socials) {
      var s = socialLinks();
      socials.innerHTML = s || '<span class="socials__soon">Social pages coming soon</span>';
    }

    var contact = $('#footer-contact');
    if (contact) {
      var phoneReady = !isPlaceholder(b.phone) && !isPlaceholder(b.phoneLink);
      var emailReady = !isPlaceholder(b.email);
      var rows = '';

      rows += '<div class="footer__contact-row">' + icon('phone', 15) +
        (phoneReady
          ? '<span><a href="tel:+' + esc(b.phoneLink) + '">' + esc(b.phone) + '</a>' +
              (b.phoneContact ? ' · ' + esc(b.phoneContact) : '') + '</span>'
          : '<span>Phone number coming soon</span>') + '</div>';

      rows += '<div class="footer__contact-row">' + icon('mail', 15) +
        (emailReady
          ? '<span><a href="mailto:' + esc(b.email) + '">' + esc(b.email) + '</a>' +
              (isPlaceholder(b.emailSecondary) ? '' :
                '<br><a href="mailto:' + esc(b.emailSecondary) + '">' + esc(b.emailSecondary) + '</a>') + '</span>'
          : '<span>Email coming soon</span>') + '</div>';

      rows += '<div class="footer__contact-row">' + icon('pin', 15) +
        '<span>' + esc(b.serviceAreaShort) + '</span></div>';

      rows += '<div class="footer__contact-row">' + icon('clock', 15) +
        '<span>' + esc(b.hours) + '</span></div>';

      contact.innerHTML = rows;
    }

    var year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---- Simple text tokens (service area, etc.) ---- */
  function renderTokens() {
    $$('[data-site]').forEach(function (el) {
      var key = el.getAttribute('data-site');
      var val = C.business[key];
      if (val) el.textContent = val;
    });
  }

  /* ---- Booking form option lists ---- */
  function renderFormOptions() {
    function fill(sel, items, placeholder) {
      var el = $(sel);
      if (!el) return;
      el.innerHTML = '<option value="">' + esc(placeholder) + '</option>' +
        items.map(function (i) { return '<option value="' + esc(i) + '">' + esc(i) + '</option>'; }).join('');
    }
    fill('#f-type',     C.eventTypes,   'Please choose…');
    fill('#f-guests',   C.guestRanges,  'Please choose…');
    fill('#f-duration', C.durations,    'Please choose…');

    var checks = $('#services-checks');
    if (checks) {
      checks.innerHTML = C.serviceOptions.map(function (s, i) {
        return '<label class="check" for="svc-' + i + '">' +
          '<input type="checkbox" id="svc-' + i + '" name="services" value="' + esc(s) + '">' +
          '<span>' + esc(s) + '</span></label>';
      }).join('');
    }
  }

  /* ========================================================================
     D. HEADER, MOBILE MENU, SCROLL SPY
     ======================================================================== */
  function initHeader() {
    var header = $('#header');
    var toggle = $('#nav-toggle');
    var nav    = $('#primary-nav');

    /* Sticky header gets a stronger background once you scroll */
    var onScroll = function () {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Mobile menu */
    function closeMenu() {
      if (!nav || !toggle) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });

      /* Any nav tap closes the panel */
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeMenu();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      /* Tapping outside the open panel closes it */
      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('is-open')) return;
        if (nav.contains(e.target) || toggle.contains(e.target)) return;
        closeMenu();
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) closeMenu();
      });
    }

    /* Scroll spy — highlights the section you are looking at */
    var links    = $$('.nav__link');
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + entry.target.id;
            a.classList.toggle('is-active', on);
            if (on) { a.setAttribute('aria-current', 'true'); }
            else    { a.removeAttribute('aria-current'); }
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ========================================================================
     E. REVEAL-ON-SCROLL
     ======================================================================== */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ========================================================================
     Shared dialog helpers (used by the modal and the lightbox)
     ======================================================================== */
  var lastFocused = null;

  function openDialog(el, focusTarget) {
    lastFocused = document.activeElement;
    el.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(function () {
      el.classList.add('is-open');
      if (focusTarget) focusTarget.focus();
    });
  }

  function closeDialog(el) {
    el.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    var done = function () { el.hidden = true; };
    if (prefersReducedMotion) { done(); }
    else { window.setTimeout(done, 280); }
    if (lastFocused && lastFocused.focus) {
      try { lastFocused.focus({ preventScroll: true }); } catch (e) { lastFocused.focus(); }
    }
  }

  /* Keep Tab inside an open dialog */
  function trapFocus(el, e) {
    if (e.key !== 'Tab') return;
    var f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', el)
      .filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ========================================================================
     F. SERVICE DETAIL MODAL
     ======================================================================== */
  function initServiceModal() {
    var modal = $('#service-modal');
    if (!modal) return;
    var close = $('#modal-close');

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-service]');
      if (trigger) {
        var svc = C.services.filter(function (s) { return s.id === trigger.getAttribute('data-service'); })[0];
        if (!svc) return;
        $('#modal-icon').innerHTML = icon(svc.icon, 26);
        $('#modal-title').textContent = svc.title;
        $('#modal-text').textContent  = svc.details || svc.text;
        $('#modal-cta').setAttribute('data-service-pick', JSON.stringify(svc.prefill || {}));
        openDialog(modal, close);
        return;
      }
      /* Close on backdrop or close button */
      if (modal.classList.contains('is-open') &&
          (e.target === modal || e.target.closest('#modal-close'))) {
        closeDialog(modal);
      }
    });

    /* Quote button inside the modal: close, jump to the form, pre-tick the service */
    $('#modal-cta').addEventListener('click', function () {
      var pick = {};
      try { pick = JSON.parse(this.getAttribute('data-service-pick') || '{}'); } catch (e) {}
      closeDialog(modal);
      applyPrefill(pick);
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeDialog(modal);
      trapFocus(modal, e);
    });
  }

  /* Pre-fill the booking form from elsewhere on the page.
     A service either matches an Event Type option or a Services checkbox. */
  function applyPrefill(pick) {
    if (!pick) return;
    if (pick.eventType) {
      var sel = $('#f-type');
      var has = sel && $$('option', sel).some(function (o) { return o.value === pick.eventType; });
      if (has && !sel.value) sel.value = pick.eventType;
    }
    if (pick.service) {
      var box = $$('#services-checks input').filter(function (i) { return i.value === pick.service; })[0];
      if (box && !box.checked) box.checked = true;
    }
  }

  /* Package "Get a Custom Quote" buttons note which package was clicked */
  function initPackageLinks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-package]');
      if (!link) return;
      var msg = $('#f-message');
      var name = link.getAttribute('data-package');
      if (msg && !msg.value) msg.value = 'I’m interested in ' + name + '. ';
    });
  }

  /* ========================================================================
     G. GALLERY FILTER + LIGHTBOX
     ======================================================================== */
  function initGallery() {
    var grid    = $('#gallery-grid');
    var filters = $('#gallery-filters');
    var lb      = $('#lightbox');
    if (!grid) return;

    var visible = [];   /* indexes currently shown, in display order */
    var current = 0;

    function refreshVisible() {
      visible = $$('.gallery__item', grid)
        .filter(function (b) { return !b.classList.contains('is-hidden'); })
        .map(function (b) { return parseInt(b.getAttribute('data-index'), 10); });
    }
    refreshVisible();

    /* --- Filtering --- */
    if (filters) {
      filters.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        var key = btn.getAttribute('data-filter');

        $$('.filter-btn', filters).forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });

        $$('.gallery__item', grid).forEach(function (item) {
          var show = key === 'all' || item.getAttribute('data-cat') === key;
          item.classList.toggle('is-hidden', !show);
          if (show) item.classList.add('is-visible');   /* don't re-run the fade-in */
        });
        refreshVisible();
      });
    }

    if (!lb) return;

    /* --- Lightbox --- */
    var img     = $('#lb-img');
    var caption = $('#lb-caption');
    var count   = $('#lb-count');

    function show(pos) {
      if (!visible.length) return;
      current = (pos + visible.length) % visible.length;
      var item = C.gallery[visible[current]];
      img.setAttribute('src', item.full || item.src);
      img.setAttribute('alt', item.alt);
      caption.textContent = item.alt;
      count.textContent = (current + 1) + ' of ' + visible.length;
    }

    grid.addEventListener('click', function (e) {
      var item = e.target.closest('.gallery__item');
      if (!item) return;
      refreshVisible();
      var idx = parseInt(item.getAttribute('data-index'), 10);
      show(visible.indexOf(idx));
      openDialog(lb, $('#lb-close'));
    });

    $('#lb-close').addEventListener('click', function () { closeDialog(lb); });
    $('#lb-prev').addEventListener('click', function () { show(current - 1); });
    $('#lb-next').addEventListener('click', function () { show(current + 1); });

    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox__figure')) closeDialog(lb);
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape')     { closeDialog(lb); }
      if (e.key === 'ArrowLeft')  { show(current - 1); }
      if (e.key === 'ArrowRight') { show(current + 1); }
      trapFocus(lb, e);
    });

    /* Swipe on touch screens */
    var startX = null;
    lb.addEventListener('touchstart', function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });
  }

  /* ========================================================================
     H. FAQ ACCORDION
     ======================================================================== */
  function initFaq() {
    var list = $('#faq-list');
    if (!list) return;

    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq__q');
      if (!btn) return;

      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open  = btn.getAttribute('aria-expanded') === 'true';

      /* One answer open at a time keeps the section short */
      $$('.faq__q', list).forEach(function (other) {
        if (other === btn || other.getAttribute('aria-expanded') !== 'true') return;
        var p = document.getElementById(other.getAttribute('aria-controls'));
        other.setAttribute('aria-expanded', 'false');
        collapse(p);
      });

      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (open) collapse(panel); else expand(panel);
    });

    function expand(panel) {
      var h = panel.firstElementChild.offsetHeight;
      panel.style.height = h + 'px';
      var done = function () {
        panel.style.height = 'auto';
        panel.removeEventListener('transitionend', done);
      };
      if (prefersReducedMotion) done();
      else panel.addEventListener('transitionend', done);
    }

    function collapse(panel) {
      panel.style.height = panel.firstElementChild.offsetHeight + 'px';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { panel.style.height = '0px'; });
      });
    }
  }

  /* ========================================================================
     I. BOOKING FORM
     ========================================================================
     Delivery is controlled by the central configuration. Behaviour:
       • config.form.endpoint set    → the form really posts, then thanks you
       • config.form.endpoint empty  → the request is handed to the visitor's
                                       email app, fully written and addressed
     ======================================================================== */
  function initForm() {
    var form   = $('#booking-form');
    var result = $('#form-result');
    var status = $('#form-status');
    if (!form) return;

    var RULES = {
      'f-name':  { msg: 'Please tell us your name.',    test: function (v) { return v.trim().length >= 2; } },
      'f-email': { msg: 'Please enter a valid email address.',
                   test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
      'f-phone': { msg: 'Please enter a phone number we can reach you on.',
                   test: function (v) { return v.replace(/\D/g, '').length >= 10; } }
    };

    function fieldOf(input) { return input.closest('.field'); }

    function validateOne(input) {
      var rule = RULES[input.id];
      if (!rule) return true;
      var ok = rule.test(input.value);
      var wrap = fieldOf(input);
      wrap.classList.toggle('has-error', !ok);
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      var err = $('.field__error', wrap);
      if (err) err.textContent = ok ? '' : rule.msg;
      return ok;
    }

    /* Event date must not be in the past */
    var dateInput = $('#f-date');
    if (dateInput) {
      var today = new Date();
      dateInput.min = today.toISOString().split('T')[0];
    }

    /* Validate as soon as a field is left, and clear errors as it is fixed */
    Object.keys(RULES).forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('blur', function () { validateOne(input); });
      input.addEventListener('input', function () {
        if (fieldOf(input).classList.contains('has-error')) validateOne(input);
      });
    });

    function collect() {
      var fd = new FormData(form);
      var services = fd.getAll('services');
      return {
        'Name':            fd.get('name') || '',
        'Email':           fd.get('email') || '',
        'Phone':           fd.get('phone') || '',
        'Event date':      fd.get('eventDate') || 'Not given',
        'Event type':      fd.get('eventType') || 'Not given',
        'Event location':  fd.get('eventLocation') || 'Not given',
        'Number of guests':fd.get('guests') || 'Not given',
        'Start time':      fd.get('startTime') || 'Not given',
        'Duration':        fd.get('duration') || 'Not given',
        'Services':        services.length ? services.join(', ') : 'Not specified',
        'About the event': fd.get('message') || '(none)'
      };
    }

    function asText(data) {
      return Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');
    }

    function showResult(html, isError) {
      result.className = 'form__result' + (isError ? ' form__result--error' : '');
      result.innerHTML = html;
      result.hidden = false;
      result.focus();
      result.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Spam trap — silently stop bots */
      if ($('#f-company') && $('#f-company').value) return;

      var firstBad = null;
      Object.keys(RULES).forEach(function (id) {
        var input = document.getElementById(id);
        if (input && !validateOne(input) && !firstBad) firstBad = input;
      });

      if (firstBad) {
        status.textContent = 'Please check the highlighted fields.';
        firstBad.focus();
        return;
      }
      status.textContent = '';

      var data = collect();
      var btn  = $('#form-submit');

      /* ---- Case 1: a real endpoint is configured — actually send it ---- */
      if (C.form.endpoint) {
        btn.disabled = true;
        status.textContent = 'Sending your request…';

        fetch(C.form.endpoint, {
          method: C.form.method || 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        }).then(function (res) {
          if (!res.ok) throw new Error('Request failed: ' + res.status);
          form.hidden = true;
          status.textContent = '';
          showResult(
            '<h3>Thank you!</h3><p>' + esc(C.form.successMessage) + '</p>'
          );
        }).catch(function () {
          btn.disabled = false;
          status.textContent = '';
          showResult(
            '<h3>That didn’t go through</h3>' +
            '<p>Something went wrong sending your request. Please try again, or reach us directly ' +
            'and we’ll take your details over the phone or by email.</p>' +
            '<div class="form__result-actions">' + directContactButtons() + '</div>', true
          );
        });
        return;
      }

      /* ---- Case 2: no backend yet — hand the finished request to their email ---- */
      var b = C.business;
      var subject = 'Event enquiry — ' + (data['Event type'] !== 'Not given' ? data['Event type'] : 'PourIt4U') +
                    (data['Event date'] !== 'Not given' ? ' on ' + data['Event date'] : '');
      var body = 'Hello PourIt4U,\n\nI would like a quote for my event.\n\n' + asText(data) +
                 '\n\n— Sent from pourit4u.com\n';
      var mailto = 'mailto:' + b.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      showResult(
        '<h3>Your request is ready — one last step</h3>' +
        '<p>Automatic sending isn’t switched on for this form yet, so we won’t pretend it has ' +
        'gone anywhere. Tap the button below and your request opens in your email app, already ' +
        'written out and addressed to us — just press send.</p>' +
        '<div class="form__result-actions">' +
          '<a class="btn btn--gold" href="' + esc(mailto) + '">Open Email to Send</a>' +
          '<button class="btn btn--ghost" type="button" id="copy-request">Copy My Details</button>' +
          directContactButtons() +
        '</div>'
      );

      var copyBtn = $('#copy-request');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          var text = subject + '\n\n' + asText(data);
          var done = function () {
            copyBtn.textContent = 'Copied!';
            window.setTimeout(function () { copyBtn.textContent = 'Copy My Details'; }, 2200);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, done);
          } else {
            var ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch (err) {}
            document.body.removeChild(ta);
            done();
          }
        });
      }
    });

    function directContactButtons() {
      var b = C.business, out = '';
      if (!isPlaceholder(b.phone) && !isPlaceholder(b.phoneLink)) {
        out += '<a class="btn btn--ghost" href="tel:+' + esc(b.phoneLink) + '">Call ' + esc(b.phone) + '</a>';
      }
      return out;
    }
  }

  /* ========================================================================
     J. STRUCTURED DATA (SEO)
     ========================================================================
     Only real information is published. Anything still a placeholder is left
     out entirely rather than guessed at.
     ======================================================================== */
  function initSchema() {
    var b = C.business;

    var localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': b.domain + '/#business',
      'name': b.name,
      'description': 'Professional private bartending and mobile bar service for weddings, ' +
                     'private parties, corporate events and celebrations throughout ' +
                     b.city + ' and the greater Tampa Bay area.',
      'url': b.domain + '/',
      'image': b.domain + '/assets/img/pourit4u-logo.png',
      'logo': b.domain + '/assets/img/pourit4u-logo.png',
      'slogan': b.tagline,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': b.city,
        'addressRegion': b.region,
        'addressCountry': 'US'
      },
      'areaServed': b.cities.map(function (city) {
        return { '@type': 'City', 'name': city, 'addressRegion': b.region };
      }),
      'knowsAbout': ['Private bartending', 'Mobile bar service', 'Wedding bartending',
                     'Corporate event bartending', 'Custom cocktail menus'],
      'makesOffer': C.services.map(function (s) {
        return {
          '@type': 'Offer',
          'itemOffered': { '@type': 'Service', 'name': s.title, 'description': s.text }
        };
      })
    };

    if (!isPlaceholder(b.phone) && !isPlaceholder(b.phoneLink)) {
      localBusiness.telephone = '+' + b.phoneLink;
    }
    if (!isPlaceholder(b.email)) {
      localBusiness.email = b.email;
    }
    var sameAs = [C.social.facebook, C.social.instagram, C.social.tiktok].filter(Boolean);
    if (sameAs.length) localBusiness.sameAs = sameAs;

    var faqPage = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': C.faqs.map(function (f) {
        return {
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
        };
      })
    };

    [localBusiness, faqPage].forEach(function (obj) {
      var tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.textContent = JSON.stringify(obj);
      document.head.appendChild(tag);
    });
  }

  /* ========================================================================
     BOOT
     ======================================================================== */
  function init() {
    renderNav();
    renderBenefits();
    renderServices();
    renderWhy();
    renderSteps();
    renderPackages();
    renderGallery();
    renderTestimonials();
    renderFaq();
    renderContact();
    renderFooter();
    renderTokens();
    renderFormOptions();

    initHeader();
    initReveal();
    initServiceModal();
    initPackageLinks();
    initGallery();
    initFaq();
    initForm();
    initSchema();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
