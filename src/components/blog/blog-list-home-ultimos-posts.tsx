import { ghost } from "@/lib/ghost";
import * as React from "react";
import {
  HomeBlogPostCard,
  HomeBlogPostCardThumbnail,
  HomeBlogPostCardContent,
  HomeBlogPostCardSubtitle,
  HomeBlogPostCardTitle,
  HomeBlogPostCardDescription,
} from "../ui/home-blog-post-card";

export async function BlogListHomeUltimosPosts() {
  const { posts } = await ghost.getPosts({
    limit: 3,
    fields: "id,title,slug,feature_image,published_at,custom_excerpt,excerpt",
  });

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => {
        return (
          <HomeBlogPostCard key={post.id} slug={post.slug!}>
            {post.feature_image && (
              <HomeBlogPostCardThumbnail
                alt={`Imagem do post ${post.title}`}
                height={400}
                src={post.feature_image}
                width={400}
              />
            )}
            <HomeBlogPostCardContent>
              <HomeBlogPostCardSubtitle>
                {new Date(post.published_at!).toLocaleString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </HomeBlogPostCardSubtitle>
              <HomeBlogPostCardTitle>{post.title}</HomeBlogPostCardTitle>
              <HomeBlogPostCardDescription>
                {post.custom_excerpt || post.excerpt}
              </HomeBlogPostCardDescription>
            </HomeBlogPostCardContent>
          </HomeBlogPostCard>
        );
      })}
    </div>
  );
}
