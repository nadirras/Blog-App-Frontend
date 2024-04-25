import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getBlogSlug, getBlogs } from "@/lib/apiBlog";
import BlogSlug from "@/components/blogSlug";

interface Blog {
  title: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
  content: string;
}

interface Props {
  slug: string;
}

export const generateStaticParams = async () => {
  const blogs = await getBlogs();
  console.log("Blogs:", blogs); // Add this line to debug

  return blogs.map((article: any) => ({
    params: {
      slug: article.slug,
    },
  }));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const response: any = await getBlogSlug(params.slug);
  const article = response.items[0];

  return {
    title: `${article?.title}`,
  };
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function BlogSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <BlogSlug slug={params.slug} />
    </div>
  );
}
