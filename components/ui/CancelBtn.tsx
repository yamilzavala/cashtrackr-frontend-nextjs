import React from 'react'
import { useFormStatus } from 'react-dom'

const commonStyles = 'bg-amber-500 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors';

export default function CancelBtn({ closeModal }: {closeModal: () => void}) {
    const status = useFormStatus()
    return (
        <button
            className={status.pending ? `${commonStyles} bg-gray-800` : `${commonStyles} hover:bg-amber-600`}
            onClick={closeModal}
            disabled={status.pending}
        >Cancel</button>
    )
}
