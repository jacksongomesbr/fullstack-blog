"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavbarTopo() {
  const { data: session, status } = useSession();
  const handleSairClick = async (e) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
  };
  const handleLoginClick = async (e) => {
    e.preventDefault();
    await signIn("github", { callbackUrl: "/admin" });
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link
          href="/"
          className="d-flex align-items-center text-decoration-none"
        >
          <Navbar.Brand>
            📖
            <span className="fs-4">Fullstack Blog</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" legacyBehavior passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/" legacyBehavior passHref>
              <Nav.Link>Sobre</Nav.Link>
            </Link>
            {status === "loading" && (
              <>
                <span className="navbar-text">Carregando menu...</span>
              </>
            )}
            {status !== "loading" && (
              <>
                {!session && (
                  <Nav.Link href="#" onClick={handleLoginClick}>
                    Log in
                  </Nav.Link>
                )}
                {session && (
                  <>
                    <Link href="/admin" legacyBehavior passHref>
                      <Nav.Link>Admin</Nav.Link>
                    </Link>
                    <Link href="/admin/posts" legacyBehavior passHref>
                      <Nav.Link>Posts</Nav.Link>
                    </Link>

                    <Link href="#" legacyBehavior passHref>
                      <Nav.Link onClick={handleSairClick}>Sair</Nav.Link>
                    </Link>
                  </>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
