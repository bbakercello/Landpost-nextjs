// pages/api/posts.ts
import { PrismaClient } from '@prisma/client'
import { useUser } from "@auth0/nextjs-auth0/client";
const prisma = new PrismaClient();


export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await createPost(req,res);
  }else if (req.method === 'GET'){
    return await readPosts(req,res)
  }else {
    return res.status(405).json({message: 'Method not allowed', success: false})
  }
}

async function createPost(req,res){
  const body = req.body
  try {
    const newPost = await prisma.post.create({
      data: {
        user: body.name,
        text: body.text,
        image: body.image,
        location: body.location,
        avatar: body.picture
      }
    });
    return res.status(200).json(newPost, {success: true})
  } catch (error){
    console.log("Request error", error)
    res.status(500).json({error: "Error creating post", success: false})
  }
}

async function readPosts(req,res){
  const body = req.body
  try{
    const posts = await prisma.post.findMany();
    return res.status(200).json(posts, {success: true})
  }
  catch (error){
    console.log(error)
    return res.status(500).json({error: "Error fetching posts", success: false})
   }
}