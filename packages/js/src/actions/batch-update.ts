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
 * Apply a list of Google Sheet API requests to a spreadsheet, all or none.
 *
 * POST /v4/spreadsheets/{spreadsheetId}:batchUpdate —
 * https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
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

export const BATCH_UPDATE_OPERATION = "batch_update";

export type BatchUpdateOptions = {
  /** The node's resolved config. Keys: spreadsheetId, requests. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleSheetsBatchUpdate(options: BatchUpdateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.spreadsheetId === undefined || config.spreadsheetId === null || config.spreadsheetId === "") {
    throw new Error(`batch_update: "spreadsheetId" is required (Spreadsheet ID).`);
  }

  if (config.requests === undefined || config.requests === null || config.requests === "") {
    throw new Error(`batch_update: "requests" is required (Requests).`);
  }
  if (typeof config.requests === "string" && config.requests !== "") {
    try {
      JSON.parse(config.requests);
    } catch (error) {
      throw new Error(`batch_update: "requests" must be JSON: ${(error as Error).message}`);
    }
  }

  return callConnector(GOOGLE_SHEETS, {
    operation: BATCH_UPDATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/v4/spreadsheets/${encodeURIComponent(String(config.spreadsheetId))}:batchUpdate`,
      json: {
        ...(config.requests !== undefined && config.requests !== null && config.requests !== "" ? { "requests": typeof config.requests === "string" ? JSON.parse(config.requests) : config.requests } : {}),
      },
    },
  });
}
