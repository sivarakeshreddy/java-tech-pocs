export type Card = {
  id: string
  title: string
  details?: string
}

export type Column = {
  id: string
  title: string
  cards: Card[]
}

const sample: Column[] = [
  { id: 'col-1', title: 'Backlog', cards: [ { id: 'c-1', title: 'Design header' }, { id: 'c-2', title: 'Write spec' } ] },
  { id: 'col-2', title: 'Todo', cards: [ { id: 'c-3', title: 'Set up project' } ] },
  { id: 'col-3', title: 'In Progress', cards: [ { id: 'c-4', title: 'Implement board' } ] },
  { id: 'col-4', title: 'Review', cards: [] },
  { id: 'col-5', title: 'Done', cards: [ { id: 'c-5', title: 'MVP planning' } ] }
]

export default sample
