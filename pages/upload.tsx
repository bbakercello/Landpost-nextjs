import React from 'react'

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