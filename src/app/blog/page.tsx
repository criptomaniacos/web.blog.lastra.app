import { BlogListLimitedIndex } from "@/components/blog/blog-list-limited-index";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export const metadata: Metadata = {
  title: "Blog Criptomaníacos",
  description: "Artigos sobre criptomoedas, blockchain e tecnologia",
};

export default async function Page({
  searchParams: { page = "1" },
  ...rest
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="flex-1">
      <div className="bg-neutral-950 w-full bg-[url('https://m.cmania.co/blog/header-1.jpg')] bg-no-repeat bg-cover overflow-hidden">
        <div className="container py-12">
          <h1 className="text-5xl">Blog Criptomaníacos</h1>

          {/* breakcumbs links */}
          <div className="flex gap-2 text-sm mt-8">
            <Link href="/">Início</Link>
            <span>/</span>
            <span>Blog</span>
          </div>
        </div>
      </div>
      <div className="container py-12">
        <BlogListLimitedIndex page={Number(page) || 1} limit={6} params={{}} />
      </div>
    </div>
  );
}
