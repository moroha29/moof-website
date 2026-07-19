import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const site = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/site" }),
  schema: z.object({
    storeName: z.string(),
    logoText: z.string(),
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
      heading: z.string(),
      body: z.string(),
      storeNote: z.string(),
      image: z.string()
    }),
    instagramEmbed: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      body: z.string(),
      label: z.string(),
      url: z.string().url()
    }),
    findUs: z.object({
      heading: z.string(),
      body: z.string(),
      address: z.string(),
      unit: z.string(),
      mrtNote: z.string(),
      instagramLabel: z.string(),
      instagramUrl: z.string().url()
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
        image: z.string(),
        temperatureOptions: z.array(z.enum(["hot", "cold"])),
        milkOptions: z.array(z.string()),
        isSeasonal: z.boolean(),
        active: z.boolean()
      })
    )
  })
});

export const collections = { site, menu };
