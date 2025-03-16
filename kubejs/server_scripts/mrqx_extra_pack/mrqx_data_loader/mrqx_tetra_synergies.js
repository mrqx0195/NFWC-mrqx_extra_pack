// priority: 750
ServerEvents.highPriorityData(event => {
    function registerTetraSynergy(dataModel, key, category) {
        event.addJson(`tetra:synergies/${category}/${key}.json`, dataModel)
    }

    // 核能弩
    registerTetraSynergy([
        new mrqxTetraSynergy('crossbow/mrqx_nuclear_crossbow')
            .addAttribute('tetra:draw_speed', 'ADDITION', -3)
            .setDurability(1000)
            .addEffect('fierySelf', 0.5)
            .addEffect('piercing', 3)
            .addEffect('velocity', 200)
            .addModuleVariant('mrqx_fission_reactor')
            .addModuleVariant('mrqx_heat_vent')
            .addModuleVariant('mrqx_reactor_chamber')
            .addModuleVariant('mrqx_thermal_injector'),
        new mrqxTetraSynergy('crossbow/mrqx_nuclear_crossbow')
            .addAttribute('tetra:draw_speed', 'ADDITION', -3)
            .setDurability(1000)
            .addEffect('fierySelf', 0.5)
            .addEffect('piercing', 3)
            .addEffect('velocity', 200)
            .addModuleVariant('mrqx_fission_reactor')
            .addModuleVariant('mrqx_thermal_barrier')
            .addModuleVariant('mrqx_reactor_chamber')
            .addModuleVariant('mrqx_thermal_injector'),
    ], 'mrqx_nuclear_crossbow', 'crossbow'
    )

    // 湖中神盾
    registerTetraSynergy([
        new mrqxTetraSynergy('shield/mrqx_shield_in_the_lake')
            .addAttribute('minecraft:generic.armor', 'ADDITION', 10)
            .addAttribute('minecraft:generic.armor_toughness', 'ADDITION', 10)
            .addAttribute('minecraft:generic.attack_damage', 'ADDITION', 10)
            .setDurability(2000)
            .addEffect('art_of_forging:vengeance', [1, 50])
            .addEffect('quickStrike', 6)
            .addEffect('stabilizing', 100)
            .addModuleVariant('mrqx_kings_fellowship')
            .addModuleVariant('mrqx_kings_armor')
            .addModuleVariant('mrqx_kings_buckler')
    ], 'mrqx_shield_in_the_lake', 'shield'
    )

    // 诸王之息
    registerTetraSynergy([
        new mrqxTetraSynergy('sword/mrqx_kyngasycath')
            .addAttribute('minecraft:generic.armor', 'ADDITION', 5)
            .addAttribute('minecraft:generic.armor_toughness', 'ADDITION', 5)
            .addAttribute('minecraft:generic.attack_damage', 'ADDITION', 10)
            .addAttribute('minecraft:generic.attack_speed', 'ADDITION', -0.5)
            .setDurability(2000)
            .addEffect('abilityCombo', [10, 10])
            .addEffect('abilityDefensive', [600, 30])
            .addEffect('abilityExhilaration', [20, 50])
            .addEffect('abilityMomentum', [30, 3])
            .addEffect('abilityOvercharge', [10, 10])
            .addEffect('abilityRevenge', [200, 30])
            .addEffect('abilitySpeed', [10, 30])
            .addEffect('art_of_forging:vengeance', [1, 50])
            .addEffect('reap', [1000, 10])
            .addEffect('abilityEcho', 15)
            .addEffect('abilityOverextend', 101)
            .addEffect('abilityPerformance', 1)
            .addEffect('stabilizing', 100)
            .addEffect('sweeping', 8)
            .addEffect('truesweep', 3)
            .addModuleVariant('mrqx_kings_crown')
            .addModuleVariant('mrqx_kings_extension')
            .addModuleVariant('mrqx_kings_crystal')
            .addModuleVariant('mrqx_kings_new_lance')
    ], 'mrqx_kyngasycath', 'sword'
    )

    // 誓死
    registerTetraSynergy([
        new mrqxTetraSynergy('sword/mrqx_swearing_to_death')
            .addAttribute('minecraft:generic.armor', 'ADDITION', 3)
            .addAttribute('minecraft:generic.armor_toughness', 'ADDITION', 3)
            .addAttribute('minecraft:generic.attack_damage', 'ADDITION', 15)
            .addAttribute('minecraft:generic.attack_speed', 'ADDITION', -1)
            .addAttribute('tetra:ability_cooldown', 'MULTIPLY_TOTAL', -0.1)
            .addAttribute('tetra:ability_damage', 'MULTIPLY_TOTAL', 10)
            .addAttribute('forge:attack_range', 'ADDITION', 5)
            .addAttribute('obscure_api:penetration', 'ADDITION', 100)
            .addAttribute('minecraft:generic.knockback_resistance', 'ADDITION', 0.9)
            .addAttribute('irons_spellbooks:spell_resist', 'ADDITION', 0.25)
            .setDurability(2000)
            .addEffect('abilitySpeed', [10, 40])
            .addEffect('skewering', [16, 15])
            .addEffect('abilityOverextend', 101)
            .addEffect('shieldbreaker', 1)
            .addEffect('punch', 10)
            .addEffect('jab', 50)
            .addEffect('crushing', 100)
            .addEffect('fiery', 10)
            .addEffect('flame', 10)
            .addEffect('art_of_forging:conquering', 50)
            .addEffect('art_of_forging:subjugation', 20)
            .addEffect('art_of_forging:third_sight', 10)
            .addModuleVariant('mrqx_steam_armor')
            .addModuleVariant('mrqx_steam_engine')
            .addModuleVariant('mrqx_steam_hydraulic_rod')
            .addModuleVariant('mrqx_steam_rapier')
    ], 'mrqx_swearing_to_death', 'sword'
    )
})