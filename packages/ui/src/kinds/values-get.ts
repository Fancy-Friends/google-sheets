/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/values-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/values-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */

/**
 * Read Google Sheets values — Read the cell values of a range.
 *
 * https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleSheetsMeta } from "../service.js";

export const GOOGLE_SHEETS_VALUES_GET_KIND = "@particle-academy/google_sheets_values_get";
export const GOOGLE_SHEETS_VALUES_GET_OPERATION = "values_get";

export const GOOGLE_SHEETS_VALUES_GET_META = googleSheetsMeta("action", "read a range", "https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_SHEETS_VALUES_GET_OUTPUT: OutputField[] = [
  {
    "path": "data.range",
    "type": "string",
    "description": "The range actually covered -- may be smaller than what was asked for; Google excludes empty trailing rows and columns."
  },
  {
    "path": "data.majorDimension",
    "type": "string",
    "description": "Echoes what was asked, or ROWS by default."
  },
  {
    "path": "data.values",
    "type": "array",
    "description": "Rows of cells -- an array of arrays. One row is [[a, b, c]], the same shape row_append sends. Absent entirely when the range is empty."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleSheetsValuesGetKind: NodeKindDefinition = defineConnectorKind(GOOGLE_SHEETS_VALUES_GET_META, {
  name: GOOGLE_SHEETS_VALUES_GET_KIND,
  aliases: ["google_sheets_values_get"],
  label: "Read Google Sheets values",
  description: "Read the cell values of a range.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: GOOGLE_SHEETS_VALUES_GET_OUTPUT,
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
      "description": "In A1 notation, the same shape row_append accepts."
    },
    {
      "type": "select",
      "key": "valueRenderOption",
      "label": "How to render values",
      "default": "FORMATTED_VALUE",
      "options": [
        {
          "value": "FORMATTED_VALUE",
          "label": "Formatted, as shown in the sheet (e.g. \"$1.50\", \"10/1/2026\")"
        },
        {
          "value": "UNFORMATTED_VALUE",
          "label": "The underlying number or string, no formatting applied"
        },
        {
          "value": "FORMULA",
          "label": "The formula text itself, for a cell that has one"
        }
      ]
    },
    {
      "type": "select",
      "key": "majorDimension",
      "label": "Rows or columns",
      "default": "ROWS",
      "description": "Whether the outer array of the result is rows or columns.",
      "options": [
        {
          "value": "ROWS",
          "label": "Rows"
        },
        {
          "value": "COLUMNS",
          "label": "Columns"
        }
      ]
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_SHEETS_VALUES_GET_META, config as Record<string, unknown>, "read a range"),
});
