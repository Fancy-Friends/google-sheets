/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */

/**
 * Google Sheets, as one service descriptor shared by every Google Sheets
 * operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Google Sheets: its base URL, its
 * auth scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Google has no sandbox for Sheets. A test spreadsheet is a real one in a real
 * Drive, so every append is real -- point this at a scratch sheet, not a
 * production one. The faker is the only way to develop against it without
 * touching a document.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { googleSheetsFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const GOOGLE_SHEETS_BASE_URLS = {
  "live": "https://sheets.googleapis.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const GOOGLE_SHEETS_REQUIRES = [
  "accessToken",
  "refreshToken",
  "clientId",
  "clientSecret"
] as const;

/**
 * Apply Google Sheets's auth scheme to an outgoing request.
 *
 *
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function googleSheetsAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;
}

/** The Google Sheets service, for the TypeScript runtime. */
export const GOOGLE_SHEETS: ServiceDescriptor = {
  service: "google_sheets",
  title: "Google Sheets",
  sandbox: "none",
  baseUrls: { ...GOOGLE_SHEETS_BASE_URLS },
  requires: [...GOOGLE_SHEETS_REQUIRES],
  authorize: googleSheetsAuthorize,
  faker: googleSheetsFaker,
};
