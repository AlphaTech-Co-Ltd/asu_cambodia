import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default function Provider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            {children}
        </ThemeProvider>
    );
}
