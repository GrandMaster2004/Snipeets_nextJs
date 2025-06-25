import EditsnippetForm from "@/components/ui/EditSnippetForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

const EditpageSnippet = async ({ params }: PageProps) => {
  const id = parseInt(params.id); 

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) return notFound();

  return <EditsnippetForm snippet={snippet} />;
};

export default EditpageSnippet;
