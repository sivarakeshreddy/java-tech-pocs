import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import type { Column as ColumnType, Card } from '../types'
import SortableCard from './SortableCard'
import styles from './Column.module.css'

interface ColumnProps {
  column: ColumnType
  cards: Card[]
  onAddCard: (columnId: string) => void
  onDeleteCard: (cardId: string) => void
  onRenameColumn: (columnId: string, newTitle: string) => void
}

function Column({ column, cards, onAddCard, onDeleteCard, onRenameColumn }: ColumnProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(column.title)

  const { setNodeRef } = useDroppable({ id: column.id })

  const handleBlur = () => {
    setIsEditing(false)
    const trimmed = editTitle.trim()
    if (trimmed && trimmed !== column.title) {
      onRenameColumn(column.id, trimmed)
    } else {
      setEditTitle(column.title)
    }
  }

  return (
    <div ref={setNodeRef} className={styles.column} data-testid={`column-${column.id}`}>
      <div className={styles.header}>
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
            className={styles.titleInput}
            autoFocus
          />
        ) : (
          <h3
            className={styles.title}
            onClick={() => {
              setIsEditing(true)
              setEditTitle(column.title)
            }}
          >
            {column.title}
          </h3>
        )}
      </div>
      <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
        <div className={styles.cards}>
          {cards.map((card) => (
            <SortableCard key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </div>
      </SortableContext>
      <button
        type="button"
        className={styles.addBtn}
        onClick={() => onAddCard(column.id)}
      >
        + Add card
      </button>
    </div>
  )
}

export default Column
