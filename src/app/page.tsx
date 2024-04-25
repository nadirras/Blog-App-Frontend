import BlogList from "@/components/blog-list";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <BlogList />
      </div>
    </div>
  );
}
