import prisma from "@/lib/prisma";
import Link from "next/link";
import style from "./page.module.scss";

export default async function Page() {
  const group = await prisma.post.groupBy({
    by: ["published"],
    _count: {
      published: true,
    },
  });
  const group_published = group.find((i) => i.published) ?? {
    _count: { published: 0 },
  };
  const group_unpublished = group.find((i) => !i.published) ?? {
    _count: { published: 0 },
  };
  const total_posts =
    group_published._count.published + group_unpublished._count.published;
  const published_percent =
    (group_published._count.published === 0
      ? 1
      : group_published._count.published / total_posts) * 100;

  const recent = await prisma.post.findMany({
    take: 5,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <>
      <h1 className="mb-5">Admin do blog</h1>
      <div className="row row-cols-lg-2 row-cols-1 g-4">
        <div className="col">
          <div className="row row-cols-2">
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <div className="display-3">{total_posts}</div>
                  <div className="small text-muted fw-bold">
                    Posts cadastrados
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-baseline">
                    <div className="display-3">
                      {group_published._count.published}
                    </div>
                    <div className="small text-muted">
                      ({published_percent.toFixed(2)}%)
                    </div>
                  </div>
                  <div className="small text-muted fw-bold">
                    Posts publicados
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title fw-bold">Posts mais recentes</div>
              <div className="small">
                <span className="badge bg-success me-2">PUBLICADOS</span>
                <span className="badge bg-secondary">RASCUNHOS</span>
              </div>
            </div>
            <div
              className={`list-group list-group-flush ${style["recent_posts_list"]}`}
            >
              {recent.map((post) => (
                <div
                  key={post.id}
                  className={`list-group-item list-group-item-action ${style.post}`}
                >
                  <Link href={`/admin/posts/${post.id}`}>
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
                        <span>
                          {post.updatedAt.toLocaleDateString("pt-br")}
                        </span>
                      ) : (
                        <span>--/--/----</span>
                      )}
                    </span>
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
