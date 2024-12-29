import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isDevMode = process.env.MODE === "development";

  if (isDevMode) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: "*",
        crawlDelay: 1,
      },
      {
        userAgent: "*",
        allow: ["/search"],
        disallow: "*",
        crawlDelay: 1,
      },
      {
        userAgent: "*",
        allow: ["/contents/*"],
        disallow: "*",
        crawlDelay: 1,
      },
    ],
    sitemap: "https://liket.site/sitemap.xml",
  };
}
