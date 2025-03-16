// priority: 750

const mrqxCraftsmanshipCoreCraftingRequirement = new mrqxTetraCraftingRequirementNot(new mrqxTetraCraftingRequirementOr()
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_ultimate_stability'))
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_ultimate_stability_holo'))
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_ultimate_stability_toolbelt'))
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_flame_and_steel'))
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_thresher'))
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_final_tactics'))
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_truesilver_slash'))
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_trial_of_thorns'))
    .addRequirement(new mrqxTetraCraftingRequirementImprovement('mrqx_craftsmanship_core_paths_must_be_opened'))
)

ServerEvents.highPriorityData(event => {
    function registerTetraModule(dataModel, key, category) {
        event.addJson(`tetra:modules/${category}/${key}.json`, dataModel)
    }

    function registerTetraSchematic(dataModel, key, category) {
        event.addJson(`tetra:schematics/${category}/${key}.json`, dataModel)
    }

    /**
     * @param {mrqxTetraModule} module
     * @param {string} displayType
     * @param {boolean} hone
     * @param {number} materialRevealSlot
     * @param {number} materialSlotCount
     * @param {"temporary" | "hone" | "basic"} rarity
     * @param {string} key
     * @param {string} category
     */
    function createSchematicFromModule(module, displayType, hone, materialRevealSlot, materialSlotCount, rarity, key, category) {
        let schematic = new mrqxTetraSchematic(displayType, module.replace, hone, materialRevealSlot, materialSlotCount, rarity)
        module.variants.forEach(variant => {
            let outcome = new mrqxTetraOutcome().setModule(category + '/' + key, variant.key)
            outcome.material = variant.material
            schematic.addOutcome(outcome)
        })
        module.slots.forEach(slot => {
            schematic.addSlot(slot)
        })
        return schematic
    }

    /**
     * @param {mrqxTetraModule} module
     * @param {"other" | "improvement" | "minor" | "major"} displayType
     * @param {boolean} hone
     * @param {number} materialRevealSlot
     * @param {number} materialSlotCount
     * @param {"temporary" | "hone" | "basic"} rarity
     * @param {string} key
     * @param {string} category
     */
    function registerModuleAndReturnSchematic(module, displayType, hone, materialRevealSlot, materialSlotCount, rarity, key, category) {
        registerTetraModule(module, key, category)
        return createSchematicFromModule(module, displayType, hone, materialRevealSlot, materialSlotCount, rarity, key, category)
    }

    // 裂变反应堆
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:crossbow/stock/')
        .addImprovement('tetra:crossbow/shared/')
        .addImprovement('tetra:shared/')
        .setRenderLayer('higher')
        .addSlot('crossbow/stock')
        .addVariant(new mrqxTetraModuleVariant('mrqx_fission_reactor', 1100, 2, 8, 100)
            .addAspect('breakable', 2)
            .addAspect('crossbow', 2)
            .addAttribute('tetra:draw_speed', 'ADDITION', 5)
            .addEffect('velocity', 200)
            .setGlyph(64, 32, '3B3B39', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:fission_reactor')
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_fission_reactor",
                "type": "static"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_fission_reactor', 'crossbow')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(64, 32, null, 'tetra:textures/gui/aof_glyph.png'),
        'mrqx_fission_reactor', 'crossbow'
    )

    // 反应散热器
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_module', false)
        .setRenderLayer('higher')
        .addSlot('crossbow/attachment_0')
        .addVariant(new mrqxTetraModuleVariant('mrqx_heat_vent', 120, 0.8, -4, 0)
            .addAttribute('tetra:draw_speed', 'ADDITION', 4.5)
            .addAttribute('tetra:draw_strength', 'ADDITION', -2)
            .setGlyph(85, 52, '878481')
            .addItemMaterial('mrqx_extra_pack:heat_vent')
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_heat_vent",
                "type": "static"
            })
        ), 'minor', false, 0, 1, 'temporary', 'mrqx_heat_vent', 'crossbow')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(85, 52),
        'mrqx_heat_vent', 'crossbow'
    )

    // 反应舱室
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:crossbow/stave/')
        .addImprovement('tetra:crossbow/shared/')
        .addImprovement('tetra:shared/')
        .setRenderLayer('higher')
        .addSlot('crossbow/stave')
        .addVariant(new mrqxTetraModuleVariant('mrqx_reactor_chamber', 60, 1, 3, 100)
            .addAspect('breakable', 2)
            .addAspect('crossbow', 2)
            .addAttribute('tetra:draw_speed', 'ADDITION', 1)
            .addAttribute('tetra:draw_strength', 'ADDITION', 3)
            .addEffect('velocity', 100)
            .setGlyph(96, 48, '343433')
            .addItemMaterial('mrqx_extra_pack:reactor_chamber')
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_reactor_chamber",
                "type": "static"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_reactor_chamber', 'crossbow')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(96, 48),
        'mrqx_reactor_chamber', 'crossbow'
    )

    // 反应热隔层
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_module', false)
        .setRenderLayer('higher')
        .addSlot('crossbow/attachment_0')
        .addVariant(new mrqxTetraModuleVariant('mrqx_thermal_barrier', 120, 1.2, -4, 0)
            .addAttribute('tetra:draw_speed', 'ADDITION', 1)
            .addAttribute('tetra:draw_strength', 'ADDITION', 8)
            .setGlyph(37, 52, '494949')
            .addItemMaterial('mrqx_extra_pack:thermal_barrier')
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_thermal_barrier",
                "type": "static"
            })
        ), 'minor', false, 0, 1, 'temporary', 'mrqx_thermal_barrier', 'crossbow')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(37, 52),
        'mrqx_thermal_barrier', 'crossbow'
    )

    // 反应热喷口
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_module', true)
        .addImprovement('tetra:shared/')
        .setRenderLayer('higher')
        .addSlot('crossbow/string')
        .addVariant(new mrqxTetraModuleVariant('mrqx_thermal_injector', 30, 1, 1, 0)
            .addAttribute('tetra:draw_speed', 'ADDITION', -5.5)
            .addAttribute('tetra:draw_strength', 'ADDITION', 8)
            .addEffect('suspend', 1)
            .addEffect('piercing', 3)
            .addEffect('velocity', 150)
            .setGlyph(55, 16, '5B483B')
            .addItemMaterial('mrqx_extra_pack:thermal_injector')
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_thermal_injector"
            })
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_thermal_injector_0",
                "type": "draw_0"
            })
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_thermal_injector_1",
                "type": "draw_1"
            })
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_thermal_injector_2",
                "type": "draw_2"
            })
            .addModel({
                "location": "tetra:items/module/crossbow/mrqx_extra_pack/mrqx_thermal_injector_3",
                "type": "loaded"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_thermal_injector', 'crossbow')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(80, 48),
        'mrqx_thermal_injector', 'crossbow'
    )

    // 国王的铠甲
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_module', false)
        .addSlot('shield/boss')
        .addVariant(new mrqxTetraModuleVariant('mrqx_kings_armor', 80, 1.6, 2, 80)
            .addAttribute('tetra:ability_cooldown', 'ADDITION', 0.3)
            .addEffect('art_of_forging:vengeance', [1, 50])
            .addEffect('blockingReflect', [100, 50])
            .setGlyph(85, 52, 'E79C23')
            .addItemMaterial('mrqx_extra_pack:kings_armor')
            .addModel({
                "location": "tetra:items/module/shield/mrqx_extra_pack/mrqx_kings_armor",
                "type": "tetra:boss/flat"
            })
        ), 'minor', false, 0, 1, 'temporary', 'mrqx_kings_armor', 'shield')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(85, 52),
        'mrqx_kings_armor', 'shield'
    )

    // 国王的圆饼
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:shield/plate/buckler/')
        .addImprovement('tetra:shield/plate/shared/')
        .addImprovement('tetra:shared/')
        .addSlot('shield/plate')
        .addVariant(new mrqxTetraModuleVariant('mrqx_kings_buckler', 80, 1.4, 2, 100)
            .addAspect('bluntWeapon', 1)
            .addAspect('breakable', 2)
            .addAttribute('minecraft:generic.armor', 'ADDITION', 10)
            .addAttribute('minecraft:generic.armor_toughness', 'ADDITION', 10)
            .addAttribute('tetra:ability_cooldown', 'ADDITION', -0.2)
            .addAttribute('tetra:ability_damage', 'ADDITION', 10)
            .setGlyph(48, 48, '575B5B')
            .addItemMaterial('mrqx_extra_pack:kings_buckler')
            .addModel({
                "location": "tetra:items/module/shield/mrqx_extra_pack/mrqx_kings_buckler",
                "type": "tetra:plate/buckler"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_kings_buckler', 'shield')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(48, 48),
        'mrqx_kings_buckler', 'shield'
    )

    // 国王的护戒
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', false)
        .addImprovement('tetra:shield/grip/shared/')
        .addImprovement('tetra:shared/')
        .addSlot('shield/grip')
        .addVariant(new mrqxTetraModuleVariant('mrqx_kings_fellowship', 180, 1, 2, 20)
            .addAspect('bluntWeapon', 1)
            .addAspect('breakable', 4)
            .addAttribute('tetra:ability_cooldown', 'ADDITION', 0.4)
            .addEffect('bashing', [5, 2])
            .setGlyph(160, 0, '4D5D6D')
            .addItemMaterial('mrqx_extra_pack:kings_fellowship')
            .addModel({
                "location": "tetra:items/module/shield/mrqx_extra_pack/mrqx_kings_fellowship",
                "type": "tetra:grip/grip"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_kings_fellowship', 'shield')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(160, 0),
        'mrqx_kings_fellowship', 'shield'
    )

    // 充能刀刃
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:sword/shared_blade/')
        .addImprovement('tetra:sword/shared/')
        .addImprovement('tetra:shared/')
        .addSlot('sword/blade')
        .addVariant(new mrqxTetraModuleVariant('mrqx_charged_blade', 200, 0.8, -2, 100)
            .addAspect('edgedWeapon', 2)
            .addAspect('breakable', 2)
            .addAttribute('minecraft:generic.attack_damage', 'ADDITION', 7)
            .addAttribute('minecraft:generic.attack_speed', 'ADDITION', 10)
            .addEffect('armorPenetration', 20)
            .addEffect('stun', [100, 1])
            .addEffect('sweeping', 8)
            .addEffect('truesweep', 2)
            .setGlyph(208, 0, '3ED4F9', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:charged_blade')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_charged_blade",
                "type": "tetra:grip/grip"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_charged_blade', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(208, 0, null, 'tetra:textures/gui/aof_glyph.png'),
        'mrqx_charged_blade', 'sword'
    )

    // 诸王的冠冕
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:shared/')
        .addSlot('sword/guard')
        .setRenderLayer('higher')
        .addVariant(new mrqxTetraModuleVariant('mrqx_kings_crown', 120, 1.1, -1, 0)
            .addAttribute('minecraft:generic.armor', 'ADDITION', 5)
            .addAttribute('minecraft:generic.armor_toughness', 'ADDITION', 5)
            .addEffect('quickStrike', 1)
            .addEffect('unbreaking', 3)
            .setGlyph(69, 36, '7DAFC6', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:kings_crown')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_kings_crown"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_kings_crown', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(112, 48),
        'mrqx_kings_crown', 'sword'
    )

    // 国王的水晶
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_module', true)
        .addImprovement('tetra:shared/')
        .addSlot('sword/pommel')
        .addVariant(new mrqxTetraModuleVariant('mrqx_kings_crystal', 500, 1, -1, 250)
            .addAttribute('irons_spellbooks:max_mana', 'ADDITION', 500)
            .addEffect('art_of_forging:devouring', 1)
            .addEffect('art_of_forging:nano_fused', 100)
            .setGlyph(21, 36, '83BFEE', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:kings_crystal')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_kings_crystal"
            })
        ), 'minor', false, 0, 1, 'temporary', 'mrqx_kings_crystal', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(208, 0),
        'mrqx_kings_crystal', 'sword'
    )

    // 国王的延伸
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:sword/shared_hilt/')
        .addImprovement('tetra:sword/shared/')
        .addImprovement('tetra:shared/')
        .addSlot('sword/hilt')
        .addVariant(new mrqxTetraModuleVariant('mrqx_kings_extension', 10, 1.7, 10, 160)
            .addAspect('breakable', 2)
            .addAspect('edgedWeapon', 2)
            .addAttribute('minecraft:generic.attack_speed', 'ADDITION', 0.3)
            .addEffect('art_of_forging:resolve', [1, 1])
            .addEffect('art_of_forging:vengeance', [1, 50])
            .setGlyph(16, 0, 'AC6C1C')
            .addItemMaterial('mrqx_extra_pack:kings_extension')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_kings_extension"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_kings_extension', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(16, 0),
        'mrqx_kings_extension', 'sword'
    )

    // 国王的新枪
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:sword/shared_blade/')
        .addImprovement('tetra:sword/shared/')
        .addImprovement('tetra:shared/')
        .addSlot('sword/blade')
        .addVariant(new mrqxTetraModuleVariant('mrqx_kings_new_lance', 500, 1, -3, 80)
            .addAspect('breakable', 2)
            .addAspect('edgedWeapon', 2)
            .addAttribute('minecraft:generic.attack_speed', 'ADDITION', 10)
            .addAttribute('minecraft:generic.attack_damage', 'ADDITION', 0.5)
            .addEffect('art_of_forging:judgement', [10, 100])
            .addEffect('art_of_forging:vengeance', [1, 100])
            .setGlyph(176, 0, '8C8C84', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:kings_new_lance')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_kings_new_lance"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_kings_new_lance', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(176, 0, '3ED4F9', 'tetra:textures/gui/aof_glyph.png'),
        'mrqx_kings_new_lance', 'sword'
    )

    // 蒸汽甲胄
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:shared/')
        .addSlot('sword/guard')
        .addVariant(new mrqxTetraModuleVariant('mrqx_steam_armor', 230, 1.1, -1, 0)
            .addAttribute('minecraft:generic.armor', 'ADDITION', 8)
            .addAttribute('minecraft:generic.armor_toughness', 'ADDITION', 10)
            .addEffect('abilityDefensive', [100, 30])
            .addEffect('unbreaking', 3)
            .setGlyph(69, 36, '7DAFC6', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:steam_armor')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_steam_armor"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_steam_armor', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(112, 48),
        'mrqx_steam_armor', 'sword'
    )

    // 蒸汽引擎
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_module', true)
        .addSlot('sword/pommel')
        .addVariant(new mrqxTetraModuleVariant('mrqx_steam_engine', 500, 1, -1, 250)
            .addAttribute('forge:step_height_addition', 'ADDITION', 2)
            .addEffect('abilityExhilaration', 100)
            .setGlyph(21, 36, '83BFEE', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:steam_engine')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_steam_engine"
            })
        ), 'minor', false, 0, 1, 'temporary', 'mrqx_steam_engine', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(208, 0),
        'mrqx_steam_engine', 'sword'
    )

    // 蒸汽液压杆
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:sword/shared_hilt/')
        .addImprovement('tetra:sword/shared/')
        .addImprovement('tetra:shared/')
        .addSlot('sword/hilt')
        .addVariant(new mrqxTetraModuleVariant('mrqx_steam_hydraulic_rod', 20, 1.4, 10, 0)
            .addAttribute('minecraft:generic.attack_speed', 'ADDITION', 0.4)
            .addEffect('abilityOvercharge', [15, 8])
            .setGlyph(16, 0, 'AC6C1C')
            .addItemMaterial('mrqx_extra_pack:steam_hydraulic_rod')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_steam_hydraulic_rod"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_steam_hydraulic_rod', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(16, 0),
        'mrqx_steam_hydraulic_rod', 'sword'
    )

    // 蒸汽刺剑
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:sword/shared_blade/')
        .addImprovement('tetra:sword/shared/')
        .addImprovement('tetra:shared/')
        .addSlot('sword/blade')
        .addVariant(new mrqxTetraModuleVariant('mrqx_steam_rapier', 1000, 1, -3, 0)
            .addAspect('edgedWeapon', 2)
            .addAspect('breakable', 2)
            .addAttribute('minecraft:generic.attack_damage', 'ADDITION', 12)
            .addAttribute('minecraft:generic.attack_speed', 'ADDITION', 0.6)
            .addEffect('puncture', [100, 100])
            .addEffect('punctured', 20)
            .setGlyph(176, 0, '8C8C84', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:steam_rapier')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_steam_rapier"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_steam_rapier', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(176, 0, null, 'tetra:textures/gui/aof_glyph.png'),
        'mrqx_steam_rapier', 'sword'
    )

    // ‌蒸汽增压引擎
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addSlot('sword/fuller')
        .addVariant(new mrqxTetraModuleVariant('mrqx_steam_supercharge_engine', 10, 0.9, 1, -100)
            .addAttribute('tetra:ability_cooldown', 'MULTIPLY_TOTAL', -0.9)
            .addAttribute('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 1.5)
            .addEffect('abilitySpeed', [90, 90])
            .setGlyph(72, 16, '034150')
            .addItemMaterial('mrqx_extra_pack:steam_supercharge_engine')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_steam_supercharge_engine"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_steam_supercharge_engine', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:diamond')
        .setGlyph(176, 0, '3ED4F9', 'tetra:textures/gui/aof_glyph.png'),
        'mrqx_steam_supercharge_engine', 'sword'
    )

    // 销汀·桉柏
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addImprovement('tetra:sword/shared_blade/')
        .addImprovement('tetra:sword/shared/')
        .addImprovement('tetra:shared/')
        .addSlot('sword/blade')
        .addVariant(new mrqxTetraModuleVariant('mrqx_xiao_amburm', 2048, 1, -5, -1000)
            .addAspect('edgedWeapon', 2)
            .addAspect('breakable', 2)
            .addAttribute('minecraft:generic.attack_damage', 'ADDITION', 15)
            .addAttribute('minecraft:generic.attack_speed', 'ADDITION', 3)
            .addAttribute('forge:attack_range', 'ADDITION', -1)
            .addEffect('workable', 0.25)
            .addEffect('art_of_forging:beheading', 95)
            .setGlyph(128, 16, 'AAA15F', 'tetra:textures/gui/aof_glyph.png')
            .addItemMaterial('mrqx_extra_pack:xiao_amburm')
            .addModel({
                "location": "tetra:items/module/sword/mrqx_extra_pack/mrqx_xiao_amburm"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_xiao_amburm', 'sword')
        .addAllRequiredTools('hammer_dig', 'minecraft:netherite')
        .setGlyph(128, 16, null, 'tetra:textures/gui/aof_glyph.png'),
        'mrqx_xiao_amburm', 'sword'
    )

    // 匠艺核心
    registerTetraSchematic(registerModuleAndReturnSchematic(new mrqxTetraModule('tetra:basic_major_module', true)
        .addSlot('holo/core')
        .setRenderLayer('highest')
        .addVariant(new mrqxTetraModuleVariant('mrqx_craftsmanship_core', 0, 0, 10, 0)
            .addTool('axe_dig', 99)
            .addTool('cut', 99)
            .addTool('hammer_dig', 99)
            .addTool('hoe_dig', 99)
            .addTool('pickaxe_dig', 99)
            .addTool('pry', 99)
            .addTool('shovel_dig', 99)
            .setGlyph(96, 48)
            .addItemMaterial('mrqx_extra_pack:craftsmanship_core')
            .addModel({
                "location": "tetra:items/module/holo/mrqx_extra_pack/mrqx_craftsmanship_core"
            })
        ), 'major', false, 0, 1, 'temporary', 'mrqx_craftsmanship_core', 'holo')
        .addAllRequiredTools('hammer_dig', 'minecraft:netherite')
        .setGlyph(96, 48),
        'mrqx_craftsmanship_core', 'holo'
    )

    // 匠艺核心·终极稳固
    registerTetraSchematic(new mrqxTetraSchematic('improvement', false, false, 0, 0, 'temporary')
        .addSlot("double/handle")
        .addSlot("double/head_left")
        .addSlot("double/head_right")
        .addSlot("single/handle")
        .addSlot("single/head")
        .addSlot("sword/blade")
        .addSlot("sword/hilt")
        .addSlot("bow/stave")
        .addSlot("bow/string")
        .addSlot("shield/plate")
        .addSlot("shield/grip")
        .addSlot("crossbow/stave")
        .addSlot("crossbow/stock")
        .addOutcome(new mrqxTetraOutcome()
            .addItemMaterial('mrqx_extra_pack:craftsmanship_core')
            .setExperienceCost(30)
            .addImprovement('mrqx_craftsmanship_core_ultimate_stability', 0)
        )
        .setRequirement(mrqxCraftsmanshipCoreCraftingRequirement)
        .setGlyph(80, 32, null, 'tetra:textures/gui/workbench.png')
        , 'mrqx_craftsmanship_core_ultimate_stability', 'shared'
    )

    // 匠艺核心·火与钢
    registerTetraSchematic(new mrqxTetraSchematic('improvement', false, false, 0, 0, 'temporary')
        .addSlot("sword/blade")
        .addOutcome(new mrqxTetraOutcome()
            .addItemMaterial('mrqx_extra_pack:craftsmanship_core')
            .setExperienceCost(30)
            .addImprovement('mrqx_craftsmanship_core_flame_and_steel', 0)
        )
        .setRequirement(mrqxCraftsmanshipCoreCraftingRequirement)
        .setGlyph(80, 32, null, 'tetra:textures/gui/workbench.png')
        , 'mrqx_craftsmanship_core_flame_and_steel', 'sword'
    )

    // 匠艺核心·剥壳
    registerTetraSchematic(new mrqxTetraSchematic('improvement', false, false, 0, 0, 'temporary')
        .addSlot("bow/stave")
        .addOutcome(new mrqxTetraOutcome()
            .addItemMaterial('mrqx_extra_pack:craftsmanship_core')
            .setExperienceCost(30)
            .addImprovement('mrqx_craftsmanship_core_thresher', 0)
        )
        .setRequirement(mrqxCraftsmanshipCoreCraftingRequirement)
        .setGlyph(80, 32, null, 'tetra:textures/gui/workbench.png')
        , 'mrqx_craftsmanship_core_thresher', 'bow'
    )

    // 匠艺核心·战术的终结
    registerTetraSchematic(new mrqxTetraSchematic('improvement', false, false, 0, 0, 'temporary')
        .addSlot("crossbow/stave")
        .addOutcome(new mrqxTetraOutcome()
            .addItemMaterial('mrqx_extra_pack:craftsmanship_core')
            .setExperienceCost(30)
            .addImprovement('mrqx_craftsmanship_core_final_tactics', 0)
        )
        .setRequirement(mrqxCraftsmanshipCoreCraftingRequirement)
        .setGlyph(80, 32, null, 'tetra:textures/gui/workbench.png')
        , 'mrqx_craftsmanship_core_final_tactics', 'crossbow'
    )

    // 匠艺核心·真银斩
    registerTetraSchematic(new mrqxTetraSchematic('improvement', false, false, 0, 0, 'temporary')
        .addSlot("single/head")
        .addOutcome(new mrqxTetraOutcome()
            .addItemMaterial('mrqx_extra_pack:craftsmanship_core')
            .setExperienceCost(30)
            .addImprovement('mrqx_craftsmanship_core_truesilver_slash', 0)
        )
        .setRequirement(mrqxCraftsmanshipCoreCraftingRequirement)
        .setGlyph(80, 32, null, 'tetra:textures/gui/workbench.png')
        , 'mrqx_craftsmanship_core_truesilver_slash', 'single'
    )

    // 匠艺核心·披荆斩棘
    registerTetraSchematic(new mrqxTetraSchematic('improvement', false, false, 0, 0, 'temporary')
        .addSlot("shield/plate")
        .addOutcome(new mrqxTetraOutcome()
            .addItemMaterial('mrqx_extra_pack:craftsmanship_core')
            .setExperienceCost(30)
            .addImprovement('plate/mrqx_craftsmanship_core_trial_of_thorns', 0)
        )
        .setRequirement(mrqxCraftsmanshipCoreCraftingRequirement)
        .setGlyph(80, 32, null, 'tetra:textures/gui/workbench.png')
        , 'mrqx_craftsmanship_core_trial_of_thorns', 'shield/plate'
    )

    // 匠艺核心·必须开辟的通路
    registerTetraSchematic(new mrqxTetraSchematic('improvement', false, false, 0, 0, 'temporary')
        .addSlot("double/handle")
        .addOutcome(new mrqxTetraOutcome()
            .addItemMaterial('mrqx_extra_pack:craftsmanship_core')
            .setExperienceCost(30)
            .addImprovement('mrqx_craftsmanship_core_paths_must_be_opened', 0)
        )
        .setRequirement(mrqxCraftsmanshipCoreCraftingRequirement)
        .setGlyph(80, 32, null, 'tetra:textures/gui/workbench.png')
        , 'mrqx_craftsmanship_core_paths_must_be_opened', 'double'
    )
})