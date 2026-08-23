/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/row-append.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/row-append.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */

/**
 * Google Sheets row — Append a row to a Google Sheet.
 *
 * https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleSheetsMeta } from "../service.js";

export const GOOGLE_SHEETS_ROW_KIND = "@particle-academy/google_sheets_row";
export const GOOGLE_SHEETS_ROW_OPERATION = "row_append";

export const GOOGLE_SHEETS_ROW_META = googleSheetsMeta("action", "append a row", "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_SHEETS_ROW_OUTPUT: OutputField[] = [
  {
    "path": "data.spreadsheetId",
    "type": "string",
    "description": "The spreadsheet that was written to."
  },
  {
    "path": "data.updates.updatedRange",
    "type": "string",
    "description": "The range Google actually wrote, in A1 notation. NOT the range that was asked for -- append finds the first empty row below it."
  },
  {
    "path": "data.updates.updatedRows",
    "type": "number",
    "description": "How many rows were added."
  },
  {
    "path": "data.updates.updatedCells",
    "type": "number",
    "description": "How many cells were written."
  }
];

export const googleSheetsRowKind: NodeKindDefinition = defineConnectorKind(GOOGLE_SHEETS_ROW_META, {
  name: GOOGLE_SHEETS_ROW_KIND,
  aliases: ["google_sheets_row"],
  label: "Google Sheets row",
  description: "Append a row to a Google Sheet.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: GOOGLE_SHEETS_ROW_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "spreadsheetId",
      "label": "Spreadsheet ID",
      "required": true,
      "description": "The long id from the sheet's URL: docs.google.com/spreadsheets/d/THIS_PART/edit."
    },
    {
      "type": "text",
      "key": "range",
      "label": "Range",
      "required": true,
      "default": "Sheet1!A:Z",
      "description": "Where to append, in A1 notation. Google finds the last row of this range and writes below it."
    },
    {
      "type": "text",
      "key": "values",
      "label": "Row values",
      "required": true,
      "description": "The cells of the row, comma separated. Left to right from the start of the range."
    },
    {
      "type": "select",
      "key": "valueInputOption",
      "label": "How to interpret the values",
      "default": "USER_ENTERED",
      "description": "USER_ENTERED parses the cells the way typing them would -- so =SUM(A1:A2) becomes a formula and 1/2/26 becomes a date. RAW stores exactly the characters given.",
      "options": [
        {
          "value": "USER_ENTERED",
          "label": "As if typed (formulas and dates parsed)"
        },
        {
          "value": "RAW",
          "label": "Exactly as given"
        }
      ]
    },
    {
      "type": "select",
      "key": "insertDataOption",
      "label": "When the range already has data below",
      "default": "INSERT_ROWS",
      "description": "INSERT_ROWS pushes existing rows down. OVERWRITE writes into them.",
      "options": [
        {
          "value": "INSERT_ROWS",
          "label": "Insert new rows"
        },
        {
          "value": "OVERWRITE",
          "label": "Overwrite what is there"
        }
      ]
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_SHEETS_ROW_META, config as Record<string, unknown>, "append a row"),
});
