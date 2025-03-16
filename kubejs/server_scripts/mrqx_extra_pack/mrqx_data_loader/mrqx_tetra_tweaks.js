// priority: 750
ServerEvents.highPriorityData(event => {
    function registerTetraTweak(dataModel, key, category) {
        event.addJson(`tetra:tweaks/${category}/${key}.json`, dataModel)
    }

    // 反应散热器
    registerTetraTweak(new mrqxTetraTweak('crossbow_tweak/mrqx_heat_vent', 'mrqx_heat_vent', 10)
        .addAttribute('tetra:draw_speed', 'ADDITION', 0.2)
        .addAttribute('tetra:draw_strength', 'ADDITION', 0.5)
        .addEffect('fierySelf', 0.05)
        .addEffect('velocity', 10)
        .setDurabilityMultiplier(0.95)
    )

    // 反应热隔层
    registerTetraTweak(new mrqxTetraTweak('crossbow_tweak/mrqx_thermal_barrier', 'mrqx_thermal_barrier', 10)
        .addAttribute('tetra:draw_speed', 'ADDITION', -0.1)
        .addAttribute('tetra:draw_strength', 'ADDITION', -0.85)
        .addEffect('fierySelf', -0.05)
        .addEffect('velocity', -10)
        .setDurabilityMultiplier(1.05)
    )
})