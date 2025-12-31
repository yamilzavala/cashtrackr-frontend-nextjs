'use client'

import { useState, useEffect } from "react"
import { useFormState } from "react-dom";
import { toast } from 'react-toastify';
import confirmAccount from "@/actions/confirm-account-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
// import ErrorMessage from "../ui/ErrorMessage";
// import SuccessMessage from "../ui/SuccessMessage";
import { useRouter } from "next/navigation";

export default function ConfirmAccountForm() {
    const router = useRouter()
    const [token, setToken] = useState('');
    const [isComplete, setIsComplete] = useState(false)
    
    const confirmAccountWithToken = confirmAccount.bind(null, token)
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        errors: [],
        success: ''
    })
    
    useEffect(() => {
        if (isComplete) {
            dispatch()
        }
    }, [isComplete, dispatch])

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if(state.success) {
           toast.success(state.success, {
            onClose: () => {
                router.push('/auth/login')
            }
           })
        }
    }, [state, router])

    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }
    const handleComplete = () => {
        setIsComplete(true)
    }

    return (
        <>
            {/* {state.errors.map(error => <ErrorMessage>{error}</ErrorMessage>)}
            {state.success && <SuccessMessage>{state.success}</SuccessMessage>} */}

            <div className="flex justify-center gap-5 my-10">
                <PinInput 
                value={token} 
                onChange={handleChange}
                onComplete={handleComplete}
                >
                    <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                    <PinInputField className="h-10 w-10 border-gray-300 shadow rounded-lg placeholder-white text-center text-black" />
                </PinInput>
            </div>
        
        </>
    )
}
