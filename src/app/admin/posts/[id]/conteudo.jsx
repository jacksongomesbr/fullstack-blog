"use client";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { useToasts } from "react-bootstrap-toasts";
import toLocalDateString from "@/lib/datetime";

export default function Conteudo({ post }) {
  const [localPost, setPost] = useState(post);
  const [enviando, setEnviando] = useState(null);
  const [acao, setAcao] = useState(null);
  const toasts = useToasts();
  const router = useRouter();

  const refresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setAcao("salvar");
    const data = Object.fromEntries(new FormData(e.target).entries());
    const response = await fetch(`/api/admin/posts/${post.id}`, {
      method: "PUT",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    setPost(json);
    toasts.show({
      headerContent: "Posts",
      bodyContent: "Post salvo com sucesso.",
      toastProps: {
        autohide: true,
        delay: 3000,
      },
    });
    refresh();
    setEnviando(null);
    setAcao(null);
  };
  const handlePublicarClick = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setAcao("publicar");
    const response = await fetch(`/api/admin/posts/${post.id}/publish`, {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
    });
    const json = await response.json();
    setPost(json);
    toasts.show({
      headerContent: "Posts",
      bodyContent: "Post publicado com sucesso.",
      toastProps: {
        autohide: true,
        delay: 3000,
      },
    });
    refresh();
    setEnviando(null);
    setAcao(null);
  };
const handleDespublicarClick = async (e) => {
  e.preventDefault();
  setEnviando(true);
  setAcao("despublicar");
  const response = await fetch(`/api/admin/posts/${post.id}/unpublish`, {
    method: "POST",
    headers: {
      ContentType: "application/json",
    },
  });
  const json = await response.json();
  setPost(json);
  refresh();
  setEnviando(null);
  setAcao(null);
};
const handleExcluirClick = async (e) => {
  e.preventDefault();
  if (
    confirm(
      "Tem certeza que deseja excluir o post? Esta ação não pode ser desfeita"
    )
  ) {
    setEnviando(true);
    setAcao("excluir");
    const response = await fetch(`/api/admin/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        ContentType: "application/json",
      },
    });
    const json = await response.json();
    await router.push("/admin/posts");
    toasts.show({
      headerContent: "Posts",
      bodyContent: "Post excluído com sucesso.",
      toastProps: {
        autohide: true,
        delay: 3000,
      },
    });
    refresh();
    setEnviando(null);
    setAcao(null);
  }
};
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col-lg-10">
            <div className="mb-3 small text-muted">
              {localPost.published && (
                <span className="badge bg-success me-2">PUBLICADO</span>
              )}
              {!localPost.published && (
                <span className="badge bg-secondary me-2">NÃO PUBLICADO</span>
              )}
              <span className="me-2">
                Cadastrado em {toLocalDateString(localPost.createdAt)}
              </span>
              {localPost.updatedAt && (
                <span className="me-2">
                  &bull; Atualizado em {toLocalDateString(localPost.updatedAt)}
                </span>
              )}
              <span>&bull; Por {localPost.author.name}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Título
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                defaultValue={localPost.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Conteúdo
              </label>
              <textarea
                name="content"
                id="content"
                className="form-control"
                rows={10}
                defaultValue={localPost.content}
              ></textarea>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Ações sobre este post</h5>

                <div className="p-2 row row-cols-1 g-3">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={enviando}
                  >
                    {enviando && acao === "salvar" && <span>Salvando...</span>}
                    {acao != "salvar" && <span>Salvar</span>}
                  </button>
                  {localPost.published && (
                    <>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleDespublicarClick}
                        disabled={enviando}
                      >
                        {enviando && acao === "despublicar" && (
                          <span>Despublicando...</span>
                        )}
                        {!enviando && <span>Despublicar</span>}
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        title="Não disponível enquanto o post está publicado"
                        disabled={true}
                      >
                        Excluir
                      </button>
                    </>
                  )}
                  {!localPost.published && (
                    <>
                      <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={handlePublicarClick}
                        disabled={enviando}
                      >
                        {enviando && acao === "publicar" && (
                          <span>Publicando...</span>
                        )}
                        {acao != "publicar" && <span>Publicar</span>}
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        disabled={enviando}
                        onClick={handleExcluirClick}
                      >
                        {enviando && acao === "excluir" && (
                          <span>Excluindo...</span>
                        )}
                        {acao != "excluir" && <span>Excluir</span>}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
