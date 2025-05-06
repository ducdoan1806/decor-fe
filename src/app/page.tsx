import Hero from "@/components/Hero";
import Product from "@/components/Product";
import api from "@/utils/api";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  try {
    const res = await Promise.all([api.get("/slide/")]);
    return (
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
        <Hero slides={res[0].data.results} />
        <Product />
      </Suspense>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
}
