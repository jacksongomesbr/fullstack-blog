import prisma from "@/lib/prisma";
import Conteudo from "./conteudo";

export default async function Page({ params }) {
  const { id } = params;
  const post = await prisma.post.findUnique({
    where: {
      id: String(id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return (
    <main>
      <Conteudo post={post}></Conteudo>
    </main>
  );
}
