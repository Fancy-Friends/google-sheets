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
 * Overwrite the cell values of a range. Existing values in that range are
 * replaced, not pushed down.
 *
 * PUT /v4/spreadsheets/{spreadsheetId}/values/{range} —
 * https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/update
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

export const VALUES_UPDATE_OPERATION = "values_update";

export type ValuesUpdateOptions = {
  /** The node's resolved config. Keys: spreadsheetId, range, values, valueInputOption. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleSheetsValuesUpdate(options: ValuesUpdateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.spreadsheetId === undefined || config.spreadsheetId === null || config.spreadsheetId === "") {
    throw new Error(`values_update: "spreadsheetId" is required (Spreadsheet ID).`);
  }

  if (config.range === undefined || config.range === null || config.range === "") {
    throw new Error(`values_update: "range" is required (Range).`);
  }

  if (config.values === undefined || config.values === null || config.values === "") {
    throw new Error(`values_update: "values" is required (Row values).`);
  }

  if (config.valueInputOption === undefined || config.valueInputOption === null || config.valueInputOption === "") {
    throw new Error(`values_update: "valueInputOption" is required (How to interpret the values).`);
  }

  return callConnector(GOOGLE_SHEETS, {
    operation: VALUES_UPDATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "PUT",
      path: `/v4/spreadsheets/${encodeURIComponent(String(config.spreadsheetId))}/values/${encodeURIComponent(String(config.range))}`,
      json: {
        "values": [valuesList(config.values)],
      },
      query: {
        "valueInputOption": String(config.valueInputOption),
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
