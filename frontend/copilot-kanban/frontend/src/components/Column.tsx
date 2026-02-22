"use client"

import * as React from 'react'
import Card from './Card'
import type { Card as CardT } from '../data/dummy'

type Props = {
  id: string
  title: string
  cards: CardT[]
  onDropCard: (cardId: string, toColumnId: string) => void
  onAddCard: (colId: string, title: string) => void
  onDeleteCard: (cardId: string) => void
  onRename: (colId: string, title: string) => void
}

export default function Column({ id, title, cards, onDropCard, onAddCard, onDeleteCard, onRename }: Props) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const cardId = e.dataTransfer.getData('text/plain')
    if (cardId) onDropCard(cardId, id)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const [editing, setEditing] = React.useState(false)
  const [value, setValue] = React.useState(title)

  return (
    <div className="w-72 bg-gray-50 rounded p-3 mr-4 flex-shrink-0" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="mb-3">
        {editing ? (
          <div className="flex">
            <input className="flex-1 p-1 border" value={value} onChange={e => setValue(e.target.value)} />
            <button className="ml-2 text-sm text-blue-600" onClick={() => { onRename(id, value); setEditing(false) }}>Save</button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[#032147]">{title}</h2>
            <button className="text-sm text-gray-500" onClick={() => setEditing(true)}>Rename</button>
          </div>
        )}
      </div>

      <div>
        {cards.map(c => (
          <Card key={c.id} id={c.id} title={c.title} details={c.details} onDelete={onDeleteCard} />
        ))}
      </div>

      <AddCardForm onAdd={(t) => onAddCard(id, t)} />
    </div>
  )
}

function AddCardForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [value, setValue] = React.useState('')
  return (
    <form className="mt-3" onSubmit={(e) => { e.preventDefault(); if (value.trim()) { onAdd(value.trim()); setValue('') } }}>
      <input className="w-full p-2 border rounded" placeholder="Add card title" value={value} onChange={e => setValue(e.target.value)} />
    </form>
  )
}
