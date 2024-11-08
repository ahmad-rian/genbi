<?php

return [
    'groups' => [
        'admin' => [
            'admin.*',
        ],
        'operator' => [
            'operator.*',
        ],
    ],
    'except' => [
        '_debugbar.*',
    ],
];
