import { render, screen } from '@testing-library/react'
import Card from '../components/Card'

describe('Card', () => {
  it('renders title and optional details', () => {
    render(<Card id="t1" title="Test card" details="More" />)
    expect(screen.getByText('Test card')).toBeInTheDocument()
    expect(screen.getByText('More')).toBeInTheDocument()
  })

  it('shows delete button when onDelete passed', () => {
    const fn = () => {}
    render(<Card id="t2" title="X" onDelete={fn} />)
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })
})
