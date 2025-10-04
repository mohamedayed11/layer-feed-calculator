import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Layer Feed Calculator</h1>
      <p>Open the calculator below:</p>
      <Link href="/calculator">Go to /calculator →</Link>
    </main>
  )
}
