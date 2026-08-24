import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        try {
          const response = await axios.post(
            "https://api-chat-app-eky0.onrender.com/api/v1/sign-in",
            {
              email,
              password,
            },
          );
  
          const user = response.data;
          return {
            id: user.id,
            name: user.fullName,
            email: user.email,
            image: user.imageUrl,
            createdAt: user.createdAt
          };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const msg = error.response?.data?.msg || "Something went wrong";
          throw new Error(msg);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const response = await axios.post(
          "https://api-chat-app-eky0.onrender.com/api/v1/google-sign-in",
          {
            fullName: user.name,
            email: user.email,
            imageUrl: user.image
          },
        );
        console.log("goo", user)
        user.id = String(response.data.id);
        user.image = response.data.imageUrl;
        user.createdAt = response.data.createdAt
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.createdAt = user.createdAt;

        token.backendAccessToken = jwt.sign(
          {
            userId: user.id
          },
          process.env.BACKEND_JWT_SECRET!,
        )
      }

      if(trigger === "update" && session) {
        token.name = session.name;
        token.image = session.image;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = Number(token.id);
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.createdAt = token.createdAt;
      session.accessToken = token.backendAccessToken!
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
