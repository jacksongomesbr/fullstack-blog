"use client";
import { ToastsProvider as BootstrapToastsProvider } from "react-bootstrap-toasts";

import { SessionProvider } from "next-auth/react";

export default function AppContent({ children, session }) {
  return (
    <SessionProvider session={session}>
      <BootstrapToastsProvider
        toastContainerProps={{ position: "bottom-center", className: "p-2" }}
      >
        {children}
      </BootstrapToastsProvider>
    </SessionProvider>
  );
}
