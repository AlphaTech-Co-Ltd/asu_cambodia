import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import Responsive from "@/compenents/Home/nav/ResponsiveNav";
import Provider from "@/constant_components/Provider/Provider";

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
    <html lang="en" suppressHydrationWarning>
        <body className={`${getFont.className} antialiased`}>
            <Provider>
                <Responsive/>
                {children}
            </Provider>
        </body>
    </html>
  );
}
