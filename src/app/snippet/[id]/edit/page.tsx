import EditsnippetForm from '@/components/ui/EditSnippetForm';
import React from 'react'
import { prisma } from "@/lib/prisma"
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
const EditpageSnippet = async ({params}:{params:Promise<{id:string}>}) => {
  
    const id = parseInt((await params).id);
    const snippet = await prisma.snippet.findUnique({
        where:{
            id,
        }
    })
    if(!snippet) return <h1>Snippet not found</h1>
    return <EditsnippetForm snippet = {snippet} />
}

export default EditpageSnippet;