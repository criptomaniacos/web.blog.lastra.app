export type GhostPostParamsProps = {
  filter?: string | string[];
  include?: string | string[];
  order?: string;
  formats?: string;
  page?: number;
  limit?: number;
  fields?: string | string[];
};

export type GhostTagParamsProps = {
  fields?: string | string[];
};

type GhostApiProps = {
  path: string;
  params?: GhostPostParamsProps;
  revalidate?: number;
};

async function ghostApi({ path, params, revalidate = 300 }: GhostApiProps) {
  const ghostUrl = process.env.GHOST_URL!;
  const ghostKey = process.env.GHOST_KEY!;

  const stringifyParams = Object.entries(params || {}).reduce(
    (acc, [key, value]) => {
      if (typeof value === "string") {
        return { ...acc, [key]: value };
      }
      if (Array.isArray(value)) {
        return { ...acc, [key]: value.join(",") };
      }
      return { ...acc, [key]: JSON.stringify(value) };
    },
    {}
  );

  const urlParams = new URLSearchParams({
    key: ghostKey,
    ...stringifyParams,
  }).toString();

  const res = await fetch(
    `${ghostUrl}/ghost/api/content/${path}/?${urlParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Version": "v5.0",
      },
      next: {
        revalidate,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Ghost API error");
  }

  return await res.json();
}

type GhostPostOrPageProps = {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id?: string;
  feature_image?: string;
  featured?: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  custom_template?: string;
  canonical_url?: string;
  tags?: string[];
  primary_tag?: string;
  url?: string;
  excerpt: string;
  reading_time?: number;
  access?: boolean;
  comments?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  meta_title?: string;
  meta_description?: string;
  email_subject?: string;
  frontmatter?: string;
  feature_image_alt?: string;
  feature_image_caption?: string;
};

type GhostTagProps = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  feature_image: string | null;
  visibility: string;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  canonical_url: string | null;
  accent_color: string | null;
  url: string;
};

type GhostPostsProps = {
  posts: GhostPostOrPageProps[];
  meta?: {
    pagination: {
      page: string;
      limit: string;
      pages: string;
      total: string;
      next: string;
      prev: string;
    };
  };
};

type GhostPagesProps = {
  pages: GhostPostOrPageProps[];
};

async function getPosts(params: GhostPostParamsProps) {
  const { posts, meta }: GhostPostsProps = await ghostApi({
    path: "posts",
    params: {
      page: 1,
      limit: 10,
      include: "tags",
      order: "published_at desc",
      filter: "visibility:public",
      ...params,
    },
  });
  return { posts, meta };
}

type GetItemByIDOrSlugProps = {
  id?: string;
  slug?: string;
  params?: GhostPostParamsProps;
};

async function getPost({ id, slug, params }: GetItemByIDOrSlugProps) {
  const defaultParams = {
    include: ["authors", "tags"],
    ...params,
  };
  if (id) {
    const { posts }: GhostPostsProps = await ghostApi({
      path: `posts/${id}`,
      params: defaultParams,
    });
    return posts[0];
  }

  const { posts }: GhostPostsProps = await ghostApi({
    path: `posts/slug/${slug}`,
    params: defaultParams,
  });

  return posts[0];
}

async function getPage({ id, slug, params }: GetItemByIDOrSlugProps) {
  const defaultParams = {
    // include: ["authors", "tags"],
    ...params,
  };
  if (id) {
    const { pages }: GhostPagesProps = await ghostApi({
      path: `pages/${id}`,
      params: defaultParams,
    });
    return pages[0];
  }

  const { pages }: GhostPagesProps = await ghostApi({
    path: `pages/slug/${slug}`,
    params: defaultParams,
  });

  return pages[0];
}

async function getTags(params?: GhostPostParamsProps) {
  const defaultParams = {
    // fields: "id,name,slug",
    limit: 10,
    ...params,
  };
  const { tags }: { tags: GhostTagProps[] } = await ghostApi({
    path: "tags",
    params: defaultParams,
  });
  return { tags };
}

async function getTag({ id, slug, params }: GetItemByIDOrSlugProps) {
  const defaultParams = {
    // fields: "id,name,slug",
    limit: 1,
    ...params,
  };

  if (id) {
    const { tags }: { tags: GhostTagProps[] } = await ghostApi({
      path: `tags/${id}`,
      params: defaultParams,
    });
    return { tag: tags[0] };
  }

  const { tags }: { tags: GhostTagProps[] } = await ghostApi({
    path: `tags/slug/${slug}`,
    params: defaultParams,
  });
  return { tag: tags[0] };
}

export const ghost = {
  ghostApi,
  getPosts,
  getPost,
  getPage,
  getTags,
  getTag,
};
