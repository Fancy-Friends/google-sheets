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
 * Append a row to a Google Sheet.
 *
 * POST /v4/spreadsheets/{spreadsheetId}/values/{range}:append —
 * https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Google Sheets or calls the
 * faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_SHEETS } from "../service.js";

export const ROW_APPEND_OPERATION = "row_append";

export type RowAppendOptions = {
  /** The node's resolved config. Keys: spreadsheetId, range, values, valueInputOption, insertDataOption. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleSheetsRowAppend(options: RowAppendOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.spreadsheetId === undefined || config.spreadsheetId === null || config.spreadsheetId === "") {
    throw new Error(`row_append: "spreadsheetId" is required (Spreadsheet ID).`);
  }

  if (config.range === undefined || config.range === null || config.range === "") {
    throw new Error(`row_append: "range" is required (Range).`);
  }

  if (config.values === undefined || config.values === null || config.values === "") {
    throw new Error(`row_append: "values" is required (Row values).`);
  }

  return callConnector(GOOGLE_SHEETS, {
    operation: ROW_APPEND_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/v4/spreadsheets/${encodeURIComponent(String(config.spreadsheetId))}/values/${encodeURIComponent(String(config.range))}:append`,
      json: {
        "values": [valuesList(config.values)],
      },
      query: {
        ...(config.valueInputOption !== undefined && config.valueInputOption !== null && config.valueInputOption !== "" ? { "valueInputOption": String(config.valueInputOption) } : {}),
        ...(config.insertDataOption !== undefined && config.insertDataOption !== null && config.insertDataOption !== "" ? { "insertDataOption": String(config.insertDataOption) } : {}),
      },
    },
  });
}

/** One value, a ","-separated string, or an array — all end up a list. */
function valuesList(value: unknown): string[] {
  const items = Array.isArray(value)
    ? value.map(String)
    : typeof value === "string"
      ? value.split(",")
      : [];

  return items.map((item) => item.trim()).filter(Boolean);
}
