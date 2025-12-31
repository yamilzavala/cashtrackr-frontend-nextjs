import { Budget } from '@/src/schemas'
import { formatCurrency, formatDate } from '@/src/utils'
import React from 'react'
import ExpenseMenu from './ExpenseMenu'

type ExpenseListProps = {
  budget: Budget,
}

export default function ExpenseList({ budget }: ExpenseListProps) {
  return (
    <>
      {budget.expenses.map((expense) => (
        <li key={expense.id} className="flex justify-between gap-x-6 p-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto space-y-2">
              <p className="text-2xl font-semibold text-gray-500">
                {expense.name}
              </p>
              <p className="text-xl font-bold text-amber-500">
                {formatCurrency(+expense.amount)}
              </p>
              <p className='text-gray-500  text-sm'>
                Added: {''}
                <span className="font-bold">{formatDate(expense.updatedAt)}</span>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <ExpenseMenu expenseId={+expense.id} />
          </div>
        </li>
      ))}
    </>
  )
}
