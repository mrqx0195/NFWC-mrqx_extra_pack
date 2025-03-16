// priority: 750
ServerEvents.highPriorityData(event => {
    function registerTetraCraftingEffects(dataModel, key) {
        event.addJson(`tetra:crafting_effects/${key}.json`, dataModel)
    }

    // 销汀·桉柏
    registerTetraCraftingEffects(new mrqxTetraCraftingEffect(true,
        new mrqxTetraCraftingRequirementAnd()
            .addRequirement(new mrqxTetraCraftingRequirementCraft('module'))
            .addRequirement(new mrqxTetraCraftingRequirementSchematic('sword/mrqx_xiao_amburm'))
    )
        .addOutcome(new mrqxTetraCraftingOutcomeApplyEnchantment()
            .addEnchantment('goety:soul_eater', 10)
            .addEnchantment('biomancy:despoil', 10)
            .setIsForce(true)
            .setStacking('add')
        ),
        'mrqx_xiao_amburm'
    )
})