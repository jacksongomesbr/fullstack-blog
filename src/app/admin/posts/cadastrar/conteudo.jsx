"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToasts } from "react-bootstrap-toasts";

export default function Conteudo() {
  const [enviando, setEnviando] = useState(false);
  const toasts = useToasts();
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const data = Object.fromEntries(new FormData(e.target).entries());
    const response = await fetch("/api/admin/posts", {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
      body: JSON.stringify(data),
    });
    const post = await response.json();
    router.refresh();
    await router.push(`/admin/posts/${post.id}`);
    toasts.show({
      headerContent: "Posts",
      bodyContent: "Post cadastrado com sucesso.",
      toastProps: {
        autohide: true,
        delay: 3000,
      },
    });
    setEnviando(false);
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título
          </label>
          <input type="text" name="title" id="title" className="form-control" />
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
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <div>
            <button className="btn btn-outline-secondary me-2" type="reset">
              Limpar
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={enviando}
            >
              {enviando && <span>Salvando...</span>}
              {!enviando && <span>Salvar</span>}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
