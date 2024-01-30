import { FollowLink } from "@/components/atoms/FollowLink";
import { ShareLink } from "@/components/atoms/ShareLink";
import { ghost } from "@/lib/ghost";
import type { Metadata, ResolvingMetadata } from "next";

import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const post = await ghost.getPost({
    slug: params.slug,
    params: {
      fields:
        "id,title,slug,meta_title,meta_description,custom_excerpt,excerpt,og_image,og_title,featured_image,featured_image_alt,twitter_image,twitter_description,canonical_url",
    },
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.custom_excerpt || post.excerpt,
    openGraph: {
      type: "article",
      images: [
        {
          url: post.og_image || post.feature_image || "",
          width: 1200,
          height: 630,
          alt: post.og_title || post.feature_image_alt || "",
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Criptomaniacos_",
      site: post.canonical_url || "www.criptomaniacos.io",
      description:
        post.twitter_description || post.custom_excerpt || post.excerpt,
      title: post.title,
      images: [
        {
          url: post.twitter_image || post.og_image || post.feature_image || "",
          width: 1200,
          height: 630,
          alt: post.feature_image_alt,
        },
      ],
    },
  };
}

// add metadata
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await ghost.getPost({
    slug: params.slug,
    params: {
      fields:
        "id,title,slug,published_at,html,reading_time,custom_excerpt,excerpt",
    },
  });

  return (
    <div className="bg-white text-neutral-800 flex-1">
      <div className="bg-neutral-800">
        <div className="container  py-12 lg:py-16 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-neutral-300 text-lg">
            {post.custom_excerpt || post.excerpt}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {new Date(post.published_at).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <div className="container py-16 lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="lg:w-1/6 mb-8">
            <div className="text-sm text-neutral-500">Publicado em:</div>
            <div className="text-sm text-neutral-700">
              {new Date(post.published_at).toLocaleDateString("pt-br", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </div>
            <div className="pt-6 pb-2">Compartilhe nas redes sociais</div>
            <div className="flex flex-col gap-1 text-sm">
              <ShareLink
                net="x"
                text={`https://blog.criptomaniacos.io/blog/${post.slug}`}
                Icon={FaXTwitter}
              >
                X
              </ShareLink>
              <ShareLink
                net="linkedin"
                text={`https://blog.criptomaniacos.io/blog/${post.slug}`}
                Icon={FaLinkedin}
              >
                LinkedIn
              </ShareLink>
              <ShareLink
                net="telegram"
                text={`https://blog.criptomaniacos.io/blog/${post.slug}`}
                Icon={FaTelegram}
              >
                Telegram
              </ShareLink>
              <ShareLink
                net="facebook"
                text={`https://blog.criptomaniacos.io/blog/${post.slug}`}
                Icon={FaFacebook}
              >
                Facebook
              </ShareLink>
              <ShareLink
                net="whatsapp"
                text={`https://blog.criptomaniacos.io/blog/${post.slug}`}
                Icon={FaWhatsapp}
              >
                Whatsapp
              </ShareLink>
            </div>
          </div>
          <div
            className="flex-1 prose text-neutral-600 dark:text-neutral-300 "
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <div className="lg:w-3/12 lg:p-4">
            <div className="progress-bar p-4">
              Leitura aproximada em {post.reading_time}{" "}
              {post.reading_time! > 1 ? ` minutos` : ` minuto`}
            </div>
            <div className="hidden lg:flex flex-col border rounded-xl border-neutral-900 p-4">
              <div className="text-xl ">Últimas Postagens</div>
            </div>
            <div className="flex justify-center py-4 gap-2">
              <FollowLink net="x" Icon={FaXTwitter} />
              <FollowLink net="facebook" Icon={FaFacebook} />
              <FollowLink net="linkedin" Icon={FaLinkedin} />
              <FollowLink net="telegram" Icon={FaTelegram} />
              <FollowLink net="youtube" Icon={FaYoutube} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
