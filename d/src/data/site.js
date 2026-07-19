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
    eyebrow: "Specialty Matcha & Hojicha Bar · Tanjong Pagar",
    headline: "Real ceremonial-grade matcha, 5 minutes from your desk.",
    supportingCopy:
      "Hand-whisked with exclusive Japanese matcha — Mori and Shiran — plus a rotating seasonal menu.",
    primaryCta: "Get Directions",
    secondaryCta: "See Today's Menu",
    seasonalBadge: "Seasonal drinks pouring now"
  },
  socialProofLabel: "What regulars say",
  seasonal: {
    eyebrow: "Current seasonal menu",
    headline: "Seasonal drinks are pouring now.",
    supportingCopy: "Explore the current seasonal drinks, then get directions to Moof.",
    cta: "Get Directions — Come Try It"
  },
  menuHighlight: {
    eyebrow: "Every day",
    headline: "The core lineup",
    supportingLead: "Made with exclusive Japanese matcha",
    cta: "View full menu with seasonal drinks →"
  },
  visit: {
    eyebrow: "Walk in today",
    headline: "Find us at Eon Shenton"
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
