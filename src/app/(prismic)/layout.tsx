import type { Metadata } from "next";
import '../style.scss';

export const metadata: Metadata = {
  title: "Slice Machine",
  description: "Prismic Slice Machine Rendering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
