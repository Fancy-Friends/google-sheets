<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleSheets\Actions;

use ParticleAcademy\GoogleSheets\GoogleSheets;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/row-append.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/row-append.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */
/**
 * Append a row to a Google Sheet.
 *
 * POST /v4/spreadsheets/{spreadsheetId}/values/{range}:append —
 * https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Sheets or calls the faker.
 */
final class RowAppend
{
    public const OPERATION = 'row_append';
    public const METHOD = 'POST';
    public const PATH = '/v4/spreadsheets/{spreadsheetId}/values/{range}:append';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Google Sheets.
     *
     * @param array<string,mixed> $config
     * @return array<string,scalar>
     */
    public static function body(array $config): array
    {
        if (($config['spreadsheetId'] ?? null) === null || ($config['spreadsheetId'] ?? null) === '') {
            throw new ConnectorConfigException('row_append: "spreadsheetId" is required (Spreadsheet ID).');
        }

        if (($config['range'] ?? null) === null || ($config['range'] ?? null) === '') {
            throw new ConnectorConfigException('row_append: "range" is required (Range).');
        }

        if (($config['values'] ?? null) === null || ($config['values'] ?? null) === '') {
            throw new ConnectorConfigException('row_append: "values" is required (Row values).');
        }

        $body = [];

        $value = $config['values'] ?? null;
        $body['values'] = [self::valuesList($config['values'] ?? null)];

        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/v4/spreadsheets/'.rawurlencode((string) ($config['spreadsheetId'] ?? '')).'/values/'.rawurlencode((string) ($config['range'] ?? '')).':append';
    }

    /**
     * The QUERY parameters, which are not the same as the body.
     *
     * A POST can carry both. Sent in the body instead, a parameter like
     * Sheets' `valueInputOption` is IGNORED and the provider falls back to its
     * own default — so the request succeeds and does the wrong thing.
     *
     * @param array<string,mixed> $config
     * @return array<string,scalar>
     */
    public static function query(array $config): array
    {
        $body = [];

        $value = $config['valueInputOption'] ?? null;
        if ($value !== null && $value !== '') {
            $body['valueInputOption'] = (string) $value;
        }

        $value = $config['insertDataOption'] ?? null;
        if ($value !== null && $value !== '') {
            $body['insertDataOption'] = (string) $value;
        }

        return $body;
    }

    /** One value, a ,-separated string, or an array — all end up a list. @return list<string> */
    private static function valuesList(mixed $value): array
    {
        if (is_array($value)) {
            $items = array_map(static fn (mixed $item): string => (string) $item, $value);
        } elseif (is_string($value)) {
            $items = explode(',', $value);
        } else {
            return [];
        }

        $items = array_map(trim(...), $items);

        return array_values(array_filter($items, static fn (string $item): bool => $item !== ''));
    }
}
