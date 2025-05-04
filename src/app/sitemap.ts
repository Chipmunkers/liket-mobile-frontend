import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://liket.site";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always" as const,
      priority: 1,
    },
  ];

  const contentRoutes = Array.from({ length: 7500 }, (_, i) => i).map((id) => ({
    url: `${baseUrl}/contents/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...contentRoutes];
}
