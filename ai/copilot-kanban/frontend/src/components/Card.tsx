"use client"

type Props = {
  id: string
  title: string
  details?: string
  onDelete?: (id: string) => void
}

export default function Card({ id, title, details, onDelete }: Props) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded shadow p-3 mb-3 cursor-move"
      data-testid={`card-${id}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{title}</div>
          {details ? <div className="text-sm text-gray-500">{details}</div> : null}
        </div>
        {onDelete ? (
          <button
            onClick={() => onDelete(id)}
            className="text-sm text-red-500 hover:underline ml-4"
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  )
}
