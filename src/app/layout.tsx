import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import Provider from "@/constant_components/Provider/Provider";
import FooterPage from "@/compenents/Home/Footer";
import ScrollToTop from "@/constant_components/Helper/ScrollToTop";
import ResponsiveNav from "@/compenents/Home/nav/ResponsiveNav";
import {AuthProvider} from "@/constant_components/context/AuthContext";
import ChatWidget from "@/constant_components/Helper/Chat";

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
                <AuthProvider>
                    <ResponsiveNav/>
                        {children}
                    <ChatWidget/>
                    <ScrollToTop/>
                    <FooterPage/>

                </AuthProvider>
            </Provider>
        </body>
    </html>
  );
}
