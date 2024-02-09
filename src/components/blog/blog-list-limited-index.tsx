import { GhostPostParamsProps, ghost } from "@/lib/ghost";
import * as React from "react";
import {
  HomeBlogPostCard,
  HomeBlogPostCardThumbnail,
  HomeBlogPostCardContent,
  HomeBlogPostCardSubtitle,
  HomeBlogPostCardTitle,
  HomeBlogPostCardDescription,
} from "@/components/ui/home-blog-post-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type BlogListLimitedIndexProps = {
  slug?: string;
  page?: number;
  limit?: number;
  params?: GhostPostParamsProps;
};

export async function BlogListLimitedIndex({
  slug,
  page = 1,
  limit = 10,
  params,
}: BlogListLimitedIndexProps) {
  const { posts, meta } = await ghost.getPosts({
    page,
    limit,
    ...params,
  });

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => {
        return (
          <HomeBlogPostCard key={post.id} slug={post.slug!}>
            {post.feature_image && (
              <HomeBlogPostCardThumbnail
                alt={`Imagem do post ${post.title}`}
                height={9 * 14}
                src={post.feature_image}
                width={16 * 14}
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

      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`${slug || "blog"}?page=${page - 1}`}>
                Anterior
              </PaginationPrevious>
            </PaginationItem>
          )}

          {/* <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          {page < (Number(meta?.pagination.pages) || 1) && (
            <PaginationItem>
              <PaginationNext href={`${slug || "blog"}?page=${page + 1}`}>
                Próxima
              </PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
