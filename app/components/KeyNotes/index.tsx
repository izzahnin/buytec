interface KeyNotesProps {
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
}

export default function KeyNotes(props: KeyNotesProps) {
  const { topNotes, middleNotes, baseNotes } = props;
  const parseTopNotes = topNotes.join(", ");
  const parseMiddleNotes = middleNotes.join(", ");
  const parseBaseNotes = baseNotes.join(", ");

  const Notes = [
    {
      id: 1,
      title: "Top Notes",
      notes: parseTopNotes,
    },
    {
      id: 2,
      title: "Middle Notes",
      notes: parseMiddleNotes,
    },
    {
      id: 3,
      title: "Base Notes",
      notes: parseBaseNotes,
    },
  ];
  return (
    <main className="container mx-auto h-full w-full max-w-screen-lg">
      <h2 className="my-3 mt-5 text-center text-heading-m font-bold">Key Notes</h2>
      <section className=" flex flex-col items-center md:items-start justify-between align-middle md:flex-row mx-2 gap-8">
        {Notes.map((item) => (
          <div key={item.id} className="flex flex-col gap-1 text-center max-w-80 w-80 justify-center">
            <h3 className="font-semibold">{item.title}</h3>
            <span className="flex-wrap">{item.notes}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
