import React from 'react'
import Link from 'next/link'
import { auth, signOut, signIn } from "@/auth"

const Navbar = async () => {
    const session = await auth()
    
    return (
        <header className='sticky top-0 z-50 bg-white shadow-2xs font-bold w-full'>
            <nav className='flex justify-between items-center h-16 px-6 max-w-7xl mx-auto'>
                {/* Logo on the left */}
                <Link href="/" className='flex items-center'>
                    <div className='flex items-center'>
                        <span className='text-xl mr-2'>🚀</span>
                        <span className='text-black'>StartupHub</span>
                    </div>
                </Link>
                
                {/* Navigation items - centered (only for authenticated users) */}
                <div className='flex items-center gap-8 text-black'>
                    {session && session?.user && (
                        <Link 
                            href='/startup/create'
                            className='hover:scale-105 transition-transform'
                        >
                            Create
                        </Link>
                    )}
                </div>
                
                {/* Auth section on the right */}
                <div className='flex items-center gap-4 '>
                    {session && session?.user ? (
                        <>
                            <form action={async () => {
                                "use server"
                                await signOut({redirectTo: "/"})
                            }}>
                                <button 
                                    type='submit'
                                    className='hover:scale-105 transition-transform'
                                >
                                    Logout
                                </button>
                            </form>
                            
                            <Link 
                                href={`/user/${session?.id}`}
                                className='flex items-center gap-2 hover:scale-105 transition-transform'
                            >
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server"
                            await signIn('github')
                        }}>
                            <button 
                                type='submit'
                                className='hover:scale-105 transition-transform'
                            >
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar