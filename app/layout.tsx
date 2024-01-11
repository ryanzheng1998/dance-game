import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wistron 嘉年华',
  description: '2024/01/21 Wistron 嘉年华的跳舞游戏',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
