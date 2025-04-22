import NextAuth from "next-auth"
// perlu dipahami

declare module "next-auth"{
    interface Session {
        id: string
    }
    interface JWT {
        id: string
    }
}