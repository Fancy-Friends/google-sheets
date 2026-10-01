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
 * Read the cell values of a range.
 *
 * GET /v4/spreadsheets/{spreadsheetId}/values/{range} —
 * https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Google Sheets or calls the
 * faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_SHEETS } from "../service.js";

export const VALUES_GET_OPERATION = "values_get";

export type ValuesGetOptions = {
  /** The node's resolved config. Keys: spreadsheetId, range, valueRenderOption, majorDimension. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleSheetsValuesGet(options: ValuesGetOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.spreadsheetId === undefined || config.spreadsheetId === null || config.spreadsheetId === "") {
    throw new Error(`values_get: "spreadsheetId" is required (Spreadsheet ID).`);
  }

  if (config.range === undefined || config.range === null || config.range === "") {
    throw new Error(`values_get: "range" is required (Range).`);
  }

  return callConnector(GOOGLE_SHEETS, {
    operation: VALUES_GET_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/v4/spreadsheets/${encodeURIComponent(String(config.spreadsheetId))}/values/${encodeURIComponent(String(config.range))}`,
      query: {
        ...(config.valueRenderOption !== undefined && config.valueRenderOption !== null && config.valueRenderOption !== "" ? { "valueRenderOption": String(config.valueRenderOption) } : {}),
        ...(config.majorDimension !== undefined && config.majorDimension !== null && config.majorDimension !== "" ? { "majorDimension": String(config.majorDimension) } : {}),
      },
    },
  });
}
