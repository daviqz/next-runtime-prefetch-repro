import { Suspense } from "react"
import { connection } from "next/server"

// A static body large enough to see in the payload, and one dynamic hole so the document is postponed.
const items = Array.from({ length: 300 }, (_, i) => `STATIC_ITEM_${i}`)

export default function Page() {
  return (
    <main>
      <h1>STATIC_SHELL_MARKER</h1>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <Suspense fallback={<p>Loading</p>}>
        <Dynamic />
      </Suspense>
    </main>
  )
}

async function Dynamic() {
  await connection()
  return <p>DYNAMIC_MARKER</p>
}
