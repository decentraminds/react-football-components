export const dataFut = [
    {
    "participant": [
        {
            "id": 0,
            "tournament_id": 0,
            "name": "Equipo 1"
        },
        {
            "id": 1,
            "tournament_id": 0,
            "name": "Equipo 2"
        },
        {
            "id": 2,
            "tournament_id": 0,
            "name": "Equipo 3"
        },
        {
            "id": 3,
            "tournament_id": 0,
            "name": "Equipo 4"
        }        
    ], 
    "stage": [
        {
            "id": 0,
            "tournament_id": 0,
            "name": "Fase Eliminación Directa",
            "type": "single_elimination",
            "number": 1,
            "settings": {
                "size": 4,
                "seedOrdering": [
                    "natural",
                    "natural",
                    "reverse_half_shift",
                    "reverse"
                ],
                "grandFinal": "simple",
                "matchesChildCount": 0
            }
        }
    ],
    "group": [
        {
            "id": 0,
            "stage_id": 0,
            "number": 1
        }
    ],
    "round": [
        {
            "id": 0,
            "number": 1,
            "stage_id": 0,
            "group_id": 0
        },
        {
            "id": 1,
            "number": 2,
            "stage_id": 0,
            "group_id": 0
        },
        {
            "id": 2,
            "number": 3,
            "stage_id": 0,
            "group_id": 0
        }
    ],
    "match": [
        {
            "id": 0,
            // Numero de partido en esta ronda
            "number": 1,
            "stage_id": 0,
            "group_id": 0,
            "round_id": 0,
            "child_count": 0,
            // Locked = 0, Waiting = 1, Ready = 2, Running = 3, Completed = 4, Archived = 5
            "status": 2,
            "opponent1": {
                // ID del participante
                "id": 0,
                "position": 1
            },
            "opponent2": {
                // ID del participante
                "id": 1,
                "position": 2
            }
        },
        {
            "id": 1,
            "number": 2,
            "stage_id": 0,
            "group_id": 0,
            "round_id": 0,
            "child_count": 0,
            "status": 2,
            "opponent1": {
                "id": 2,
                "position": 3
            },
            "opponent2": {
                "id": 3,
                "position": 4
            }
        },
        {
            "id": 2,
            "number": 1,
            "stage_id": 0,
            "group_id": 0,
            "round_id": 1,
            "child_count": 0,
            "status": 0,
            "opponent1": {
                "id": null,
            },
            "opponent2": {
                "id": null,
            }
        }
    ],
    "match_game": []
    }
]