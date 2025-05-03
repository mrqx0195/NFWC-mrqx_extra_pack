// priority: 450
JEIEvents.information(event => {
    const $MysteriousItemConversionCategory = Java.loadClass('com.simibubi.create.compat.jei.category.MysteriousItemConversionCategory')
    const $ConversionRecipe = Java.loadClass('com.simibubi.create.compat.jei.ConversionRecipe')

    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create('mrqx_extra_pack:framework_of_world', 'kubejs:genesis'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create('create:chromatic_compound', 'create:shadow_steel'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create('create:chromatic_compound', 'create:refined_radiance'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:heart_tidal_elegy'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:lung_the_tide_surges_the_tide_recedes'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:kidney_moon_in_the_water'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:liver_tide_observation'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:pancreas_group_hunting'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:muscle_bone_fracture'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:rib_the_pressure_to_survive'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:stomach_abyssal_predator'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:spine_abyssal_intuition'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:intestine_survival_of_the_fittest'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_shadow_of_caerula_arbor"}'), 'mrqx_extra_pack:appendix_assimilation_mutation'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_mechanical_frenzy"}'), 'mrqx_extra_pack:seance_cpu'))
    $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mrqx_god_judgement"}'), 'mrqx_extra_pack:sin_and_judgement'))

    event.addItem('mrqx_extra_pack:fox_soul', Text.black({ "translate": "mrqx_extra_pack.jei.fox_soul.1" }))

    event.addItem(Ingredient.of('#kubejs:mrqx_nuclear'), Text.black({ "translate": "mrqx_extra_pack.jei.mrqx_nuclear.1" }))

    event.addItem(Ingredient.of('#kubejs:mrqx_cpu'), Text.black({ "translate": "mrqx_extra_pack.jei.cpu.1" }))
    event.addItem(Ingredient.of('#mrqx_extra_pack:gain_in_forge_ruin'), Text.black({ "translate": "mrqx_extra_pack.jei.gain_in_forge_ruin.1" }))

    event.addItem(Ingredient.of('#kubejs:mrqx_element_damage'), Text.black({ "translate": "mrqx_extra_pack.jei.mrqx_element_damage.1" }))
    event.addItem(Ingredient.of('#kubejs:mrqx_element_damage'), Text.black({ "translate": "mrqx_extra_pack.jei.mrqx_element_damage.2" }))
    event.addItem(Ingredient.of('#kubejs:mrqx_element_damage'), Text.black({ "translate": "mrqx_extra_pack.jei.mrqx_element_damage.3" }))
    event.addItem(Ingredient.of('#kubejs:mrqx_element_damage'), Text.black({ "translate": "mrqx_extra_pack.jei.mrqx_element_damage.4" }))
    event.addItem(Ingredient.of('#kubejs:mrqx_element_damage'), Text.black({ "translate": "mrqx_extra_pack.jei.mrqx_element_damage.5" }))
    event.addItem(Ingredient.of('#kubejs:mrqx_element_damage'), Text.black({ "translate": "mrqx_extra_pack.jei.mrqx_element_damage.6" }))

    event.addItem('mrqx_extra_pack:soul_of_emerald_pickaxe', Text.black({ "translate": "mrqx_extra_pack.jei.soul_of_emerald_pickaxe.1" }))

    event.addItem('mrqx_extra_pack:mystery_memories', Text.black({ "translate": "mrqx_extra_pack.jei.mystery_memories.1" }))
})

JEIEvents.hideItems(event => {
    event.hide('mrqx_extra_pack:incomplete_storm_metal_ingot')
    event.hide('mrqx_extra_pack:incomplete_fission_reactor')
    event.hide('mrqx_extra_pack:incomplete_nuclear_fuel')
    event.hide('mrqx_extra_pack:incomplete_compressed_biscuit')
    event.hide('mrqx_extra_pack:incomplete_golden_compressed_biscuit')
    event.hide('mrqx_extra_pack:incomplete_command_spell_core')
    event.hide('mrqx_extra_pack:incomplete_meteor_shower_director')
    event.hide('mrqx_extra_pack:incomplete_cpu')
    event.hide('mrqx_extra_pack:incomplete_worn_out_steam_engine')
    event.hide('mrqx_extra_pack:incomplete_steam_power_engine')
    event.hide('mrqx_extra_pack:incomplete_shield_generator')
    if (!Utils.getRegistries().items().contains('luna_flesh_reforged:fallen_paradise')) {
        event.hide('mrqx_extra_pack:fallen_paradise_container')
    }
})