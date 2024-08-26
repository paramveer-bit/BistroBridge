
import NextAuth from "next-auth"
import dbConnect from "./lib/dbConnect"
import Google from "next-auth/providers/google"
import UserModel from "./models/user.model"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                dbConnect()

                try {
                    const userFind = await UserModel.findOne({ email: user.email })
                    if (userFind) {
                        token.email = user.email,
                            token.name = user.name,
                            token.logo = userFind.logo,
                            token.detailsVerified = userFind.detailsVerified
                        token.restroName = userFind.restroName
                    }
                    else {
                        console.log("Error in finding user")
                    }

                } catch (error) {
                    console.log("Error in setting jwt token ")
                }
            }
            return token
        },
        async session({ session, token }) {

            if (token) {
                session.user.name = token.name,
                    session.user.logo = token.logo,
                    session.user.detailsVerified = token.detailsVerified
                session.user.restroName = token.restroName
            }
            return session
        },
        async signIn({ profile }) {
            dbConnect()
            const email = profile?.email
            try {
                const user = await UserModel.findOne({ email })
                console.log(user)
                console.log("-----------------------------")
                if (user) {
                    return true;
                }

                const newUser = await UserModel.create({ email, name: profile?.name, restroName: " ", logo: " " })
                console.log(newUser)
                console.log("---------------------------++++++++++++++++++++++++")
                if (!newUser) return false
                return true;

            } catch (error) {
                console.log(error);
                return false
            }



        }
    }
})