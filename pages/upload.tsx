import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const upload = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useUser();


  const resetForm = () => {
    setText("");
    setImage("");
    setLocation("");
  };

  
   const loaded = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      console.log(text)
      e.preventDefault();
      resetForm()
    };
    return(
        <>
      <div>upload</div>
      <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
        <input type="hidden" value={user.nickname} />

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

        <input type="hidden" value={user.picture} />
        <button type="submit">Submit</button>
      </form>
    </>)}
  ;
  const loading = () => {
  return <h1>Loading...</h1>;
};

return user ? loaded() : loading();
};


export default upload;
