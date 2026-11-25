# ops-ui

Reusable React components and design tokens for Ops Universe. Developer Preview, not published to npm.

```sh
npm ci
npm test
```

Import from a reviewed local checkout or pinned Git revision after installing dependencies. Import `@ops-universe/ui/styles.css` alongside components. React 18/19 peer dependency. Theme provider supports system/light/dark, persisted preference and reduced-motion CSS. Header, Hero, Card, Footer and native button/link controls are included; native modal search, responsive navigation, feature cards, code/terminal components, documentation layout and ordered process steps are included in this phase. Browser and accessibility CI is configured; package publication remains pending. The npm-generated lockfile is committed; CI uses npm ci and an audit gate.

## Component showcase

Run `npm run showcase` to explore components and all project palettes locally. Run `npm run typecheck`, `npm run build:showcase`, `npx playwright install chromium`, and `npm run test:browser` for verification. Search uses a caller-provided local index; no network requests. Motion is opt-in and respects reduced motion.

Dependency security: CI fails on high or critical npm audit findings. This is a dependency advisory check, not a full security certification.

## Shared browser acceptance helpers

`browser/helpers.mjs` provides test-only navigation, horizontal-overflow, scoped axe and console/page-error assertions. Use from a pinned reviewed checkout with its existing locked Playwright dependencies. Observe errors before navigation and dispose listeners in finally; assertions must be called after the tested interactions. Keep product-specific scenarios and selectors in the consumer repository. Helpers are not a published runtime package and do not establish complete accessibility conformance, live site health or security certification. First validation target is the UI showcase; product integration remains a separate pilot.
