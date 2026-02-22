import Board from '../src/components/Board'

export default function Page() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-[#032147] mb-4">Kanban Board</h1>
      <Board />
    </div>
  )
}
