/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { googleSheetsFaker } from "../src/faker.js";

test("row_append fakes the shape Google Sheets publishes", () => {
  const config = {};

  const faked = googleSheetsFaker("row_append", fakeRequest("google_sheets", "row_append", config));

  assert.deepEqual(faked, {
    "spreadsheetId": "1Sheet_fake_35fe3d32b958",
    "tableRange": "Sheet1!A1:D4",
    "updates": {
      "spreadsheetId": "1Sheet_fake_35fe3d32b958",
      "updatedRange": "Sheet1!A5:D5",
      "updatedRows": 1,
      "updatedColumns": 4,
      "updatedCells": 4
    }
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => googleSheetsFaker("no_such_operation", fakeRequest("google_sheets", "no_such_operation", {})), /no fake response/);
});
