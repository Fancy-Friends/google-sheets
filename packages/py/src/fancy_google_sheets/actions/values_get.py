# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/values-get.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/values-get.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_sheets

"""Read the cell values of a range.

GET /v4/spreadsheets/{spreadsheetId}/values/{range} —
https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Sheets or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "values_get"
METHOD = "GET"
PATH = "/v4/spreadsheets/{spreadsheetId}/values/{range}"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the form body for one call, failing loudly and specifically."""
    if config.get("spreadsheetId") is None or config.get("spreadsheetId") == "":
        raise ConnectorConfigError(
            "values_get: \"spreadsheetId\" is required (Spreadsheet ID)."
        )

    if config.get("range") is None or config.get("range") == "":
        raise ConnectorConfigError(
            "values_get: \"range\" is required (Range)."
        )

    out: dict[str, Any] = {}
    _value = config.get("valueRenderOption")
    if _value is not None and _value != "":
        out["valueRenderOption"] = str(_value)
    _value = config.get("majorDimension")
    if _value is not None and _value != "":
        out["majorDimension"] = str(_value)

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
        + "/values/"
        + quote(str(config.get("range") or ""), safe="")
    )

def values_get(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Read the cell values of a range."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        form=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
