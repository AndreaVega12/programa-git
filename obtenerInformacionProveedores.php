<?php
$data = [
    [
        "label"=>"Simantec",
        "datos"=>[
            "Nombre"=>"Simantec",
            "Telefono"=>"3201234567",
            "Dirección"=>"Av. Galileo # 12 - 03"
        ]
    ],
    [
        "label"=>"Asteka",
        "datos"=>[
            "Nombre"=>"Asteka",
            "Telefono"=>"3201234567",
            "Dirección"=>"Av. Galileo # 12 - 03"
        ]
    ],
    [
        "label"=>"Pisos del norte",
        "datos"=>[
            "Nombre"=>"Pisos del norte",
            "Telefono"=>"3201234567",
            "Dirección"=>"Av. Galileo # 12 - 03"
        ]
    ]
];

echo json_encode($data);