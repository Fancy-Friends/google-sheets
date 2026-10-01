/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/values-update.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/values-update.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */

/**
 * Write Google Sheets values — Overwrite the cell values of a range. Existing
 * values in that range are replaced, not pushed down.
 *
 * https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/update
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleSheetsMeta } from "../service.js";

export const GOOGLE_SHEETS_VALUES_UPDATE_KIND = "@particle-academy/google_sheets_values_update";
export const GOOGLE_SHEETS_VALUES_UPDATE_OPERATION = "values_update";

export const GOOGLE_SHEETS_VALUES_UPDATE_META = googleSheetsMeta("action", "write a range", "https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/update");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_SHEETS_VALUES_UPDATE_OUTPUT: OutputField[] = [
  {
    "path": "data.spreadsheetId",
    "type": "string",
    "description": "The spreadsheet that was written to."
  },
  {
    "path": "data.updatedRange",
    "type": "string",
    "description": "The range Google actually wrote, in A1 notation."
  },
  {
    "path": "data.updatedRows",
    "type": "number",
    "description": "How many rows had at least one cell updated."
  },
  {
    "path": "data.updatedColumns",
    "type": "number",
    "description": "How many columns had at least one cell updated."
  },
  {
    "path": "data.updatedCells",
    "type": "number",
    "description": "How many cells were written."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleSheetsValuesUpdateKind: NodeKindDefinition = defineConnectorKind(GOOGLE_SHEETS_VALUES_UPDATE_META, {
  name: GOOGLE_SHEETS_VALUES_UPDATE_KIND,
  aliases: ["google_sheets_values_update"],
  label: "Write Google Sheets values",
  description: "Overwrite the cell values of a range. Existing values in that range are replaced, not pushed down.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "idempotent",
  outputShape: GOOGLE_SHEETS_VALUES_UPDATE_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "spreadsheetId",
      "label": "Spreadsheet ID",
      "required": true
    },
    {
      "type": "text",
      "key": "range",
      "label": "Range",
      "required": true,
      "default": "Sheet1!A1",
      "description": "In A1 notation. The values written fill this range from its top-left cell -- more rows or columns than the range covers are written anyway, following Google's own documented behavior; fewer leave the rest of the range untouched."
    },
    {
      "type": "text",
      "key": "values",
      "label": "Row values",
      "required": true,
      "description": "The cells to write, comma separated, left to right, one row. For more than one row, call this action once per row."
    },
    {
      "type": "select",
      "key": "valueInputOption",
      "label": "How to interpret the values",
      "required": true,
      "default": "USER_ENTERED",
      "description": "USER_ENTERED parses the cells the way typing them would -- so =SUM(A1:A2) becomes a formula. RAW stores exactly the characters given.",
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
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_SHEETS_VALUES_UPDATE_META, config as Record<string, unknown>, "write a range"),
});
