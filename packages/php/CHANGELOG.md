# Changelog

All notable changes to `@particle-academy/google-sheets-ui`,
`@particle-academy/google-sheets-js`, `particle-academy/google-sheets-php` and
`fancy-google-sheets`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.3.1] — 2026-08-24

### Fixed

- **`@particle-academy/google-sheets-js` now accepts a RANGE of `@particle-academy/google-sheets-ui`, not one exact version.**

It peer-depended on `@particle-academy/google-sheets-ui` at exactly the release it shipped with. That is the
strict form of the thing the kit's own rule forbids — a first-party sibling gets
a range — and the same block applied the rule correctly to its other two
dependencies. It was this one pair that slipped.

What it cost: ship `@particle-academy/google-sheets-ui` with a fixed help string and every consumer on the
previous `@particle-academy/google-sheets-js` had an **unmet peer**, which npm 7+ errors on. A documentation
patch could not be delivered without a matching runtime release, and a routine
`npm update` that moved the ui package alone broke the install.

The coupling is real and is not being loosened away. The ui package emits the
config schema and the js package implements against it, so a ui that adds a
field to a js that ignores it is silently wrong. But a PATCH is non-additive by
definition and a MINOR is where a field can appear — so `>=0.3.1 <0.4.0` is the
coupling that actually exists rather than the strictest one expressible.

Nothing else changed. `particle-academy/google-sheets-php` and `fancy-google-sheets` are unaffected; neither has an
equivalent edge.

## [0.3.0] — 2026-08-24

### Added

- **The README now says how to SET THIS CONNECTOR UP**, in the package itself.

Until now it explained what the four packages are, what they cost and why the
repo is generated — and said nothing about credentials, scopes, sandboxes or
operations. Somebody who installed it could not learn from it which credentials
a connection needs, where a human GETS them, which scopes to request, or what
the connector can actually do. All of that was already in the definition; the
one document a consumer reads was the one that omitted everything actionable.

The new **Setting it up** section carries:

- every credential, with the text saying where the value comes from, whether it
  is **per installation** or **per connected account**, and whether it is secret;
- the OAuth authorize and token URLs and the exact scopes, verbatim;
- the access-token lifetime, and where refresh tokens ROTATE, the two things a
  host must not do — retry a failed refresh, or refresh concurrently — because a
  replay revokes the entire grant and nothing in the failure says why;
- the estate in this provider's own terms, including the cases where a
  successful-looking run reaches nobody, or reaches the real one;
- every action and trigger with its method, path, inputs, and whether it is safe
  to replay;
- a trigger's provider-side setup, which nobody can derive from anything else.

It is **generated from `provider/manifest.json`**, so it cannot drift from what
the packages do — which is the point at a few hundred providers, where a
hand-written setup section is a few hundred documents going quietly stale.

No code changed. This release exists because a registry and an installing agent
read the PUBLISHED artifact, and the artifact carried the old README.

## [0.2.0] — 2026-08-24

### Changed

- **`@particle-academy/google-sheets-ui` is now an OPTIONAL PEER dependency of `@particle-academy/google-sheets-js`, not a hard one.**

`./flow` needs it; nothing else does. It was a hard dependency, and because
`@particle-academy/google-sheets-ui` itself peer-depends on `fancy-flow` — which npm 7+ installs
automatically — `npm install @particle-academy/google-sheets-js` pulled the **entire flow engine**
onto disk for a consumer who only wanted to call the API. Roughly **18 MB
became 874 KB**, and the package works exactly as before:

```js
import { googleSheets… } from "@particle-academy/google-sheets-js";
// an injected transport, no flow engine anywhere
```

**This is breaking if you use `@particle-academy/google-sheets-js/flow`.** Add `@particle-academy/google-sheets-ui` to your own
dependencies — it was always being installed for you, and now it is declared.
Everything importing only the main entry point is unaffected.

The fix is on this edge rather than on `@particle-academy/google-sheets-ui` → `fancy-flow`: the ui package
genuinely requires fancy-flow, since it calls `defineConnectorKind`, and marking
that peer optional would be a lie about what it needs.

## [0.1.0] — 2026-08-23

First release. Provider eight, and the first Google connector.

### Added

- `row_append` — append a row to a sheet.
  `POST /v4/spreadsheets/{spreadsheetId}/values/{range}:append`.
- A faker for it, so the node runs on a canvas with no Google account.

### Config can go in the URL now

Every provider before this one sent a fixed path. Google Sheets needs **two
config values in the URL** and one **in the query of a POST**, so where a value
lands is declarable — `send.in: "path" | "query" | "body"` — and stays derived
when unstated.

**A path value is URL-encoded, in all three runtimes.** A range is
`Sheet1!A:B`; it contains `!`, and a sheet named `Q1/Q2` contains a slash.
Interpolated raw it changes *which URL is called*, and Google answers 404 about
a spreadsheet rather than about encoding — pointing at the sheet name instead of
at the interpolation.

The path template and the config are checked against each other, the same way a
GraphQL document and its variables are: a placeholder nothing fills, a field
naming no placeholder, and an optional path field are all refused at definition
time. A URL cannot have a hole in it.

### `valueInputOption` is in the QUERY, and that is not cosmetic

Sent in the body, Google **ignores it silently** and falls back to `RAW`. An
author who asked for `USER_ENTERED` then gets `=SUM(A1:A2)` stored as text that
looks like a formula and never calculates. Nothing errors.

### `values` is an array of ARRAYS

`ValueRange.values` is rows-of-cells, so a single row has to be wrapped:
`[["a", "b", "c"]]`. A flat array is rejected as the wrong type. That is
`encoding: "rows"`, and it is a different keyword from `array` by one word.

### The scope is the full `spreadsheets` one, deliberately

Not `drive.file`. `append` writes to a spreadsheet the user names by id, and
`drive.file` only reaches files **the app itself created** — so it would work
throughout testing, where the app made the sheet, and fail against the document
somebody actually wants to append to. Read from the discovery document's scopes
for this exact method.

### No sandbox, and no idempotency

`sandbox` is `none` — **checked**. Google has no test estate for Sheets: a test
spreadsheet is a real one in a real Drive, so every append is real.

`values.append` takes no idempotency key; the discovery document offers neither
a header nor a parameter for one. So it is `unsafe-to-replay` with no way to
make it safe, and a retried durable run appends a **second row**.

### Access tokens last one hour

Google's do. A connection that is never refreshed stops working within the day,
which is why `refreshToken` is required rather than optional — and Google only
issues one when the consent request asked for offline access.

[0.1.0]: https://github.com/Fancy-Friends/google-sheets/releases/tag/v0.1.0
[0.2.0]: https://github.com/Fancy-Friends/google-sheets/releases/tag/v0.2.0
[0.3.0]: https://github.com/Fancy-Friends/google-sheets/releases/tag/v0.3.0
[0.3.1]: https://github.com/Fancy-Friends/google-sheets/releases/tag/v0.3.1
