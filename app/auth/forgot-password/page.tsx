import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Cashtrackr -  Forgot Password',
    description: 'Cashtrackr - Forgot Password',
}

const ForgotPasswordPage = () => {
    return (
        <>
            <h1 className='font-black text-6xl text-purple-950'>Do you forgot your password?</h1>
            <p className='text-3xl font-bold'>hear you can <span className='text-amber-500'>restore</span></p>

            <ForgotPasswordForm />

            <nav className='flex items-center mt-10 flex-col gap-2'>
                <Link href='/auth/login' className='cursor-pointer text-gray-500'>
                    Do you have and account? Login
                </Link>
                <Link href='/auth/register' className='cursor-pointer text-gray-500'>
                    Do don't have and account? Register
                </Link>
            </nav>
        </>
    )
}

export default ForgotPasswordPage;