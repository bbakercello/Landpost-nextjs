import { useUser } from "@auth0/nextjs-auth0/client";
import loadConfig from "next/dist/server/config";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import { useState } from "react";

const upload = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const user = useUser()

  const resetForm = () => {
    setText("");
    setImage("");
    setLocation("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { text, image, location };
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
    console.log(user)
    return (
      <>
        <div>upload</div>
        <form
          action="./api/posts.ts"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="name" value={user.user.name} />
          <input
            type="text"
            name="text"
            id="text"
            autoComplete="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="bg-zinc-300 text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 block w-full rounded-md py-3 px-4 shadow-sm"
          />

          <input
            type="text"
            name="image"
            id="image"
            autoComplete="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className="bg-zinc-300 text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 block w-full rounded-md py-3 px-4 shadow-sm"
          />

          <input
            type="text"
            name="location"
            id="location"
            autoComplete="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="bg-zinc-300 text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 block w-full rounded-md py-3 px-4 shadow-sm"
          />
          <input type="hidden" name="avatar" value={user.user.picture} />
          <button type="submit">Submit</button>
        </form>
      </>
    );};
const loading = () => {
  console.log('loding user information')
}
  return user ? loaded() : loading()

};
export default upload;
