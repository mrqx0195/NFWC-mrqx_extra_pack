// priority: 750

ServerEvents.highPriorityData(event => {
    function registerLootTable(dataModel, id) {
        event.addJson(`mrqx_extra_pack:loot_tables/${id}.json`, dataModel)
    }

    registerLootTable({
        "pools": [
            {
                "entries": [
                    {
                        "name": "mrqx_extra_pack:heart_tidal_elegy",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:lung_the_tide_surges_the_tide_recedes",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:kidney_moon_in_the_water",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:liver_tide_observation",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:pancreas_group_hunting",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:muscle_bone_fracture",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:rib_the_pressure_to_survive",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:spleen_adhering_to_nature",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:stomach_abyssal_predator",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:spine_abyssal_intuition",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:intestine_survival_of_the_fittest",
                        "type": "item"
                    },
                    {
                        "name": "mrqx_extra_pack:appendix_assimilation_mutation",
                        "type": "item"
                    }
                ],
                "name": "mrqx_extra_pack:seaborn_organs",
                "rolls": {
                    "max": 1,
                    "min": 1
                }
            }
        ]
    }, 'seaborn_organs')
})