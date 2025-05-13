import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";

export const metadata: Metadata = {
  title: "Anki Decor",
  description: "Nội thất shop Anki Decor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await api.get("/tracking-codes/");
  console.log("res: ", res.data);
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
