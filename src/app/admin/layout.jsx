import { NavbarTopo } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/nao-autorizado");
  }
  return (
    <div className="container-fluid g-0">
      <NavbarTopo></NavbarTopo>
      <div className="admin-content p-3">{children}</div>
      <footer className="mt-5 p-3 text-muted small">
        &copy; Fullstack Blog Admin
      </footer>
    </div>
  );
}
