"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { getBlogs } from "@/lib/apiBlog";

interface Article {
  title: string;
  slug: string;
  name: string;
  createdAt: Date;
  status: string;
  // Add more properties as needed
}

export default function BlogList() {
  const [data, setData] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 5;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogs();
        setData(response || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexofFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentArticles = data.slice(indexofFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Link href="/login">Logout</Link>
      <div className="flex justify-center items-center gap-5">
        <div className="overflow-x-auto ">
          <table className="w-full table">
            {/* head */}
            <thead className="bg-base-100">
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Author</th>
                <th>Created</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentArticles.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </td>
                  <td className="px-4 py-2">{item.author.name}</td>
                  <td className="px-4 py-2">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {item.status.toLocaleLowerCase()}
                  </td>
                  <td className="px-4 py-2">
                    <FiEdit />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="join float-end mr-3 mb-3">
        {[...Array(totalPages)].map((_, index) => (
          // buat array dengan panjang totalPage, ini kayak len(totalPages) misal di Python. Pake sread operator biar lebih efektif buat arraynya (gak undefined), soalnya kalau undefined gabisa di map hayoloh
          // abis itu di map, nah karena cuman mau ngeloop berapa banyak dan ga butuh parameter tambahan yang diubah, pake _ aja, soalnya index bisanya di parameter kedua
          <button
            key={index}
            className={`btn btn-square join-item ${
              currentPage === index + 1 ? "bg-primary text-white" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {/* <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="1"
          checked
        /> */}
      </div>
    </div>
  );
}
