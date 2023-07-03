import prisma from "@/lib/prisma";
import Link from "next/link";
import style from "./page.module.scss";

export default async function Home() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const getParteDoConteudo = (post, limite = 60) => {
    if (post.content.length > limite) {
      return post.content.substring(0, limite) + "...";
    } else {
      return post.content;
    }
  };
  return (
    <main>
      {feed.map((post) => (
        <div key={post.id} className={`my-3 mb-5 ${style.post}`}>
          <Link
            href={`posts/${post.id}`}
            className={`text-decoration-none fw-bold ${style.title}`}
          >
            <h1>{post.title}</h1>
          </Link>
          <div className="text-muted small mb-3">
            Por <strong>{post.author.name}</strong>
            {post.updatedAt && (
              <> em {post.updatedAt?.toLocaleDateString("pt-br")}</>
            )}
          </div>
          <div className="small">{getParteDoConteudo(post)}</div>
        </div>
      ))}
    </main>
  );
}
