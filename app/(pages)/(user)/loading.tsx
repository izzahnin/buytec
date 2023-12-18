export default function Loading() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-2 border-primary-blue border-opacity-25 border-solid h-8 w-8"></div>
      <h1 className="ml-3 text-xl font-semibold text-gray-700">Loading...</h1>
    </main>
  )
}