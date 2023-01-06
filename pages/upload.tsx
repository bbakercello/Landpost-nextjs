import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { motion } from "framer-motion";
import NavigationBar from "../components/NavigationBar";
const upload = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const user = useUser();

  const resetForm = () => {
    setText("");
    setImage("");
    setLocation("");
    setPicture("");
    setName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, text, image, location, picture };
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
        //set an error banner here
      } else {
        resetForm();
        console.log("form submitted successfully !!!");
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };
  const loaded = () => {
    console.log(user.user);
    return (
      <>
      <NavigationBar/>
      <div className='flex justify-center'>
        <div className='m-20 w-1/3 flex flex-col'>
          <div>upload</div>

          <form
            action="./api/posts"
            method="POST"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="hidden"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <motion.input
              type="text"
              name="text"
              id="text"
              autoComplete="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="bg-zinc-300 text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 block w-full m-2 rounded-md py-3 px-4 shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />

            <motion.input
              type="text"
              name="image"
              id="image"
              autoComplete="image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              className="bg-zinc-300 text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 block w-full m-2 rounded-md py-3 px-4 shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />

            <motion.input
              type="text"
              name="location"
              id="location"
              autoComplete="location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="bg-zinc-300 text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 block w-full m-2 rounded-md py-3 px-4 shadow-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <input
              type="hidden"
              name="picture"
              onChange={(e) => setPicture(e.target.value)}
              value={picture}
            />
            <motion.button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 m-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit
            </motion.button>
          </form>
        </div>
        </div>
      </>
    );
  };
  const loading = () => {
    console.log("loding user information");
  };
  return user ? loaded() : loading();
};
export default upload;
