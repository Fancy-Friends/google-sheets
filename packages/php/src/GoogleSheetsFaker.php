<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleSheets;

use ParticleAcademy\Connectors\FakeRequest;

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
 * The Google Sheets faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class GoogleSheetsFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'row_append' => self::RowAppend($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'google_sheets: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function RowAppend(array $config, mixed $fake): array
    {
        $boundSpreadsheetid = ((($v = $config['spreadsheetId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->id('1Sheet'));

        return [
        'spreadsheetId' => $boundSpreadsheetid,
        'tableRange' => 'Sheet1!A1:D4',
        'updates' => [
            'spreadsheetId' => $boundSpreadsheetid,
            'updatedRange' => 'Sheet1!A5:D5',
            'updatedRows' => 1,
            'updatedColumns' => 4,
            'updatedCells' => 4,
        ],
    ];
    }
}
