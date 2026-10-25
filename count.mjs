// node count.mjs <url>: how many times the page's static body is serialized into the document's flight data.
const url = process.argv[2] ?? "http://localhost:3000/"
const response = await fetch(url)
const html = await response.text()

let flight = ""
for (const match of html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)) flight += JSON.parse(match[1])

const count = (text) => flight.split(text).length - 1
console.log(url)
console.log(`  x-nextjs-postponed: ${response.headers.get("x-nextjs-postponed") ?? "-"}`)
console.log(`  document: ${html.length} chars, flight data: ${flight.length} chars`)
console.log(`  STATIC_SHELL_MARKER in flight: ${count("STATIC_SHELL_MARKER")}x, STATIC_ITEM_299: ${count("STATIC_ITEM_299")}x, DYNAMIC_MARKER: ${count("DYNAMIC_MARKER")}x`)
