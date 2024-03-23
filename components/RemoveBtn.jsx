"use client"

import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

export default function RemoveBtn( { id } ){
    const router = useRouter();
    const removeTopic = async () => {
        const confirmed = confirm('Are you Sure ?')

        if(confirmed){
            const hostname = window.location.hostname
            const res = await fetch(`http://${hostname}/api/topics?id=${id}`, {
                method: "DELETE"
            })

            if(res.ok){
                router.refresh();
            }
        }
    }

    return(
        <button onClick={ removeTopic } className="text-red-400">
            <HiOutlineTrash size={ 24 } />
        </button>
    )
}