import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useState } from 'react'
import '../sensors/pointerSensor'
import type { Board as BoardType } from '../types'
import { dummyBoard } from '../data/dummyData'
import Column from './Column'
import Card from './Card'
import styles from './Board.module.css'

function findColumnForCard(board: BoardType, cardId: string): string | null {
  for (const col of board.columns) {
    if (col.cardIds.includes(cardId)) return col.id
  }
  return null
}

function Board() {
  const [board, setBoard] = useState<BoardType>(dummyBoard)
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  const addCard = (columnId: string) => {
    const id = `card-${Date.now()}`
    const newCard = { id, title: 'New card', details: 'Add details here.' }
    setBoard((prev) => ({
      columns: prev.columns.map((col) =>
        col.id === columnId ? { ...col, cardIds: [...col.cardIds, id] } : col
      ),
      cards: { ...prev.cards, [id]: newCard },
    }))
  }

  const deleteCard = (cardId: string) => {
    setBoard((prev) => {
      const newCards = { ...prev.cards }
      delete newCards[cardId]
      return {
        columns: prev.columns.map((col) => ({
          ...col,
          cardIds: col.cardIds.filter((id) => id !== cardId),
        })),
        cards: newCards,
      }
    })
  }

  const renameColumn = (columnId: string, newTitle: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      ),
    }))
  }

  const moveCard = (cardId: string, toColumnId: string, toIndex: number) => {
    setBoard((prev) => {
      const fromColId = findColumnForCard(prev, cardId)
      if (!fromColId) return prev
      if (fromColId === toColumnId) {
        const col = prev.columns.find((c) => c.id === fromColId)!
        const idx = col.cardIds.indexOf(cardId)
        if (idx === toIndex) return prev
        const newIds = [...col.cardIds]
        newIds.splice(idx, 1)
        newIds.splice(toIndex, 0, cardId)
        return {
          ...prev,
          columns: prev.columns.map((c) =>
            c.id === fromColId ? { ...c, cardIds: newIds } : c
          ),
        }
      }
      const fromCol = prev.columns.find((c) => c.id === fromColId)!
      const toCol = prev.columns.find((c) => c.id === toColumnId)!
      const newFromIds = fromCol.cardIds.filter((id) => id !== cardId)
      const newToIds = [...toCol.cardIds]
      newToIds.splice(toIndex, 0, cardId)
      return {
        ...prev,
        columns: prev.columns.map((c) => {
          if (c.id === fromColId) return { ...c, cardIds: newFromIds }
          if (c.id === toColumnId) return { ...c, cardIds: newToIds }
          return c
        }),
      }
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over) return
    const cardId = active.id as string
    const overId = over.id as string

    const isColumn = board.columns.some((c) => c.id === overId)
    if (isColumn) {
      const col = board.columns.find((c) => c.id === overId)!
      moveCard(cardId, overId, col.cardIds.length)
      return
    }

    const overCol = findColumnForCard(board, overId)
    if (!overCol) return
    const overColData = board.columns.find((c) => c.id === overCol)!
    const toIndex = overColData.cardIds.indexOf(overId)
    if (toIndex === -1) return
    moveCard(cardId, overCol, toIndex)
  }

  const activeCard = activeId ? board.cards[activeId] : null

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Kanban Board</h1>
      </header>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.board}>
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={column.cardIds
                .map((id) => board.cards[id])
                .filter(Boolean)}
              onAddCard={addCard}
              onDeleteCard={deleteCard}
              onRenameColumn={renameColumn}
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard ? (
            <div style={{ cursor: 'grabbing', boxShadow: '0 8px 24px rgba(3,33,71,0.2)' }}>
              <Card card={activeCard} showDelete={false} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default Board
