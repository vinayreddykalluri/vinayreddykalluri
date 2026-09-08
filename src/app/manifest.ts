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
    background_color: "#e9ebe6",
    theme_color: "#b4472c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
