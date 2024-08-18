// priority: -1

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
    setRecipeBookTab: function (recipeBookTab) {
        this.recipe_book_tab = recipeBookTab
        return this
    },
    setCookingtime: function (cookingtime) {
        this.cookingtime = cookingtime
        return this
    },
    setExperience: function (experience) {
        this.experience = experience
        return this
    },
}

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
    setDuration: function (duration) {
        this.duration = duration
        return this
    },
    setSoulCost: function (soulCost) {
        this.soulCost = soulCost
        return this
    },
    setRitualType: function (ritual_type) {
        this.ritual_type = ritual_type
        return this
    },
    setEntityToSacrifice: function (entity_to_sacrifice) {
        this.entity_to_sacrifice = entity_to_sacrifice
        return this
    },
}

function BioForgingRecipe(ingredients, output) {
    this.type = 'biomancy:bio_forging'
    this.ingredients = ingredients
    this.result = output
    this.nutrientsCost = 1
    this.bio_forge_tab = 'biomancy:misc'
}

BioForgingRecipe.prototype = {
    setNutrientsCost: function (nutrientsCost) {
        this.nutrientsCost = nutrientsCost
        return this
    },
    setTab: function (tab) {
        this.bio_forge_tab = tab
        return this
    },
}

function CreateAdditionCharging(input, output) {
    this.type = 'createaddition:charging'
    this.input = input
    this.result = output
    this.energy = 1000
    this.maxChargeRate = 200
}

