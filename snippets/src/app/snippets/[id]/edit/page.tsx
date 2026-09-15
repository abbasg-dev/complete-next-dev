interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage({
  params,
}: SnippetEditPageProps) {
  const { id } = await params;
  const snippetId = parseInt(id, 10);

  console.log(id);

  return <div>Editing snippet with id {snippetId}</div>;
}
