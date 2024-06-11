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
        .id('kubejs:ritual_divine_pen')
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
    event.shaped(Item.of('mrqx_extra_pack:heat_vent', 1), [
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
    event.shaped(Item.of('mrqx_extra_pack:thermal_barrier', 1), [
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
    event.shaped(Item.of('mrqx_extra_pack:thermal_injector', 1), [
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
    event.shaped(Item.of('mrqx_extra_pack:golden_libra', 1), [
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
    event.shaped(Item.of('mrqx_extra_pack:adventurers_badge', 1), [
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

    //铀
    event.recipes.createMixing('mrqx_extra_pack:uranium', [
        'create:powdered_obsidian',
        'createaddition:diamond_grit',
        'mrqx_extra_pack:raw_uranium'
    ]).superheated();

    //核反应燃料
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
        .id('kubejs:ritual_proud_soul')
        .input('alexsmobs:soul_heart')
        .input('meetyourfight:phantoplasm')
        .input('art_of_forging:dragon_soul')
        .input('bosses_of_mass_destruction:ancient_anima')
        .itemOutput('mrqx_extra_pack:proud_soul')
        .recipeTime(500);

    // 死狱之魂
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:proud_soul')
        .id('kubejs:ritual_prison_soul')
        .input('goety:unholy_blood')
        .input('graveyard:vial_of_blood')
        .input('hexerei:blood_bottle')
        .input('#iceandfire:dragon_bloods')
        .itemOutput('mrqx_extra_pack:prison_soul')
        .recipeTime(500);

    // 山月之魂
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:proud_soul')
        .id('kubejs:ritual_moon_soul')
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
        .id('kubejs:ritual_shining_seed')
        .input('64x minecraft:glowstone_dust')
        .input('4x irons_spellbooks:divine_pearl')
        .input('4x minecraft:lantern')
        .dayTime('day')
        .itemOutput('mrqx_extra_pack:shining_seed')
        .recipeTime(500);

    // 耀阳种子
    event.recipes.summoningrituals
        .altar('mrqx_extra_pack:shining_seed')
        .id('kubejs:ritual_sun_seed')
        .input('4x meetyourfight:phantoplasm')
        .input('4x bosses_of_mass_destruction:obsidian_heart')
        .input('4x cataclysm:ignitium_ingot')
        .input('4x minecraft:heart_of_the_sea')
        .dayTime('day')
        .itemOutput('mrqx_extra_pack:sun_seed')
        .recipeTime(1000);

    // 暗日种子
    registerCustomRecipe(new GoetyRitualRecipe('lich', [
        Ingredient.of('kubejs:pandora_active'),
        Ingredient.of('biomancy:corrosive_additive'),
        Ingredient.of('goety:undeath_potion'),
        Ingredient.of('goety:philosophers_stone')],
        Item.of('mrqx_extra_pack:sun_seed'),
        Item.of('mrqx_extra_pack:dark_sun_seed')).setSoulCost(2000))

    // 噩梦醇
    registerCustomRecipe(new BioForgingRecipe([
        {
            'count': 16, 'item': 'goety:withering_ooze'
        }, {
            'count': 16, 'item': 'biomancy:toxin_extract'
        }, {
            'count': 16, 'item': 'biomancy:insomnia_cure'
        }, {
            'count': 1, 'item': 'kubejs:long_lasting_pill'
        }, {
            'count': 1, 'item': 'nameless_trinkets:sleeping_pills'
        }],
        Item.of('kubejs:heart_template'))
        .setNutrientsCost(32)
        .setTab('biomancy:weapons'))

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
        Item.of('kubejs:heart_template'))
        .setNutrientsCost(32)
        .setTab('biomancy:weapons'))

})