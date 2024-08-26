import 'next-auth'
import { DefaultSession } from 'next-auth';

import "next-auth/jwt"



declare module 'next-auth' {
    interface User {
        restroName?: string,
        logo?: string,
        detailsVerified?: boolean,

    }
    interface Session {
        user: {
            restroName?: string,
            logo?: string,
            detailsVerified?: boolean,
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        restroName?: string,
        logo?: string,
        detailsVerified?: boolean,
    }
}


