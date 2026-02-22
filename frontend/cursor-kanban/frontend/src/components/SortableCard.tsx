import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Card as CardType } from '../types'
import Card from './Card'
import styles from './SortableCard.module.css'

interface SortableCardProps {
  card: CardType
  onDelete: (id: string) => void
}

function SortableCard({ card, onDelete }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className={styles.wrapper}>
      <div
        className={styles.dragHandle}
        data-testid={`drag-handle-${card.id}`}
        {...attributes}
        {...listeners}
        aria-hidden
      >
        <span className={styles.grip}>&#8942;</span>
      </div>
      <div className={styles.cardSlot}>
        <Card card={card} showDelete={false} />
      </div>
      <button
        type="button"
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onDelete(card.id)
        }}
        onPointerDown={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
        aria-label="Delete card"
      >
        x
      </button>
    </div>
  )
}

export default SortableCard
