import React from 'react'

export const metadata = {
    title: 'Hoit Wong',
    description: 'An interesting Guy',
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
