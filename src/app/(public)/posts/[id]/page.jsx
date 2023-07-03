import prisma from "@/lib/prisma";
import style from "./page.module.scss";

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
      <div className="my-5">
        <h1 className="text-center display-3">{post.title}</h1>
        <div className="text-muted text-center small">
          Por <strong>{post.author.name}</strong>
        </div>
        {post.updatedAt && (
          <div className="text-muted text-center small mb-5">
            Pulicado em {post.updatedAt.toLocaleDateString("pt-br")}
          </div>
        )}
      </div>
      <div className={`${style.content}`}>{post.content}</div>
    </main>
  );
}
