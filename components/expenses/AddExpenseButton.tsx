'use client'

import { useRouter } from "next/navigation"

export default function AddExpenseButton() {
  const router = useRouter()

  return (
    <button
        type='button'
        className="text-white bg-amber-500 px-10 py-2 rounded-lg font-bold cursor-pointer "
        onClick={() => router.push(location.pathname + '?addExpense=true&showModal=true')}
    >
        Add expense
    </button>
  )
}
