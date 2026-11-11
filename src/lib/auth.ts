import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let user: any = null;
        try {
          // Tenta encontrar usuário por e-mail ou por CPF do cliente vinculado
          user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.email },
                { 
                  cliente: {
                    documento: credentials.email
                  }
                }
              ]
            },
            include: {
              cliente: true
            }
          });
        } catch (dbError) {
          console.warn("Prisma offline ou indisponível ao buscar user.");
        }

        if (!user || !user.password) {
          // Fallback para autenticação com AdminProfile caso exista
          if (credentials?.email && credentials?.password) {
            try {
              const admin = await prisma.adminProfile.findFirst({
                where: { email: credentials.email }
              });
              if (admin && admin.senha) {
                const isAdminValid = (admin.senha === credentials.password) || (await bcrypt.compare(credentials.password, admin.senha).catch(() => false));
                if (isAdminValid) {
                  return {
                    id: admin.id || "master-admin",
                    email: admin.email || credentials.email,
                    name: admin.nome || "Admin Master",
                    role: "ADMIN"
                  };
                }
              }
            } catch (adminError) {
              console.warn("Prisma offline ao buscar AdminProfile.");
            }
          }
          return null;
        }

        let isValid = false;
        isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          // Fallback para AdminProfile se a senha não bateu com a tabela user
          if (user.role === "ADMIN" && user.email) {
            try {
              const admin = await prisma.adminProfile.findFirst({
                where: { email: user.email }
              });
              if (admin && admin.senha) {
                isValid = (admin.senha === credentials.password) || (await bcrypt.compare(credentials.password, admin.senha).catch(() => false));
              }
            } catch (err) {}
          }
          if (!isValid) return null;
        }

        console.log("Authorize: Usuário autenticado:", { email: user.email, role: user.role });
        return {
          id: user.id,
          email: user.email,
          name: user.name || user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 horas
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "HYGQGAlyDWnlD4729PeuUtWe5Ma6Pdr4tuC6ERcPNXw=",
};
