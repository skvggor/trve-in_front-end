import type { Metadata } from "next";
import { Jost } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://trve.in"),
  title:
    "Marcos Lima - Father, street runner, skateboarder & senior developer.",
  description:
    "marcos lima, father, street runner, skateboarder, senior developer",
  openGraph: {
    type: "website",
    siteName: "Marcos Lima",
    locale: "pt_BR",
    url: "https://trve.in",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Image of Marcos Lima - Father, street runner, skateboarder & senior developer.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@skvggor",
    title:
      "Marcos Lima - Father, street runner, skateboarder & senior developer.",
    description: "Father, street runner, skateboarder & senior developer.",
    images: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={jost.className}>{children}</body>
    </html>
  );
}
