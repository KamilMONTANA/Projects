import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Tea Shop | Tea House',
  description: 'Browse our collection of highest quality teas from around the world. Green, black, white, oolong and herbal teas.',
  keywords: 'tea shop, premium tea, green tea, black tea, white tea, herbal teas, buy tea',
  openGraph: {
    title: 'Premium Tea Shop | Tea House',
    description: 'Browse our collection of highest quality teas from around the world.',
    url: 'https://teahouse.pl/shop',
    siteName: 'Tea House',
    images: [
      {
        url: 'https://teahouse.pl/logo.png',
        width: 1200,
        height: 630,
        alt: 'Tea House - premium tea shop',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://teahouse.pl/shop',
  },
};