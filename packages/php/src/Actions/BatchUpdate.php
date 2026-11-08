<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleSheets\Actions;

use ParticleAcademy\GoogleSheets\GoogleSheets;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/batch-update.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/batch-update.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */
/**
 * Apply a list of Google Sheet API requests to a spreadsheet, all or none.
 *
 * POST /v4/spreadsheets/{spreadsheetId}:batchUpdate —
 * https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Sheets or calls the faker.
 */
final class BatchUpdate
{
    public const OPERATION = 'batch_update';
    public const METHOD = 'POST';
    public const PATH = '/v4/spreadsheets/{spreadsheetId}:batchUpdate';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the JSON body for one call.
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
            throw new ConnectorConfigException('batch_update: "spreadsheetId" is required (Spreadsheet ID).');
        }

        $requests = $config['requests'] ?? null;
        if ($requests === null || $requests === '') {
            throw new ConnectorConfigException('batch_update: "requests" is required (Requests).');
        }
        if (is_string($requests) && $requests !== '') {
            try {
                json_decode($requests, false, 512, JSON_THROW_ON_ERROR);
            } catch (\JsonException $e) {
                throw new ConnectorConfigException(
                    'batch_update: "requests" must be JSON: '.$e->getMessage(),
                );
            }
        }

        $body = [];

        $value = $config['requests'] ?? null;
        if ($value !== null && $value !== '') {
            $body['requests'] = is_string($value) ? json_decode($value, false, 512, JSON_THROW_ON_ERROR) : $value;
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
        return '/v4/spreadsheets/'.rawurlencode((string) ($config['spreadsheetId'] ?? '')).':batchUpdate';
    }
}
