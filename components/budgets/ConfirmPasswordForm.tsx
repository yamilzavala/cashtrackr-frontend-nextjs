'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DialogTitle } from "@headlessui/react"
import { useEffect } from "react"
import { deleteBudget } from "@/actions/delete-budget-action"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import ErrorMessage from "../ui/ErrorMessage"
import Submit from "../ui/Submit"
import CancelBtn from "../ui/CancelBtn"

export default function ConfirmPasswordForm() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const budgetId = +searchParams.get('deleteBudgetId')!

    const deleteBudgetWithPassword = deleteBudget.bind(null, budgetId)
    const [state, dispatch] = useFormState(deleteBudgetWithPassword, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            closeModal()
        }
    }, [state])

    const closeModal = () => {
        const hideModal = new URLSearchParams(searchParams.toString())
        hideModal.delete('deleteBudgetId')
        router.replace(`${pathname}?${hideModal}`)
    }

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Delete Budget
            </DialogTitle>
            <p className="text-xl font-bold">Enter the Password for {''}
                <span className="text-amber-500">delete the budget {''}</span>
            </p>
            <p className='text-gray-600 text-sm'>(
                A budget is eliminated and its expenses cannot be recovered)</p>

            {state.errors.map(err => <ErrorMessage key={err}>{err}</ErrorMessage>)}

            <form
                className=" mt-14 space-y-5"
                noValidate
                action={dispatch}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="password"
                    >Enter your Password to delete</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name='password'
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    {/* <input
                        type="submit"
                        value='Delete Budget'
                        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                    /> */}
                    <Submit label='Delete Budget'/>
                    {/* <button
                        className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                        onClick={closeModal}
                    >Cancel</button> */}
                   <CancelBtn closeModal={closeModal} />
                </div>
            </form>

        </>
    )
}