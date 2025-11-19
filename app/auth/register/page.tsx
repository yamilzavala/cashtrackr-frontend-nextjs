import RegisterForm from '@/components/auth/RegisterForm'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Cashtrackr - Create Account',
    description: 'Cashtrackr - Create Account',
}

const RegisterPage = () => {
    return (
        <>
            <h1 className='font-black text-6xl text-purple-950'>Create your account</h1>
            <p className='text-3xl font-bold'>and handle your <span className='text-amber-500'>finance</span></p>

            <RegisterForm />

            <nav className='flex items-center mt-10 flex-col gap-2'>
                <Link href='/auth/login' className='cursor-pointer text-gray-500'>
                    Do you have and account? Login
                </Link>
                <Link href='/auth/forgot-password' className='cursor-pointer text-gray-500'>
                    Did you forget your password? Restore
                </Link>
            </nav>
        </>
    )
}

export default RegisterPage