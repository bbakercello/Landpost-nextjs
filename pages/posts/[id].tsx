import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import NavigationBar from "../../components/NavigationBar";
import { useUser } from "@auth0/nextjs-auth0/client";

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
const Details = (props) => {
  console.log(props)
  const user = useUser();
  
  const loaded = () => {
  return (
    <>
      <NavigationBar />
      <div className="mt-3 ml-20 mr-20">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col m-6  p-4 border-b border-gray-200 hover:bg-gray-100">
            <img
              src={props.value.avatar}
              alt={props.value.avatar}
              className="w-24 h-24 rounded-full mr-4 "
            />
            <div className="flex justify-center">
              <img
                src={props.value.image}
                alt={props.value.image}
                className="w-64 h-64 m-6"
              />
            </div>
            <div className="text-sm flex flex-col justify-center">
              <p className="text-gray-900 flex justify-center leading-none font-bold text-xl">
                {props.value.text}
              </p>
              <p className="text-gray-600 flex justify-center">
                {props.value.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )};
  const loading = () => {
    console.log('loading user information')
  }
  return user ? loaded() : loading() 
}
export default Details
