import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/private-page/" }],
    sitemap: "https://www.moping.co.kr/sitemap.xml",
  };
}
