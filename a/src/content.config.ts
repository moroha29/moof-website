import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const site = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/site" }),
  schema: z.object({
    storeName: z.string(),
    logoText: z.string(),
    seo: z.object({
      homeTitle: z.string(),
      homeDescription: z.string(),
      menuTitle: z.string(),
      menuDescription: z.string()
    }),
    labels: z.object({
      navigation: z.object({ home: z.string(), menu: z.string(), visit: z.string(), instagram: z.string() }),
      hero: z.object({ headlineSuffix: z.string(), cta: z.string(), featuredDrink: z.string() }),
      today: z.object({ eyebrow: z.string(), heading: z.string(), seasonal: z.string(), seasonalFallback: z.string(), ingredients: z.string(), bar: z.string(), barHeading: z.string(), barBody: z.string() }),
      menuPreview: z.object({ eyebrow: z.string(), heading: z.string(), cta: z.string(), signature: z.string(), seasonal: z.string() }),
      visit: z.object({ eyebrow: z.string(), heading: z.string(), address: z.string(), directions: z.string(), hours: z.string(), mapTitle: z.string() }),
      menuPage: z.object({ eyebrow: z.string(), headline: z.string(), headlineEmphasis: z.string(), intro: z.string(), footerPrefix: z.string(), footerCta: z.string() })
    }),
    nav: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        external: z.boolean().optional()
      })
    ),
    hero: z.object({
      eyebrow: z.string(),
      headline: z.string(),
      since: z.string(),
      note: z.string(),
      featuredDrinkId: z.string(),
      carouselDrinkIds: z.array(z.string()).default([]),
      announcement: z.string()
    }),
    ingredients: z.array(
      z.object({
        name: z.string(),
        origin: z.string(),
        description: z.string()
      })
    ),
    about: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      body: z.string(),
      storeNote: z.string(),
      image: z.string(),
      imageAlt: z.string(),
      ingredients: z.array(z.object({ name: z.string(), origin: z.string(), description: z.string() }))
    }),
    customAnnouncement: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      body: z.string(),
      image: z.string(),
      imageAlt: z.string()
    }),
    findUs: z.object({
      heading: z.string(),
      body: z.string(),
      address: z.string(),
      unit: z.string(),
      mrtNote: z.string(),
      operatingHours: z.string(),
      instagramLabel: z.string(),
      instagramUrl: z.string().url(),
      mapEmbedUrl: z.string().url().optional()
    }),
    menuPageFooter: z.object({ address: z.string(), unit: z.string() }),
    additionalMenuCategories: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        seasonName: z.string().optional(),
        items: z.array(z.any())
      })
    ).default([]),
    team: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      members: z.array(
        z.object({
          name: z.string(),
          role: z.string(),
          bio: z.string(),
          image: z.string()
        })
      )
    })
  })
});

const menu = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/menu" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seasonName: z.string().optional(),
    items: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        category: z.string(),
        price: z.string().regex(/^\$\d+(\.\d{2})?$/),
        description: z.string(),
        signature: z.string().optional(),
        image: z.string(),
        review: z.object({
          quote: z.string(),
          reviewerName: z.string(),
          reviewerImage: z.string()
        }),
        tasting: z.object({
          bitterness: z.number().int().min(1).max(5),
          aroma: z.number().int().min(1).max(5),
          nuttiness: z.number().int().min(1).max(5),
          sweetness: z.number().int().min(1).max(5)
        }),
        temperatureOptions: z.array(z.enum(["hot", "cold"])),
        milkOptions: z.array(z.string()),
        isSeasonal: z.boolean(),
        active: z.boolean()
      })
    )
  })
});

export const collections = { site, menu };
