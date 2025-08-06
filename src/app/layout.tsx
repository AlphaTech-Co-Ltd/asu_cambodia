import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import Responsive from "@/compenents/Home/nav/ResponsiveNav";

const getFont = Montserrat({
    weight : ["300", "400", "500", "600", "700"],
    subsets : ["latin"]
});

export const metadata: Metadata = {
  title: "Ambitious Students Ubiquitous",
  description: "Ambitious Students Ubiquitous is the exclusive representative of Angelo State University in Cambodia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${getFont.className} antialiased`}>
            <Responsive/>
            {children}
        </body>
    </html>
  );
}
