"use client"

import { useState } from 'react'
import Column from './Column'
import initial from '../data/dummy'
import { v4 as uuidv4 } from 'uuid'

type ColumnT = typeof initial[number]

export default function Board() {
  const [columns, setColumns] = useState<ColumnT[]>(initial)

  const moveCard = (cardId: string, toColumnId: string) => {
    setColumns(prev => {
      let cardToMove: any = null
      const srcCols = prev.map(col => {
        const idx = col.cards.findIndex(c => c.id === cardId)
        if (idx > -1) {
          cardToMove = col.cards[idx]
          return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
        }
        return col
      })
      if (!cardToMove) return prev
      return srcCols.map(col => col.id === toColumnId ? { ...col, cards: [...col.cards, cardToMove] } : col)
    })
  }

  const addCard = (colId: string, title: string) => {
    const newCard = { id: uuidv4(), title }
    setColumns(prev => prev.map(c => c.id === colId ? { ...c, cards: [...c.cards, newCard] } : c))
  }

  const deleteCard = (cardId: string) => {
    setColumns(prev => prev.map(c => ({ ...c, cards: c.cards.filter(card => card.id !== cardId) })))
  }

  const renameColumn = (colId: string, title: string) => {
    setColumns(prev => prev.map(c => c.id === colId ? { ...c, title } : c))
  }

  return (
    <div className="flex items-start overflow-x-auto">
      {columns.map(col => (
        <Column key={col.id} id={col.id} title={col.title} cards={col.cards} onDropCard={moveCard} onAddCard={addCard} onDeleteCard={deleteCard} onRename={renameColumn} />
      ))}
    </div>
  )
}
