import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
 

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      providers: 'credentials',
      credentials: {
          username: {label: 'Email', type: 'text', placeholder: 'John Doe'},
          password: {label: 'Password', type: 'password'},
          email: {label:'Email',type:'email'}
      },
      async authorize(credentials){
        if(!credentials.email || !credentials?.password){
          return null
        }
          //check to see if user exists
      const user = await prisma.user.findUnique({
        where:{
          email:credentials.email
        }
      });
      if(!user){
        return null
      }

      const passwordMatch = await bcrypt.compare(credentials.password,user.hashedPassword)
     
      if(!passwordMatch){
        return null;
      }

      return user
    
    }
    })
      
  ],
  session: {
    strategy:'jwt',
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug:process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };