import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";


const prisma = new PrismaClient();
const { user} = useUser();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await createInquiry(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function createInquiry(req, res) {

  const body = req.body;
  
  try {
    const newEntry = await prisma.post.create({
      data: {
        user: user.email,
        text: body.text,
        image: body.image,
        location: body.location,
        avatar: user.picture
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating question", success: false });
  }
}
