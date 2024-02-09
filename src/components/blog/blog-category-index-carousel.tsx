import { ghost } from "@/lib/ghost";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";

export async function BlogCategoryIndexCarousel() {
  const { tags } = await ghost.getTags({
    filter: "visibility:public",
    fields: "id,name,slug,",
    limit: 50,
  });

  return (
    <div className="text-white cursor-grab active:cursor-grabbing">
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent
          className="text-sm lg:text-xl p-4 flex gap-4 items-center"
          showOverflow
        >
          {tags.map((tag) => (
            <CarouselItem
              key={tag.id}
              className="max-w-fit px-6 py-2 text-purple-400 bg-black border-[1px] border-purple-400 rounded-full"
            >
              <Link
                href={`/blog/categoria/${tag.slug}`}
                className="hover:underline"
              >
                {tag.name}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
