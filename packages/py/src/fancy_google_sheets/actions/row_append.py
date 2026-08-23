# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/row-append.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/row-append.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_sheets

"""Append a row to a Google Sheet.

POST /v4/spreadsheets/{spreadsheetId}/values/{range}:append —
https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Sheets or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "row_append"
METHOD = "POST"
PATH = "/v4/spreadsheets/{spreadsheetId}/values/{range}:append"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("spreadsheetId") is None or config.get("spreadsheetId") == "":
        raise ConnectorConfigError(
            "row_append: \"spreadsheetId\" is required (Spreadsheet ID)."
        )

    if config.get("range") is None or config.get("range") == "":
        raise ConnectorConfigError(
            "row_append: \"range\" is required (Range)."
        )

    if config.get("values") is None or config.get("values") == "":
        raise ConnectorConfigError(
            "row_append: \"values\" is required (Row values)."
        )

    out: dict[str, Any] = {}
    _value = config.get("values")
    out["values"] = [_values_list(config.get("values"))]

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
        + ":append"
    )


def query(config: dict[str, Any]) -> dict[str, Any]:
    """The QUERY parameters, which are not the same as the body.

    A POST can carry both. Sent in the body instead, a parameter like Sheets'
    `valueInputOption` is IGNORED and the provider falls back to its own
    default — so the request succeeds and quietly does the wrong thing.
    """
    out: dict[str, Any] = {}
    _value = config.get("valueInputOption")
    if _value is not None and _value != "":
        out["valueInputOption"] = str(_value)
    _value = config.get("insertDataOption")
    if _value is not None and _value != "":
        out["insertDataOption"] = str(_value)
    return out

def row_append(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Append a row to a Google Sheet."""
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


def _values_list(value: Any) -> list[str]:
    """One value, a ","-separated string, or a list — all end up a list."""
    if isinstance(value, list):
        items = [str(item) for item in value]
    elif isinstance(value, str):
        items = value.split(",")
    else:
        return []

    return [item.strip() for item in items if item.strip()]