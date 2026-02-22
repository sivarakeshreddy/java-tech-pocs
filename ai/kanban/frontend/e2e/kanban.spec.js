import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('loads a single board with five columns and seed data', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Kanban Flow' })).toBeVisible()
  await expect(page.locator('[data-testid^="column-col-"]')).toHaveCount(5)
  await expect(page.locator('[data-testid^="summary-col-"]')).toHaveCount(5)
  await expect(page.getByTestId('summary-count-col-backlog')).toHaveText('2')
  await expect(page.getByText('Create landing concept')).toBeVisible()
})

test('renames a column name inline', async ({ page }) => {
  const firstColumnName = page.getByLabel('Column 1 name')
  await firstColumnName.fill('Intake')
  await expect(firstColumnName).toHaveValue('Intake')
})

test('adds then deletes a card from a column', async ({ page }) => {
  const todoColumn = page.getByTestId('column-col-todo')
  await todoColumn.getByRole('button', { name: 'Add card' }).click()
  await todoColumn.getByLabel('Card title').fill('Release QA sweep')
  await todoColumn
    .getByLabel('Card details')
    .fill('Run browser checks before launch and note any blockers.')
  await todoColumn.getByRole('button', { name: 'Save card' }).click()

  const createdCard = todoColumn.locator('.kanban-card', {
    hasText: 'Release QA sweep',
  })
  await expect(createdCard).toBeVisible()
  await createdCard.getByRole('button', { name: 'Delete' }).click()
  await expect(todoColumn.getByText('Release QA sweep')).toHaveCount(0)
})

test('drags a card between columns', async ({ page }) => {
  const card = page.getByTestId('card-c1')
  const targetDropzone = page.getByTestId('dropzone-col-review')
  await expect(page.getByTestId('summary-count-col-backlog')).toHaveText('2')
  await expect(page.getByTestId('summary-count-col-review')).toHaveText('1')
  await card.dragTo(targetDropzone)

  await expect(
    page.getByTestId('column-col-review').getByText('Create landing concept'),
  ).toBeVisible()
  await expect(
    page.getByTestId('column-col-backlog').getByText('Create landing concept'),
  ).toHaveCount(0)
  await expect(page.getByTestId('summary-count-col-backlog')).toHaveText('1')
  await expect(page.getByTestId('summary-count-col-review')).toHaveText('2')
})
