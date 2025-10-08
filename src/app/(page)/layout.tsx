import '../style.scss';

import { Be_Vietnam_Pro } from 'next/font/google'

import GsapConfig from "@/base/GsapConfig";
import { ReactTempus } from "tempus/react";
import ResetScroll from "@/base/ResetScroll";
import { createClient } from '@/prismicio';
import generateSEO from '@/base/SEO';
import MainLayout from '@/base/Layouts/Layout';

const be_Vietnam_Pro = Be_Vietnam_Pro({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})


export const generateMetadata = async () => {
  const client = createClient();
  const setting = await client.getSingle('global_setting');

  return generateSEO(setting);
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="en"
      className={be_Vietnam_Pro.className}
    >
      <body cz-shortcut-listen="true" suppressHydrationWarning>
        <GsapConfig/>
        <MainLayout>
          {children}
        </MainLayout>
        <ReactTempus patch />
        <ResetScroll />
      </body>
    </html>
  );
}


export default RootLayout;