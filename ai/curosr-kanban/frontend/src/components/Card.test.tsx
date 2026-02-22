import { render, screen, fireEvent } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  const card = {
    id: 'card-1',
    title: 'Test card',
    details: 'Test details',
  }

  it('renders title and details', () => {
    render(<Card card={card} onDelete={() => {}} />)
    expect(screen.getByText('Test card')).toBeInTheDocument()
    expect(screen.getByText('Test details')).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn()
    render(<Card card={card} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('button', { name: 'Delete card' }))
    expect(onDelete).toHaveBeenCalledWith('card-1')
  })
})
