'use client'
import { useState } from "react"
import ResetPasswordForm from "./ResetPasswordForm"
import ValidateTokenForm from "./ValidateTokenForm"

export default function PasswordResetHandler() {
  const [isValidToken, setIsValidToken] = useState(false)
  
  return (
    <>
        {isValidToken ? <ResetPasswordForm/> : <ValidateTokenForm/>}
    </>
  )
}
