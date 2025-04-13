import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://liket.site";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.4,
    },
  ];

  // contents/1000부터 contents/2000까지의 경로 생성
  const contentRoutes = Array.from({ length: 1001 }, (_, i) => i + 1000).map(
    (id) => ({
      url: `${baseUrl}/contents/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...contentRoutes];
}
