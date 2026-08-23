# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- google_sheets

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_google_sheets._fake import FakeValues, seed_for_call
from fancy_google_sheets.faker import respond


def test_row_append_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_sheets", "row_append", config))

    faked = respond("row_append", {"config": config, "fake": fake})

    assert faked == {
        "spreadsheetId": "1Sheet_fake_35fe3d32b958",
        "tableRange": "Sheet1!A1:D4",
        "updates": {
            "spreadsheetId": "1Sheet_fake_35fe3d32b958",
            "updatedRange": "Sheet1!A5:D5",
            "updatedRows": 1,
            "updatedColumns": 4,
            "updatedCells": 4,
        },
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("google_sheets", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