CreateAdditionCharging.prototype = {
    setEnergy: function (energy) {
        this.energy = energy
        return this
    },
    setMaxChargeRate: function (maxChargeRate) {
        this.maxChargeRate = maxChargeRate
        return this
    },
}

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel)
    }
    // 纸器官
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:appendix_paper', [' PPP ', ' PPP ', '  PP ', '  PP ', '  PPP'], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:heart_paper', [' PPP ', 'PPPPP', 'PPPPP', 'PPPP ', ' PPP '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:intestine_paper', ['P PPP', 'PPPPP', 'PPPPP', 'PPP  ', 'PPPP '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:kidney_paper', [' PP  ', 'PPPP ', ' PPP ', 'PPPP ', ' PP  '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:liver_paper', [' PPPP', 'PPPPP', 'PPPP ', 'PPP  ', '     '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:lung_paper', ['  PP ', ' PPP ', ' PPP ', ' PPP ', ' PPP '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:muscle_paper', ['  PPP', ' PPPP', 'PPPPP', 'PPPPP', 'PPPP '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:rib_paper', ['     ', 'PPPP ', 'PPPPP', 'P   P', '     '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:spine_paper', ['   PP', '  PPP', ' PPPP', 'PPPP ', 'PPP  '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:spleen_paper', [' PPP ', 'PPPPP', ' PPPP', 'PPPPP', ' PPP '], { P: 'minecraft:paper' });
    event.recipes.create.mechanical_crafting('mrqx_extra_pack:stomach_paper', [' PPP ', '  PPP', 'P PPP', 'PPPPP', ' PPP '], { P: 'minecraft:paper' });

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
        .recipeTime(500);

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
    });

    // 裂变反应堆
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:fission_reactor').withChance(70.0),
        Item.of('mrqx_extra_pack:reactor_chamber').withChance(29.9),
        Item.of('create:cuckoo_clock').withChance(0.1),
    ], 'mrqx_extra_pack:reactor_chamber', [
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_fission_reactor', ['mrqx_extra_pack:incomplete_fission_reactor', 'create:precision_mechanism']),
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_fission_reactor', ['mrqx_extra_pack:incomplete_fission_reactor', 'create:sturdy_sheet']),
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_fission_reactor', ['mrqx_extra_pack:incomplete_fission_reactor', 'create:content_observer']),
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_fission_reactor', ['mrqx_extra_pack:incomplete_fission_reactor', 'create:sequenced_gearshift']),
    ]).transitionalItem('mrqx_extra_pack:incomplete_fission_reactor').loops(3);

    // 反应散热器
    event.recipes.minecraft.crafting_shaped(Item.of('mrqx_extra_pack:heat_vent', 1), [
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
        });

    // 反应热隔层
    event.recipes.minecraft.crafting_shaped(Item.of('mrqx_extra_pack:thermal_barrier', 1), [
        'SWS',
        'WEW',
        'SWS'
    ],
        {
            E: 'mrqx_extra_pack:reactor_chamber',
            S: 'create:sturdy_sheet',
            W: '#minecraft:wool'
        });

    // 反应热喷口
    event.recipes.minecraft.crafting_shaped(Item.of('mrqx_extra_pack:thermal_injector', 1), [
        ' F ',
        ' E ',
        'SMS'
    ],
        {
            E: 'mrqx_extra_pack:reactor_chamber',
            S: 'create:sturdy_sheet',
            M: 'create:precision_mechanism',
            F: 'create:encased_fan'
        });

    // 黄金天秤
    event.recipes.minecraft.crafting_shaped(Item.of('mrqx_extra_pack:golden_libra', 1), [
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
        });

    // 冒险者证章
    event.recipes.minecraft.crafting_shaped(Item.of('mrqx_extra_pack:adventurers_badge', 1), [
        ' C ',
        ' A ',
        ' M '
    ],
        {
            A: 'wares:completed_delivery_agreement',
            M: 'kubejs:mysterious_trinket',
            C: 'lightmanscurrency:coin_diamond'
        });

    // 粗铀
    event.recipes.createoreexcavation
        .drilling("mrqx_extra_pack:raw_uranium", '{"text": "铀矿"}', 2, 800)
        .alwaysInfinite()
        .stress(1024)
        .biomeWhitelist('minecraft:is_overworld')
        .id('kubejs:drilling_raw_uranium');

    // 铀
    event.recipes.createMixing('mrqx_extra_pack:uranium', [
        'create:powdered_obsidian',
        'createaddition:diamond_grit',
        'mrqx_extra_pack:raw_uranium'
    ]).superheated();

    // 反应燃料
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:nuclear_fuel').withChance(70.0),
        Item.of('createaddition:iron_rod').withChance(29.9),
        Item.of('minecraft:tnt').withChance(0.09),
        Item.of('witherstormmod:super_tnt').withChance(0.01),
    ], 'create:iron_sheet', [
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_nuclear_fuel', ['mrqx_extra_pack:incomplete_nuclear_fuel', 'mrqx_extra_pack:uranium']),
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_nuclear_fuel', ['mrqx_extra_pack:incomplete_nuclear_fuel', 'create:iron_sheet']),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_nuclear_fuel', 'mrqx_extra_pack:incomplete_nuclear_fuel'),
    ]).transitionalItem('mrqx_extra_pack:incomplete_nuclear_fuel').loops(3);

    // 荣耀之魂
    event.recipes.summoningrituals
        .altar('minecraft:wooden_sword')
        .id('mrqx_extra_pack:ritual_proud_soul')
        .input('alexsmobs:soul_heart')
        .input('meetyourfight:phantoplasm')
        .input('art_of_forging:dragon_soul')
        .input('bosses_of_mass_destruction:ancient_anima')
        .itemOutput('mrqx_extra_pack:proud_soul')
        .recipeTime(500);

    // 死狱之魂
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:proud_soul')
        .id('mrqx_extra_pack:ritual_prison_soul')
        .input('goety:unholy_blood')
        .input('graveyard:vial_of_blood')
        .input('hexerei:blood_bottle')
        .input('#iceandfire:dragon_bloods')
        .itemOutput('mrqx_extra_pack:prison_soul')
        .recipeTime(500);

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
        .recipeTime(500);

    // 散发着光亮的种子
    event.recipes.summoningrituals
        .altar('#forge:seeds')
        .id('mrqx_extra_pack:ritual_shining_seed')
        .input('64x minecraft:glowstone_dust')
        .input('4x irons_spellbooks:divine_pearl')
        .input('4x minecraft:lantern')
        .dayTime('day')
        .itemOutput('mrqx_extra_pack:shining_seed')
        .recipeTime(500);

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
        .recipeTime(1000);

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
    event.recipes.minecraft.crafting_shaped(Item.of('mrqx_extra_pack:portable_medical_checkup_device', 1), [
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
        });

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
        .id('mrqx_extra_pack:active_ice_dragon_bead')
        .input('nameless_trinkets:ice_cube')
        .input('goety:frost_breath_focus')
        .input('iceandfire:summoning_crystal_ice')
        .input('16x iceandfire:frost_lily')
        .input('4x irons_spellbooks:ice_upgrade_orb')
        .itemOutput('mrqx_extra_pack:active_ice_dragon_bead')
        .recipeTime(500);

    // 激活·火龙宝玉
    event.recipes.summoningrituals
        .altar('kubejs:fire_dragon_bead')
        .id('mrqx_extra_pack:active_fire_dragon_bead')
        .input('nameless_trinkets:blaze_nucleus')
        .input('goety:fire_breath_focus')
        .input('iceandfire:summoning_crystal_fire')
        .input('16x iceandfire:fire_lily')
        .input('4x irons_spellbooks:fire_upgrade_orb')
        .itemOutput('mrqx_extra_pack:active_fire_dragon_bead')
        .recipeTime(500);

    // 激活·电龙宝玉
    event.recipes.summoningrituals
        .altar('kubejs:lightning_dragon_bead')
        .id('mrqx_extra_pack:active_lightning_dragon_bead')
        .input('nameless_trinkets:pocket_lightning_rod')
        .input('goety:thunderbolt_focus')
        .input('iceandfire:summoning_crystal_lightning')
        .input('16x iceandfire:lightning_lily')
        .input('4x irons_spellbooks:lightning_upgrade_orb')
        .itemOutput('mrqx_extra_pack:active_lightning_dragon_bead')
        .recipeTime(500);

    // 激活·末影龙宝玉 
    event.recipes.summoningrituals
        .altar('chestcavity:mana_reactor')
        .id('mrqx_extra_pack:active_ender_dragon_bead')
        .input('art_of_forging:enigmatic_construct')
        .input('art_of_forging:dragon_soul')
        .input('8x minecraft:end_crystal')
        .input('16x minecraft:dragon_breath')
        .input('4x irons_spellbooks:ice_upgrade_orb')
        .itemOutput('mrqx_extra_pack:active_ender_dragon_bead')
        .recipeTime(500);

    // 风暴之星碎片
    event.recipes.create.crushing([
        Item.of('3x mrqx_extra_pack:withered_nether_star_shard'),
        Item.of('mrqx_extra_pack:withered_nether_star_shard').withChance(0.3)
    ], 'witherstormmod:withered_nether_star').processingTime(1000)

    event.recipes.summoningrituals
        .altar('witherstormmod:command_block_book')
        .id('mrqx_extra_pack:withered_nether_star')
        .input('mrqx_extra_pack:withered_nether_star_shard')
        .input('mrqx_extra_pack:storm_metal_ingot')
        .input('mrqx_extra_pack:withered_nether_star_shard')
        .input('mrqx_extra_pack:storm_metal_ingot')
        .input('mrqx_extra_pack:withered_nether_star_shard')
        .input('mrqx_extra_pack:storm_metal_ingot')
        .input('kubejs:nether_star_shard')
        .input('mrqx_extra_pack:storm_metal_ingot')
        .itemOutput('witherstormmod:withered_nether_star')
        .recipeTime(500);

    // 风暴金属锭
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:storm_metal_ingot').withChance(90.0),
        Item.of('witherstormmod:command_block_book').withChance(10.0)
    ], 'kubejs:relic_metal_ingot', [
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_storm_metal_ingot', ['mrqx_extra_pack:incomplete_storm_metal_ingot', 'kubejs:storm_metal_plate']),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_storm_metal_ingot', ['mrqx_extra_pack:incomplete_storm_metal_ingot', Fluid.of('minecraft:water').withAmount(1000)]),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_storm_metal_ingot', 'mrqx_extra_pack:incomplete_storm_metal_ingot'),
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_storm_metal_ingot', ['mrqx_extra_pack:incomplete_storm_metal_ingot', 'kubejs:storm_metal_plate']),
        event.recipes.create.filling('mrqx_extra_pack:incomplete_storm_metal_ingot', ['mrqx_extra_pack:incomplete_storm_metal_ingot', Fluid.of('minecraft:lava').withAmount(1000)]),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_storm_metal_ingot', 'mrqx_extra_pack:incomplete_storm_metal_ingot')
    ]).transitionalItem('mrqx_extra_pack:incomplete_storm_metal_ingot').loops(1)


    // 压缩饼干
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:compressed_biscuit').withChance(90.0),
        Item.of('extradelight:sugar_cookie_block_item').withChance(10.0)
    ], '#forge:flour', [
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_compressed_biscuit', ['mrqx_extra_pack:incomplete_compressed_biscuit', '#forge:flour']),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_compressed_biscuit', 'mrqx_extra_pack:incomplete_compressed_biscuit')
    ]).transitionalItem('mrqx_extra_pack:incomplete_compressed_biscuit').loops(256)

    // 黄金压缩饼干
    event.recipes.create.sequenced_assembly([
        Item.of('mrqx_extra_pack:golden_compressed_biscuit').withChance(10.0),
        Item.of('mrqx_extra_pack:compressed_biscuit').withChance(90.0)
    ], 'mrqx_extra_pack:compressed_biscuit', [
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_golden_compressed_biscuit', ['mrqx_extra_pack:incomplete_golden_compressed_biscuit', '#forge:nuggets/gold']),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit'),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_golden_compressed_biscuit', 'mrqx_extra_pack:incomplete_golden_compressed_biscuit')
    ]).transitionalItem('mrqx_extra_pack:incomplete_golden_compressed_biscuit').loops(9)

    // 深海器官挑战
    event.recipes.summoningrituals
        .altar('gateways:gate_pearl')
        .id('mrqx_extra_pack:shadow_of_caerula_arbor')
        .input('somebosses:cursed_spring_water')
        .input('minecraft:water_bucket')
        .input('16x kubejs:water_candy')
        .input('nameless_trinkets:true_heart_of_the_sea')
        .input('iceandfire:seaserpent_skull')
        .input('32x #iceandfire:scales/sea_serpent')
        .input('cataclysm:abyssal_egg')
        .input('kubejs:secret_of_rain')
        .itemOutput(Item.of('gateways:gate_pearl', '{gateway: "mrqx_extra_pack:shadow_of_caerula_arbor"}'))
        .recipeTime(500);

    // 充能刀刃
    registerCustomRecipe(new CreateAdditionCharging({ 'count': 1, 'item': 'art_of_forging:ancient_blade' }, { 'count': 1, 'item': 'mrqx_extra_pack:charged_blade' }).setEnergy(100000))

    // 创世纪
    event.recipes.summoningrituals
        .altar('witherstormmod:withered_nether_star')
        .id('mrqx_extra_pack:genesis')
        .input('mrqx_extra_pack:sun_seed')
        .input('mrqx_extra_pack:dark_sun_seed')
        .sacrifice('witherstormmod:wither_storm', 1)
        .sacrifice('goety:apostle', 1)
        .sacrifice('invasioncodered:gashslit', 1)
        .sacrifice('minecraft:warden', 1)
        .itemOutput(Item.of('kubejs:genesis'))
        .sacrificeRegion(11, 11)
        .recipeTime(24000);

    // 先进单片镜
    event.recipes.minecraft.crafting_shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass'), [
        'kubejs:archivist_eyeglass',
        Ingredient.of('#kubejs:mrqx_cpu'),
    ])
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGSweetDream:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:candy_focus'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGSweetDream', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_sweet_dream');
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGElement:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:mrqx_element_damage'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGElement', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_a');
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGDragonPower:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:dragon'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGDragonPower', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_d');
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGInfinityBeats:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        'kubejs:infinity_beats',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGInfinityBeats', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_infinity_beats');
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGNuclear:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:mrqx_nuclear'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGNuclear', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_b');
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGBurningAndFlaringHeart:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        Ingredient.of('#kubejs:machine'),
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGBurningAndFlaringHeart', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_c');
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGPrisonSoul:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        'mrqx_extra_pack:prison_soul',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGPrisonSoul', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_prison_soul');
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGMoonSoul:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        'mrqx_extra_pack:moon_soul',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGMoonSoul', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_moon_soul');
    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:advanced_eyeglass', '{mrqxAAEGMarenol:1b}'), [
        'mrqx_extra_pack:advanced_eyeglass',
        'mrqx_extra_pack:marenol',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:advanced_eyeglass"));
            if (!result.getNbt()) {
                result.setNbt({})
            }
            result.getNbt().putBoolean('mrqxAAEGMarenol', true)
            return result
        })
        .id('mrqx_advanced_eyeglass_marenol');

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
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_command_spell_core', ['mrqx_extra_pack:incomplete_command_spell_core', 'tetra:planar_stabilizer']),
        event.recipes.createDeploying('mrqx_extra_pack:incomplete_command_spell_core', ['mrqx_extra_pack:incomplete_command_spell_core', 'tetra:chthonic_extractor']),
        event.recipes.createPressing('mrqx_extra_pack:incomplete_command_spell_core', 'mrqx_extra_pack:incomplete_command_spell_core'),
    ]).transitionalItem('mrqx_extra_pack:incomplete_command_spell_core').loops(1);

    // 金酒之杯
    event.recipes.minecraft.crafting_shaped(Item.of('mrqx_extra_pack:golden_chalice', 1), [
        'CCC',
        'BGB',
        'BBB'
    ],
        {
            C: 'lightmanscurrency:coinblock_gold',
            G: 'kubejs:unholy_grail',
            B: 'minecraft:gold_block'
        });

    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:golden_chalice'), [
        'mrqx_extra_pack:golden_chalice',
        'lightmanscurrency:coin_gold',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:golden_chalice"))
            let mrqxGoldenChaliceMoney = result.nbt?.mrqxGoldenChaliceMoney ?? 0
            result = Item.of('mrqx_extra_pack:golden_chalice', { mrqxGoldenChaliceMoney: mrqxGoldenChaliceMoney + 1 })
            return result
        });

    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:golden_chalice'), [
        'mrqx_extra_pack:golden_chalice',
        'lightmanscurrency:coinpile_gold',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:golden_chalice"))
            let mrqxGoldenChaliceMoney = result.nbt?.mrqxGoldenChaliceMoney ?? 0
            result = Item.of('mrqx_extra_pack:golden_chalice', { mrqxGoldenChaliceMoney: mrqxGoldenChaliceMoney + 9 })
            return result
        });

    event.recipes.kubejs.shapeless(Item.of('mrqx_extra_pack:golden_chalice'), [
        'mrqx_extra_pack:golden_chalice',
        'lightmanscurrency:coinblock_gold',
    ])
        .modifyResult((grid, result_) => {
            let result = grid.find(Item.of("mrqx_extra_pack:golden_chalice"))
            let mrqxGoldenChaliceMoney = result.nbt?.mrqxGoldenChaliceMoney ?? 0
            result = Item.of('mrqx_extra_pack:golden_chalice', { mrqxGoldenChaliceMoney: mrqxGoldenChaliceMoney + 36 })
            return result
        });

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
        .id('mrqx_extra_pack:taoist_fifteen_dogs')
        .sacrifice('minecraft:wolf', 15)
        .input('15x minecraft:lead')
        .itemOutput('mrqx_extra_pack:taoist_fifteen_dogs')
        .recipeTime(500);

    // “法师控制强”
    event.recipes.summoningrituals
        .altar('goety:nameless_staff')
        .id('mrqx_extra_pack:mage_control_strong')
        .input('4x irons_spellbooks:ice_upgrade_orb')
        .input('16x irons_spellbooks:frozen_bone')
        .input('goety:hail_focus')
        .input('goety:frost_robe')
        .itemOutput('mrqx_extra_pack:mage_control_strong')
        .recipeTime(500);

    // “战士输出高”
    event.recipes.summoningrituals
        .altar('chestcavity:netherite_cleaver')
        .id('mrqx_extra_pack:warrior_output_high')
        .input('8x #iceandfire:dragon_bloods')
        .input('16x iceandfire:dragonbone')
        .input('cataclysm:the_incinerator')
        .input('#iceandfire:dragon_skulls')
        .itemOutput('mrqx_extra_pack:warrior_output_high')
        .recipeTime(500);

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
        .id('mrqx_extra_pack:kings_crown')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('16x goety:ectoplasm')
        .input('3x irons_spellbooks:ancient_knowledge_fragment')
        .input('5x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_crown')
        .recipeTime(500);

    // 国王的新枪
    event.recipes.summoningrituals
        .altar('alexsmobs:skelewag_sword')
        .id('mrqx_extra_pack:kings_new_lance')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('2x irons_spellbooks:cinder_essence')
        .input('createaddition:gold_rod')
        .input('6x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_new_lance')
        .recipeTime(500);

    // 国王的护戒
    event.recipes.summoningrituals
        .altar('irons_spellbooks:emerald_stoneplate_ring')
        .id('mrqx_extra_pack:kings_fellowship')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('irons_spellbooks:invisibility_ring')
        .input('irons_spellbooks:affinity_ring')
        .input('4x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_fellowship')
        .recipeTime(500);

    // 国王的铠甲
    event.recipes.summoningrituals
        .altar('bygonenether:gilded_netherite_chestplate')
        .id('mrqx_extra_pack:kings_armor')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('minecraft:golden_chestplate')
        .input('cataclysm:ignitium_chestplate')
        .input('8x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_armor')
        .recipeTime(500);

    // 国王的圆饼
    event.recipes.summoningrituals
        .altar('cataclysm:bulwark_of_the_flame')
        .id('mrqx_extra_pack:kings_buckler')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('goety:star_amulet')
        .input('meetyourfight:ace_of_iron')
        .input('6x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_buckler')
        .recipeTime(500);

    // 国王的枝条
    event.recipes.summoningrituals
        .altar('#forge:tools/shovels')
        .id('mrqx_extra_pack:kings_staff')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('goety:dark_wand')
        .input('createaddition:electrum_rod')
        .input('3x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_staff')
        .recipeTime(500);

    // 国王的延伸
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:kings_staff')
        .id('mrqx_extra_pack:kings_extension')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('goety:nameless_staff')
        .input('irons_spellbooks:blood_staff')
        .input('3x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_extension')
        .recipeTime(500);

    // 国王的水晶
    event.recipes.summoningrituals
        .altar('cataclysm:abyssal_sacrifice')
        .id('mrqx_extra_pack:kings_crystal')
        .input('bosses_of_mass_destruction:ancient_anima')
        .input('goety:soul_emerald')
        .input('cataclysm:void_stone')
        .input('3x cataclysm:ancient_metal_ingot')
        .itemOutput('mrqx_extra_pack:kings_crystal')
        .recipeTime(500);

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
})

/**
 * 祭坛完成召唤事件
 * @constant
 * @type {Object<string,function(Internal.SummoningEventJS):void>}
 */
const mrqxRitualsCompleteStrategies = {

}

var assign_rituals_complete_strategies = Object.assign(ritualsCompleteStrategies, mrqxRitualsCompleteStrategies);

/**
 * 祭坛开始召唤事件
 * @constant
 * @type {Object<string,function(Internal.SummoningEventJS):void>}
 */
const mrqxRitualsStartStrategies = {
    'mrqx_extra_pack:genesis': function (event) {
        let player = event.player
        let b = true
        for (let adv in mrqxGenesisAdvancementsCheck) {
            if (!player.isAdvancementDone(adv)) {
                if (b) {
                    player.tell(Text.of({ "translate": "mrqx_extra_pack.genesis_advancements_check.0" }))
                    b = false
                }
                player.tell(mrqxGenesisAdvancementsCheck[adv])
            }
        }
        if (!b) {
            event.cancel()
        }
    }
}

var assign_rituals_start_strategies = Object.assign(ritualsStartStrategies, mrqxRitualsStartStrategies);