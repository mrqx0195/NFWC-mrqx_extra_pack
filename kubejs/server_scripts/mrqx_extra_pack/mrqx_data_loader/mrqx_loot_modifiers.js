// priority: 750
ServerEvents.highPriorityData(event => {
    event.addJson(`twilightforest:loot_modifiers/fiery_pick_smelting.json`, {
        "type": "twilightforest:fiery_pick_smelting",
        "conditions": [
            {
                "condition": "minecraft:match_tool",
                "predicate": {
                    "items": [
                        "twilightforest:fiery_pickaxe",
                        "mrqx_extra_pack:atomic_disassembler"
                    ]
                }
            }
        ]
    })
})