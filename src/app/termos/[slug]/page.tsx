import { ghost } from "@/lib/ghost";

export default async function Page({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const post = await ghost.getPage({
    slug: params.slug,
    params: {
      fields: "id,title,slug,published_at,html",
    },
  });

  return (
    <div className="bg-white text-neutral-800 flex-1">
      <div className="bg-neutral-800">
        <div className="container  py-12 lg:py-16 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-center text-neutral-100 sm:text-4xl">
            {post.title}
          </h1>

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
        <div
          className="prose text-neutral-600 dark:text-neutral-300 mx-auto"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  );
}
