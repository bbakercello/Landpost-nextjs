// pages/api/posts.ts
import { PrismaClient } from '@prisma/client'
import { useUser } from "@auth0/nextjs-auth0/client";
const prisma = new PrismaClient();
const { user } = useUser();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = await prisma.post.create({data: {
        user: user.name,
        text: req.body.text,
        image: req.body.image,
        location: req.body.location,
        avatar: user.picture
      },});
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  } else {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
}