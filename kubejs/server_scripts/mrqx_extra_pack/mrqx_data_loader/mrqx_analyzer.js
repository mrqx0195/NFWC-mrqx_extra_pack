// priority: 750

ServerEvents.highPriorityData(event => {
    // “过去之章”
    event.addJson(`mrqx_extra_pack:unusualprehistory/analyzer/page_of_past_from_analyzing.json`, {
        "input": ["mrqx_extra_pack:mystery_memories"],
        "entries": [
            {
                "weight": 1,
                "item": "mrqx_extra_pack:page_of_past"
            }
        ]
    })
    event.addJson(`mrqx_extra_pack:recipe/analyzing/page_of_past_from_analyzing.json`, {
        "type": "unusualprehistory:analyzing",
        "ingredients": [
            {
                "item": "mrqx_extra_pack:mystery_memories"
            }
        ]
    })
})