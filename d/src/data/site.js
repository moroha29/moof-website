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
    headline: "A quiet matcha bar in Tanjong Pagar.",
    supportingCopy:
      "Hand-whisked with exclusive Japanese matcha at Eon Shenton, a five-minute walk from Tanjong Pagar MRT."
  },
  featured: {
    eyebrow: "A few favourites",
    headline: "The everyday pour."
  },
  menuPreview: {
    eyebrow: "Menu",
    headline: "Matcha, hojicha, and seasonal drinks.",
    cta: "See the full menu"
  },
  visit: {
    eyebrow: "Location",
    headline: "Eon Shenton, Singapore"
  }
};

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
