import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Page() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h1>Posts do blog</h1>
          <div className="small">
            <span className="badge bg-success me-2">PUBLICADOS</span>
            <span className="badge bg-secondary">RASCUNHOS</span>
          </div>
        </div>
        <div>
          <Link href="/admin/posts/cadastrar" legacyBehavior={true}>
            <a className="btn btn-primary">Cadastrar</a>
          </Link>
        </div>
      </div>

      <div className="list-group">
        {posts.map((post) => (
          <div
            key={post.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              {" "}
              <span
                className={`badge ${
                  post.published ? "bg-success" : "bg-secondary"
                } me-2`}
              >
                &bull;
              </span>
              <span
                className="badge bg-secondary bg-opacity-25 me-2 text-dark"
                style={{ width: "100px" }}
              >
                {post.updatedAt ? (
                  <span>{post.updatedAt.toLocaleDateString("pt-br")}</span>
                ) : (
                  <span>--/--/----</span>
                )}
              </span>
              {post.title}
            </div>
            <div>
              <Link
                href={`/admin/posts/${post.id}`}
                className="btn btn-primary"
              >
                Abrir
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
