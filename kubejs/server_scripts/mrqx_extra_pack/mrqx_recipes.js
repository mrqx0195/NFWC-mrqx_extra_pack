// priority: -1

/**
 * @param {Internal.ItemStack} container 
 * @param {Internal.ItemStack[]} ingredients
 * @param {Internal.ItemStack} output
 */
function CookingRecipe(container, ingredients, output) {
    this.type = 'farmersdelight:cooking'
    this.container = container
    this.cookingtime = 200
    this.experience = 1.0
    this.ingredients = ingredients
    this.result = output
    this.recipe_book_tab = COOKING_MISC
}

CookingRecipe.prototype = {
    /**
     * @param {string} recipeBookTab
     * @returns {CookingRecipe}
     */
    setRecipeBookTab: function (recipeBookTab) {
        this.recipe_book_tab = recipeBookTab
        return this
    },
    /**
     * @param {Number} cookingtime
     * @returns {CookingRecipe}
     */
    setCookingtime: function (cookingtime) {
        this.cookingtime = cookingtime
        return this
    },
    /**
     * @param {Number} experience
     * @returns {CookingRecipe}
     */
    setExperience: function (experience) {
        this.experience = experience
        return this
    },
}

/**
 * @param {Internal.ItemStack} usedItem 
 * @param {Internal.ItemStack[]} ingredients
 * @param {Internal.ItemStack} output
 */
function MixingBowlRecipe(usedItem, ingredients, output) {
    this.type = 'extradelight:mixing_bowl'
    this.usedItem = usedItem
    this.ingredients = ingredients
    this.result = output
}

MixingBowlRecipe.prototype = {
    /**
     * @param {Number} stirs
     * @returns {MixingBowlRecipe}
     */
    setStirs: function (stirs) {
        this.stirs = stirs
        return this
    },
}

/**
 * @param {string} craftType 
 * @param {Internal.ItemStack} ingredients
 * @param {Internal.ItemStack} activation_item
 * @param {Internal.ItemStack} output
 */
function GoetyRitualRecipe(craftType, ingredients, activation_item, output) {
    this.type = 'goety:ritual'
    this.ritual_type = 'goety:craft'
    this.craftType = craftType
    this.activation_item = activation_item
    this.ingredients = ingredients
    this.result = output
    this.duration = 60
    this.soulCost = 100
}

GoetyRitualRecipe.prototype = {
    /**
     * @param {Number} duration
     * @returns {GoetyRitualRecipe}
     */
    setDuration: function (duration) {
        this.duration = duration
        return this
    },
    /**
     * @param {Number} soulCost
     * @returns {GoetyRitualRecipe}
     */
    setSoulCost: function (soulCost) {
        this.soulCost = soulCost
        return this
    },
    /**
     * @param {String} ritual_type
     * @returns {GoetyRitualRecipe}
     */
    setRitualType: function (ritual_type) {
        this.ritual_type = ritual_type
        return this
    },
    /**
     * @param {Object} entity_to_sacrifice
     * @returns {GoetyRitualRecipe}
     */
    setEntityToSacrifice: function (entity_to_sacrifice) {
        this.entity_to_sacrifice = entity_to_sacrifice
        return this
    },
}

/**
 * @param {Internal.ItemStack} ingredients
 * @param {Internal.ItemStack} output
 */
function BioForgingRecipe(ingredients, output) {
    this.type = 'biomancy:bio_forging'
    this.ingredients = ingredients
    this.result = output
    this.nutrientsCost = 1
    this.bio_forge_tab = 'biomancy:misc'
}

BioForgingRecipe.prototype = {
    /**
     * @param {Number} nutrientsCost
     * @returns {BioForgingRecipe}
     */
    setNutrientsCost: function (nutrientsCost) {
        this.nutrientsCost = nutrientsCost
        return this
    },
    /**
     * @param {String} tab
     * @returns {BioForgingRecipe}
     */
    setTab: function (tab) {
        this.bio_forge_tab = tab
        return this
    },
}

/**
 * @param {Internal.ItemStack} input
 * @param {Internal.ItemStack} output
 */
function CreateAdditionCharging(input, output) {
    this.type = 'createaddition:charging'
    this.input = input
    this.result = output
    this.energy = 1000
    this.maxChargeRate = 200
}

CreateAdditionCharging.prototype = {
    /**
     * @param {Number} energy
     * @returns {CreateAdditionCharging}
     */
    setEnergy: function (energy) {
        this.energy = energy
        return this
    },
    /**
     * @param {Number} maxChargeRate
     * @returns {CreateAdditionCharging}
     */
    setMaxChargeRate: function (maxChargeRate) {
        this.maxChargeRate = maxChargeRate
        return this
    },
}

/**
 * @param {Internal.ItemStack} base
 * @param {Internal.ItemStack} addition
 * @param {Internal.ItemStack} result
 */
function CataclysmWeaponFusion(base, addition, result) {
    this.type = 'cataclysm:weapon_fusion'
    this.base = base
    this.addition = addition
    this.result = result
}

/**
 * @param {Internal.ItemStack} ingredient
 * @param {Internal.ItemStack} output
 */
function DigestingRecipe(ingredient, output) {
    this.type = 'biomancy:digesting'
    this.ingredient = ingredient
    this.result = output
    this.nutrientsCost = 2
    this.processingTime = 20 * 8
}

