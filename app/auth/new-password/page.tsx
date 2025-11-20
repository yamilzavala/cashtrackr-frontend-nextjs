import PasswordResetHandler from '@/components/auth/PasswordResetHandler'
import React from 'react'

export default function NewPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Restore Password</h1>
      <p className="text-3xl font-bold">Enter the code that you recived
        <span className="text-amber-500"> by email</span>
      </p>

      <PasswordResetHandler/>
    </>
  )
}
