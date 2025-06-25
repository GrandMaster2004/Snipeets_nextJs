import React from "react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteSnippet } from "@/actions";
import { notFound } from "next/navigation";

interface SnippetDetailPageProps {
  params: {
    id: string;
  };
}

const SnippetDetailPage = async ({ params }: SnippetDetailPageProps) => {
  const id = parseInt(params.id, 10);

  // Handle invalid numeric ID
  if (isNaN(id)) {
    return <h1>Invalid snippet ID</h1>;
  }

  // Optional: Simulate loading for UX testing
  // await new Promise((r) => setTimeout(r, 2000));

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  // Handle snippet not found
  if (!snippet) return notFound();

  const deleteAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{snippet.title}</h2>
        <div className="flex items-center gap-2">
          <Link href={`/snippet/${snippet.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <form action={deleteAction}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>

      <pre className="p-3 bg-gray-100 rounded border">{snippet.code}</pre>
    </div>
  );
};

export default SnippetDetailPage;
