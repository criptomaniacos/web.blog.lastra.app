import { ghost } from "@/lib/ghost";
import * as React from "react";
import {
  HomeBlogPostCard,
  HomeBlogPostCardContent,
  HomeBlogPostCardSubtitle,
  HomeBlogPostCardDescription,
} from "../ui/home-blog-post-card";

export async function BlogListHomeMaisLidas() {
  const { posts } = await ghost.getPosts({
    limit: 3,
    filter: "featured:true",
    fields: "id,title,slug,feature_image,published_at,custom_excerpt,excerpt",
  });

  return (
    <div className="flex flex-col gap-4 mb-4">
      {posts.map((post, index) => {
        return (
          <HomeBlogPostCard
            key={post.id}
            slug={post.slug!}
            className="bg-transparent"
          >
            <HomeBlogPostCardContent className="flex-row py-0">
              <HomeBlogPostCardSubtitle>{index + 1}</HomeBlogPostCardSubtitle>
              <HomeBlogPostCardDescription>
                {post.title}
              </HomeBlogPostCardDescription>
            </HomeBlogPostCardContent>
          </HomeBlogPostCard>
        );
      })}
    </div>
  );
}
