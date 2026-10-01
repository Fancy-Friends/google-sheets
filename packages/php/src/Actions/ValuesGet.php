<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleSheets\Actions;

use ParticleAcademy\GoogleSheets\GoogleSheets;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/values-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/values-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */
/**
 * Read the cell values of a range.
 *
 * GET /v4/spreadsheets/{spreadsheetId}/values/{range} —
 * https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Sheets or calls the faker.
 */
final class ValuesGet
{
    public const OPERATION = 'values_get';
    public const METHOD = 'GET';
    public const PATH = '/v4/spreadsheets/{spreadsheetId}/values/{range}';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the form body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Google Sheets.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['spreadsheetId'] ?? null) === null || ($config['spreadsheetId'] ?? null) === '') {
            throw new ConnectorConfigException('values_get: "spreadsheetId" is required (Spreadsheet ID).');
        }

        if (($config['range'] ?? null) === null || ($config['range'] ?? null) === '') {
            throw new ConnectorConfigException('values_get: "range" is required (Range).');
        }

        $body = [];

        $value = $config['valueRenderOption'] ?? null;
        if ($value !== null && $value !== '') {
            $body['valueRenderOption'] = (string) $value;
        }

        $value = $config['majorDimension'] ?? null;
        if ($value !== null && $value !== '') {
            $body['majorDimension'] = (string) $value;
        }

        $body = $body === [] ? new \stdClass() : $body;
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
        return '/v4/spreadsheets/'.rawurlencode((string) ($config['spreadsheetId'] ?? '')).'/values/'.rawurlencode((string) ($config['range'] ?? ''));
    }
}
