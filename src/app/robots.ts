import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isDevMode = process.env.MODE === "development";

  if (isDevMode) {
    return {
      rules: {
        userAgent: "*",
        disallow: ["/"],
        allow: ["/favicon.ico"],
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/search", "/contents/[0-9]*", "/favicon.ico"],
        disallow: ["/"],
      },
    ],
    // sitemap: "https://liket.site/sitemap.xml",
  };
}
