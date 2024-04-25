export const getBlogs = async () => {
  const res = await fetch(`http://localhost:8000/api/article`);
  const data = await res.json();
  return data.articles;
};

export const getBlogSlug = async (slug: string) => {
  const res = await fetch(`http://localhost:8000/api/article/${slug}`);
  const data = await res.json();

  // Check if data.articles is an array and use find or direct assignment
  const article = Array.isArray(data.articles)
    ? data.articles.find((a: any) => a.slug === slug)
    : data.articles;

  return {
    items: article ? [article] : null, // Returning array for consistency
  };
};
