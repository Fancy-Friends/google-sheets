<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleSheets\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleSheets\Actions\ValuesUpdate;
use ParticleAcademy\GoogleSheets\GoogleSheets;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/values-update.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/values-update.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_sheets
 */
/**
 * Write Google Sheets values, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleSheetsValuesUpdateExecutor` in
 * @particle-academy/google-sheets-js: the same request, built from the node's
 * config by the same `Actions\ValuesUpdate` a host would call directly, and
 * the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Sheets. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_sheets_values_update',
    aliases: [
        'google_sheets_values_update',
    ],
    category: 'io',
    label: 'Write Google Sheets values',
    description: 'Overwrite the cell values of a range. Existing values in that range are replaced, not pushed down.',
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
    sideEffects: 'idempotent',
    outputShape: [
        [
            'path' => 'data.spreadsheetId',
            'type' => 'string',
            'description' => 'The spreadsheet that was written to.',
        ],
        [
            'path' => 'data.updatedRange',
            'type' => 'string',
            'description' => 'The range Google actually wrote, in A1 notation.',
        ],
        [
            'path' => 'data.updatedRows',
            'type' => 'number',
            'description' => 'How many rows had at least one cell updated.',
        ],
        [
            'path' => 'data.updatedColumns',
            'type' => 'number',
            'description' => 'How many columns had at least one cell updated.',
        ],
        [
            'path' => 'data.updatedCells',
            'type' => 'number',
            'description' => 'How many cells were written.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class ValuesUpdateExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleSheets::descriptor(),
            ValuesUpdate::OPERATION,
            $config,
            [
                'method' => ValuesUpdate::METHOD,
                'path' => ValuesUpdate::path($config),
                'json' => ValuesUpdate::body($config),
                'query' => ValuesUpdate::query($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_sheets values_update'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
