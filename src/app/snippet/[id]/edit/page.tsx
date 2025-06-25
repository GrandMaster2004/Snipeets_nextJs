import EditsnippetForm from "@/components/ui/EditSnippetForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

const EditPageSnippet = async ({ params }: PageProps) => {
  const id = parseInt(params.id, 10);

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) return notFound();

  return <EditsnippetForm snippet={snippet} />;
};

export default EditPageSnippet;
