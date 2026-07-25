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
    id: "wei-ling-tan",
    name: "Wei Ling Tan",
    role: "Bar Lead",
    bio: "Runs morning matcha prep and checks each batch before service starts.",
    image: "/images/team/wei-ling-tan.jpg"
  },
  {
    id: "arjun-menon",
    name: "Arjun Menon",
    role: "Hojicha & Roasting",
    bio: "Keeps the hojicha roast notes consistent from one week to the next.",
    image: "/images/team/arjun-menon.jpg"
  },
  {
    id: "haruka-ito",
    name: "Haruka Ito",
    role: "Service",
    bio: "First face at the counter most mornings. Trained in Uji before moving to Singapore.",
    image: "/images/team/haruka-ito.jpg"
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
