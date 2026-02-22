import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const createDataTransfer = () => {
  const dataStore = {}
  return {
    data: dataStore,
    dropEffect: 'move',
    effectAllowed: 'all',
    files: [],
    items: [],
    types: [],
    clearData: () => {
      Object.keys(dataStore).forEach((key) => delete dataStore[key])
    },
    getData: (key) => dataStore[key] || '',
    setData: (key, value) => {
      dataStore[key] = value
    },
    setDragImage: () => {},
  }
}

describe('Kanban board', () => {
  test('renders five fixed columns with seed cards', () => {
    render(<App />)

    expect(screen.getAllByRole('textbox', { name: /column \d name/i })).toHaveLength(
      5,
    )
    expect(screen.getAllByTestId(/summary-col-/)).toHaveLength(5)
    expect(screen.getByTestId('summary-count-col-backlog')).toHaveTextContent('2')
    expect(screen.getByTestId('column-count-col-backlog')).toHaveTextContent('2')
    expect(screen.getByText('Create landing concept')).toBeInTheDocument()
    expect(screen.getByText('Kickoff planning')).toBeInTheDocument()
  })

  test('renames a column', async () => {
    const user = userEvent.setup()
    render(<App />)

    const firstColumnName = screen.getByRole('textbox', { name: 'Column 1 name' })
    await user.clear(firstColumnName)
    await user.type(firstColumnName, 'Intake')

    expect(firstColumnName).toHaveValue('Intake')
  })

  test('adds a card to a column', async () => {
    const user = userEvent.setup()
    render(<App />)

    const todoColumn = screen.getByTestId('column-col-todo')
    await user.click(within(todoColumn).getByRole('button', { name: 'Add card' }))
    await user.type(within(todoColumn).getByLabelText('Card title'), 'QA sweep')
    await user.type(
      within(todoColumn).getByLabelText('Card details'),
      'Run the test checklist before release.',
    )
    await user.click(within(todoColumn).getByRole('button', { name: 'Save card' }))

    expect(within(todoColumn).getByText('QA sweep')).toBeInTheDocument()
  })

  test('deletes a card', async () => {
    const user = userEvent.setup()
    render(<App />)

    const reviewCard = screen.getByTestId('card-c5')
    await user.click(within(reviewCard).getByRole('button', { name: 'Delete' }))

    expect(screen.queryByTestId('card-c5')).not.toBeInTheDocument()
  })

  test('moves a card between columns by drag and drop', () => {
    render(<App />)

    const dragCard = screen.getByTestId('card-c1')
    const targetDropzone = screen.getByTestId('dropzone-col-review')
    const dataTransfer = createDataTransfer()

    expect(screen.getByTestId('summary-count-col-backlog')).toHaveTextContent('2')
    expect(screen.getByTestId('summary-count-col-review')).toHaveTextContent('1')

    fireEvent.dragStart(dragCard, { dataTransfer })
    fireEvent.dragOver(targetDropzone, { dataTransfer })
    fireEvent.drop(targetDropzone, { dataTransfer })

    const reviewColumn = screen.getByTestId('column-col-review')
    const backlogColumn = screen.getByTestId('column-col-backlog')

    expect(within(reviewColumn).getByText('Create landing concept')).toBeInTheDocument()
    expect(
      within(backlogColumn).queryByText('Create landing concept'),
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('summary-count-col-backlog')).toHaveTextContent('1')
    expect(screen.getByTestId('summary-count-col-review')).toHaveTextContent('2')
  })
})
