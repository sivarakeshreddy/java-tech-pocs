import type { Board } from '../types'

export const dummyBoard: Board = {
  columns: [
    { id: 'col-1', title: 'To Do', cardIds: ['card-1', 'card-2'] },
    { id: 'col-2', title: 'In Progress', cardIds: ['card-3', 'card-4'] },
    { id: 'col-3', title: 'Review', cardIds: ['card-5'] },
    { id: 'col-4', title: 'Done', cardIds: ['card-6', 'card-7'] },
    { id: 'col-5', title: 'Backlog', cardIds: ['card-8', 'card-9', 'card-10'] },
  ],
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Design landing page',
      details: 'Create wireframes and mockups for the new landing page.',
    },
    'card-2': {
      id: 'card-2',
      title: 'Setup CI pipeline',
      details: 'Configure GitHub Actions for build and test.',
    },
    'card-3': {
      id: 'card-3',
      title: 'Implement auth flow',
      details: 'Add login and logout with session handling.',
    },
    'card-4': {
      id: 'card-4',
      title: 'Database migrations',
      details: 'Write migration scripts for schema v2.',
    },
    'card-5': {
      id: 'card-5',
      title: 'API documentation',
      details: 'Update OpenAPI spec for new endpoints.',
    },
    'card-6': {
      id: 'card-6',
      title: 'Deploy to staging',
      details: 'Automated deployment via Terraform.',
    },
    'card-7': {
      id: 'card-7',
      title: 'Performance audit',
      details: 'Lighthouse scores and bundle analysis.',
    },
    'card-8': {
      id: 'card-8',
      title: 'Mobile responsive',
      details: 'Ensure layout works on all screen sizes.',
    },
    'card-9': {
      id: 'card-9',
      title: 'Error boundary',
      details: 'Add React error boundaries for graceful failures.',
    },
    'card-10': {
      id: 'card-10',
      title: 'Accessibility review',
      details: 'WCAG compliance and keyboard navigation.',
    },
  },
}
