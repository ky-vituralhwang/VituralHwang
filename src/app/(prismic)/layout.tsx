import '../style.scss';
import type { Metadata } from "next";

import { Be_Vietnam_Pro } from 'next/font/google'
import { ReactTempus } from 'tempus/react';
import ResetScroll from '@/base/ResetScroll';
import GsapConfig from '@/base/GsapConfig';
// import MainLayout from '@/base/Layouts/Layout';

export const metadata: Metadata = {
  title: "Slice Machine",
  description: "Prismic Slice Machine Rendering",
};

const be_Vietnam_Pro = Be_Vietnam_Pro({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={be_Vietnam_Pro.className}
    >
      <body cz-shortcut-listen="true" suppressHydrationWarning>
        <GsapConfig/>
        {/* <MainLayout> */}
          {children}
        {/* </MainLayout> */}
        <ReactTempus patch />
        <ResetScroll />
      </body>
    </html>
  );
}
