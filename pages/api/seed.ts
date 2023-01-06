import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const posts = [];
  for (let i = 0; i < 40; i++) {
    const post = await prisma.post.create({
      data: {
        user: ((i+.5)).toString(),
        text: `This is the text for post ${i}`,
        image: `https://picsum.photos/200/300?random=${i}`,
        location: `Location ${i}`,
        avatar: `https://picsum.photos/200/300?random=${i}`,
        comments: {
          create: [
          ],
        },
      },
    });
    posts.push(post);
  }
  console.log(posts);
}

main().catch((e) => console.error(e));
