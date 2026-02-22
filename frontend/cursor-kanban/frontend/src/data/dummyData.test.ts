import { describe, it, expect } from 'vitest'
import { dummyBoard } from './dummyData'

describe('dummyData', () => {
  it('has 5 columns', () => {
    expect(dummyBoard.columns).toHaveLength(5)
  })

  it('has unique column ids', () => {
    const ids = dummyBoard.columns.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has cards with matching cardIds in columns', () => {
    const allCardIds = dummyBoard.columns.flatMap((c) => c.cardIds)
    allCardIds.forEach((id) => {
      expect(dummyBoard.cards[id]).toBeDefined()
    })
  })

  it('each card has id, title, details', () => {
    Object.values(dummyBoard.cards).forEach((card) => {
      expect(card).toHaveProperty('id')
      expect(card).toHaveProperty('title')
      expect(card).toHaveProperty('details')
    })
  })
})
