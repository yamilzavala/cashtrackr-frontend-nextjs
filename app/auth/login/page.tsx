import LoginForm from '@/components/auth/LoginForm'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Cashtrackr -  Login',
    description: 'Cashtrackr - Login',
}

const LoginPage = () => {
    return (
        <>
            <h1 className='font-black text-6xl text-purple-950'>Loggin</h1>
            <p className='text-3xl font-bold'>and handle your <span className='text-amber-500'>finance</span></p>

            <LoginForm />

            <nav className='flex items-center mt-10 flex-col gap-2'>
                <Link href='/auth/register' className='cursor-pointer text-gray-500'>
                    You don&apos;t have and account? Register
                </Link>
                <Link href='/auth/forgot-password' className='cursor-pointer text-gray-500'>
                    Did you forget your password? Restore
                </Link>
            </nav>
        </>
    )
}

export default LoginPage