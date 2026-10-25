// PARTIAL_PREFETCHING=0 builds and serves the control from its own distDir, so both can run side by side.
const off = process.env.PARTIAL_PREFETCHING === "0"

export default {
  cacheComponents: true,
  partialPrefetching: !off,
  distDir: off ? ".next-off" : ".next"
}
