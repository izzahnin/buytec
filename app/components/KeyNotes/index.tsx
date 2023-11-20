export default function KeyNotes() {
  return (
    <div className="container mx-auto w-full max-w-screen-lg py-8">
      <h2 className="mb-6 text-center text-heading-m font-bold">Key Notes</h2>

      <div className="-mx-4 flex flex-wrap">
        <div className="mb-8 w-full px-4 sm:w-1/2 md:w-1/3 lg:w-1/3">
          <div className="rounded-lg bg-white p-6 shadow">
            <p>Top notes:</p>
            <p className="mt-4">notes 1, notes 2, notes 3</p>
          </div>
        </div>

        <div className="mb-8 w-full px-4 sm:w-1/2 md:w-1/3 lg:w-1/3">
          <div className="rounded-lg bg-white p-6 shadow">
            <p>Top notes:</p>
            <p className="mt-4">notes 1, notes 2, notes 3</p>
          </div>
        </div>
        <div className="mb-8 w-full px-4 sm:w-1/2 md:w-1/3 lg:w-1/3">
          <div className="rounded-lg bg-white p-6 shadow">
            <p>Top notes:</p>
            <p className="mt-4">notes 1, notes 2, notes 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
