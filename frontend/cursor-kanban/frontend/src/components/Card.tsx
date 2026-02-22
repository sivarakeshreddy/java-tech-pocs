import type { Card as CardType } from '../types'
import styles from './Card.module.css'

interface CardProps {
  card: CardType
  onDelete?: (id: string) => void
  showDelete?: boolean
}

function Card({ card, onDelete, showDelete = true }: CardProps) {
  return (
    <div className={styles.card} data-testid={`card-${card.id}`}>
      <div className={styles.header}>
        <span className={styles.title}>{card.title}</span>
        {showDelete && onDelete && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation()
              onDelete(card.id)
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Delete card"
          >
            x
          </button>
        )}
      </div>
      <p className={styles.details}>{card.details}</p>
    </div>
  )
}

export default Card
