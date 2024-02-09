import { BlogListLimitedIndex } from "@/components/blog/blog-list-limited-index";
import { GhostTagParamsProps, ghost } from "@/lib/ghost";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
    params: GhostTagParamsProps;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // fetch data
  const { tag } = await ghost.getTag({
    slug: params.slug,
    params: params.params || {},
  });

  return {
    title: `Blog Criptomaníacos: ${tag.name}`,
    description:
      tag.meta_description || tag.description || `Artigos sobre ${tag.name}`,
    openGraph: {
      type: "website",
      images: [
        {
          url: tag.og_image || tag.feature_image || "",
          width: 1200,
          height: 630,
          alt: tag.og_title || tag.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Criptomaniacos_",
      site: "www.lastra.app",
      description:
        tag.twitter_description ||
        tag.meta_description ||
        tag.description ||
        `Artigos sobre ${tag.name}`,
      title: `Blog Criptomaníacos: ${tag.name}`,
      images: [
        {
          url: tag.twitter_image || tag.og_image || tag.feature_image || "",
          width: 1200,
          height: 630,
          alt: tag.twitter_title || tag.og_title || tag.name,
        },
      ],
    },
  };
}

export default async function Page({
  params,
  searchParams: { page = "1" },
  ...rest
}: {
  params: { slug: string };
  searchParams: { page: string };
}) {
  const { tag } = await ghost.getTag({
    slug: params.slug,
    params: { fields: "id,name,slug,description,meta_title,meta_description" },
  });

  return (
    <div className="flex-1">
      <div className="bg-neutral-950 w-full bg-[url('https://m.cmania.co/blog/header-1.jpg')] bg-no-repeat bg-cover overflow-hidden">
        <div className="container py-12">
          <h1 className="text-5xl">{tag.meta_title || tag.name}</h1>
          <p>{tag.description}</p>
          <div className="flex gap-2 text-sm mt-8">
            <Link href="/">Início</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span>{tag.name}</span>
          </div>
        </div>
      </div>
      <div className="container py-12">
        <BlogListLimitedIndex
          slug={tag.slug}
          page={Number(page) || 1}
          limit={6}
          params={{
            filter: `tag:${tag.slug}`,
          }}
        />
      </div>
    </div>
  );
}
