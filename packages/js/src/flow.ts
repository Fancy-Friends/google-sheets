/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ + triggers/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ + triggers/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */

/**
 * Google Sheets's node kinds with their TypeScript executors attached — for
 * hosts that EXECUTE on TS.
 *
 * The authoring surface in @particle-academy/google-sheets-ui carries no
 * executor: the editor is React on every host, so a PHP or Python project
 * installs the ui package and never this one.
 */

import type { NodeExecutor, NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import {
  idempotencyKeyFor,
  NO_IDEMPOTENCY_KEY_WARNING,
  resolveConnection,
  triggerEvent,
  type RequestedMode,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_SHEETS } from "./service.js";

import {
  googleSheetsRowKind,
  googleSheetsValuesGetKind,
  googleSheetsValuesUpdateKind,
} from "@particle-academy/google-sheets-ui";

import { googleSheetsRowAppend } from "./actions/row-append.js";
import { googleSheetsValuesGet } from "./actions/values-get.js";
import { googleSheetsValuesUpdate } from "./actions/values-update.js";

export const googleSheetsRowExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleSheetsRowAppend({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_sheets row_append ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleSheetsValuesGetExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleSheetsValuesGet({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_sheets values_get ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const googleSheetsValuesUpdateExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await googleSheetsValuesUpdate({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `google_sheets values_update ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

/** The kinds a TypeScript host registers. */
export const GOOGLE_SHEETS_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...googleSheetsRowKind, executor: googleSheetsRowExecutor },
  { ...googleSheetsValuesGetKind, executor: googleSheetsValuesGetExecutor },
  { ...googleSheetsValuesUpdateKind, executor: googleSheetsValuesUpdateExecutor },
];
