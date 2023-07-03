"use client";
import { signIn } from "next-auth/react";

export default function Conteudo() {
  const handleLoginClick = async (e) => {
    e.preventDefault();
    await signIn("github", { callbackUrl: "/admin" });
  };
  return (
    <>
      <h1 className="mt-5">Não autorizado</h1>
      <p>
        Você precisa estar logado para acessar alguma funcionalidade do admin.
      </p>
      <p>
        <a href="#" className="btn btn-outline-primary" onClick={handleLoginClick}>
          Fazer login
        </a>
      </p>
    </>
  );
}
