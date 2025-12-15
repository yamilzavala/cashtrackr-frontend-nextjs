'use server'

import getToken from "@/src/auth/token"
import { Budget, DraftExpenseSchema, ErrorSchema, Expense, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}

type BudgetAndExpenseIdType = {
    budgetId: Budget['id'],
    expenseId: Expense['id']
}

export async function deleteExpense({budgetId, expenseId}: BudgetAndExpenseIdType ,prevState: ActionStateType) {
    // request to backend service
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    const json = await req.json()
    if(!req.ok) {
        const {error} = ErrorSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }        
    }

    revalidatePath(`/admin/budgets/${budgetId}`)
    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success: success.msg
    }
}