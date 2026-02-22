import './globals.css'

export const metadata = {
  title: 'Kanban MVP',
  description: 'Single-board Kanban MVP'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-white text-gray-800 p-6">{children}</main>
      </body>
    </html>
  )
}
