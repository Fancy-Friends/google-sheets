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
 * The Google Sheets faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Google Sheets actually publishes, so an author can wire {{
 * $json.data.id }} against a fake and have it keep working against the real
 * thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeRowAppend({ config, fake }: FakeRequest): unknown {
  const boundSpreadsheetid = (config.spreadsheetId !== undefined && config.spreadsheetId !== null && config.spreadsheetId !== "" ? String(config.spreadsheetId) : fake.id("1Sheet"));

  return {
    "spreadsheetId": boundSpreadsheetid,
    "tableRange": "Sheet1!A1:D4",
    "updates": {
      "spreadsheetId": boundSpreadsheetid,
      "updatedRange": "Sheet1!A5:D5",
      "updatedRows": 1,
      "updatedColumns": 4,
      "updatedCells": 4,
    },
  };
}

export const googleSheetsFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "row_append":
      return fakeRowAppend(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `google_sheets: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
