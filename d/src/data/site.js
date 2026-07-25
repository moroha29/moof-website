// Core business facts for Moof. Single source of truth for Design D.

export const site = {
  name: "Moof",
  instagramHandle: "@moof__bar",
  instagramUrl: "https://www.instagram.com/moof__bar/",
  addressLine1: "70 Shenton Way, #01-15",
  addressLine2: "Eon Shenton, Singapore",
  mrtNote: "5-minute walk from Tanjong Pagar MRT",
  hours: "Mon–Fri, 9am–6pm",
  hoursShort: "Mon–Fri 9am–6pm",
  // Google Maps "get directions" link (opens turn-by-turn directions to Moof).
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=70+Shenton+Way+%2301-15+Eon+Shenton+Singapore",
  // No-API-key embeddable map for the Visit section.
  mapEmbedUrl:
    "https://www.google.com/maps?q=70+Shenton+Way+%2301-15+Eon+Shenton+Singapore&output=embed"
};

export const homepage = {
  hero: {
    eyebrow: "Specialty matcha & hojicha",
    headline: "Matcha at Eon Shenton.",
    supportingCopy:
      "Hand-whisked with exclusive Japanese matcha at Eon Shenton, a five-minute walk from Tanjong Pagar MRT."
  },
  featured: {
    eyebrow: "Featured drinks",
    headline: "The everyday pour."
  },
  menuPreview: {
    eyebrow: "Menu",
    headline: "Matcha, hojicha, and seasonal drinks.",
    cta: "See the full menu"
  },
  story: {
    eyebrow: "Our story",
    headline: "A short walk, a slower pour.",
    body: "Moof is built around the whisk — matcha and hojicha made to order, not batched ahead of time. We work with two Japanese matcha, Mori and Shiran, alongside hojicha steeped in-house rather than syruped. The bar sits at Eon Shenton, a five-minute walk from Tanjong Pagar MRT, a small pause in the middle of the CBD."
  },
  visit: {
    eyebrow: "Location",
    headline: "Eon Shenton, Singapore"
  },
  team: {
    eyebrow: "Team",
    headline: "Who's behind the counter."
  }
};

export const team = [
  {
    id: "staff-portrait-placeholder",
    name: "Staff portrait placeholder",
    role: "Your barista",
    bio: "A friendly face at the counter — team details coming soon.",
    image: "/images/team/staff-placeholder.png"
  }
];

export const ingredients = [
  {
    name: "Mori",
    origin: "Japan",
    description: "A deep green matcha with a rounded finish — richness and body."
  },
  {
    name: "Shiran",
    origin: "Japan",
    description: "A smoother profile for clean, bright drinks and layered milk tea."
  }
];
