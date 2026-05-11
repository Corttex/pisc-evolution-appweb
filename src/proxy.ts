import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Next.js 16 - Novo ponto de entrada 'proxy'
// Substitui o antigo 'middleware'
export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
    const isClientPage = req.nextUrl.pathname.startsWith("/minha-piscina");

    // Redirecionar se já autenticado e tentar acessar login
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(
          new URL(token.role === "ADMIN" ? "/admin" : "/minha-piscina", req.url)
        );
      }
      return null;
    }

    // Proteger rotas Admin
    if (isAdminPage && (!isAuth || token.role !== "ADMIN")) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Proteger rotas Cliente
    if (isClientPage && !isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true, // Controle manual no corpo da função
    },
  }
);

// Named export 'proxy' obrigatório no Next.js 16
export const proxy = (req: any, ev: any) => {
  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/minha-piscina/:path*", "/login"],
};
