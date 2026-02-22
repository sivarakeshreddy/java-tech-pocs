import { render, screen, fireEvent } from '@testing-library/react'
import Board from './Board'
import { dummyBoard } from '../data/dummyData'

describe('Board', () => {
  it('renders board with columns and cards from dummy data', () => {
    render(<Board />)
    expect(screen.getByText('Kanban Board')).toBeInTheDocument()
    dummyBoard.columns.forEach((col) => {
      expect(screen.getByText(col.title)).toBeInTheDocument()
    })
    expect(screen.getByText('Design landing page')).toBeInTheDocument()
  })

  it('adds card when add button is clicked in a column', () => {
    render(<Board />)
    const addButtons = screen.getAllByRole('button', { name: '+ Add card' })
    fireEvent.click(addButtons[0])
    expect(screen.getByText('New card')).toBeInTheDocument()
  })

  it('deletes card when delete button is clicked', () => {
    render(<Board />)
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete card' })
    const firstCardTitle = 'Design landing page'
    expect(screen.getByText(firstCardTitle)).toBeInTheDocument()
    fireEvent.click(deleteButtons[0])
    expect(screen.queryByText(firstCardTitle)).not.toBeInTheDocument()
  })

  it('renames column when title is edited', () => {
    render(<Board />)
    fireEvent.click(screen.getByText('To Do'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Updated Column' } })
    fireEvent.blur(input)
    expect(screen.getByText('Updated Column')).toBeInTheDocument()
    expect(screen.queryByText('To Do')).not.toBeInTheDocument()
  })
})
