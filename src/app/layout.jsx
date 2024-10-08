import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Happyboard CMS",
  description: "Generated by Next.js",
  icons:{
    icon:['/favicon.ico'],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className} suppressHydrationWarning>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
