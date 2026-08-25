/** @type {import('next').NextConfig} */
const nextConfig = {
  // The whole point of this app: it compiles the library's TypeScript
  // source directly (see the `../../src/...` imports in app/page.tsx), so
  // editing a component and saving is all it takes to see the change —
  // no `npm run build` in the parent package, no linking, no publishing.

  // Pin the workspace root here — the parent package's own lockfile would
  // otherwise make Next.js guess wrong since this app's source imports
  // reach outside this directory.
  turbopack: {
    root: require("path").join(__dirname, ".."),
  },
};

module.exports = nextConfig;
