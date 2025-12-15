import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import CancelBtn from "../ui/CancelBtn";
import Submit from "../ui/Submit";
import { useFormState } from "react-dom";
import { deleteExpense } from "@/actions/delete-expense-action";
import { useEffect } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import DeleteBtn from "../ui/DeleteBtn";

type DeleteExpenseForm = {
  closeModal: () => void
}

export default function DeleteExpenseForm({ closeModal }: DeleteExpenseForm) {
  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('deleteExpenseId')!

  const deleteExpenseWithId = deleteExpense.bind(null, {
    budgetId: +budgetId, 
    expenseId: +expenseId
  })
  const [state, dispatch] = useFormState(deleteExpenseWithId, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if(!Number.isInteger(+budgetId) || !Number.isInteger(+expenseId)) {
      closeModal()
    }
  }, [])

  useEffect(() => {
    if(state.success) {
      toast.success(state.success)
      closeModal();
    }
  }, [state])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Delete Expense
      </DialogTitle>
      {state.errors.map(err => <ErrorMessage key={err}>{err}</ErrorMessage>)}
      <p className="text-xl font-bold">Confirm to delete, {''}
        <span className="text-amber-500">expense</span>
      </p>
      <p className='text-gray-600 text-sm'>(A deleted expense cannot be recovered)</p>
      <form className="grid grid-cols-2 gap-5 mt-10" action={dispatch}>
        {/* <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
        >Cancel</button> */}
        <CancelBtn closeModal={closeModal} />
        {/* <button
          type='button'
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
          onClick={() => dispatch()}
        >Delete</button> */}
        <DeleteBtn label='Delete Expense'/>
      </form>
    </>
  )
}