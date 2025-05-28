import ThemeProviderWrapper from "@/components/Common/ThemeProvider";
import TawkToWidget from "@/components/Common/TawkToWidget";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import ToasterContext from "./context/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOBA Ontario - Sasse Old Boys Association",
  description: "The official website of SOBA Ontario, connecting Sasse Old Boys in Ontario, Canada. Join our community, participate in events, and support our mission.",
  keywords: ["SOBA", "Sasse Old Boys", "Ontario", "Alumni", "Community", "Nigeria", "Education"],
  authors: [{ name: "SOBA Ontario" }],
  creator: "SOBA Ontario",
  publisher: "SOBA Ontario",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo/logo.png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "SOBA Ontario - Sasse Old Boys Association",
    description: "The official website of SOBA Ontario, connecting Sasse Old Boys in Ontario, Canada.",
    url: "https://sobaontario.org",
    siteName: "SOBA Ontario",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: '/images/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'SOBA Ontario Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOBA Ontario - Sasse Old Boys Association",
    description: "The official website of SOBA Ontario, connecting Sasse Old Boys in Ontario, Canada.",
    images: ['/images/logo/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`bg-white dark:bg-black ${inter.className}`} suppressHydrationWarning>
        <ThemeProviderWrapper>
          <AuthProvider>
            <CartProvider>
              <ToasterContext />
              {children}
              <TawkToWidget />
            </CartProvider>
          </AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
} 