import { test, expect } from '@playwright/test'

test.describe('Kanban Board', () => {
  test('loads with dummy data', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Kanban Board' })).toBeVisible()
    await expect(page.getByText('To Do')).toBeVisible()
    await expect(page.getByText('Design landing page')).toBeVisible()
  })

  test('adds card to column', async ({ page }) => {
    await page.goto('/')
    const addButtons = page.getByRole('button', { name: '+ Add card' })
    await addButtons.first().click()
    await expect(page.getByText('New card')).toBeVisible()
  })

  test('deletes card', async ({ page }) => {
    await page.goto('/')
    const cardTitle = 'Design landing page'
    await expect(page.getByText(cardTitle)).toBeVisible()
    const deleteBtn = page.getByRole('button', { name: 'Delete card' }).first()
    await deleteBtn.click()
    await expect(page.getByText(cardTitle)).not.toBeVisible()
  })

  test('deletes second card in column', async ({ page }) => {
    await page.goto('/')
    const cardTitle = 'Setup CI pipeline'
    await expect(page.getByText(cardTitle)).toBeVisible()
    const toDoColumn = page.getByTestId('column-col-1')
    const deleteBtn = toDoColumn.getByRole('button', { name: 'Delete card' }).nth(1)
    await deleteBtn.click()
    await expect(page.getByText(cardTitle)).not.toBeVisible()
  })

  test('renames column', async ({ page }) => {
    await page.goto('/')
    await page.getByText('To Do').first().click()
    const input = page.getByRole('textbox')
    await input.fill('Updated')
    await input.blur()
    await expect(page.getByText('Updated')).toBeVisible()
  })

  test('drags card to another column', async ({ page }) => {
    await page.goto('/')
    const handle = page.getByTestId('drag-handle-card-1')
    const inProgressColumn = page.getByTestId('column-col-2')
    await handle.dragTo(inProgressColumn)
    const inProgressSection = page.getByTestId('column-col-2')
    await expect(inProgressSection.getByText('Design landing page')).toBeVisible()
  })

  test('drags card within same column', async ({ page }) => {
    await page.goto('/')
    const backlogColumn = page.getByTestId('column-col-5')
    const firstHandle = backlogColumn.getByTestId('drag-handle-card-8')
    const secondCard = backlogColumn.getByTestId('card-card-9')
    await firstHandle.dragTo(secondCard)
    await expect(backlogColumn.getByText('Mobile responsive')).toBeVisible()
  })
})
