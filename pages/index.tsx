import NavigationBar from "../components/NavigationBar";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();
import { GetServerSideProps } from "next";
import { useState } from "react";
const ITEMS_PER_PAGE = 10;

const IndexPage = ({ feed }) => {
  // Declare a state variable for the current page
  const [page, setPage] = useState(1);

  // Calculate the starting and ending indices of the items to display on the current page
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Use the slice method to get the items for the current page
  const pageItems = feed.slice(startIndex, endIndex);

  return (
    <>
      <NavigationBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map((item) => (
          <div className="flex m-6 items-center p-4 border-b border-gray-200 hover:bg-gray-100">
            <Link href={{ pathname: `./posts/${item.id}` }}>
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full mr-4"
              />
            </Link>
            <div className="text-sm">
              <p className="text-gray-900 leading-none font-bold text-xl">
                {item.name}
              </p>
              <p className="text-gray-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Add pagination controls */}
      <div className="my-4 flex justify-between">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(feed.length / ITEMS_PER_PAGE)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({});
  return {
    props: { feed },
  };
};
export default IndexPage;
