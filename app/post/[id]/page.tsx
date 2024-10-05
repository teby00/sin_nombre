export default async function Post({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-8 gap-8">
      Post {params.id}
    </div>
  );
}
