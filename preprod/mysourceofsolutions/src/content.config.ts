import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Shared field shapes reused across both collections.
const image = z.object({ image: z.string(), imageAlt: z.string().min(8) });
const seo = z.object({ title: z.string(), description: z.string() });
const hero = z
  .object({
    eyebrow: z.string(),
    heading: z.string(),
    body: z.string()
  })
  .merge(image);
const faqItem = z.object({ question: z.string(), answer: z.string() });

const productCategory = z
  .object({
    slug: z.string(),
    name: z.string(),
    title: z.string(),
    description: z.string(),
    intro: z.string(),
    bestFor: z.array(z.string()),
    products: z.array(z.object({ name: z.string(), description: z.string() })),
    methods: z.array(z.string()),
    relatedSolutions: z.array(z.string())
  })
  .merge(image);

const printingMethod = z
  .object({
    name: z.string(),
    description: z.string(),
    bestFor: z.string()
  })
  .merge(image);

const industry = z
  .object({
    slug: z.string(),
    name: z.string(),
    kicker: z.string(),
    problem: z.string(),
    bundle: z.array(z.string()),
    outcome: z.string(),
    storySlug: z.string(),
    storyLabel: z.string(),
    needsGrid: z.array(z.object({ icon: z.string(), title: z.string(), description: z.string() })),
    recommendedSolutions: z.array(
      z.object({ name: z.string(), description: z.string(), products: z.array(z.string()) })
    ),
    faq: z.array(faqItem)
  })
  .merge(image);

const storyItem = z
  .object({
    slug: z.string(),
    type: z.string(),
    title: z.string(),
    summary: z.string(),
    result: z.string(),
    challenge: z.string(),
    solution: z.string(),
    outcome: z.string(),
    gallery: z.array(z.string()),
    testimonial: z.string(),
    person: z.string(),
    relatedProducts: z.array(z.string()),
    relatedSolutions: z.array(z.string())
  })
  .merge(image);

const blogArticle = z
  .object({
    slug: z.string(),
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    date: z.string(),
    readTime: z.string(),
    featured: z.boolean(),
    popular: z.boolean(),
    body: z.array(z.string()),
    relatedProductSlug: z.string()
  })
  .merge(image);

const pillar = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  problemIntro: z.string(),
  problemPoints: z.array(z.string()),
  solutionIntro: z.string(),
  solutionPoints: z.array(z.string()),
  expectPoints: z.array(z.string()),
  recommendedProductsNote: z.string(),
  recommendedProductSlugs: z.array(z.string()),
  storySlug: z.string(),
  faq: z.array(faqItem),
  ctaHeading: z.string()
});

const site = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/site" }),
  schema: z.object({
    brand: z.object({ image: z.string(), imageAlt: z.string(), name: z.string(), tagline: z.string() }),
    seo: z.object({ homeTitle: z.string(), homeDescription: z.string() }),
    navigation: z.object({
      productsLabel: z.string(),
      whyLabel: z.string(),
      solutionsLabel: z.string(),
      workLabel: z.string(),
      quoteLabel: z.string(),
      whatsappLabel: z.string()
    }),
    hero: z
      .object({
        eyebrow: z.string(),
        headline: z.string(),
        supportingCopy: z.string(),
        primaryLabel: z.string(),
        primaryUrl: z.string(),
        secondaryLabel: z.string(),
        secondaryUrl: z.string()
      })
      .merge(image),
    trust: z.object({
      eyebrow: z.string(),
      logos: z.array(z.object({ name: z.string() }).merge(image)).min(1)
    }),
    categoriesIntro: z.object({ eyebrow: z.string(), heading: z.string(), body: z.string() }),
    categories: z.array(z.object({ slug: z.string(), name: z.string(), title: z.string(), body: z.string() }).merge(image)),
    benefitsIntro: z.object({ eyebrow: z.string(), heading: z.string() }),
    benefits: z.array(z.object({ number: z.string(), title: z.string(), body: z.string() })),
    solutionsIntro: z.object({ eyebrow: z.string(), heading: z.string() }),
    solutions: z.array(z.object({ name: z.string(), body: z.string() })),
    workIntro: z.object({ eyebrow: z.string(), heading: z.string() }),
    caseStudies: z.array(z.object({ slug: z.string(), type: z.string(), title: z.string(), result: z.string() }).merge(image)),
    testimonialsIntro: z.object({ eyebrow: z.string(), heading: z.string() }),
    testimonials: z.array(z.object({ quote: z.string(), person: z.string() })),
    quote: z
      .object({
        eyebrow: z.string(),
        heading: z.string(),
        body: z.string(),
        nameLabel: z.string(),
        phoneLabel: z.string(),
        emailLabel: z.string(),
        needLabel: z.string(),
        messageLabel: z.string(),
        submitLabel: z.string(),
        formAction: z.string()
      })
      .merge(image),
    contact: z.object({
      phoneLabel: z.string(),
      phoneUrl: z.string(),
      emailLabel: z.string(),
      emailUrl: z.string(),
      whatsappLabel: z.string(),
      whatsappUrl: z.string()
    }),
    footer: z.object({ copyright: z.string(), registration: z.string(), backToTopLabel: z.string() }),
    appearance: z.object({ overrides: z.array(z.any()) })
  })
});

const pages = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/pages" }),
  schema: z.object({
    products: z.object({
      seo,
      hero,
      categories: z.array(productCategory),
      printingIntro: z.object({ eyebrow: z.string(), heading: z.string(), body: z.string() }),
      printingMethods: z.array(printingMethod),
      faq: z.array(faqItem)
    }),
    why: z.object({
      seo,
      hero,
      reasons: z.array(z.object({ title: z.string(), label: z.string(), body: z.string() })),
      process: z.array(z.object({ number: z.string(), title: z.string(), body: z.string() })),
      pillars: z.array(pillar)
    }),
    solutions: z.object({
      seo,
      hero,
      whyChoose: z.array(z.object({ title: z.string(), body: z.string() })),
      industries: z.array(industry)
    }),
    stories: z.object({
      seo,
      hero,
      items: z.array(storyItem)
    }),
    blog: z.object({
      seo,
      hero,
      categories: z.array(z.string()),
      articles: z.array(blogArticle),
      newsletter: z.object({ heading: z.string(), body: z.string(), buttonLabel: z.string() })
    })
  })
});

export const collections = { site, pages };
