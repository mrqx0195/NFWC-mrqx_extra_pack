// priority: 750
ServerEvents.highPriorityData(event => {
    function registerTetraImprovements(dataModel, key, category) {
        event.addJson(`tetra:improvements/${category}/${key}.json`, dataModel)
    }

    // 匠艺核心·终极稳固
    registerTetraImprovements([new mrqxTetraStandardImprovement('mrqx_craftsmanship_core_ultimate_stability')
        .setIntegrity(2)
        .setDurabilityMultiplier(1.5)
    ], 'mrqx_craftsmanship_core_ultimate_stability', 'shared'
    )

    // 匠艺核心·火与钢
    registerTetraImprovements([new mrqxTetraStandardImprovement('mrqx_craftsmanship_core_flame_and_steel')
        .setDurabilityMultiplier(1.5)
        .addAttribute('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 1)
        .addEffect('mrqx_extra_pack:flame_and_steel', 1)
    ], 'mrqx_craftsmanship_core_flame_and_steel', 'sword/shared'
    )

    // 匠艺核心·剥壳
    registerTetraImprovements([new mrqxTetraStandardImprovement('mrqx_craftsmanship_core_thresher')
        .addAttribute('tetra:draw_strength', 'MULTIPLY_TOTAL', 0.15)
        .addAttribute('tetra:draw_speed', 'MULTIPLY_TOTAL', -0.48)
        .addEffect('mrqx_extra_pack:thresher', 1)
    ], 'mrqx_craftsmanship_core_thresher', 'bow/shared'
    )

    // 匠艺核心·战术的终结
    registerTetraImprovements([new mrqxTetraStandardImprovement('mrqx_craftsmanship_core_final_tactics')
        .addAttribute('tetra:draw_strength', 'MULTIPLY_TOTAL', 1.95)
        .addAttribute('tetra:draw_speed', 'MULTIPLY_TOTAL', 0.4)
        .addEffect('mrqx_extra_pack:final_tactics', 1)
    ], 'mrqx_craftsmanship_core_final_tactics', 'crossbow/shared'
    )

    // 匠艺核心·真银斩
    registerTetraImprovements([new mrqxTetraStandardImprovement('mrqx_craftsmanship_core_truesilver_slash')
        .addAttribute('minecraft:generic.armor', 'MULTIPLY_TOTAL', -0.7)
        .addAttribute('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 2)
        .addAttribute('forge:attack_range', 'MULTIPLY_TOTAL', 2)
        .addAttribute('forge:reach_distance', 'MULTIPLY_TOTAL', 2)
        .addAspect('edgedWeapon', 2)
        .addEffect('truesweep', 2)
        .addEffect('sweeping', [8, 9])
        .addEffect('mrqx_extra_pack:truesilver_slash', 1)
    ], 'mrqx_craftsmanship_core_truesilver_slash', 'single/shared'
    )

    // 匠艺核心·披荆斩棘
    registerTetraImprovements([new mrqxTetraStandardImprovement('plate/mrqx_craftsmanship_core_trial_of_thorns')
        .addAttribute('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 4)
        .addAttribute('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', -0.47)
        .addEffect('mrqx_extra_pack:trial_of_thorns', 1)
    ], 'plate/mrqx_craftsmanship_core_trial_of_thorns', 'shield/plate/shared'
    )

    // 匠艺核心·必须开辟的通路
    registerTetraImprovements([new mrqxTetraStandardImprovement('mrqx_craftsmanship_core_paths_must_be_opened')
        .addAttribute('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 0.8)
        .addAttribute('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 2.6)
        .addEffect('throwable', [1, 1.6])
        .addEffect('mrqx_extra_pack:paths_must_be_opened', 1)
    ], 'double/mrqx_craftsmanship_core_paths_must_be_opened', 'double/shared'
    )
})