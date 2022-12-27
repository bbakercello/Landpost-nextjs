import NavigationBar from "../components/NavigationBar"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { GetServerSideProps } from 'next'
const IndexPage = ({feed}) =>
{
    console.log(feed)
return(
<>

<NavigationBar/>
<div>posts here</div>
</>
)
}



export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
  })
  return {
    props: {feed },
  }}
export default IndexPage
 