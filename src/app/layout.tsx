import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RecipeProvider } from "@/store/RecipeContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Planner",
  description: "It's simple recipe planner app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="min-h-screen bg-[#f7f5f0] text-[#20332f]">
          <RecipeProvider>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              closeOnClick
              pauseOnHover
            />
          </RecipeProvider>
        </main>
      </body>
    </html>
  );
}
