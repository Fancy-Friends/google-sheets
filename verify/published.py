"""
Google Sheets — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_google_sheets._fake import FakeValues, seed_for_call
from fancy_google_sheets.faker import respond

GOLDENS = [
    {
        "operation": "row_append",
        "config": {},
        "expected": {
            "spreadsheetId": "1Sheet_fake_35fe3d32b958",
            "tableRange": "Sheet1!A1:D4",
            "updates": {
                "spreadsheetId": "1Sheet_fake_35fe3d32b958",
                "updatedRange": "Sheet1!A5:D5",
                "updatedRows": 1,
                "updatedColumns": 4,
                "updatedCells": 4,
            },
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-google-sheets")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("google_sheets", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
