import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/utils/api";

export async function generateMetadata() {
  const response = await api.get(`/website-information/`);
  const websiteInfo = response.data?.results[0] || null;

  return {
    title: websiteInfo?.title,
    description: websiteInfo?.description,
    openGraph: {
      title: websiteInfo?.title,
      description: websiteInfo?.description,
      url: websiteInfo?.url,
      siteName: websiteInfo?.siteName,
      images: [
        {
          url: websiteInfo?.thumbnail,
          width: 1200,
          height: 630,
          alt: websiteInfo?.title,
        },
      ],
      type: "website",
    },
  };
}
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
