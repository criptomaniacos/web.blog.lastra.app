import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const HomeBlogPostCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    slug: string;
  }
>(({ className, slug, ...props }, ref) => (
  <Link href={`/blog/${slug}`} className="block">
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-sm transition-transform transform hover:scale-[1.02] flex flex-col lg:flex-row",
        className
      )}
      {...props}
    />
  </Link>
));
HomeBlogPostCard.displayName = "HomeBlogPostCard";

const HomeBlogPostCardThumbnail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src: string;
    width: number;
    height: number;
    alt: string;
  }
>(({ className, src, width, height, alt, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-shrink-0 w-[auto] h-[219px] rounded-lg overflow-hidden",
      className
    )}
    {...props}
  >
    <Image
      className="w-full h-full object-cover object-left"
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
  </div>
));
HomeBlogPostCardThumbnail.displayName = "HomeBlogPostCardThumbnail";

const HomeBlogPostCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 flex flex-col gap-2", className)}
    {...props}
  />
));
HomeBlogPostCardContent.displayName = "HomeBlogPostCardContent";

const HomeBlogPostCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-3xl tracking-tight", className)}
    {...props}
  />
));
HomeBlogPostCardTitle.displayName = "HomeBlogPostCardTitle";

const HomeBlogPostCardSubtitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center text-brand-orange text-sm", className)}
    {...props}
  />
));
HomeBlogPostCardSubtitle.displayName = "HomeBlogPostCardSubtitle";

const HomeBlogPostCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
));
HomeBlogPostCardDescription.displayName = "HomeBlogPostCardDescription";

export {
  HomeBlogPostCard,
  HomeBlogPostCardThumbnail,
  HomeBlogPostCardContent,
  HomeBlogPostCardTitle,
  HomeBlogPostCardSubtitle,
  HomeBlogPostCardDescription,
};
