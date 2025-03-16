// priority: 750
ServerEvents.highPriorityData(event => {
    function registerTetraReplacement(dataModel, key) {
        event.addJson(`tetra:replacements/${key}.json`, dataModel)
    }

    // 匠艺核心
    registerTetraReplacement([
        new mrqxTetraReplacement({
            "items": ["mrqx_extra_pack:craftsmanship_core"]
        }, 'tetra:holo')
            .addModule('holo/core', 'holo/mrqx_craftsmanship_core', 'mrqx_craftsmanship_core')
    ], 'mrqx_craftsmanship_core'
    )
})