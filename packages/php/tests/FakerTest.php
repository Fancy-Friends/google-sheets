<?php

declare(strict_types=1);

use ParticleAcademy\GoogleSheets\GoogleSheetsFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */
/**
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('row_append fakes the shape Google Sheets publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('google_sheets', 'row_append', $config));

    $faked = GoogleSheetsFaker::respond('row_append', ['config' => $config, 'fake' => $fake]);

    expect($faked)->toBe([
        'spreadsheetId' => '1Sheet_fake_35fe3d32b958',
        'tableRange' => 'Sheet1!A1:D4',
        'updates' => [
            'spreadsheetId' => '1Sheet_fake_35fe3d32b958',
            'updatedRange' => 'Sheet1!A5:D5',
            'updatedRows' => 1,
            'updatedColumns' => 4,
            'updatedCells' => 4,
        ],
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('google_sheets', 'no_such_operation', []));

    expect(fn () => GoogleSheetsFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
