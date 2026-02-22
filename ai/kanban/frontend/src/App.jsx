import { useState } from 'react'
import './App.css'

const initialColumns = [
  {
    id: 'col-backlog',
    name: 'Backlog',
    cards: [
      {
        id: 'c1',
        title: 'Create landing concept',
        details: 'Draft the opening visual direction for the release board.',
      },
      {
        id: 'c2',
        title: 'Align messaging',
        details: 'Confirm the product promise and top three proof points.',
      },
    ],
  },
  {
    id: 'col-todo',
    name: 'To Do',
    cards: [
      {
        id: 'c3',
        title: 'Prepare stakeholder review',
        details: 'Assemble notes and examples for Monday review.',
      },
    ],
  },
  {
    id: 'col-progress',
    name: 'In Progress',
    cards: [
      {
        id: 'c4',
        title: 'Build board shell',
        details: 'Implement responsive layout and core interaction states.',
      },
    ],
  },
  {
    id: 'col-review',
    name: 'Review',
    cards: [
      {
        id: 'c5',
        title: 'Accessibility pass',
        details: 'Validate keyboard flow, labels, and contrast balance.',
      },
    ],
  },
  {
    id: 'col-done',
    name: 'Done',
    cards: [
      {
        id: 'c6',
        title: 'Kickoff planning',
        details: 'Initial board scope approved by product and design.',
      },
    ],
  },
]

const makeCardId = () =>
  `card-${Date.now()}-${Math.floor(Math.random() * 100000).toString(16)}`

const allowDrop = (event) => {
  event.preventDefault()
}

function Column({
  column,
  index,
  onRename,
  onAddCard,
  onDeleteCard,
  onCardDragStart,
  onCardDrop,
}) {
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanDetails = details.trim()

    if (!cleanTitle || !cleanDetails) {
      return
    }

    onAddCard(column.id, cleanTitle, cleanDetails)
    setTitle('')
    setDetails('')
    setIsComposerOpen(false)
  }

  return (
    <section className="column" data-testid={`column-${column.id}`}>
      <header className="column-header">
        <span className="column-index">{String(index + 1).padStart(2, '0')}</span>
        <input
          className="column-name"
          value={column.name}
          onChange={(event) => onRename(column.id, event.target.value)}
          aria-label={`Column ${index + 1} name`}
        />
        <div className="card-count-badge" data-testid={`column-count-${column.id}`}>
          <span className="card-count-number">{column.cards.length}</span>
          <span className="card-count-label">cards</span>
        </div>
      </header>

      <div
        className="card-stack"
        onDragOver={allowDrop}
        onDrop={(event) => onCardDrop(event, column.id)}
        data-testid={`dropzone-${column.id}`}
      >
        {column.cards.map((card) => (
          <article
            key={card.id}
            className="kanban-card"
            draggable
            onDragStart={(event) => onCardDragStart(event, column.id, card.id)}
            data-testid={`card-${card.id}`}
          >
            <h3>{card.title}</h3>
            <p>{card.details}</p>
            <button
              type="button"
              className="ghost-button"
              onClick={() => onDeleteCard(column.id, card.id)}
            >
              Delete
            </button>
          </article>
        ))}
      </div>

      {isComposerOpen ? (
        <form className="card-form" onSubmit={handleSubmit}>
          <label>
            Card title
            <input
              aria-label="Card title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Short title"
            />
          </label>
          <label>
            Card details
            <textarea
              aria-label="Card details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="What should happen?"
              rows={3}
            />
          </label>
          <div className="card-form-actions">
            <button type="submit" className="primary-button">
              Save card
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setIsComposerOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          className="primary-button add-card-button"
          onClick={() => setIsComposerOpen(true)}
        >
          Add card
        </button>
      )}
    </section>
  )
}

function App() {
  const [columns, setColumns] = useState(initialColumns)

  const handleRenameColumn = (columnId, name) => {
    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.id === columnId ? { ...column, name } : column,
      ),
    )
  }

  const handleAddCard = (columnId, title, details) => {
    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: [...column.cards, { id: makeCardId(), title, details }],
            }
          : column,
      ),
    )
  }

  const handleDeleteCard = (columnId, cardId) => {
    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.filter((card) => card.id !== cardId),
            }
          : column,
      ),
    )
  }

  const handleCardDragStart = (event, sourceColumnId, cardId) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ sourceColumnId, cardId }),
    )
  }

  const handleCardDrop = (event, targetColumnId) => {
    event.preventDefault()

    const payload = event.dataTransfer.getData('text/plain')
    if (!payload) {
      return
    }

    let dragData
    try {
      dragData = JSON.parse(payload)
    } catch {
      return
    }

    const { sourceColumnId, cardId } = dragData
    if (!sourceColumnId || !cardId || sourceColumnId === targetColumnId) {
      return
    }

    setColumns((currentColumns) => {
      let movedCard = null

      const columnsWithoutCard = currentColumns.map((column) => {
        if (column.id !== sourceColumnId) {
          return column
        }

        return {
          ...column,
          cards: column.cards.filter((card) => {
            if (card.id === cardId) {
              movedCard = card
              return false
            }
            return true
          }),
        }
      })

      if (!movedCard) {
        return currentColumns
      }

      return columnsWithoutCard.map((column) =>
        column.id === targetColumnId
          ? { ...column, cards: [...column.cards, movedCard] }
          : column,
      )
    })
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="hero-label">Project Board</p>
        <h1>Kanban Flow</h1>
        <p className="hero-subtitle">
          Focused, single-board planning with clear delivery status.
        </p>
      </header>

      <section className="board-count-strip" aria-label="Column card counts">
        {columns.map((column) => (
          <article
            key={column.id}
            className="board-count-item"
            data-testid={`summary-${column.id}`}
          >
            <p className="board-count-name">{column.name || 'Untitled'}</p>
            <p className="board-count-value" data-testid={`summary-count-${column.id}`}>
              {column.cards.length}
            </p>
          </article>
        ))}
      </section>

      <section className="kanban-board" aria-label="Kanban board">
        {columns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            index={index}
            onRename={handleRenameColumn}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            onCardDragStart={handleCardDragStart}
            onCardDrop={handleCardDrop}
          />
        ))}
      </section>
    </main>
  )
}

export default App
