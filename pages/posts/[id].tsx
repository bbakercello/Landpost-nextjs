import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getServerSideProps(context) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // Pass post data to the page via props
  console.log(context.query)
  return {
    props: {
      value: await prisma.post.findUnique({
        where: {
          id:parseInt(context.query.id),
        },
      }),
    },
  };
}

// main show detail function
export default function Details(props) {
  console.log(props);
}
