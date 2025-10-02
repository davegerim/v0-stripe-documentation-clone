import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YagoutPay Documentation',
  description: 'Complete integration guides for YagoutPay payment processing across Flutter, React Native, JavaScript, Laravel, Node.js, Java, WordPress, and WooCommerce.',
  generator: 'YagoutPay',
  icons: {
    icon: 'https://yagoutpay.com/wp-content/uploads/2024/03/finflow-favicon-1.png',
    shortcut: 'https://yagoutpay.com/wp-content/uploads/2024/03/finflow-favicon-1.png',
    apple: 'https://yagoutpay.com/wp-content/uploads/2024/03/finflow-favicon-1.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
