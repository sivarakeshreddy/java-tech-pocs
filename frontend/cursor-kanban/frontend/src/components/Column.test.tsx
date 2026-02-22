import { render, screen, fireEvent } from '@testing-library/react'
import type { ReactNode } from 'react'
import { DndContext } from '@dnd-kit/core'
import Column from './Column'

const column = {
  id: 'col-1',
  title: 'To Do',
  cardIds: ['card-1'],
}

const cards = [
  { id: 'card-1', title: 'Task 1', details: 'Details 1' },
]

function wrap(children: ReactNode) {
  return (
    <DndContext onDragEnd={() => {}} onDragStart={() => {}}>
      {children}
    </DndContext>
  )
}

describe('Column', () => {
  it('renders column title and cards', () => {
    render(
      wrap(
        <Column
          column={column}
          cards={cards}
          onAddCard={() => {}}
          onDeleteCard={() => {}}
          onRenameColumn={() => {}}
        />
      )
    )
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('Task 1')).toBeInTheDocument()
  })

  it('calls onAddCard when add button is clicked', () => {
    const onAddCard = vi.fn()
    render(
      wrap(
        <Column
          column={column}
          cards={cards}
          onAddCard={onAddCard}
          onDeleteCard={() => {}}
          onRenameColumn={() => {}}
        />
      )
    )
    fireEvent.click(screen.getByRole('button', { name: '+ Add card' }))
    expect(onAddCard).toHaveBeenCalledWith('col-1')
  })

  it('calls onRenameColumn when title is edited', async () => {
    const onRenameColumn = vi.fn()
    render(
      wrap(
        <Column
          column={column}
          cards={cards}
          onAddCard={() => {}}
          onDeleteCard={() => {}}
          onRenameColumn={onRenameColumn}
        />
      )
    )
    fireEvent.click(screen.getByText('To Do'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Title' } })
    fireEvent.blur(input)
    expect(onRenameColumn).toHaveBeenCalledWith('col-1', 'New Title')
  })
})
