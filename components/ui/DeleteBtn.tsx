import React from 'react'
import { useFormStatus } from 'react-dom'

type DeleteBtnProps = {
    label:string,
}

const commonStyles = 'bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors';

export default function DeleteBtn({label}: DeleteBtnProps) {
    const status = useFormStatus()

    return (
        <input
            type="submit"
            className={status.pending ? `${commonStyles} bg-gray-800` : `${commonStyles} hover:bg-amber-600`}
            value={status.pending ? 'Procesing...' : label ? label : 'Delete'}
            disabled={status.pending}
        />
    )
}
