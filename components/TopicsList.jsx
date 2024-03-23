'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import RemoveBtn from '@/components/RemoveBtn'
import { HiPencilAlt } from 'react-icons/hi'

async function getTopics(){
    try {
        const hostname = window.location.hostname
        console.log(hostname)
        const res = await fetch(`http://${hostname}/api/topics`, {
            cache: "no-store",
        });
        if(!res.ok){
            throw new Error("Failed to Fetch Topics");
        }
        return res.json();
    } catch (error) {
        console.log("Error loading topics", error);
        return null;
    }
}

export default async function TopicsList(){

    // const { topic } = await getTopics();
    // console.log(topic);

    const [topic, setTopic] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getTopics();
            if (data) {
                setTopic(data.topic || []); // If `data` exists, set `topics` state to `data.topic` or an empty array if `data.topic` is undefined
                console.log(data.topic);
            }
        }

        fetchData();
    }, []);

    return (
        <>
        { topic.map( (t) => (
            <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                <div>
                    <h2 className="font-bold text-2xl ">{ t.title }</h2>
                    <div>{ t.description }</div>
                </div>
                <div className="flex gap-2">
                    <RemoveBtn id={ t._id }/>
                    <Link href={ `/editTopic/${t._id}` }>
                        <HiPencilAlt size={ 24 } />
                    </Link>
                </div>
            </div>
        ))}
        </>
    )
}