// pages/api/posts.ts
import { PrismaClient } from '@prisma/client'
import { useUser } from "@auth0/nextjs-auth0/client";
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const {user} = useUser();
  switch (method) {
    case 'POST':
      // get the title and content from the request body
      // use prisma to create a new post using that data
      const post = await prisma.post.create({
        
        data: {
        user: user.email,
        text: req.body.text,
        image: req.body.image,
        location: req.body.location,
        avatar: user.picture,
      },
      
      
      })
      // send the post object back to the client
      res.status(201).json(post)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
   
    }}
  
