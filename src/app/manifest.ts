import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vinay Reddy Kalluri - Personal Website",
    short_name: "VRK",
    description: "Senior Java Backend Engineer portfolio focused on scalable microservices and distributed systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d1f",
    theme_color: "#7400B8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
