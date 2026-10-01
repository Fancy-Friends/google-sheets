<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleSheets\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleSheets\Actions\ValuesGet;
use ParticleAcademy\GoogleSheets\GoogleSheets;

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
 * Read Google Sheets values, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleSheetsValuesGetExecutor` in
 * @particle-academy/google-sheets-js: the same request, built from the node's
 * config by the same `Actions\ValuesGet` a host would call directly, and the
 * same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Sheets. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_sheets_values_get',
    aliases: [
        'google_sheets_values_get',
    ],
    category: 'io',
    label: 'Read Google Sheets values',
    description: 'Read the cell values of a range.',
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
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.range',
            'type' => 'string',
            'description' => 'The range actually covered -- may be smaller than what was asked for; Google excludes empty trailing rows and columns.',
        ],
        [
            'path' => 'data.majorDimension',
            'type' => 'string',
            'description' => 'Echoes what was asked, or ROWS by default.',
        ],
        [
            'path' => 'data.values',
            'type' => 'array',
            'description' => 'Rows of cells -- an array of arrays. One row is [[a, b, c]], the same shape row_append sends. Absent entirely when the range is empty.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class ValuesGetExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleSheets::descriptor(),
            ValuesGet::OPERATION,
            $config,
            [
                'method' => ValuesGet::METHOD,
                'path' => ValuesGet::path($config),
                'query' => ValuesGet::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_sheets values_get'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
