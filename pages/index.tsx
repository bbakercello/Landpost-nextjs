import NavigationBar from "../components/NavigationBar";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
const prisma = new PrismaClient();
import { GetServerSideProps } from "next";

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
      {pageItems.map((item) => (
        <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100">
          <Link href={{ pathname: `./posts/${item.id}` }}>
            <img
              src={item.avatar}
              alt={item.name}
              className="w-12 h-12 rounded-full mr-4"
            />
          </Link>
          <div className="text-sm">
            <p className="text-gray-900 leading-none font-bold">{item.name}</p>
            <p className="text-gray-600">{item.text}</p>
          </div>
        </div>
      ))}
      {/* Add pagination controls */}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === Math.ceil(feed.length / ITEMS_PER_PAGE)}
      >
        Next
      </button>
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
