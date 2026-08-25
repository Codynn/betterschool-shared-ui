# Playground

A tiny Next.js app for developing and eyeballing components in this
library — it imports directly from `../src`, not `../dist`, so there is
no build/link/publish step in the loop. Save a change in
`src/components/Navbar.tsx` and this app hot-reloads with it immediately.

## Use

```
cd playground
npm install   # first time only
npm run dev
```

Open http://localhost:3000.

## Adding a component to try out

1. Export it from `../src/index.ts`, same as `Navbar`.
2. Import and render it in `app/page.tsx`.

## When you're done

Once the component looks right here, commit and push as usual (`build`
in the parent package still produces the real `dist/` that consuming
apps pull from `github:Codynn/betterschool-shared-ui#main`) — this app
is only for local iteration, it isn't published.
