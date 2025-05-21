// SEO and metadata configuration for all pages
import { Metadata } from 'next';

// Base URL for the site
export const siteConfig = {
  name: "Rust Tools Suite",
  url: "https://rust-calculator.vercel.app", // Replace with your actual domain
  description: "Comprehensive tools for Rust players including raid calculator, recycling optimizer, decay timer, and server tracker.",
  author: "MSpudicDesign",
  twitterHandle: "@MSpudicDesign", // Replace with your actual Twitter handle
  locale: "en_US",
};

// Default metadata for the site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Rust Raid Calculator and Tools`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Rust", "Rust game", "Rust raid calculator", "Rust tools", 
    "Raid calculator", "Rust recycling", "Rust decay", 
    "Rust server tracker", "Rust raid cost", "Rust explosives calculator",
    "Rust workbench", "Rust excavator", "Rust battlemetrics"
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} - Rust Raid Calculator and Tools`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/og-image.png`, // Create this image
        width: 1200,
        height: 630,
        alt: "Rust Tools Suite Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Rust Raid Calculator and Tools`,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [`${siteConfig.url}/images/twitter-image.png`], // Create this image
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: ["/icon.ico"],
    apple: ["/apple-touch-icon.png"], // Create this image
    shortcut: ["/favicon.ico"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  verification: {
    // Add your verification strings when available
    google: "google-site-verification=your-code",
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },
  category: "Gaming Tools",
  classification: "Gaming, Tools, Rust Game",
};

// Generate metadata for specific pages
export function generateMetadata(
  pageTitle: string,
  pageDescription?: string,
  path?: string,
  additionalKeywords: string[] = []
): Metadata {
  const description = pageDescription || defaultMetadata.description as string;
  const url = path ? `${siteConfig.url}/${path}` : siteConfig.url;
  
  return {
    ...defaultMetadata,
    title: pageTitle,
    description: description,
    keywords: [...(defaultMetadata.keywords as string[]), ...additionalKeywords],
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: description,
      url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: description,
    },
    alternates: {
      canonical: url,
    },
  };
}

// Tool-specific metadata
export const toolsMetadata = {
  raid: generateMetadata(
    "Rust Raid Calculator - Explosives & Cost Calculator",
    "Calculate the exact amount of explosives needed for any Rust raid target. Save sulfur and plan efficiently with our raid cost calculator.", 
    "raid",
    ["raid cost", "raid explosives", "C4", "rockets", "sulfur cost", "optimal raiding"]
  ),
  recycle: generateMetadata(
    "Rust Recycling Calculator - Optimize Your Resources",
    "Maximize your recycling efficiency with our Rust recycling calculator. Get exact scrap yields and resource breakdowns.",
    "recycle",
    ["recycler", "scrap calculator", "components", "scrap yield", "recycling efficiency"]
  ),
  decay: generateMetadata(
    "Rust Decay Calculator - Building Upkeep Timer",
    "Track your Rust base decay and upkeep requirements. Calculate exactly when to refill TC and optimize resource usage.",
    "decay",
    ["base decay", "upkeep calculator", "TC timer", "building maintenance", "base upkeep"]
  ),
  excavator: generateMetadata(
    "Rust Excavator Calculator - Resource & Fuel Efficiency",
    "Optimize your excavator runs with our Rust excavator calculator. Calculate fuel requirements and resource outputs.",
    "excavator",
    ["excavator monument", "diesel yield", "mining quarry", "resource extraction", "HQM yield"]
  ),
  workbench: generateMetadata(
    "Rust Workbench Calculator - Crafting & Research Costs",
    "Calculate workbench crafting and research costs for any Rust item. Plan your scrap expenditure efficiently.",
    "workbench",
    ["research costs", "workbench levels", "crafting calculator", "scrap costs", "blueprint research"]
  ),
  battlemetrics: generateMetadata(
    "Rust Server Tracker - Population & Status Monitor",
    "Track your favorite Rust servers in real-time. Monitor player counts, queues, and wipe schedules.",
    "battlemetrics",
    ["server status", "server population", "wipe tracker", "server monitor", "player count"]
  ),
  commits: generateMetadata(
    "Rust Development Updates - Latest Commits & Changes",
    "Stay updated with the latest Rust game development changes. View recent commits from the Facepunch team.",
    "commits",
    ["Rust updates", "development changes", "Facepunch commits", "game updates", "patch notes"]
  ),
}; 