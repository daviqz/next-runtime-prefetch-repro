# Partial Prefetching serializes a postponed page's shell twice

With `cacheComponents` and `partialPrefetching`, every postponed document carries its route's shell twice in
its flight data. The second copy is the runtime prefetch that the server embeds in the initial RSC payload
(the root payload's `p` field). With `partialPrefetching: false`, `p` is `$undefined` and the document carries one copy.

`app/page.jsx` has a static body (a heading and 300 list items) and one dynamic hole (`connection()` under
`<Suspense>`), so the document is postponed.

## Steps

```bash
npm install
npm run build        # partialPrefetching: true  -> .next
npm run build:off    # partialPrefetching: false -> .next-off
npm start            # :3000, in one terminal
npm run start:off    # :3001, in another
npm run count
```

## Result (next 16.4.3, react 19.2.8; 16.5.0-canary.27 embeds the same stream)

```
http://localhost:3000/
  x-nextjs-postponed: 1
  document: 57051 chars, flight data: 39196 chars
  STATIC_SHELL_MARKER in flight: 2x, STATIC_ITEM_299: 2x, DYNAMIC_MARKER: 1x
http://localhost:3001/
  x-nextjs-postponed: 1
  document: 33195 chars, flight data: 19597 chars
  STATIC_SHELL_MARKER in flight: 1x, STATIC_ITEM_299: 1x, DYNAMIC_MARKER: 1x
```

The root row reads `"p":"$114"` with the option on, and row `114` is the stream that holds the second copy. With
the option off, the root row reads `"p":"$undefined"`.