DigestingRecipe.prototype = {
    /**
     * @param {Number} nutrientsCost
     * @returns {DigestingRecipe}
     */
    setNutrientsCost: function (nutrientsCost) {
        this.nutrientsCost = nutrientsCost
        return this
    },
    /**
     * @param {Number} processingTime
     * @returns {DigestingRecipe}
     */
    setProcessingTime: function (processingTime) {
        this.processingTime = processingTime
        return this
    },
}

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel)
    }
    // 纸器官
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:appendix_paper', [' PPP ', ' PPP ', '  PP ', '  PP ', '  PPP'], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:heart_paper', [' PPP ', 'PPPPP', 'PPPPP', 'PPPP ', ' PPP '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:intestine_paper', ['P PPP', 'PPPPP', 'PPPPP', 'PPP  ', 'PPPP '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:kidney_paper', [' PP  ', 'PPPP ', ' PPP ', 'PPPP ', ' PP  '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:liver_paper', [' PPPP', 'PPPPP', 'PPPP ', 'PPP  ', '     '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:lung_paper', ['  PP ', ' PPP ', ' PPP ', ' PPP ', ' PPP '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:muscle_paper', ['  PPP', ' PPPP', 'PPPPP', 'PPPPP', 'PPPP '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:rib_paper', ['     ', 'PPPP ', 'PPPPP', 'P   P', '     '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:spine_paper', ['   PP', '  PPP', ' PPPP', 'PPPP ', 'PPP  '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:spleen_paper', [' PPP ', 'PPPPP', ' PPPP', 'PPPPP', ' PPP '], { P: 'minecraft:paper' })
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:stomach_paper', [' PPP ', '  PPP', 'P PPP', 'PPPPP', ' PPP '], { P: 'minecraft:paper' })

    // 神之笔
    event.recipes.summoningrituals
        .altar('kubejs:ritual_catalyst')
        .id('mrqx_extra_pack:ritual_divine_pen')
        .input('32x minecraft:ink_sac')
        .input('32x minecraft:glow_ink_sac')
        .input('16x supplementaries:antique_ink')
        .input('16x irons_spellbooks:legendary_ink')
        .input('kubejs:red_ink')
        .input('kubejs:bad_ink')
        .input('16x supplementaries:feather_block')
        .input('32x minecraft:feather')
        .input('kubejs:feather')
        .input('16x unusualprehistory:raptor_feathers')
        .input('16x unusualprehistory:austro_feather')
        .input('16x iceandfire:amphithere_feather')
        .input('16x iceandfire:stymphalian_bird_feather')
        .itemOutput('mrqx_extra_pack:divine_pen')
        .recipeTime(500)

    // 迷你末地水晶
    event.recipes.summoningrituals
        .altar('kubejs:nether_star_shard')
        .id('mrqx_extra_pack:ritual_mini_end_crystal')
        .input('minecraft:end_crystal')
        .itemOutput('mrqx_extra_pack:mini_end_crystal')
        .sacrifice('minecraft:end_crystal', 1)
        .sacrificeRegion(3, 3)
        .recipeTime(500)

    // 反应舱室
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:reactor_chamber', [
        'ESSSP',
        'SS SS',
        'S   S',
        'SS SS',
        'PSSSE'
    ], {
        S: 'create:sturdy_sheet',
        E: 'create:electron_tube',
        P: 'create:precision_mechanism'
    })

    // 裂变反应堆
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:fission_reactor').withChance(70.0),
        Item.of('mrqx_extra_pack:reactor_chamber').withChance(29.9),
        Item.of('create:cuckoo_clock').withChance(0.1),
    ], 'mrqx_extra_pack:reactor_chamber', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_fission_reactor', ['mrqx_extra_pack:incomplete_fission_reactor', 'create:precision_mechanism']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_fission_reactor', ['mrqx_extra_pack:incomplete_fission_reactor', 'create:sturdy_sheet']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_fission_reactor', ['mrqx_extra_pack:incomplete_fission_reactor', 'create:content_observer']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_fission_reactor', ['mrqx_extra_pack:incomplete_fission_reactor', 'create:sequenced_gearshift']),
    ]).transitionalItem('mrqx_extra_pack:incomplete_fission_reactor').loops(3)

    // 反应散热器
    event.recipes.kubejs.shaped(Item.of('mrqx_extra_pack:heat_vent', 1), [
        'ES ',
        'SPS',
        'RSM'
    ],
        {
            R: 'mrqx_extra_pack:reactor_chamber',
            S: 'create:sturdy_sheet',
            E: 'create:electron_tube',
            M: 'create:precision_mechanism',
            P: 'create:propeller'
        })

    // 反应热隔层
    event.recipes.kubejs.shaped(Item.of('mrqx_extra_pack:thermal_barrier', 1), [
        'SWS',
        'WEW',
        'SWS'
    ],
        {
            E: 'mrqx_extra_pack:reactor_chamber',
            S: 'create:sturdy_sheet',
            W: '#minecraft:wool'
        })

    // 反应热喷口
    event.recipes.kubejs.shaped(Item.of('mrqx_extra_pack:thermal_injector', 1), [
        ' F ',
        ' E ',
        'SMS'
    ],
        {
            E: 'mrqx_extra_pack:reactor_chamber',
            S: 'create:sturdy_sheet',
            M: 'create:precision_mechanism',
            F: 'create:encased_fan'
        })

    // 黄金天秤
    event.recipes.kubejs.shaped(Item.of('mrqx_extra_pack:golden_libra', 1), [
        'WTW',
        'SRS',
        'GGG'
    ],
        {
            S: 'create:golden_sheet',
            W: 'createaddition:gold_wire',
            R: 'createaddition:gold_rod',
            G: 'minecraft:gold_ingot',
            T: 'minecraft:totem_of_undying'
        })

    // 冒险者证章
    event.recipes.kubejs.shaped(Item.of('mrqx_extra_pack:adventurers_badge', 1), [
        ' C ',
        ' A ',
        ' M '
    ],
        {
            A: 'wares:completed_delivery_agreement',
            M: 'kubejs:mysterious_trinket',
            C: 'lightmanscurrency:coin_diamond'
        })

    // 粗铀
    event.recipes.createoreexcavation
        .drilling("mrqx_extra_pack:raw_uranium", '{"text": "铀矿"}', 2, 800)
        .alwaysInfinite()
        .stress(1024)
        .biomeWhitelist('minecraft:is_overworld')
        .id('kubejs:drilling_raw_uranium')

    // 铀
    event.recipes.createMixing('mrqx_extra_pack:uranium', [
        'create:powdered_obsidian',
        'createaddition:diamond_grit',
        'mrqx_extra_pack:raw_uranium'
    ]).superheated()

    // 反应燃料
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:nuclear_fuel').withChance(70.0),
        Item.of('createaddition:iron_rod').withChance(29.9),
        Item.of('minecraft:tnt').withChance(0.09),
        Item.of('witherstormmod:super_tnt').withChance(0.01),
    ], 'create:iron_sheet', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_nuclear_fuel', ['mrqx_extra_pack:incomplete_nuclear_fuel', 'mrqx_extra_pack:uranium']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_nuclear_fuel', ['mrqx_extra_pack:incomplete_nuclear_fuel', 'create:iron_sheet']),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_nuclear_fuel', 'mrqx_extra_pack:incomplete_nuclear_fuel'),
    ]).transitionalItem('mrqx_extra_pack:incomplete_nuclear_fuel').loops(3)

    // 荣耀之魂
    event.recipes.summoningrituals
        .altar('minecraft:wooden_sword')
        .id('mrqx_extra_pack:ritual_proud_soul')
        .input('alexsmobs:soul_heart')
        .input('meetyourfight:phantoplasm')
        .input('art_of_forging:dragon_soul')
        .input('bosses_of_mass_destruction:ancient_anima')
        .itemOutput('mrqx_extra_pack:proud_soul')
        .recipeTime(500)

    // 死狱之魂
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:proud_soul')
        .id('mrqx_extra_pack:ritual_prison_soul')
        .input('goety:unholy_blood')
        .input('graveyard:vial_of_blood')
        .input('hexerei:blood_bottle')
        .input('#iceandfire:dragon_bloods')
        .itemOutput('mrqx_extra_pack:prison_soul')
        .recipeTime(500)

    // 山月之魂
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:proud_soul')
        .id('mrqx_extra_pack:ritual_moon_soul')
        .input('64x minecraft:stone')
        .input('minecraft:goat_horn')
        .input('hexerei:selenite_block')
        .input('nameless_trinkets:moon_stone')
        .dayTime('night')
        .itemOutput('mrqx_extra_pack:moon_soul')
        .recipeTime(500)

    // 散发着光亮的种子
    event.recipes.summoningrituals
        .altar('#forge:seeds')
        .id('mrqx_extra_pack:ritual_shining_seed')
        .input('64x minecraft:glowstone_dust')
        .input('4x irons_spellbooks:divine_pearl')
        .input('4x minecraft:lantern')
        .dayTime('day')
        .itemOutput('mrqx_extra_pack:shining_seed')
        .recipeTime(500)

    // 耀阳种子
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:shining_seed')
        .id('mrqx_extra_pack:ritual_sun_seed')
        .input('4x meetyourfight:phantoplasm')
        .input('4x bosses_of_mass_destruction:obsidian_heart')
        .input('4x cataclysm:ignitium_ingot')
        .input('4x minecraft:heart_of_the_sea')
        .dayTime('day')
        .itemOutput('mrqx_extra_pack:sun_seed')
        .recipeTime(1000)

    // 暗日种子
    registerCustomRecipe(new GoetyRitualRecipe('lich', [
        Item.of('kubejs:pandora_active'),
        Item.of('biomancy:corrosive_additive'),
        Item.of('goety:undeath_potion'),
        Item.of('goety:philosophers_stone')],
        Item.of('mrqx_extra_pack:sun_seed'),
        Item.of('mrqx_extra_pack:dark_sun_seed')).setSoulCost(2000))

    // 噩梦醇
    registerCustomRecipe(new BioForgingRecipe([
        {
            'count': 16, 'item': 'biomancy:withering_ooze'
        }, {
            'count': 16, 'item': 'biomancy:toxin_extract'
        }, {
            'count': 16, 'item': 'biomancy:insomnia_cure'
        }, {
            'count': 1, 'item': 'kubejs:long_lasting_pill'
        }, {
            'count': 1, 'item': 'nameless_trinkets:sleeping_pills'
        }],
        Item.of('mrqx_extra_pack:marenol'))
        .setNutrientsCost(32))

    // 肿瘤诱变剂
    registerCustomRecipe(new BioForgingRecipe([
        {
            'count': 4, 'item': 'biomancy:volatile_fluid'
        }, {
            'count': 2, 'item': 'biomancy:malignant_flesh'
        }, {
            'count': 8, 'item': 'biomancy:organic_matter'
        }, {
            'count': 2, 'item': 'biomancy:ageing_serum'
        }, {
            'count': 1, 'item': 'kubejs:random_tumor'
        }],
        Item.of('mrqx_extra_pack:tumor_mutagen'))
        .setNutrientsCost(32))

    // 活化巨瘤
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'mrqx_extra_pack:malignant_tumor' }, { 'count': 1, 'item': 'mrqx_extra_pack:activated_giant_tumor' }))

    // 便携式体检仪
    event.recipes.kubejs.shaped(Item.of('mrqx_extra_pack:portable_medical_checkup_device', 1), [
        'INI',
        'RBR',
        'IGI'
    ],
        {
            N: 'create:nixie_tube',
            B: 'kubejs:blood_extractor',
            I: 'create:iron_sheet',
            G: 'minecraft:tinted_glass',
            R: 'minecraft:redstone'
        })

    // 风暴重锤
    registerCustomRecipe(new GoetyRitualRecipe('storm', [
        Item.of('goety:discharge_focus'),
        Item.of('irons_spellbooks:lightning_bottle'),
        Ingredient.of('#forge:storage_blocks/copper'),
        Ingredient.of('#forge:storage_blocks/iron')],
        Item.of('kubejs:mace'),
        Item.of('mrqx_extra_pack:storm_mace')).setSoulCost(100))

    // 反物质器官
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:lung_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:lung_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:muscle_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:muscle_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:intestine_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:intestine_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:rib_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:rib_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:spine_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:spine_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:spleen_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:spleen_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:stomach_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:stomach_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:kidney_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:kidney_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:liver_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:liver_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:appendix_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:appendix_antimatter' }).setEnergy(10000))
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'kubejs:heart_template' }, { 'count': 1, 'item': 'mrqx_extra_pack:heart_antimatter' }).setEnergy(100000))

    // 梦魇之触
    registerCustomRecipe(new BioForgingRecipe([
        {
            'count': 2, 'item': 'biomancy:withering_ooze'
        }, {
            'count': 8, 'item': 'biomancy:primal_flesh'
        }, {
            'count': 8, 'item': 'graveyard:corruption'
        }, {
            'count': 1, 'item': 'kubejs:candy_pancreas'
        }, {
            'count': 1, 'item': 'mrqx_extra_pack:malignant_tumor'
        }],
        Item.of('mrqx_extra_pack:nightmare_tentacles'))
        .setNutrientsCost(48))

    // 激活·冰龙宝玉
    event.recipes.summoningrituals
        .altar('kubejs:ice_dragon_bead')
        .id('mrqx_extra_pack:ritual_active_ice_dragon_bead')
        .input('nameless_trinkets:ice_cube')
        .input('goety:frost_breath_focus')
        .input('iceandfire:summoning_crystal_ice')
        .input('16x iceandfire:frost_lily')
        .input('4x irons_spellbooks:ice_upgrade_orb')
        .itemOutput('mrqx_extra_pack:active_ice_dragon_bead')
        .recipeTime(500)

    // 激活·火龙宝玉
    event.recipes.summoningrituals
        .altar('kubejs:fire_dragon_bead')
        .id('mrqx_extra_pack:ritual_active_fire_dragon_bead')
        .input('nameless_trinkets:blaze_nucleus')
        .input('goety:fire_breath_focus')
        .input('iceandfire:summoning_crystal_fire')
        .input('16x iceandfire:fire_lily')
        .input('4x irons_spellbooks:fire_upgrade_orb')
        .itemOutput('mrqx_extra_pack:active_fire_dragon_bead')
        .recipeTime(500)

    // 激活·电龙宝玉
    event.recipes.summoningrituals
        .altar('kubejs:lightning_dragon_bead')
        .id('mrqx_extra_pack:ritual_active_lightning_dragon_bead')
        .input('nameless_trinkets:pocket_lightning_rod')
        .input('goety:thunderbolt_focus')
        .input('iceandfire:summoning_crystal_lightning')
        .input('16x iceandfire:lightning_lily')
        .input('4x irons_spellbooks:lightning_upgrade_orb')
        .itemOutput('mrqx_extra_pack:active_lightning_dragon_bead')
        .recipeTime(500)

    // 激活·末影龙宝玉 
    event.recipes.summoningrituals
        .altar('chestcavity:mana_reactor')
        .id('mrqx_extra_pack:ritual_active_ender_dragon_bead')
        .input('art_of_forging:enigmatic_construct')
        .input('art_of_forging:dragon_soul')
        .input('8x minecraft:end_crystal')
        .input('16x minecraft:dragon_breath')
        .input('4x irons_spellbooks:ice_upgrade_orb')
        .itemOutput('mrqx_extra_pack:active_ender_dragon_bead')
        .recipeTime(500)

    // 风暴之星碎片
    event.recipes.create.crushing([
        Item.of('3x mrqx_extra_pack:withered_nether_star_shard'),
        Item.of('mrqx_extra_pack:withered_nether_star_shard').withChance(0.3)
    ], 'witherstormmod:withered_nether_star').processingTime(1000)

    event.recipes.summoningrituals
        .altar('witherstormmod:command_block_book')
        .id('mrqx_extra_pack:ritual_withered_nether_star')
        .input('mrqx_extra_pack:withered_nether_star_shard')
        .input('mrqx_extra_pack:storm_metal_ingot')
        .input('mrqx_extra_pack:withered_nether_star_shard')
        .input('mrqx_extra_pack:storm_metal_ingot')
        .input('mrqx_extra_pack:withered_nether_star_shard')
        .input('mrqx_extra_pack:storm_metal_ingot')
        .input('kubejs:nether_star_shard')
        .input('mrqx_extra_pack:storm_metal_ingot')
        .itemOutput('witherstormmod:withered_nether_star')
        .recipeTime(500)

    // 风暴金属锭
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:storm_metal_ingot').withChance(90.0),
        Item.of('witherstormmod:command_block_book').withChance(10.0)
    ], 'kubejs:relic_metal_ingot', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_storm_metal_ingot', ['mrqx_extra_pack:incomplete_storm_metal_ingot', 'kubejs:storm_metal_plate']),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_storm_metal_ingot', ['mrqx_extra_pack:incomplete_storm_metal_ingot', Fluid.of('minecraft:water').withAmount(1000)]),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_storm_metal_ingot', 'mrqx_extra_pack:incomplete_storm_metal_ingot'),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_storm_metal_ingot', ['mrqx_extra_pack:incomplete_storm_metal_ingot', 'kubejs:storm_metal_plate']),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_storm_metal_ingot', ['mrqx_extra_pack:incomplete_storm_metal_ingot', Fluid.of('minecraft:lava').withAmount(1000)]),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_storm_metal_ingot', 'mrqx_extra_pack:incomplete_storm_metal_ingot')
    ]).transitionalItem('mrqx_extra_pack:incomplete_storm_metal_ingot').loops(1)


    // 压缩饼干
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:compressed_biscuit').withChance(90.0),
        Item.of('extradelight:sugar_cookie_block_item').withChance(10.0)
    ], '#forge:flour', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_compressed_biscuit', ['mrqx_extra_pack:incomplete_compressed_biscuit', '#forge:flour']),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit')
    ]).transitionalItem('mrqx_extra_pack:incomplete_compressed_biscuit').loops(256)

    // 黄金压缩饼干
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:golden_compressed_biscuit').withChance(10.0),
        Item.of('mrqx_extra_pack:compressed_biscuit').withChance(90.0)
    ], 'mrqx_extra_pack:compressed_biscuit', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_golden_compressed_biscuit', ['mrqx_extra_pack:incomplete_golden_compressed_biscuit', '#forge:nuggets/gold']),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit')
    ]).transitionalItem('mrqx_extra_pack:incomplete_golden_compressed_biscuit').loops(9)

    // 深海器官挑战
    event.recipes.summoningrituals
        .altar('gateways:gate_pearl')
        .id('mrqx_extra_pack:ritual_shadow_of_caerula_arbor')
        .input('somebosses:cursed_spring_water')
        .input('minecraft:water_bucket')
        .input('16x kubejs:water_candy')
        .input('nameless_trinkets:true_heart_of_the_sea')
        .input('iceandfire:seaserpent_skull')
        .input('32x #iceandfire:scales/sea_serpent')
        .input('cataclysm:abyssal_egg')
        .input('kubejs:secret_of_rain')
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:shadow_of_caerula_arbor"}'))
        .recipeTime(500)

    // 充能刀刃
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'art_of_forging:ancient_blade' }, { 'count': 1, 'item': 'mrqx_extra_pack:charged_blade' }).setEnergy(100000))

    // 先进单片镜
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass'), [
        'kubejs:archivist_eyeglass',
        Ingredient.of('#kubejs:mrqx_cpu'),
    ])
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGSweetDream:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:candy_focus'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGSweetDream', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_sweet_dream_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGElement:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:mrqx_element_damage'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGElement', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_01_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGDragonPower:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:dragon'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGDragonPower', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_02_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGInfinityBeats:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        'kubejs:infinity_beats',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGInfinityBeats', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_infinity_beats_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGNuclear:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:mrqx_nuclear'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGNuclear', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_11_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGSteam:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:mrqx_steam'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGSteam', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_12_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGBurningAndFlaringHeart:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:machine'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGBurningAndFlaringHeart', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_13_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGPrisonSoul:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        'mrqx_extra_pack:prison_soul',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGPrisonSoul', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_prison_soul_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGMoonSoul:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        'mrqx_extra_pack:moon_soul',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGMoonSoul', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_moon_soul_manual_only')
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGMarenol:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        'mrqx_extra_pack:marenol',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"))
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGMarenol', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_marenol_manual_only')

    // 灵魂之翼
    registerCustomRecipe(new GoetyRitualRecipe('sky', [
        Item.of('goety:ectoplasm'),
        Item.of('goety:ectoplasm'),
        Item.of('goety:ectoplasm'),
        Item.of('goety:ectoplasm')],
        Item.of('minecraft:elytra'),
        Item.of('mrqx_extra_pack:wing_of_soul')).setSoulCost(200))

    // 永恒灵魂之翼
    registerCustomRecipe(new GoetyRitualRecipe('sky', [
        Item.of('goety:ectoplasm'),
        Item.of('goety:philosophers_stone'),
        Item.of('minecraft:feather'),
        Item.of('nameless_trinkets:ethereal_wings')],
        Item.of('mrqx_extra_pack:wing_of_soul'),
        Item.of('mrqx_extra_pack:eternal_wing_of_soul')).setSoulCost(1000))

    // 指令施法核心
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:command_spell_core').withChance(70.0),
        Item.of('minecraft:book').withChance(30.0),
    ], 'kubejs:command_spell_book', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_command_spell_core', ['mrqx_extra_pack:incomplete_command_spell_core', 'tetra:planar_stabilizer']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_command_spell_core', ['mrqx_extra_pack:incomplete_command_spell_core', 'tetra:chthonic_extractor']),
        event.recipes.create.pressing('mrqx_extra_pack:incomplete_command_spell_core', 'mrqx_extra_pack:incomplete_command_spell_core'),
    ]).transitionalItem('mrqx_extra_pack:incomplete_command_spell_core').loops(1)

    // 金酒之杯
    event.recipes.kubejs.shaped(Item.of('mrqx_extra_pack:golden_chalice', 1), [
        'CCC',
        'BGB',
        'BBB'
    ],
        {
            C: 'lightmanscurrency:coinblock_gold',
            G: 'kubejs:unholy_grail',
            B: 'minecraft:gold_block'
        })

    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:golden_chalice'), [
        'mrqx_extra_pack:golden_chalice',
        'lightmanscurrency:coin_gold',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:golden_chalice"))
            let mrqxGoldenChaliceMoney = result.nbt?.mrqxGoldenChaliceMoney ?? 0
            result = Item.of('mrqx_extra_pack:golden_chalice', { mrqxGoldenChaliceMoney: mrqxGoldenChaliceMoney + 1 })
            return result
        })
        .id('mrqx_golden_chalice_coin_manual_only')

    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:golden_chalice'), [
        'mrqx_extra_pack:golden_chalice',
        'lightmanscurrency:coinpile_gold',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:golden_chalice"))
            let mrqxGoldenChaliceMoney = result.nbt?.mrqxGoldenChaliceMoney ?? 0
            result = Item.of('mrqx_extra_pack:golden_chalice', { mrqxGoldenChaliceMoney: mrqxGoldenChaliceMoney + 9 })
            return result
        })
        .id('mrqx_golden_chalice_coinpile_manual_only')

    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:golden_chalice'), [
        'mrqx_extra_pack:golden_chalice',
        'lightmanscurrency:coinblock_gold',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:golden_chalice"))
            let mrqxGoldenChaliceMoney = result.nbt?.mrqxGoldenChaliceMoney ?? 0
            result = Item.of('mrqx_extra_pack:golden_chalice', { mrqxGoldenChaliceMoney: mrqxGoldenChaliceMoney + 36 })
            return result
        })
        .id('mrqx_golden_chalice_coinblock_manual_only')

    // 复激活药丸
    registerCustomRecipe(new BioForgingRecipe([
        {
            'count': 16, 'item': 'biomancy:hormone_secretion'
        }, {
            'count': 16, 'item': 'biomancy:exotic_dust'
        }, {
            'count': 1, 'item': 'kubejs:long_lasting_pill_gold'
        }],
        Item.of('mrqx_extra_pack:re_active_pill'))
        .setNutrientsCost(32))

    // “道士十五狗”
    event.recipes.summoningrituals
        .altar('moblassos:diamond_lasso')
        .id('mrqx_extra_pack:ritual_taoist_fifteen_dogs')
        .sacrifice('minecraft:wolf', 15)
        .input('15x minecraft:lead')
        .itemOutput('mrqx_extra_pack:taoist_fifteen_dogs')
        .recipeTime(500)

    // “法师控制强”
    event.recipes.summoningrituals
        .altar('goety:nameless_staff')
        .id('mrqx_extra_pack:ritual_mage_control_strong')
        .input('4x irons_spellbooks:ice_upgrade_orb')
        .input('16x irons_spellbooks:frozen_bone')
        .input('goety:hail_focus')
        .input('goety:frost_robe')
        .itemOutput('mrqx_extra_pack:mage_control_strong')
        .recipeTime(500)

    // “战士输出高”
    event.recipes.summoningrituals
        .altar('chestcavity:netherite_cleaver')
        .id('mrqx_extra_pack:ritual_warrior_output_high')
        .input('8x #iceandfire:dragon_bloods')
        .input('16x iceandfire:dragonbone')
        .input('cataclysm:the_incinerator')
        .input('#iceandfire:dragon_skulls')
        .itemOutput('mrqx_extra_pack:warrior_output_high')
        .recipeTime(500)

    // 幽匿引痕体
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [
        Item.of('goety:sculk_converter'),
        Item.of('minecraft:sculk_catalyst'),
        Item.of('minecraft:sculk'),
        Item.of('kubejs:sculk_pieces')],
        Item.of('kubejs:warped_spine'),
        Item.of('mrqx_extra_pack:sculk_brandguider')).setSoulCost(1000))

    // 幽匿之心
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [
        Item.of('goety:sculk_devourer'),
        Item.of('minecraft:sculk_sensor'),
        Item.of('goety:sculk_relay'),
        Item.of('kubejs:sculk_soul')],
        Item.of('kubejs:warped_heart'),
        Item.of('mrqx_extra_pack:sculk_heart')).setSoulCost(1000))

    // 幽匿裂岩体
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [
        Item.of('goety:sculk_converter'),
        Item.of('minecraft:sculk_catalyst'),
        Item.of('minecraft:sculk'),
        Item.of('kubejs:warden_muscle')],
        Item.of('kubejs:warden_muscle'),
        Item.of('mrqx_extra_pack:sculk_rock_breaker')).setSoulCost(1000))

    // 幽匿沉积体
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [
        Item.of('goety:sculk_converter'),
        Item.of('minecraft:sculk_catalyst'),
        Item.of('minecraft:sculk'),
        Item.of('kubejs:warden_rib')],
        Item.of('kubejs:warden_rib'),
        Item.of('mrqx_extra_pack:sculk_depositer')).setSoulCost(1000))

    // 幽匿寄染体
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [
        Item.of('goety:sculk_converter'),
        Item.of('minecraft:sculk_catalyst'),
        Item.of('minecraft:sculk'),
        Item.of('chestcavity:venom_gland')],
        Item.of('kubejs:warden_rib'),
        Item.of('mrqx_extra_pack:sculk_infester')).setSoulCost(1000))

    // 幽匿集养体
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [
        Item.of('goety:sculk_converter'),
        Item.of('minecraft:sculk_catalyst'),
        Item.of('minecraft:sculk'),
        Item.of('kubejs:sculk_pieces')],
        Item.of('kubejs:sculk_soul'),
        Item.of('mrqx_extra_pack:sculk_collectors')).setSoulCost(1000))

    // 幽匿咆哮体
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [
        Item.of('irons_spellbooks:eldritch_manuscript'),
        Item.of('minecraft:sculk_shrieker'),
        Item.of('minecraft:sculk'),
        Item.of('kubejs:sculk_soul')],
        Item.of('kubejs:warden_core'),
        Item.of('mrqx_extra_pack:sculk_growler')).setSoulCost(1000))

    // 诸王的冠冕
    event.recipes.summoningrituals
        .altar('irons_spellbooks:tarnished_helmet')
        .id('mrqx_extra_pack:ritual_kings_crown')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('16x goety:ectoplasm')
        .input('3x irons_spellbooks:ancient_knowledge_fragment')
        .input('5x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_crown')
        .recipeTime(500)

    // 国王的新枪
    event.recipes.summoningrituals
        .altar('alexsmobs:skelewag_sword')
        .id('mrqx_extra_pack:ritual_kings_new_lance')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('2x irons_spellbooks:cinder_essence')
        .input('createaddition:gold_rod')
        .input('6x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_new_lance')
        .recipeTime(500)

    // 国王的护戒
    event.recipes.summoningrituals
        .altar('irons_spellbooks:emerald_stoneplate_ring')
        .id('mrqx_extra_pack:ritual_kings_fellowship')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('irons_spellbooks:invisibility_ring')
        .input('irons_spellbooks:affinity_ring')
        .input('4x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_fellowship')
        .recipeTime(500)

    // 国王的铠甲
    event.recipes.summoningrituals
        .altar('bygonenether:gilded_netherite_chestplate')
        .id('mrqx_extra_pack:ritual_kings_armor')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('minecraft:golden_chestplate')
        .input('cataclysm:ignitium_chestplate')
        .input('8x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_armor')
        .recipeTime(500)

    // 国王的圆饼
    event.recipes.summoningrituals
        .altar('cataclysm:bulwark_of_the_flame')
        .id('mrqx_extra_pack:ritual_kings_buckler')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('goety:star_amulet')
        .input('meetyourfight:ace_of_iron')
        .input('6x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_buckler')
        .recipeTime(500)

    // 国王的枝条
    event.recipes.summoningrituals
        .altar('#forge:tools/shovels')
        .id('mrqx_extra_pack:ritual_kings_staff')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('goety:dark_wand')
        .input('createaddition:electrum_rod')
        .input('3x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_staff')
        .recipeTime(500)

    // 国王的延伸
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:kings_staff')
        .id('mrqx_extra_pack:ritual_kings_extension')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('goety:nameless_staff')
        .input('irons_spellbooks:blood_staff')
        .input('3x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_extension')
        .recipeTime(500)

    // 国王的水晶
    event.recipes.summoningrituals
        .altar('cataclysm:abyssal_sacrifice')
        .id('mrqx_extra_pack:ritual_kings_crystal')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('goety:soul_emerald')
        .input('cataclysm:void_stone')
        .input('3x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_crystal')
        .recipeTime(500)

    // 脆肚
    registerCustomRecipe(new CookingRecipe(
        Item.of('minecraft:bowl'),
        [
            Item.of('kubejs:king_of_stomach'),
            Ingredient.of('#kubejs:stomach'),
            Ingredient.of('#minecraft:saplings'),
            Item.of('extradelight:cooking_oil'),
            Item.of('extradelight:cooking_oil'),
            Item.of('extradelight:grated_ginger')],
        Item.of('mrqx_extra_pack:crispy_belly').withCount(1))
        .setCookingtime(149 * 20))

    // 残阳
    event.recipes.create.crushing('mrqx_extra_pack:broken_sun', 'mrqx_extra_pack:sun_seed', 24000)

    // ‌月岩
    event.recipes.kubejs.shapeless('mrqx_extra_pack:moon_rock', ['nameless_trinkets:moon_stone'])

    // 日晷
    event.recipes.kubejs.shaped('mrqx_extra_pack:sundial', [
        ' S ',
        ' I ',
        'RRR',
    ], {
        'S': 'mrqx_extra_pack:sun_seed',
        'I': 'createaddition:iron_rod',
        'R': '#forge:stone'
    })

    // ‌星空棱镜
    event.recipes.kubejs.shaped('mrqx_extra_pack:starry_sky_prism', [
        ' S ',
        ' G ',
        ' O ',
    ], {
        'S': '#forge:nether_stars',
        'G': '#forge:glass',
        'O': 'minecraft:gold_ingot'
    })

    // 黑洞
    registerCustomRecipe(new CreateAdditionCharging(
        { 'count': 1, 'item': 'mrqx_extra_pack:dark_sun_seed' },
        { 'count': 1, 'item': 'mrqx_extra_pack:black_hole' }
    ).setEnergy(250000))
    registerCustomRecipe(new CreateAdditionCharging(
        { 'count': 1, 'item': 'mrqx_extra_pack:white_hole' },
        { 'count': 1, 'item': 'mrqx_extra_pack:black_hole' }
    ).setEnergy(50000))

    // 白洞
    registerCustomRecipe(new CreateAdditionCharging(
        { 'count': 1, 'item': 'mrqx_extra_pack:black_hole' },
        { 'count': 1, 'item': 'mrqx_extra_pack:white_hole' }
    ).setEnergy(50000))

    // ‌太阳光镜
    event.recipes.kubejs.shaped('mrqx_extra_pack:solar_mirror', [
        'SIS',
        'IGI',
        'SIS',
    ], {
        'I': 'createaddition:iron_rod',
        'G': '#forge:glass_panes',
        'S': '#forge:string'
    })

    // ‌流星雨引导仪
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:meteor_shower_director').withChance(90.0),
        Item.of('mrqx_extra_pack:starry_sky_prism').withChance(10.0)
    ], 'mrqx_extra_pack:cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_meteor_shower_director', ['mrqx_extra_pack:incomplete_meteor_shower_director', 'mrqx_extra_pack:starry_sky_prism']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_meteor_shower_director', ['mrqx_extra_pack:incomplete_meteor_shower_director', '#forge:nether_stars']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_meteor_shower_director', ['mrqx_extra_pack:incomplete_meteor_shower_director', 'irons_spellbooks:arcane_salvage'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_meteor_shower_director').loops(1)

    // 处理器
    registerCustomRecipe(new CreateAdditionCharging(
        { 'count': 1, 'item': 'mrqx_extra_pack:basic_uncoded_cpu' },
        { 'count': 1, 'item': 'mrqx_extra_pack:cpu' }
    ).setEnergy(100))

    // 魔能速充处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:magic_fast_charging_cpu').withChance(50.0),
        Item.of('mrqx_extra_pack:cpu').withChance(50.0)
    ], 'mrqx_extra_pack:basic_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:amethyst_resonance_charm']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:amethyst_resonance_charm']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:magic']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:cinder_essence'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // 魔能过载处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:magic_overload_cpu').withChance(70.0),
        Item.of('mrqx_extra_pack:cpu').withChance(30.0)
    ], 'mrqx_extra_pack:basic_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:cooldown_ring']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:cast_time_ring']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:magic']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:cinder_essence'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // 魔能“玻璃大炮”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:magic_glass_cannon_cpu').withChance(40.0),
        Item.of('mrqx_extra_pack:cpu').withChance(60.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:ancient_knowledge_fragment']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:arcane_salvage']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:magic']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'irons_spellbooks:cinder_essence'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // 玫瑰“再度绽放”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:rose_second_bloom_cpu').withChance(40.0),
        Item.of('mrqx_extra_pack:cpu').withChance(60.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'minecraft:wither_rose']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:rose']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'create:polished_rose_quartz']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'minecraft:rose_bush'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌机械储能处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:machine_storage_cpu').withChance(70.0),
        Item.of('mrqx_extra_pack:cpu').withChance(30.0)
    ], 'mrqx_extra_pack:basic_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#forge:storage_blocks']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:machine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:resource']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'toms_storage:ts.inventory_connector'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌机械“午夜狂飙”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:machine_midnight_race_cpu').withChance(40.0),
        Item.of('mrqx_extra_pack:cpu').withChance(60.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'create:speedometer']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:machine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'modulargolems:speed']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'nameless_trinkets:speed_force'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌机械“熔核之心”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:machine_burn_flare_heart_cpu').withChance(40.0),
        Item.of('mrqx_extra_pack:cpu').withChance(60.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'minecraft:coal_block']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:machine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'kubejs:burning_heart']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'kubejs:furnace_core'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌机械“核能之心”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:machine_nuclear_heart_cpu').withChance(40.0),
        Item.of('mrqx_extra_pack:cpu').withChance(60.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:mrqx_nuclear']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'mrqx_extra_pack:nuclear_fuel']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:machine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'mrqx_extra_pack:fission_reactor'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌机械闪避处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:machine_dodge_cpu').withChance(70.0),
        Item.of('mrqx_extra_pack:cpu').withChance(30.0)
    ], 'mrqx_extra_pack:basic_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'create:speedometer']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'modulargolems:speed']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:machine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'nameless_trinkets:speed_force'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌机械格挡处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:machine_parry_cpu').withChance(70.0),
        Item.of('mrqx_extra_pack:cpu').withChance(30.0)
    ], 'mrqx_extra_pack:basic_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'mrqx_extra_pack:charged_blade']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'kubejs:telescopic_attack_arm']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:machine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'create:brass_hand'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌机械“会心一击”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:machine_critical_cpu').withChance(40.0),
        Item.of('mrqx_extra_pack:cpu').withChance(60.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:damage']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:damage_only']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:machine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'minecraft:netherite_sword'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌机械“挖矿”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:machine_mine_cpu').withChance(50.0),
        Item.of('mrqx_extra_pack:cpu').withChance(50.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:resource']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'kubejs:ore_lung']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:machine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#forge:ores'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // 玫瑰“花语”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:rose_language_cpu').withChance(50.0),
        Item.of('mrqx_extra_pack:cpu').withChance(50.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'minecraft:bone_meal']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:rose']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'create:polished_rose_quartz']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'minecraft:rose_bush'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌深海“灯塔”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:seaborn_beacon_cpu').withChance(50.0),
        Item.of('mrqx_extra_pack:cpu').withChance(50.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:mrqx_seaborn']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'minecraft:beacon']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#minecraft:beacon_payment_items']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'cataclysm:the_baby_leviathan_bucket'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // 天体“占星”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:celestial_body_astrology_cpu').withChance(50.0),
        Item.of('mrqx_extra_pack:cpu').withChance(50.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:mrqx_celestial_body']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:mrqx_celestial_body']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:mrqx_celestial_body']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:mrqx_celestial_body'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // 蒸汽“动力”处理器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:steam_power_cpu').withChance(50.0),
        Item.of('mrqx_extra_pack:cpu').withChance(50.0)
    ], 'mrqx_extra_pack:advanced_uncoded_cpu', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', '#kubejs:mrqx_steam']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'create:steam_engine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'create:steam_whistle']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_cpu', ['mrqx_extra_pack:incomplete_cpu', 'kubejs:revolution_steam_engine'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_cpu').loops(1)

    // ‌原罪·暴怒「萨迈尔」
    event.recipes.summoningrituals
        .altar('kubejs:wrath_shard')
        .id('mrqx_extra_pack:ritual_sin_ira_samael')
        .input('cataclysm:void_forge')
        .input('cataclysm:monstrous_helm')
        .input('goety:philosophers_stone')
        .input('witherstormmod:withered_nether_star')
        .itemOutput('mrqx_extra_pack:sin_ira_samael')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(777)

    // ‌‌原罪·懒惰「贝尔芬格」
    event.recipes.summoningrituals
        .altar('kubejs:sloth_shard')
        .id('mrqx_extra_pack:ritual_sin_acedia_belphegor')
        .input('#minecraft:beds')
        .input('bosses_of_mass_destruction:mob_ward')
        .input('mrqx_extra_pack:marenol')
        .input('goety:philosophers_stone')
        .input('witherstormmod:withered_nether_star')
        .itemOutput('mrqx_extra_pack:sin_acedia_belphegor')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(777)

    // ‌‌原罪·嫉妒「利维坦」
    event.recipes.summoningrituals
        .altar('kubejs:envy_shard')
        .id('mrqx_extra_pack:ritual_sin_invidia_leviathan')
        .input('cataclysm:gauntlet_of_guard')
        .input('7x supplementaries:bomb_blue')
        .input('goety:philosophers_stone')
        .input('witherstormmod:withered_nether_star')
        .itemOutput('mrqx_extra_pack:sin_invidia_leviathan')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(777)

    // 原罪·贪食「别西卜」
    event.recipes.summoningrituals
        .altar('kubejs:gluttony_shard')
        .id('mrqx_extra_pack:ritual_sin_gula_beelzebub')
        .input('7x unusualprehistory:blue_fruit')
        .input('kubejs:void_worm_stomach')
        .input('goety:philosophers_stone')
        .input('witherstormmod:withered_nether_star')
        .itemOutput('mrqx_extra_pack:sin_gula_beelzebub')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(777)

    // ‌原罪·贪婪「玛门」
    event.recipes.summoningrituals
        .altar('kubejs:greed_shard')
        .id('mrqx_extra_pack:ritual_sin_avaritia_mammon')
        .input('#minecraft:music_discs')
        .input('7x lightmanscurrency:coinblock_netherite')
        .input('goety:philosophers_stone')
        .input('witherstormmod:withered_nether_star')
        .itemOutput('mrqx_extra_pack:sin_avaritia_mammon')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(777)

    // ‌原罪·色欲「阿斯莫德」
    event.recipes.summoningrituals
        .altar('kubejs:lust_shard')
        .id('mrqx_extra_pack:ritual_sin_luxuria_asmodeus')
        .input('7x biomancy:breeding_stimulant')
        .input('simplehats:sheep')
        .input('goety:philosophers_stone')
        .input('witherstormmod:withered_nether_star')
        .itemOutput('mrqx_extra_pack:sin_luxuria_asmodeus')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(777)

    // ‌原罪·傲慢「路西法」
    event.recipes.summoningrituals
        .altar('kubejs:pride_shard')
        .id('mrqx_extra_pack:ritual_sin_superbia_lucifer')
        .input('mrqx_extra_pack:white_hole')
        .input('mrqx_extra_pack:kings_crown')
        .input('goety:philosophers_stone')
        .input('witherstormmod:withered_nether_star')
        .itemOutput('mrqx_extra_pack:sin_superbia_lucifer')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(777)

    // ‌原罪·罪源
    event.recipes.summoningrituals
        .altar('witherstormmod:withered_nether_star')
        .id('mrqx_extra_pack:ritual_origin_sin')
        .input('mrqx_extra_pack:sin_ira_samael')
        .input('mrqx_extra_pack:sin_acedia_belphegor')
        .input('mrqx_extra_pack:sin_invidia_leviathan')
        .input('mrqx_extra_pack:sin_gula_beelzebub')
        .input('mrqx_extra_pack:sin_avaritia_mammon')
        .input('mrqx_extra_pack:sin_luxuria_asmodeus')
        .input('mrqx_extra_pack:sin_superbia_lucifer')
        .itemOutput('mrqx_extra_pack:origin_sin')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(7777)

    // ‌蒸汽动力机
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:steam_power_engine').withChance(70.0),
        Item.of('kubejs:revolution_steam_engine').withChance(30.0)
    ], 'mrqx_extra_pack:worn_out_steam_engine', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', 'art_of_forging:forged_steel_ingot']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', 'kubejs:relic_metal_plate']),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', Fluid.of('minecraft:water').withAmount(1000)]),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', Fluid.of('minecraft:lava').withAmount(1000)])
    ]).transitionalItem('mrqx_extra_pack:incomplete_worn_out_steam_engine').loops(1)

    // ‌蒸汽动力涡轮
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:steam_power_turbine').withChance(70.0),
        Item.of('kubejs:revolution_steam_engine').withChance(30.0)
    ], 'mrqx_extra_pack:steam_power_engine', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_steam_power_engine', ['mrqx_extra_pack:incomplete_steam_power_engine', 'mrqx_extra_pack:reactor_chamber']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_steam_power_engine', ['mrqx_extra_pack:incomplete_steam_power_engine', 'create:sturdy_sheet'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_steam_power_engine').loops(2)

    // 蒸汽汽轮机
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:steam_turbine').withChance(70.0),
        Item.of('kubejs:revolution_steam_engine').withChance(30.0)
    ], 'mrqx_extra_pack:worn_out_steam_engine', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', '#forge:rods/iron']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', 'create:propeller']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', 'create:sturdy_sheet'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_worn_out_steam_engine').loops(5)

    // 蒸汽引擎
    registerCustomRecipe(new CataclysmWeaponFusion(
        Item.of('mrqx_extra_pack:worn_out_steam_engine'),
        Item.of('mrqx_extra_pack:worn_out_steam_engine'),
        Item.of('mrqx_extra_pack:steam_engine')))

    // 蒸汽甲胄
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:steam_armor', [
        'SB BS',
        'BSCSB',
        'BSPSB',
        'BSSSB',
        ' BBB '
    ], {
        B: 'create:brass_sheet',
        S: 'create:sturdy_sheet',
        C: 'create:contraption_controls',
        P: 'create:precision_mechanism'
    })

    // 蒸汽刺剑
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:steam_rapier', [
        ' B B ',
        ' STS ',
        'BSCSB',
        'SBBBS'
    ], {
        B: 'create:brass_sheet',
        S: 'create:sturdy_sheet',
        C: 'create:contraption_controls',
        T: 'mrqx_extra_pack:thermal_injector'
    })

    // ‌蒸汽液压杆
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:steam_hydraulic_rod').withChance(90.0),
        Item.of('iron_rod:iron_rod').withChance(10.0)
    ], 'tetra:chthonic_extractor', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', 'createaddition:iron_rod']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', 'tetra:chthonic_extractor']),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_worn_out_steam_engine', ['mrqx_extra_pack:incomplete_worn_out_steam_engine', Fluid.of('minecraft:water').withAmount(100)]),
    ]).transitionalItem('mrqx_extra_pack:incomplete_worn_out_steam_engine').loops(3)

    // ‌蒸汽增压引擎
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:steam_supercharge_engine').withChance(70.0),
        Item.of('kubejs:revolution_steam_engine').withChance(30.0)
    ], 'mrqx_extra_pack:steam_power_engine', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_steam_power_engine', ['mrqx_extra_pack:incomplete_steam_power_engine', 'mrqx_extra_pack:steam_power_engine']),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_steam_power_engine', ['mrqx_extra_pack:incomplete_steam_power_engine', Fluid.of('minecraft:water').withAmount(1000)]),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_steam_power_engine', ['mrqx_extra_pack:incomplete_steam_power_engine', Fluid.of('minecraft:lava').withAmount(1000)])
    ]).transitionalItem('mrqx_extra_pack:incomplete_steam_power_engine').loops(2)

    // ‌“怒守”
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:furious_defense').withChance(70.0),
        Item.of('kubejs:revolution_steam_engine').withChance(30.0)
    ], 'mrqx_extra_pack:steam_power_engine', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_steam_power_engine', ['mrqx_extra_pack:incomplete_steam_power_engine', 'mrqx_extra_pack:steam_rapier']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_steam_power_engine', ['mrqx_extra_pack:incomplete_steam_power_engine', 'mrqx_extra_pack:steam_supercharge_engine']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_steam_power_engine', ['mrqx_extra_pack:incomplete_steam_power_engine', 'mrqx_extra_pack:steam_engine'])
    ]).transitionalItem('mrqx_extra_pack:incomplete_steam_power_engine').loops(2)

    // 天师仪
    event.recipes.summoningrituals
        .altar('create:precision_mechanism')
        .id('mrqx_extra_pack:ritual_tianshi_yi')
        .input('64x minecraft:bone_meal')
        .input('minecraft:netherite_hoe')
        .input('#kubejs:mrqx_cpu')
        .input('64x #forge:seeds')
        .itemOutput('mrqx_extra_pack:tianshi_yi')
        .recipeTime(500)

    // 长伸缩活塞臂
    registerCustomRecipe(new CataclysmWeaponFusion(
        Item.of('kubejs:telescopic_tool_arm'),
        Item.of('create:piston_extension_pole'),
        Item.of('mrqx_extra_pack:long_telescopic_piston_arm')))

    // 长伸缩攻击臂
    registerCustomRecipe(new CataclysmWeaponFusion(
        Item.of('kubejs:telescopic_attack_arm'),
        Item.of('create:piston_extension_pole'),
        Item.of('mrqx_extra_pack:long_telescopic_attack_arm')))

    // ‌巧克力铸币机
    event.recipes.kubejs.shaped('mrqx_extra_pack:chocolate_coinage_machine', [
        'SPS',
        'ICI',
        'RRR',
    ], {
        'I': 'createaddition:iron_rod',
        'C': 'create:chocolate_bucket',
        'S': 'create:iron_sheet',
        'P': 'create:mechanical_piston',
        'R': 'minecraft:smooth_stone'
    })

    // ‌“记录者”
    event.recipes.summoningrituals
        .altar('#forge:nether_stars')
        .id('mrqx_extra_pack:ritual_recorder')
        .input('64x #forge:books')
        .input('minecraft:enchanted_book')
        .input('#kubejs:isb_spell_book')
        .input('64x irons_spellbooks:ancient_knowledge_fragment')
        .itemOutput('mrqx_extra_pack:recorder')
        .recipeTime(500)

    // ‌复激活药丸·温和化
    registerCustomRecipe(new DigestingRecipe(Item.of('mrqx_extra_pack:re_active_pill'), Item.of('mrqx_extra_pack:re_active_pill_moderation')))

    // 自动蜡护仪
    registerCustomRecipe(new CataclysmWeaponFusion(
        Item.of('create:precision_mechanism'),
        Item.of('hexerei:waxing_kit'),
        Item.of('mrqx_extra_pack:automatic_wax_protector')))

    // 世界框架
    event.recipes.summoningrituals
        .altar('kubejs:ritual_catalyst')
        .id('mrqx_extra_pack:ritual_framework_of_world')
        .input('mrqx_extra_pack:mystery_flesh_and_blood')
        .input('mrqx_extra_pack:mystery_soul')
        .input('mrqx_extra_pack:mystery_machine')
        .input('mrqx_extra_pack:mystery_magic')
        .input('mrqx_extra_pack:mystery_craftsmanship')
        .input('mrqx_extra_pack:mystery_scholar')
        .input('mrqx_extra_pack:mystery_nature')
        .input('mrqx_extra_pack:mystery_stars')
        .input('mrqx_extra_pack:mystery_resources')
        .input('mrqx_extra_pack:mystery_food')
        .input('mrqx_extra_pack:mystery_sinners')
        .input('mrqx_extra_pack:mystery_disasters')
        .input('mrqx_extra_pack:mystery_lords')
        .input('mrqx_extra_pack:mystery_followers')
        .input('mrqx_extra_pack:mystery_memories')
        .input('mrqx_extra_pack:mystery_future')
        .itemOutput('mrqx_extra_pack:framework_of_world')
        .recipeTime(24000)

    // 能量核心
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:energy_core', [
        'MBAAMAABM',
        'BOLLLLLTB',
        'ALCCNNNLA',
        'ALCNNDNLA',
        'MLEEFNNLM',
        'ALESEECLA',
        'ALEEECCLA',
        'BPLLLLLOB',
        'MBAAMAABM',
    ], {
        A: 'createaddition:modular_accumulator',
        B: 'create:brass_sheet',
        C: 'create:chromatic_compound',
        D: 'mrqx_extra_pack:dark_sun_seed',
        E: 'create:shadow_steel',
        F: 'mrqx_extra_pack:framework_of_world',
        L: 'createaddition:large_connector',
        M: 'create:precision_mechanism',
        N: 'create:refined_radiance',
        O: 'createaddition:tesla_coil',
        P: 'create:speedometer',
        S: 'mrqx_extra_pack:sun_seed',
        T: 'create:stressometer',
    })

    // 远古巫妖之心
    registerCustomRecipe(new GoetyRitualRecipe('lich', [
        Item.of('goety:undeath_potion'),
        Item.of('goety:unholy_blood'),
        Item.of('goety:forbidden_scroll'),
        Item.of('goety:nameless_staff'),
        Item.of('goety:philosophers_stone'),
        Item.of('bosses_of_mass_destruction:mob_ward'),
        Item.of('irons_spellbooks:blood_staff'),
        Item.of('graveyard:red_bone_staff'),
        Item.of('graveyard:cyan_bone_staff'),
        Item.of('graveyard:black_bone_staff'),
        Item.of('graveyard:white_bone_staff'),
        Item.of('graveyard:purple_bone_staff')
    ],
        Item.of('kubejs:heart_template'),
        Item.of('mrqx_extra_pack:ancient_lich_heart'))
        .setSoulCost(2000).setDuration(100).setEntityToSacrifice({
            "tag": "mrqx_extra_pack:crone",
            "display_name": "entity.goety.crone"
        }))

    // 机械狂潮挑战
    event.recipes.summoningrituals
        .altar('gateways:gate_pearl')
        .id('mrqx_extra_pack:ritual_mechanical_frenzy')
        .input('16x goety:reinforced_redstone_block')
        .input('4x cataclysm:witherite_block')
        .input('16x goety:animation_core')
        .input('2x goety:redstone_golem_skull')
        .input('modulargolems:metal_golem_holder')
        .input('modulargolems:humanoid_golem_holder')
        .input('modulargolems:dog_golem_holder')
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:mechanical_frenzy"}'))
        .sacrifice('modulargolems:metal_golem', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(7777)

    // 神之惩戒挑战
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:origin_sin')
        .id('mrqx_extra_pack:ritual_god_judgement')
        .input('cataclysm:monstrous_helm')
        .input('bosses_of_mass_destruction:mob_ward')
        .input('cataclysm:gauntlet_of_guard')
        .input('kubejs:void_worm_stomach')
        .input('lightmanscurrency:coinblock_netherite')
        .input('simplehats:sheep')
        .input('mrqx_extra_pack:kings_crown')
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:god_judgement"}'))
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(7777)


    // ‌无尽之力容器
    event.recipes.kubejs.shapeless('mrqx_extra_pack:infinity_force_container', ['kubejs:empty_organ_charm', 'kubejs:infinity_force', 'minecraft:nether_star'])
        .modifyResult((grid, stack) => {
            let force = grid.find('kubejs:infinity_force', 0)
            let countList = mrqxGetEmptyCompound()
            if (force.getNbt() && force.nbt?.forgeTimes) {
                countList.putByte(force.nbt?.forgeTimes, (countList.getByte(force.nbt?.forgeTimes) ?? 0) + 1)
                countList.putByte('max', Math.max(countList.getByte('max') ?? 0, force.nbt?.forgeTimes))
            }
            else {
                countList.putByte(0, (countList.getByte(0) ?? 0) + 1)
                countList.putByte('max', Math.max(countList.getByte('max') ?? 0, 0))
            }
            let i = 0
            while (i <= (countList.getByte('max') ?? 0) + 1) {
                if ((countList.getByte(i) ?? 0) >= 2) {
                    countList.putByte(i + 1, (countList.getByte(i + 1) ?? 0) + 1)
                    countList.putByte(i, countList.getByte(i) - 2)
                    countList.putByte('max', Math.max(countList.getByte('max') ?? 0, i + 2))
                }
                else {
                    countList.putByte(i, countList.getByte(i) ?? 0)
                    i++
                }
            }
            countList.putByte('max', (countList.getByte('max') ?? 0) + 1)
            stack = Item.of('mrqx_extra_pack:infinity_force_container', 1, {})
            stack.nbt.put('mrqxInfinityForceContainerCountList', countList)
            return stack
        })
        .id('mrqx_infinity_force_container_manual_only')

    // ‌（Luna's联动）堕乐园容器
    if (Utils.getRegistries().items().contains('luna_flesh_reforged:fallen_paradise')) {

        event.recipes.kubejs.shapeless('mrqx_extra_pack:fallen_paradise_container', ['mrqx_extra_pack:infinity_force_container', 'luna_flesh_reforged:fallen_paradise'])
            .modifyResult((grid, stack) => {
                let container = grid.find('mrqx_extra_pack:infinity_force_container', 0)
                let paradise = grid.find('luna_flesh_reforged:fallen_paradise', 0)
                if (!container.getNbt()) container.setNbt({})
                let countList = container.nbt.getCompound('mrqxInfinityForceContainerCountList') ?? mrqxGetEmptyCompound()
                if (paradise.getNbt() && paradise.nbt?.forgeTimes) {
                    countList.putByte(paradise.nbt?.forgeTimes, (countList.getByte(paradise.nbt?.forgeTimes) ?? 0) + 1)
                    countList.putByte('max', Math.max(countList.getByte('max') ?? 0, paradise.nbt?.forgeTimes))
                }
                else {
                    countList.putByte(0, (countList.getByte(0) ?? 0) + 1)
                    countList.putByte('max', Math.max(countList.getByte('max') ?? 0, 0))
                }
                let i = 0
                while (i <= (countList.getByte('max') ?? 0) + 1) {
                    if ((countList.getByte(i) ?? 0) >= 2) {
                        countList.putByte(i + 1, (countList.getByte(i + 1) ?? 0) + 1)
                        countList.putByte(i, countList.getByte(i) - 2)
                        countList.putByte('max', Math.max(countList.getByte('max') ?? 0, i + 2))
                    }
                    else {
                        countList.putByte(i, countList.getByte(i) ?? 0)
                        i++
                    }
                }
                countList.putByte('max', (countList.getByte('max') ?? 0))
                stack = Item.of('mrqx_extra_pack:fallen_paradise_container', 1, {})
                stack.nbt.put('mrqxInfinityForceContainerCountList', countList)
                return stack
            })
            .id('mrqx_fallen_paradise_container_manual_only')
    }

    // 人造矿簇
    event.recipes.create.mixing('mrqx_extra_pack:artificial_mineral_cluster', ['minecraft:emerald', 'minecraft:diamond', 'irons_spellbooks:arcane_salvage', 'minecraft:netherite_scrap', 'mrqx_extra_pack:uranium', 'minecraft:quartz', 'minecraft:iron_ingot', 'minecraft:gold_ingot', 'minecraft:coal']).heated()

    // 魔化人造矿簇
    event.recipes.create.mixing('mrqx_extra_pack:magic_artificial_mineral_cluster', ['mrqx_extra_pack:artificial_mineral_cluster', '64x irons_spellbooks:arcane_essence']).superheated()
    event.recipes.create.crushing([
        Item.of('2x minecraft:emerald').withChance(Math.random()),
        Item.of('2x minecraft:diamond').withChance(Math.random()),
        Item.of('2x irons_spellbooks:arcane_salvage').withChance(Math.random()),
        Item.of('2x minecraft:netherite_scrap').withChance(Math.random()),
        Item.of('2x mrqx_extra_pack:uranium').withChance(Math.random()),
        Item.of('2x minecraft:quartz').withChance(Math.random()),
        Item.of('2x minecraft:iron_ingot').withChance(Math.random()),
        Item.of('2x minecraft:gold_ingot').withChance(Math.random()),
        Item.of('2x minecraft:coal').withChance(Math.random()),
    ], 'mrqx_extra_pack:magic_artificial_mineral_cluster').processingTime(Math.floor(Math.random() * 1000))

    // 薄荷奶茶
    registerCustomRecipe(new MixingBowlRecipe(
        Item.of('minecraft:glass_bottle'),
        [
            Item.of('farmersdelight:milk_bottle'),
            Item.of('minecraft:sugar'),
            Ingredient.of('#forge:mint')],
        Item.of('mrqx_extra_pack:mint_milk_tea').withCount(1)).setStirs(8))
    event.recipes.create.mixing('mrqx_extra_pack:mint_milk_tea', ['2x farmersdelight:milk_bottle', '2x minecraft:sugar', '2x #forge:mint'])

    // 奥秘·血肉
    event.recipes.summoningrituals
        .altar('goety:unholy_blood')
        .id('mrqx_extra_pack:ritual_mystery_flesh_and_blood')
        .input('64x biomancy:creator_mix')
        .input('64x biomancy:malignant_flesh')
        .input('64x biomancy:primal_flesh')
        .input('64x alexsmobs:hemolymph_sac')
        .input('64x alexsmobs:blood_sac')
        .input('64x hexerei:blood_bottle')
        .input('64x biomancy:living_flesh')
        .input('64x unusualprehistory:raw_mammoth')
        .itemOutput('mrqx_extra_pack:mystery_flesh_and_blood')
        .recipeTime(2000)

    // 奥秘·灵魂
    event.recipes.summoningrituals
        .altar('goety:soul_jar')
        .id('mrqx_extra_pack:ritual_mystery_soul')
        .input('64x iceandfire:ectoplasm')
        .input('64x meetyourfight:phantoplasm')
        .input('16x alexsmobs:soul_heart')
        .input('mrqx_extra_pack:prison_soul')
        .input('mrqx_extra_pack:fox_soul')
        .input('mrqx_extra_pack:moon_soul')
        .input('mrqx_extra_pack:proud_soul')
        .input('mrqx_extra_pack:eternal_wing_of_soul')
        .itemOutput('mrqx_extra_pack:mystery_soul')
        .recipeTime(2000)

    // 奥秘·机械
    event.recipes.summoningrituals
        .altar('create:wrench')
        .id('mrqx_extra_pack:ritual_mystery_machine')
        .input('64x create:blaze_cake')
        .input('16x create:chromatic_compound')
        .input('create:extendo_grip')
        .input('createoreexcavation:drilling_machine')
        .input('kubejs:burning_heart')
        .input('mrqx_extra_pack:fission_reactor')
        .input('mrqx_extra_pack:steam_engine')
        .input('mrqx_extra_pack:seance_cpu')
        .itemOutput('mrqx_extra_pack:mystery_machine')
        .recipeTime(2000)

    // 奥秘·魔法
    event.recipes.summoningrituals
        .altar('kubejs:command_spell_book')
        .id('mrqx_extra_pack:ritual_mystery_magic')
        .input('16x irons_spellbooks:arcane_salvage')
        .input('goety:philosophers_stone')
        .input('16x hexerei:mindful_trance_blend')
        .input('16x irons_spellbooks:ancient_knowledge_fragment')
        .input('goety:forbidden_scroll')
        .input('mrqx_extra_pack:magic_glass_cannon_cpu')
        .input('irons_spellbooks:blood_staff')
        .input('kubejs:amethyst_magic_core')
        .itemOutput('mrqx_extra_pack:mystery_magic')
        .recipeTime(2000)

    // 奥秘·工艺
    event.recipes.summoningrituals
        .altar('tetra:forged_workbench')
        .id('mrqx_extra_pack:ritual_mystery_craftsmanship')
        .input('tetra:modular_bow')
        .input('tetra:modular_crossbow')
        .input('tetra:modular_double')
        .input('tetra:modular_shield')
        .input('tetra:modular_single')
        .input('tetra:modular_sword')
        .input('tetra:modular_toolbelt')
        .input('tetra:holo')
        .itemOutput('mrqx_extra_pack:mystery_craftsmanship')
        .recipeTime(2000)

    // 奥秘·学者
    event.recipes.summoningrituals
        .altar('#forge:books')
        .id('mrqx_extra_pack:ritual_mystery_scholar')
        .input('minecraft:enchanted_book')
        .input('#forge:bookshelves')
        .input('#goety:research_scrolls')
        .input('patchouli:guide_book')
        .input('alexsmobs:animal_dictionary')
        .input('minecraft:written_book')
        .input('hexerei:book_of_shadows')
        .input('weaponmaster:tutorialbook')
        .itemOutput('mrqx_extra_pack:mystery_scholar')
        .recipeTime(2000)

    // 奥秘·自然
    event.recipes.summoningrituals
        .altar('naturescompass:naturescompass')
        .id('mrqx_extra_pack:ritual_mystery_nature')
        .input('16x irons_spellbooks:nature_upgrade_orb')
        .input('16x #forge:stone')
        .input('16x #forge:seeds')
        .input('16x #forge:ores')
        .input('16x #minecraft:dirt')
        .input('16x #minecraft:fishes')
        .input('16x #alexsmobs:animal_dictionary_ingredient')
        .input('16x #irons_spellbooks:nature_focus')
        .itemOutput('mrqx_extra_pack:mystery_nature')
        .recipeTime(2000)

    // 奥秘·星辰
    event.recipes.summoningrituals
        .altar('witherstormmod:withered_nether_star')
        .id('mrqx_extra_pack:ritual_mystery_stars')
        .input('#forge:nether_stars')
        .input('#forge:spyglasses')
        .input('mrqx_extra_pack:celestial_body_astrology_cpu')
        .input('#kubejs:mrqx_celestial_body')
        .input('#kubejs:mrqx_celestial_body')
        .input('#kubejs:mrqx_celestial_body')
        .input('#kubejs:mrqx_celestial_body')
        .input('#kubejs:mrqx_celestial_body')
        .itemOutput('mrqx_extra_pack:mystery_stars')
        .recipeTime(2000)

    // 奥秘·资源
    event.recipes.summoningrituals
        .altar('#kubejs:resource')
        .id('mrqx_extra_pack:ritual_mystery_resources')
        .input('16x #forge:storage_blocks')
        .input('16x #forge:ores')
        .input('#kubejs:resource')
        .input('mrqx_extra_pack:machine_mine_cpu')
        .input('mrqx_extra_pack:machine_storage_cpu')
        .input('16x #forge:ingots')
        .input('16x #create:crushed_ores')
        .input('#forge:tools')
        .itemOutput('mrqx_extra_pack:mystery_resources')
        .recipeTime(2000)

    // 奥秘·食物
    event.recipes.summoningrituals
        .altar('#createaddition:plant_foods')
        .id('mrqx_extra_pack:ritual_mystery_food')
        .input('kubejs:chicken_heart')
        .input('16x #forge:candy')
        .input('16x mrqx_extra_pack:crispy_belly')
        .input('kubejs:candy_heart')
        .input('16x extradelight:stuffed_heart')
        .input('16x extradelight:lugaw')
        .input('16x extradelight:croque_madame')
        .input('16x extradelight:fish_chips')
        .itemOutput('mrqx_extra_pack:mystery_food')
        .recipeTime(2000)

    // 奥秘·罪者
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:sin_and_judgement')
        .id('mrqx_extra_pack:ritual_mystery_sinners')
        .input('cataclysm:monstrous_horn')
        .input('bosses_of_mass_destruction:obsidian_heart')
        .input('cataclysm:gauntlet_of_guard')
        .input('alexsmobs:void_worm_eye')
        .input('meetyourfight:phantoplasm')
        .input('meetyourfight:violet_bloom')
        .input('3x cataclysm:ignitium_ingot')
        .sacrifice('goety:apostle', 1)
        .sacrificeRegion(3, 3)
        .itemOutput('mrqx_extra_pack:mystery_sinners')
        .recipeTime(2000)

    // 奥秘·灾难
    event.recipes.summoningrituals
        .altar('witherstormmod:withered_nether_star')
        .id('mrqx_extra_pack:ritual_mystery_disasters')
        .input('kubejs:void_worm_stomach')
        .input('irons_spellbooks:fire_upgrade_orb')
        .input('irons_spellbooks:lightning_upgrade_orb')
        .input('kubejs:storm_metal_plate')
        .input('alexsmobs:farseer_arm')
        .input('cataclysm:sandstorm_in_a_bottle')
        .input('witherstormmod:formidibomb')
        .input('#forge:tools')
        .itemOutput('mrqx_extra_pack:mystery_disasters')
        .recipeTime(2000)

    // 奥秘·领主
    event.recipes.summoningrituals
        .altar('bosses_of_mass_destruction:brimstone_nectar')
        .id('mrqx_extra_pack:ritual_mystery_lords')
        .input('bosses_of_mass_destruction:charged_ender_pearl')
        .input('bosses_of_mass_destruction:crystal_fruit')
        .input('bosses_of_mass_destruction:earthdive_spear')
        .input('bosses_of_mass_destruction:soul_star')
        .input('bosses_of_mass_destruction:levitation_block')
        .input('bosses_of_mass_destruction:monolith_block')
        .input('bosses_of_mass_destruction:mob_ward')
        .input('bosses_of_mass_destruction:void_lily')
        .itemOutput('mrqx_extra_pack:mystery_lords')
        .recipeTime(2000)

    // 奥秘·从者
    event.recipes.summoningrituals
        .altar('minecraft:lead')
        .id('mrqx_extra_pack:ritual_mystery_followers')
        .input('mrqx_extra_pack:taoist_fifteen_dogs')
        .input('#modulargolems:blue_upgrades')
        .input('#modulargolems:potion_upgrades')
        .input('modulargolems:humanoid_golem_holder')
        .input('modulargolems:metal_golem_holder')
        .input('modulargolems:dog_golem_holder')
        .input('cataclysm:modern_remnant_bucket')
        .input('cataclysm:the_baby_leviathan_bucket')
        .itemOutput('mrqx_extra_pack:mystery_followers')
        .recipeTime(2000)

    // 奥秘·回忆
    event.recipes.summoningrituals
        .altar('minecraft:book')
        .id('mrqx_extra_pack:ritual_mystery_memories')
        .input('mrqx_extra_pack:recorder')
        .input('16x irons_spellbooks:ancient_knowledge_fragment')
        .input('16x cataclysm:ancient_metal_ingot')
        .input('16x minecraft:ancient_debris')
        .input('16x #unusualprehistory:fossils')
        .input('16x #unusualprehistory:analyzer_items')
        .input('16x #unusualprehistory:filled_flasks')
        .input('16x #kubejs:magnificent_focus')
        .itemOutput('mrqx_extra_pack:mystery_memories')
        .recipeTime(2000)

    // 奥秘·未来
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'mrqx_extra_pack:mystery_memories' }, { 'count': 1, 'item': 'mrqx_extra_pack:mystery_future' }).setEnergy(2147483647))

    // 觉知巨镰
    registerCustomRecipe(new BioForgingRecipe([
        Item.of('goety:death_scythe'),
        Item.of('mrqx_extra_pack:mystery_flesh_and_blood')
    ], Item.of('mrqx_extra_pack:sentient_greatscythe')))

    // 死魂灵的余息
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:mystery_soul')
        .id('mrqx_extra_pack:ritual_residual_breath_of_dead_soul')
        .input('16x iceandfire:ectoplasm')
        .input('16x goety:ectoplasm')
        .input('16x meetyourfight:phantoplasm')
        .itemOutput('mrqx_extra_pack:residual_breath_of_dead_soul')
        .recipeTime(2000)

    // 护盾发生器
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:shield_generator').withChance(50.0),
        Item.of('mrqx_extra_pack:mystery_machine').withChance(50.0)
    ], 'mrqx_extra_pack:mystery_machine', [
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_shield_generator', ['mrqx_extra_pack:incomplete_shield_generator', 'createaddition:tesla_coil']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_shield_generator', ['mrqx_extra_pack:incomplete_shield_generator', '#forge:wires/electrum']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_shield_generator', ['mrqx_extra_pack:incomplete_shield_generator', 'createaddition:modular_accumulator']),
        event.recipes.create.deploying('mrqx_extra_pack:incomplete_shield_generator', ['mrqx_extra_pack:incomplete_shield_generator', 'create:precision_mechanism']),
    ]).transitionalItem('mrqx_extra_pack:incomplete_shield_generator').loops(3)

    // 贤者宝典
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:mystery_magic')
        .id('mrqx_extra_pack:ritual_sages_book')
        .input('irons_spellbooks:gold_spell_book')
        .input('8x irons_spellbooks:ice_upgrade_orb')
        .input('irons_spellbooks:iron_spell_book')
        .input('8x irons_spellbooks:fire_upgrade_orb')
        .input('irons_spellbooks:blaze_spell_book')
        .input('8x irons_spellbooks:holy_upgrade_orb')
        .input('witherstormmod:command_block_book')
        .input('8x irons_spellbooks:mana_upgrade_orb')
        .input('irons_spellbooks:copper_spell_book')
        .input('8x irons_spellbooks:blood_upgrade_orb')
        .input('irons_spellbooks:evoker_spell_book')
        .input('8x irons_spellbooks:ender_upgrade_orb')
        .input('irons_spellbooks:rotten_spell_book')
        .input('8x irons_spellbooks:nature_upgrade_orb')
        .input('irons_spellbooks:diamond_spell_book')
        .input('8x irons_spellbooks:cooldown_upgrade_orb')
        .input('irons_spellbooks:druidic_spell_book')
        .input('8x irons_spellbooks:evocation_upgrade_orb')
        .input('irons_spellbooks:villager_spell_book')
        .input('8x irons_spellbooks:lightning_upgrade_orb')
        .input('kubejs:disenchantment_book')
        .input('8x irons_spellbooks:protection_upgrade_orb')
        .input('irons_spellbooks:netherite_spell_book')
        .input('8x irons_spellbooks:upgrade_orb')
        .input('irons_spellbooks:dragonskin_spell_book')
        .input('8x #irons_spellbooks:arcane_ingot_base')
        .input('irons_spellbooks:necronomicon_spell_book')
        .input('8x goety:ominous_orb')
        .input('kubejs:command_spell_book')
        .input('8x hexerei:blood_sigil')
        .itemOutput('mrqx_extra_pack:sages_book')
        .recipeTime(2000)

})

