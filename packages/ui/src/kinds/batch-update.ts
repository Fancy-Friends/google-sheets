/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/batch-update.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/batch-update.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */

/**
 * Batch update a Google Sheet — Apply a list of Google Sheet API requests to a
 * spreadsheet, all or none.
 *
 * https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleSheetsMeta } from "../service.js";

export const GOOGLE_SHEETS_BATCH_UPDATE_KIND = "@particle-academy/google_sheets_batch_update";
export const GOOGLE_SHEETS_BATCH_UPDATE_OPERATION = "batch_update";

export const GOOGLE_SHEETS_BATCH_UPDATE_META = googleSheetsMeta("action", "batch update a spreadsheet", "https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/batchUpdate");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_SHEETS_BATCH_UPDATE_OUTPUT: OutputField[] = [
  {
    "path": "data.spreadsheetId",
    "type": "string",
    "description": "The spreadsheet updated."
  },
  {
    "path": "data.replies",
    "type": "array",
    "description": "One reply per request, in order. Many kinds reply with an empty object."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleSheetsBatchUpdateKind: NodeKindDefinition = defineConnectorKind(GOOGLE_SHEETS_BATCH_UPDATE_META, {
  name: GOOGLE_SHEETS_BATCH_UPDATE_KIND,
  aliases: ["google_sheets_batch_update"],
  label: "Batch update a Google Sheet",
  description: "Apply a list of Google Sheet API requests to a spreadsheet, all or none.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: GOOGLE_SHEETS_BATCH_UPDATE_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "spreadsheetId",
      "label": "Spreadsheet ID",
      "required": true,
      "description": "The id in the spreadsheet's own URL."
    },
    {
      "type": "json",
      "key": "requests",
      "label": "Requests",
      "required": true,
      "description": "Google's Request objects, in order. Example: [{\"findReplace\":{\"find\":\"{{name}}\",\"replacement\":\"Ada\",\"allSheets\":true}}]."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_SHEETS_BATCH_UPDATE_META, config as Record<string, unknown>, "batch update a spreadsheet"),
});
