# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/batch-update.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/batch-update.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_sheets

"""Apply a list of Google Sheet API requests to a spreadsheet, all or none.

POST /v4/spreadsheets/{spreadsheetId}:batchUpdate —
https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/batchUpdate

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Sheets or calls the faker.
"""

from __future__ import annotations

import json
from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "batch_update"
METHOD = "POST"
PATH = "/v4/spreadsheets/{spreadsheetId}:batchUpdate"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("spreadsheetId") is None or config.get("spreadsheetId") == "":
        raise ConnectorConfigError(
            "batch_update: \"spreadsheetId\" is required (Spreadsheet ID)."
        )

    _requests = config.get("requests")
    if _requests is None or _requests == "":
        raise ConnectorConfigError(
            "batch_update: \"requests\" is required (Requests)."
        )
    if isinstance(_requests, str) and _requests != "":
        try:
            json.loads(_requests)
        except ValueError as _error:
            raise ConnectorConfigError(
                "batch_update: \"requests\" must be JSON: "
                f"{_error}"
            ) from _error

    out: dict[str, Any] = {}
    _value = config.get("requests")
    if _value is not None and _value != "":
        out["requests"] = json.loads(_value) if isinstance(_value, str) else _value

    return out



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/v4/spreadsheets/"
        + quote(str(config.get("spreadsheetId") or ""), safe="")
        + ":batchUpdate"
    )

def batch_update(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Apply a list of Google Sheet API requests to a spreadsheet, all or none."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