/**
 * 祭坛完成召唤事件
 * @constant
 * @type {Object<string,function(Internal.SummoningEventJS):void>}
 */
const mrqxRitualsCompleteStrategies = {

}

var assign_rituals_complete_strategies = Object.assign(ritualsCompleteStrategies, mrqxRitualsCompleteStrategies)

/**
 * 祭坛开始召唤事件
 * @constant
 * @type {Object<string,function(Internal.SummoningEventJS):void>}
 */
const mrqxRitualsStartStrategies = {
    // 奥秘·血肉
    'mrqx_extra_pack:ritual_mystery_flesh_and_blood': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_flesh_and_blood']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_flesh_and_blood'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_flesh_and_blood", "with": [`${(count / mrqxAdvancementsCheck['mystery_flesh_and_blood'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·灵魂
    'mrqx_extra_pack:ritual_mystery_soul': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_soul']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_soul'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_soul", "with": [`${(count / mrqxAdvancementsCheck['mystery_soul'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·机械
    'mrqx_extra_pack:ritual_mystery_machine': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_machine']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_machine'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_machine", "with": [`${(count / mrqxAdvancementsCheck['mystery_machine'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·魔法
    'mrqx_extra_pack:ritual_mystery_magic': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_magic']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_magic'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_magic", "with": [`${(count / mrqxAdvancementsCheck['mystery_magic'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·工艺
    'mrqx_extra_pack:ritual_mystery_craftsmanship': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_craftsmanship']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_craftsmanship'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_craftsmanship", "with": [`${(count / mrqxAdvancementsCheck['mystery_craftsmanship'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·学者
    'mrqx_extra_pack:ritual_mystery_scholar': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_scholar']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_scholar'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_scholar", "with": [`${(count / mrqxAdvancementsCheck['mystery_scholar'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·自然
    'mrqx_extra_pack:ritual_mystery_nature': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_nature']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_nature'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_nature", "with": [`${(count / mrqxAdvancementsCheck['mystery_nature'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·星辰
    'mrqx_extra_pack:ritual_mystery_stars': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_stars']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_stars'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_stars", "with": [`${(count / mrqxAdvancementsCheck['mystery_stars'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },
    // 奥秘·资源
    'mrqx_extra_pack:ritual_mystery_resources': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_resources']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_resources'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_resources", "with": [`${(count / mrqxAdvancementsCheck['mystery_resources'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·食物
    'mrqx_extra_pack:ritual_mystery_food': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_food']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_food'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_food", "with": [`${(count / mrqxAdvancementsCheck['mystery_food'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·罪者
    'mrqx_extra_pack:ritual_mystery_sinners': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_sinners']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_sinners'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_sinners", "with": [`${(count / mrqxAdvancementsCheck['mystery_sinners'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·灾变
    'mrqx_extra_pack:ritual_mystery_disasters': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_disasters']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_disasters'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_disasters", "with": [`${(count / mrqxAdvancementsCheck['mystery_disasters'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·领主
    'mrqx_extra_pack:ritual_mystery_lords': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_lords']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_lords'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_lords", "with": [`${(count / mrqxAdvancementsCheck['mystery_lords'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·从者
    'mrqx_extra_pack:ritual_mystery_followers': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_followers']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_followers'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_followers", "with": [`${(count / mrqxAdvancementsCheck['mystery_followers'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },

    // 奥秘·回忆
    'mrqx_extra_pack:ritual_mystery_memories': function (event) {
        let player = event.player
        let count = 0
        let b = false
        for (let adv in mrqxAdvancementsCheck['mystery_memories']) {
            if (!player.isAdvancementDone(mrqxAdvancementsCheck['mystery_memories'][adv])) {
                b = true
            }
            else {
                count++
            }
        }
        if (b) {
            player.tell(Text.of({ "translate": "mrqx_extra_pack.advancements_check.mystery_memories", "with": [`${(count / mrqxAdvancementsCheck['mystery_memories'].length * 100).toFixed(0)}`] }))
            event.cancel()
        }
    },
}

var assign_rituals_start_strategies = Object.assign(ritualsStartStrategies, mrqxRitualsStartStrategies)