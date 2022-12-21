import React from 'react'

const handleSubmit = async (e) => {
  e.preventDefault();
  const body = { body, email, subject, message };
  try {
    const response = await fetch("/api/inquiry", {
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

const resetForm = () => {
  setFirstName("");
  setEmail("");
  setSubject("");
  setMessage("");
};



const upload = () => {
  return (
    <>
      <div>upload</div>
      <form action="/send-data-here" method="post">
        <label htmlFor="roll">Roll Number</label>
        <input
          type="text"
          id="roll"
          name="roll"
          required
        />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default upload