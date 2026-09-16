import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/app/db";
import * as actions from "@/actions";

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

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="m-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="mt-4 overflow-x-auto rounded border border-gray-200 bg-gray-100 p-4">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
