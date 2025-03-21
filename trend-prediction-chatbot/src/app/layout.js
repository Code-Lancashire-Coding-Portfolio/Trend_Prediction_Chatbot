import './globals.css'

export const metadata = {
  title: 'Business Trends Predictor',
  description: 'Predict business trends using public data sources',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-logo-blue">{children}</body>
    </html>
  )
}