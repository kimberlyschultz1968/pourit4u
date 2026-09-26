/* ==========================================================================
   PourIt4U — SITE CONFIGURATION
   ==========================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR DAY-TO-DAY CHANGES.

   Change the phone number, email, prices, packages, FAQs, testimonials and
   gallery photos here — then save and refresh the website. You do not need to
   touch index.html or any other file.

   Anything written as "___" or marked PLACEHOLDER is waiting for real
   information. The website is built to hide or soften those spots until they
   are filled in, so nothing false is ever shown to a customer.
   ========================================================================== */

const SITE = {

  /* ------------------------------------------------------------------
     1. BUSINESS DETAILS
     ------------------------------------------------------------------ */
  business: {
    name: 'PourIt4U',
    legalName: 'PourIt4U',
    descriptor: 'Private Bartending & Events',
    tagline: 'You Bring the Party. We Bring the Pour.',
    domain: 'https://pourit4u.com',

    // ---- Business phone ----
    phone: '(727) 758-9152',        // how it reads on screen
    phoneLink: '17277589152',       // digits only, used for tap-to-call
    phoneContact: 'Ask for Alex',   // shown beside the number; set to '' to hide

    // ---- Business email ----
    // `email` is the main address: used for the Email Us buttons, the booking
    // form hand-off and Google. `emailSecondary` is listed underneath it.
    // Set emailSecondary to '' to show only one address.
    email: 'alex@pourit4u.com',
    emailSecondary: '',

    // Home base. Travel is measured from here.
    city: 'New Port Richey',
    freeTravelMiles: 50,

    serviceArea: 'Serving New Port Richey & the greater Tampa Bay area.',
    serviceAreaShort: 'New Port Richey · Greater Tampa Bay',

    // Towns listed for Google as places you serve (not shown on the page).
    cities: ['New Port Richey', 'Port Richey', 'Holiday', 'Trinity', 'Hudson', 'Tarpon Springs',
             'Palm Harbor', 'Odessa', 'Spring Hill', 'Land O’ Lakes', 'Wesley Chapel', 'Lutz',
             'Clearwater', 'Tampa'],
    region: 'FL',
    hours: 'By appointment — we answer every inquiry.'
  },

  /* ------------------------------------------------------------------
     2. SOCIAL LINKS
     Set a link to '' (empty) to hide that icon completely.
     ------------------------------------------------------------------ */
  social: {
    facebook:  'https://www.facebook.com/profile.php?id=61594528391718',
    instagram: '',   // e.g. 'https://instagram.com/pourit4u'  PLACEHOLDER
    tiktok:    ''    // e.g. 'https://tiktok.com/@pourit4u'    PLACEHOLDER
  },

  /* ------------------------------------------------------------------
     3. BOOKING FORM DELIVERY
     ------------------------------------------------------------------
     Formspree delivers event requests to alex@pourit4u.com and keeps a copy
     in the PourIt4U Event Requests dashboard. The success message appears
     only after Formspree accepts the request. Set endpoint to null to use
     the visitor's email app as a fallback instead.
     ------------------------------------------------------------------ */
  form: {
    endpoint: 'https://formspree.io/f/mnpnbbve',
    method: 'POST',
    successMessage: 'Thank you! We’ve received your event request and will be in touch soon.'
  },

  /* ------------------------------------------------------------------
     4. NAVIGATION
     ------------------------------------------------------------------ */
  nav: [
    { label: 'Home',         href: '#home' },
    { label: 'About',        href: '#about' },
    { label: 'Services',     href: '#services' },
    { label: 'Packages',     href: '#packages' },
    { label: 'Gallery',      href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ',          href: '#faq' },
    { label: 'Contact',      href: '#contact' }
  ],

  /* ------------------------------------------------------------------
     5. TRUST / BENEFITS BAR (under the hero)
     ------------------------------------------------------------------ */
  benefits: [
    { icon: 'glass',   title: 'Professional Service',    text: 'Experienced, friendly bartending' },
    { icon: 'sparkle', title: 'Personalized Experience', text: 'Every event is customized' },
    { icon: 'calm',    title: 'Stress-Free Hosting',     text: 'We handle the bar so you can enjoy your event' },
    { icon: 'star',    title: 'Exceptional Service',     text: 'Professional from setup to last call' }
  ],

  /* ------------------------------------------------------------------
     6. SERVICES
     `details` is the longer copy shown when someone taps LEARN MORE.
     `prefill` decides what the booking form fills in when someone asks for a
     quote from that service — either an Event Type or a Services checkbox.
     ------------------------------------------------------------------ */
  services: [
    {
      id: 'weddings',
      icon: 'rings',
      title: 'Weddings',
      text: 'Make your special day even more memorable with professional bartending and personalized service.',
      details: 'From the cocktail hour through the last toast, we keep your bar running beautifully so you and your guests never think about it. We work alongside your planner, caterer and venue, and we can build a drink menu around your colours, your season and the two of you.',
      prefill: { eventType: 'Wedding' }
    },
    {
      id: 'private-parties',
      icon: 'confetti',
      title: 'Private Parties',
      text: 'Birthdays, anniversaries, showers, graduations, holiday parties and celebrations of all kinds.',
      details: 'Backyard get-together or a full house — we bring the same standard of service. We set up, serve your guests, keep the bar tidy all night and clean up before we leave, so you get to actually attend your own party.',
      prefill: { eventType: 'Private Party' }
    },
    {
      id: 'corporate',
      icon: 'briefcase',
      title: 'Corporate Events',
      text: 'Impress clients, colleagues and guests with polished, professional bar service.',
      details: 'Company celebrations, client appreciation evenings, holiday parties, grand openings and networking events. Discreet, punctual and presentable service that reflects well on your organisation, with clear communication before the event.',
      prefill: { eventType: 'Corporate' }
    },
    {
      id: 'custom-menus',
      icon: 'menu',
      title: 'Custom Drink Menus',
      text: 'Signature cocktails and personalized drink menus created around your event.',
      details: 'We will help you choose a short, well-balanced drink list your guests will love — including a signature cocktail named for the occasion. You get a shopping list so you know exactly what to buy, with nothing left over that you did not want.',
      prefill: { service: 'Custom Cocktails' }
    },
    {
      id: 'mobile-bar',
      icon: 'bar',
      title: 'Mobile Bar Service',
      text: 'A beautiful, professional bar experience brought directly to your venue.',
      details: 'A complete bar brought to your location and set up wherever you would like it — indoors, on the patio or in the yard. Presentation, glass or cup service, garnish station and everything needed to make it look and feel like a real bar.',
      prefill: { service: 'Mobile Bar' }
    }
  ],

  /* ------------------------------------------------------------------
     7. WHY CHOOSE US — the four supporting points
     ------------------------------------------------------------------ */
  whyPoints: [
    { icon: 'shield',  title: 'Professional & Reliable' },
    { icon: 'smile',   title: 'Friendly & Fun' },
    { icon: 'diamond', title: 'Quality Service' },
    { icon: 'tailor',  title: 'Customized For You' }
  ],

  /* ------------------------------------------------------------------
     8. HOW IT WORKS
     ------------------------------------------------------------------ */
  steps: [
    { n: '01', title: 'Tell Us About Your Event', text: 'Tell us your date, location, guest count and what you’re planning.' },
    { n: '02', title: 'Choose Your Service',      text: 'We’ll help you choose the bartending package that fits your event.' },
    { n: '03', title: 'We Prepare',               text: 'We’ll coordinate the details and make sure everything is ready for your event.' },
    { n: '04', title: 'You Enjoy',                text: 'We arrive, set up, serve your guests and handle the bar while you enjoy your party.' }
  ],

  /* ------------------------------------------------------------------
     9. PACKAGES
     ------------------------------------------------------------------
     Prices set 6 Sep 2026 from local market research — see PRICING-RESEARCH.md.
     They are STARTING prices for one bartender for up to four hours.
     To change one, just edit `price` (e.g. '$350').
     If you ever put '___' back, the card shows "Pricing on request" instead,
     so no customer is ever quoted a made-up number.

     `hours` and every line in `includes` are yours to edit freely.
     ------------------------------------------------------------------ */
  packages: [
    {
      id: 'essential',
      name: 'The Essential Pour',
      subtitle: 'Bartender Service',
      blurb: 'For hosts who already have their alcohol and supplies.',
      price: '$350',
      priceLabel: 'Starting at',
      hours: 'Up to 4 hours',
      featured: false,
      includes: [
        'Professional bartender',
        'Event setup',
        'Bartending service',
        'Basic cleanup',
        'Gratuity included'
      ]
    },
    {
      id: 'signature',
      name: 'The Signature Pour',
      subtitle: 'Bartender + Bar Experience',
      blurb: 'Our most complete everyday package — you bring the alcohol, we bring everything else.',
      price: '$525',
      priceLabel: 'Starting at',
      hours: 'Up to 4 hours',
      featured: true,
      includes: [
        'Professional bartender',
        'Bar setup',
        'Mixers',
        'Garnishes',
        'Cups',
        'Napkins',
        'Ice',
        'Setup & cleanup',
        'Gratuity included'
      ]
    },
    {
      id: 'experience',
      name: 'The PourIt4U Experience',
      subtitle: 'Full-Service Bar Experience',
      blurb: 'The full treatment, designed around your event from the first conversation.',
      price: '$775',
      priceLabel: 'Starting at',
      hours: 'Up to 4 hours',
      featured: false,
      includes: [
        'Everything in Signature',
        'Custom cocktail menu',
        'Personalized event consultation',
        'Premium presentation',
        'Signature drink creation',
        'Enhanced bar setup',
        'Gratuity included'
      ]
    }
  ],

  /* Small print under the packages. Edit freely. */
  packagesNote: 'Gratuity is included in every package — no service charge added at the end. Starting prices are for one bartender for up to four hours; final pricing depends on your guest count, hours, location and the service you choose. Tell us about your event and we’ll send you a clear, itemised quote with no surprises.',

  /* ------------------------------------------------------------------
     9b. ADD-ONS — the extras shown in a strip under the packages
     ------------------------------------------------------------------
     These are the numbers people ask about after the headline price.
     Edit `price` and `note` freely; delete an entry to remove it.
     ------------------------------------------------------------------ */
  addOns: [
    { label: 'Additional Hour',      price: '$85',            note: 'Per bartender, any package' },
    { label: 'Additional Bartender', price: '$200',           note: 'Up to 4 hours' },
    { label: 'Travel',               price: 'Free',           note: 'Within 50 miles — $65 beyond' },
    { label: 'To Hold Your Date',    price: '25% deposit',    note: 'Balance due 7 days before' }
  ],

  /* ------------------------------------------------------------------
     10. GALLERY
     ------------------------------------------------------------------
     TEMPORARY STOCK PHOTOGRAPHY.
     These are licensed stock images (Unsplash) used as placeholders. They are
     NOT photographs of PourIt4U events and are not presented as such.

     TO SWAP IN YOUR REAL PHOTOS:
       1. Put your photo in  assets/img/gallery/
       2. Change `src` (the small grid version) and `full` (the big version
          shown when it is clicked) to your file name.
       3. Update `alt` to describe the photo, and set `stock: false`.
     A good size is roughly 800x600 for `src` and 1500x1125 for `full`.
     ------------------------------------------------------------------ */
  gallery: [
    { cat: 'weddings',  src: 'assets/img/gallery/wedding-table.jpg',       full: 'assets/img/gallery/wedding-table-large.jpg',       alt: 'Elegant wedding reception table set with florals and glassware', stock: true },
    { cat: 'weddings',  src: 'assets/img/gallery/wedding-florals.jpg',     full: 'assets/img/gallery/wedding-florals-large.jpg',     alt: 'Long celebration table dressed with flowers and place settings', stock: true },
    { cat: 'weddings',  src: 'assets/img/gallery/wedding-ceremony.jpg',    full: 'assets/img/gallery/wedding-ceremony-large.jpg',    alt: 'Outdoor wedding ceremony seating arranged before the aisle', stock: true },
    { cat: 'parties',   src: 'assets/img/gallery/party-bartender.jpg',     full: 'assets/img/gallery/party-bartender-large.jpg',     alt: 'Bartender mixing a drink behind a bar at an evening event', stock: true },
    { cat: 'parties',   src: 'assets/img/gallery/party-toast.jpg',         full: 'assets/img/gallery/party-toast-large.jpg',         alt: 'Guests raising glasses together at an outdoor celebration', stock: true },
    { cat: 'parties',   src: 'assets/img/gallery/party-spritz.jpg',        full: 'assets/img/gallery/party-spritz-large.jpg',        alt: 'Two chilled cocktails served side by side in warm light', stock: true },
    { cat: 'corporate', src: 'assets/img/gallery/corporate-audience.jpg',  full: 'assets/img/gallery/corporate-audience-large.jpg',  alt: 'Guests seated at a corporate evening event', stock: true },
    { cat: 'corporate', src: 'assets/img/gallery/corporate-venue.jpg',     full: 'assets/img/gallery/corporate-venue-large.jpg',     alt: 'Corporate function venue set up for guests', stock: true },
    { cat: 'corporate', src: 'assets/img/gallery/corporate-reception.jpg', full: 'assets/img/gallery/corporate-reception-large.jpg', alt: 'Guests gathered for a reception in a grand event hall', stock: true },
    { cat: 'cocktails', src: 'assets/img/gallery/cocktail-gold.jpg',       full: 'assets/img/gallery/cocktail-gold-large.jpg',       alt: 'Golden cocktail finished with a fresh garnish', stock: true },
    { cat: 'cocktails', src: 'assets/img/gallery/cocktail-red.jpg',        full: 'assets/img/gallery/cocktail-red-large.jpg',        alt: 'Deep red cocktail garnished with fruit on a dark bar', stock: true },
    { cat: 'cocktails', src: 'assets/img/gallery/cocktail-herb.jpg',       full: 'assets/img/gallery/cocktail-herb-large.jpg',       alt: 'Cocktail served over ice with a herb garnish', stock: true }
  ],

  galleryFilters: [
    { key: 'all',       label: 'All' },
    { key: 'weddings',  label: 'Weddings' },
    { key: 'parties',   label: 'Parties' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'cocktails', label: 'Cocktails' }
  ],

  /* ------------------------------------------------------------------
     11. TESTIMONIALS
     ------------------------------------------------------------------
     THESE ARE EXAMPLES, NOT REAL REVIEWS.
     Every entry below has `placeholder: true`, which makes the site label the
     whole section as examples. As soon as you have a genuine review:
       - replace `quote`, `name` and `event`
       - set `placeholder: false`
     Once every card is real, the "example" labelling disappears by itself.
     Add as many as you like — the layout adjusts.
     ------------------------------------------------------------------ */
  testimonials: [
    { quote: 'This is where a real review from a real PourIt4U client will appear once your first events are complete.', name: 'Your first review', event: 'Awaiting real client feedback', stars: 5, placeholder: true },
    { quote: 'A second space is ready for a genuine guest or host comment about the bar service at their event.',        name: 'Your second review', event: 'Awaiting real client feedback', stars: 5, placeholder: true },
    { quote: 'And a third, so the section looks full and balanced the day your real testimonials go in.',                name: 'Your third review',  event: 'Awaiting real client feedback', stars: 5, placeholder: true }
  ],

  /* ------------------------------------------------------------------
     12. FAQ — edit, reorder, add or remove freely
     ------------------------------------------------------------------ */
  faqs: [
    {
      q: 'How far do you travel?',
      a: 'We’re based in New Port Richey and serve events throughout the greater Tampa Bay area. Travel is free within 50 miles of New Port Richey. Beyond that there’s a flat $65 travel fee, and for longer trips we’ll quote the travel cost upfront. Whatever it comes to, it’s shown clearly in your quote before you book — never added afterwards.'
    },
    {
      q: 'Do I provide the alcohol?',
      a: 'Yes. You purchase the alcohol for your event and we provide the professional bartending service. We’ll give you a shopping list based on your guest count and the drinks you want, so you know exactly what to buy and you’re not left guessing or over-buying.'
    },
    {
      q: 'Do you provide mixers and garnishes?',
      a: 'That depends on the package you choose. Our Signature and PourIt4U Experience packages include mixers, garnishes, ice, cups and napkins. The Essential Pour is bartending service only, for hosts who already have their supplies. We’ll confirm exactly what’s included in your quote.'
    },
    {
      q: 'How many bartenders will I need?',
      a: 'As a rule of thumb, one bartender comfortably serves up to about 75 guests. Above that, or if you’re serving a lot of made-to-order cocktails, a second bartender is $200 for up to four hours. Tell us your numbers and we’ll recommend what you actually need so your guests aren’t waiting in line — we’d rather get this right than oversell you.'
    },
    {
      q: 'How far in advance should I book?',
      a: 'The earlier the better, especially for weekends, holidays and wedding season. That said, it’s always worth asking about a shorter timeline — if the date is open, we’ll do our best to make it work.'
    },
    {
      q: 'Do you provide a mobile bar?',
      a: 'Yes. Our mobile bar service brings a complete, professional bar setup directly to your venue — indoors, on a patio or out in the yard. We handle delivery, setup and breakdown.'
    },
    {
      q: 'Can you create a custom cocktail menu?',
      a: 'Absolutely, and it’s one of our favourite parts. We’ll build a short, well-balanced drink list around your event, your theme and your taste, including a signature cocktail named for the occasion.'
    },
    {
      q: 'Do you bartend weddings?',
      a: 'Yes. Weddings are a big part of what we do. We’ll coordinate with your planner, caterer or venue, work to your timeline, and keep the bar running smoothly from cocktail hour through the final toast.'
    },
    {
      q: 'Do you service corporate events?',
      a: 'Yes. Company celebrations, client appreciation evenings, holiday parties, grand openings and networking events — with the polished, professional presentation those occasions call for.'
    },
    {
      q: 'What happens if my event runs longer than planned?',
      a: 'It happens, and it’s usually a good sign. Additional time is $85 per hour per bartender, and can normally be added on the night if our schedule allows. You’ll know that rate before your event, so there are never any surprises.'
    },
    {
      q: 'Is gratuity included?',
      a: 'Yes. Gratuity is included in every package price. There’s no service charge added at the end and no tip jar on your bar — the price we quote is the price you pay. If your bartender goes above and beyond and you’d like to tip on the night, it’s always welcome, but never expected.'
    },
    {
      q: 'Do you require a deposit?',
      a: 'Yes — a 25% deposit holds your date, with the balance due 7 days before your event. The exact amounts and the cancellation terms are confirmed in writing with your quote before anything is due.'
    }
  ],

  /* ------------------------------------------------------------------
     13. BOOKING FORM OPTIONS
     ------------------------------------------------------------------ */
  eventTypes: [
    'Wedding', 'Birthday', 'Anniversary', 'Graduation',
    'Baby/Bridal Shower', 'Corporate', 'Holiday Party', 'Private Party', 'Other'
  ],

  serviceOptions: [
    'Bartender Only', 'Mobile Bar', 'Full Bar Service',
    'Custom Cocktails', 'Not Sure — Help Me Choose'
  ],

  durations: [
    '1–2 hours', '3 hours', '4 hours', '5 hours', '6 hours', '6+ hours', 'Not sure yet'
  ],

  guestRanges: [
    'Under 25', '25–50', '51–100', '101–150', '151–200', '200+', 'Not sure yet'
  ]
};

/* Make the config available to the rest of the site. */
window.SITE = SITE;
