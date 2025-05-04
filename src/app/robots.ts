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
        allow: [
          "/",
          "/search",
          "/contents/[0-9]*",
          "/favicon.ico",
          "/googlefff3c7122be09534.html",
          "/naver521d1486069128eb8190f6dc9948e518.html",
        ],
        disallow: ["/apis/"],
      },
    ],
    sitemap: "https://liket.site/sitemap.xml",
  };
}
