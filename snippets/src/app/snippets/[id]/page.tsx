import { notFound } from "next/navigation";
import { db } from "@/app/db";

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000));

  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div className="m-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <button className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100">
            Edit
          </button>
          <button className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100">
            Delete
          </button>
        </div>
      </div>
      <pre className="mt-4 overflow-x-auto rounded border border-gray-200 bg-gray-100 p-4">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
