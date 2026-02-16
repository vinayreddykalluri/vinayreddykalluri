import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vinay Reddy Kalluri - Personal Website",
    short_name: "VRK",
    description:
      "Senior Java Backend Engineer portfolio focused on scalable microservices and distributed systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f6fc",
    theme_color: "#0f6fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
