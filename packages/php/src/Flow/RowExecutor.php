<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleSheets\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleSheets\Actions\RowAppend;
use ParticleAcademy\GoogleSheets\GoogleSheets;

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
 * Google Sheets row, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleSheetsRowExecutor` in
 * @particle-academy/google-sheets-js: the same request, built from the node's
 * config by the same `Actions\RowAppend` a host would call directly, and the
 * same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Sheets. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_sheets_row',
    aliases: [
        'google_sheets_row',
    ],
    category: 'io',
    label: 'Google Sheets row',
    description: 'Append a row to a Google Sheet.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'data.spreadsheetId',
            'type' => 'string',
            'description' => 'The spreadsheet that was written to.',
        ],
        [
            'path' => 'data.updates.updatedRange',
            'type' => 'string',
            'description' => 'The range Google actually wrote, in A1 notation. NOT the range that was asked for -- append finds the first empty row below it.',
        ],
        [
            'path' => 'data.updates.updatedRows',
            'type' => 'number',
            'description' => 'How many rows were added.',
        ],
        [
            'path' => 'data.updates.updatedCells',
            'type' => 'number',
            'description' => 'How many cells were written.',
        ],
    ],
)]
final class RowExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleSheets::descriptor(),
            RowAppend::OPERATION,
            $config,
            [
                'method' => RowAppend::METHOD,
                'path' => RowAppend::path($config),
                'json' => RowAppend::body($config),
                'query' => RowAppend::query($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_sheets row_append'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
