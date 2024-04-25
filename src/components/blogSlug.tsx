"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogSlug, getBlogs } from "@/lib/apiBlog";
import Head from "next/head";

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

export default function BlogSlug({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogSlug(slug);
        console.log("Fetched article:", response); // Debugging
        setArticle(response.items ? response.items[0] : null); // Access the first item if exists
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center">
        <div className="mt-16 px-20 md:flex hidden text-gray-400">
          <Link href={`/`} className="flex items-center gap-2 ">
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            back
          </Link>
        </div>
        <div className="flex flex-col w-screen items-center gap-10 mt-10  px-5">
          <h1 className="text-2xl font-bold text-center">{article.title}</h1>
          <div className="flex flex-col items-center">
            <h1 className="text-sm font- truncate dark:text-whitemedium text-gray-500">
              Author: {article.author?.name}
            </h1>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Email: {article.author?.email}
              </p>
            </div>
            <h1 className="text-sm text-gray-500 truncate dark:text-gray-400">
              Date:{" "}
              {article.createdAt
                ? new Date(article.createdAt).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </h1>
          </div>
          <div>
            <img src={`${article.imgUrl}`} alt="image" className="w-96"></img>
          </div>

          <div className="flex flex-col sm:px-36 px-5 m-5 gap-5 text-justify ">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
