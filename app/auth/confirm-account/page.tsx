import ConfirmAccountForm from '@/components/auth/ConfirmAccountForm'

export default function ConfirmAccountPage() {
    return (
        <>
            <h1 className='font-black text-6xl text-purple-950'>Confirm your account</h1>
            <p className='text-3xl font-bold'>Enter the code that you have recived <span className='text-amber-500'>by email</span></p>

            <ConfirmAccountForm/>
        </>
    )
}
