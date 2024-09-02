'use client'
import React, { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';

function AuthWrapper({ children }:{children: React.ReactNode}) {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname(); // Get the current pathname

    useEffect(() => {
        console.log("---------------------")
        console.log(session)
        if (session) {
            if (pathname === '/') {
                router.push('/o/dashboard'); // Redirect to /dashboard if on the root path
            }
        } else if (pathname !== '/') {
            router.push('/'); // Redirect to / if not authenticated and not on the root path
        }
    }, [session, pathname, router]); // Include dependencies in the array

    // Show loading state or nothing until session state is determined
    // if (!session) {
    //     return null; // Or a loading spinner if preferred
    // }

    return <>{children}</>; // Render the wrapped component content
}

export default AuthWrapper;
