<?php

declare(strict_types=1);

/*
 * Google Sheets — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/google-sheets-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\GoogleSheets\GoogleSheetsFaker;

$goldens = [
    [
        'operation' => 'row_append',
        'config' => [],
        'expected' => [
            'spreadsheetId' => '1Sheet_fake_35fe3d32b958',
            'tableRange' => 'Sheet1!A1:D4',
            'updates' => [
                'spreadsheetId' => '1Sheet_fake_35fe3d32b958',
                'updatedRange' => 'Sheet1!A5:D5',
                'updatedRows' => 1,
                'updatedColumns' => 4,
                'updatedCells' => 4,
            ],
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('google_sheets', $operation, $config));
    $faked = GoogleSheetsFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
