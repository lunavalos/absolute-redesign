import React from 'react'
import type { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  description: 'Absolute Group Inc. Admin Management System',
  title: 'Absolute Group Inc.',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-icon.png',
    },
  ],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
