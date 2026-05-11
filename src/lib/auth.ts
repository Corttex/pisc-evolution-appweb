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

        // Tenta encontrar usuário por e-mail ou por CPF do cliente vinculado
        const user = await prisma.user.findFirst({
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

        if (!user || !user.password) {
          return null;
        }

        // O password pode ser uma senha normal ou um PIN hashado
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          return null;
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
    maxAge: 1 * 60 * 60, // 1 hour (auto-expiração curta)
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
  secret: process.env.NEXTAUTH_SECRET,
};
