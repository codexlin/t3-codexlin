import "~/styles/globals.css"
import { ThemeProvider } from "~/components/theme-provider"
import { siteConfig } from "~/config/site"
import { TabVisibilityProvider } from "~/context/TabVisibilityContext"
import { cn } from "~/lib/utils"
import { TRPCReactProvider } from "~/trpc/react"
import { GeistSans } from "geist/font/sans"
import { type Metadata, type Viewport } from "next"
import { Inter as FontSans } from "next/font/google"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url.base),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "CodexLin",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <TabVisibilityProvider>{children}</TabVisibilityProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
