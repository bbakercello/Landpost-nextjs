import NavigationBar from "../components/NavigationBar";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();
import { GetServerSideProps } from "next";
const IndexPage = ({ feed }) => {
  console.log(feed);
  return (
    <>
      <NavigationBar />
      {feed.map((item) => (
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
