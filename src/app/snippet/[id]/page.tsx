// First Method of get data
// import React from 'react'

// export const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {
//   const { id } = params;

//   return (
//     <div>SnippetDetailPage for ID: {id}</div>
//   );
// };

// Second method
// interface SnippetDetailPageProps {
//   params: {
//     id: string
//   }
// }

// const SnippetDetailPage = async ({ params }: SnippetDetailPageProps) => {
//   const { id } = params
// }

import React from "react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { deleteSnippet } from "@/actions";
import { notFound } from "next/navigation";

const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return <h1>Invalid snippet ID</h1>;
  }
  await new Promise((r) => setTimeout(r, 2000));
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  const deletesnip = deleteSnippet.bind(null, snippet.id);
  if (!snippet) notFound();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2>{snippet.title}</h2>
        <div className="flex items-center gap-2">
          <Link href={`${snippet.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <form action={deletesnip}>
            <Button type="submit" variant={"destructive"}>
              Delete
            </Button>
          </form>
        </div>
      </div>

      <pre className="p-3 bg-gray-200 rounded border-gray-200">
        {snippet.code}
      </pre>
    </div>
  );
};

export default SnippetDetailPage;
