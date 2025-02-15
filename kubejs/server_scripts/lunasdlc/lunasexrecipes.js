ServerEvents.recipes(event => {
    
    event.shapeless('luna_flesh_reforged:fallen_paradise', ['luna_flesh_reforged:fallen_paradise', 'kubejs:infinity_force'])
        .modifyResult((grid, stack) => {
            let item1 = grid.find('luna_flesh_reforged:fallen_paradise')
            let item2 = grid.find('kubejs:infinity_force')
            let forgeTimes1 = item1.nbt?.forgeTimes ?? 0
            let forgeTimes2 = item2.nbt?.forgeTimes ?? 0
            if (forgeTimes1 == forgeTimes2) {
                stack = Item.of('luna_flesh_reforged:fallen_paradise', { forgeTimes: forgeTimes2 + 1 })
                return stack;
            }
            if (forgeTimes1 < forgeTimes2) {
                stack = Item.of('luna_flesh_reforged:fallen_paradise', { forgeTimes: forgeTimes2 })
                return stack;
            }
            return;
        });
    
    event.shaped(Item.of('luna_flesh_reforged:dark_archotech_wand', 1), [
        ' DR',
        ' HB',
        'AB '
    ],
        {
            A: 'irons_spellbooks:artificer_cane',
            B: 'luna_flesh_reforged:bioferrite_shard',
            H: 'luna_flesh_reforged:dragon_heartstring',
            R: 'kubejs:rapier_wand',
            D: 'luna_flesh_reforged:dark_archotech_shard'
        })

    event.shaped('luna_flesh_reforged:sanity_checker', [
            'BG ',
            'DZS',
            'BG '
        ],
        {
            B: 'create:brass_sheet',
            G: '#forge:glass_panes',
            Z: 'luna_flesh_reforged:zombie_brain',
            S: 'create:goggles',
            D: '#forge:dusts/diamond'
        })
    
    event.recipes.create.mechanical_crafting('irons_spellbooks:ancient_knowledge_fragment', [
            '  A  ',    
            ' BCB ',   
            'ACDCA',
            ' BCB ',
            '  A  '
        ], {
            A: 'art_of_forging:eerie_shard',
            B: 'irons_spellbooks:arcane_essence',
            C: 'minecraft:book',
            D: 'goety:forbidden_fragment'
        })

	
	event.recipes.create.sequenced_assembly([
		Item.of('irons_spellbooks:blank_rune').withChance(75.0),
		Item.of('kubejs:relic_metal_ingot').withChance(20.0),
		Item.of('irons_spellbooks:arcane_ingot').withChance(5.0),
		Item.of('create:sturdy_sheet').withChance(10.0),
	], 'create:sturdy_sheet', [
		event.recipes.createDeploying('create:sturdy_sheet', ['create:sturdy_sheet', 'kubejs:relic_metal_ingot']),
		event.recipes.createPressing('create:sturdy_sheet', 'create:sturdy_sheet'),
		event.recipes.createDeploying('create:sturdy_sheet', ['create:sturdy_sheet', 'irons_spellbooks:arcane_ingot']),
		event.recipes.createDeploying('create:sturdy_sheet', ['create:sturdy_sheet', 'irons_spellbooks:arcane_essence']),
		event.recipes.createDeploying('create:sturdy_sheet', ['create:sturdy_sheet', 'rainbowcompound:lapis_sheet']),
		event.recipes.createCutting('create:sturdy_sheet', 'create:sturdy_sheet')
	]).transitionalItem('create:sturdy_sheet').loops(2)

	event.recipes.create.sequenced_assembly([
		Item.of('3x rainbowcompound:strange_colored_ingot').withChance(50.0),
		Item.of('create:chromatic_compound').withChance(50.0)
	], 'create:chromatic_compound', [
		event.recipes.createDeploying('create:chromatic_compound', ['create:chromatic_compound', 'rainbowcompound:rainbow_knife']),
		event.recipes.createPressing('create:chromatic_compound', 'create:chromatic_compound'),
		event.recipes.createCutting('create:chromatic_compound', 'create:chromatic_compound'),
		event.recipes.createCutting('create:chromatic_compound', 'create:chromatic_compound'),
		event.recipes.createCutting('create:chromatic_compound', 'create:chromatic_compound')
	]).transitionalItem('create:chromatic_compound').loops(3)

    event.recipes.summoningrituals
        .altar('irons_spellbooks:blank_rune')
        .id('luna_flesh_reforged:ritual_charm_azathoth')
        .input('rainbowcompound:shadow_ring')
        .input('3x luna_flesh_reforged:bioferrite_shard')
        .input('#luna_flesh_reforged:greatone_charm')
        .input('hexerei:blood_bucket')
        .itemOutput('2x luna_flesh_reforged:charm_azathoth')
        .sacrifice('minecraft:villager', 1)
        .sacrificeRegion(3, 3)
        .dayTime('night')
        .recipeTime(500);
	
	event.recipes.create.sequenced_assembly([
		Item.of('luna_flesh_reforged:archotech_framework')
	], 'create_crystal_clear:brass_glass_casing', [
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'rainbowcompound:netherstar_ingot']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'createaddition:electrum_spool']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'rainbowcompound:shadow_resonant_assembly']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'create:precision_mechanism']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'rainbowcompound:radiance_resonant_assembly']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'createaddition:electrum_spool']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'rainbowcompound:overcharged_alloy'])
	]).transitionalItem('luna_flesh_reforged:incomplete_archotech_framework').loops(5)

	event.recipes.summoningrituals
        .altar('luna_flesh_reforged:archotech_framework')
        .id('luna_flesh_reforged:ritual_archotech_cub')
        .input('16x kubejs:mysterious_trinket')
        .input('4x cataclysm:witherite_ingot')
        .input('kubejs:nether_star_shard')
        .input('art_of_forging:enigmatic_construct')
        .input('kubejs:god_consciousness')
        .itemOutput('luna_flesh_reforged:archotech_cube')
        .recipeTime(500);
	
	event.recipes.create.sequenced_assembly([
		Item.of('13x luna_flesh_reforged:archotech_capsule')
	], 'luna_flesh_reforged:archotech_cube', [
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'biomancy:shrinking_serum']),
        event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'kubejs:relic_metal_ingot']),
		event.recipes.createPressing('luna_flesh_reforged:incomplete_archotech_capsule', 'luna_flesh_reforged:incomplete_archotech_capsule'),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'biomancy:living_flesh']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'kubejs:sculk_pieces']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'kubejs:empty_organ_charm']),
		event.recipes.createCutting('luna_flesh_reforged:incomplete_archotech_capsule', 'luna_flesh_reforged:incomplete_archotech_capsule')
    ]).transitionalItem('luna_flesh_reforged:incomplete_archotech_capsule').loops(4)

    event.recipes.create.sequenced_assembly([
		Item.of('luna_flesh_reforged:archotech_adrenaline')
	], 'biomancy:hormone_secretion', [
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_adrenaline', ['luna_flesh_reforged:incomplete_archotech_adrenaline', 'alexsmobs:hemolymph_sac']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_adrenaline', ['luna_flesh_reforged:incomplete_archotech_adrenaline', 'iceandfire:siren_tear']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_adrenaline', ['luna_flesh_reforged:incomplete_archotech_adrenaline', 'iceandfire:pixie_dust']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_adrenaline', ['luna_flesh_reforged:incomplete_archotech_adrenaline', 'biomancy:exotic_compound']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_adrenaline', ['luna_flesh_reforged:incomplete_archotech_adrenaline', 'luna_flesh_reforged:archotech_capsule']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_adrenaline', ['luna_flesh_reforged:incomplete_archotech_adrenaline', 'minecraft:blaze_powder']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_adrenaline', ['luna_flesh_reforged:incomplete_archotech_adrenaline', 'minecraft:nether_wart'])
	]).transitionalItem('luna_flesh_reforged:incomplete_archotech_adrenaline').loops(1)

    event.recipes.create.mechanical_crafting('luna_flesh_reforged:archotech_doublerib_left', [
        'DAD',
        'BDC',
        'DAD'
    ], {
        A: 'luna_flesh_reforged:archotech_rib',
        B: 'kubejs:aesegull_rib_left',
        C: 'irons_spellbooks:heavy_chain_necklace',
        D: 'biomancy:living_flesh'
    })
    event.recipes.create.mechanical_crafting('luna_flesh_reforged:archotech_doublerib_right', [
        'DAD',
        'CDB',
        'DAD'
    ], {
        A: 'luna_flesh_reforged:archotech_rib',
        B: 'kubejs:aesegull_rib_right',
        C: 'irons_spellbooks:heavy_chain_necklace',
        D: 'biomancy:living_flesh'
    })

    event.recipes.create.mechanical_crafting('luna_flesh_reforged:archotech_kidney_right', [
        'DBD',
        'ZOA',
        'DCD'
    ], {
        A: 'luna_flesh_reforged:archotech_kidney',
        B: 'kubejs:dragon_blood_kidney',
        C: 'kubejs:fantasy_kidney',
        D: 'create:precision_mechanism',
        O: 'luna_flesh_reforged:archotech_adrenaline',
        Z: 'kubejs:enery_bottle_max'
    })
    event.recipes.create.mechanical_crafting('luna_flesh_reforged:archotech_kidney_left', [
        'DBD',
        'AOZ',
        'DCD'
    ], {
        A: 'luna_flesh_reforged:archotech_kidney',
        B: 'kubejs:dragon_blood_kidney',
        C: 'kubejs:fantasy_kidney',
        D: 'create:precision_mechanism',
        O: 'luna_flesh_reforged:archotech_adrenaline',
        Z: 'luna_flesh_reforged:ender_bottle_max'
    })
    event.recipes.create.mechanical_crafting('luna_flesh_reforged:archotech_void_heart_engine', [
        ' MLM ',
        'KIAIK',
        'JHBHJ',
        'HFCFH',
        'HGDGH',
        ' HEH '
    ], {
        A: 'kubejs:prismarine_crown',
        B: 'witherstormmod:command_block_book',
        C: 'luna_flesh_reforged:dark_archotech_shard',
        D: 'luna_flesh_reforged:stardust_core',
        E: 'luna_flesh_reforged:warped_battery',
        F: 'luna_flesh_reforged:archotech_heart',
        G: 'luna_flesh_reforged:irradiant_stardust_fragment',
        H: 'luna_flesh_reforged:bioferrite_shard',
        I: 'create:flywheel',
        J: 'create:steam_engine',
        K: 'createaddition:small_light_connector',
        L: 'createaddition:electric_motor',
        M: 'createaddition:redstone_relay'
    })
    
    event.recipes.create.mechanical_crafting('luna_flesh_reforged:archotech_lung_double', [
        ' DPD ',
        'CLSLC',
        'EFBFE'
    ], {
        L: 'luna_flesh_reforged:archotech_lung',
        B: 'kubejs:harbinger_lung',
        C: 'luna_flesh_reforged:archotech_framework',
        D: 'kubejs:dragon_blood_lung',
        E: 'luna_flesh_reforged:archotech_capsule',
        F: 'kubejs:fantasy_lung',
        P: 'kubejs:weird_paperman',
        S: 'kubejs:dreadsteel_ingot'
    })


    event.recipes.create.mechanical_crafting('luna_flesh_reforged:ender_bottle_max', [
		' AZA ',
		'ABEBA',
		'ABDBA',
		'ABEBA',
		'AAAAA'
	], {
		A: 'rainbowcompound:polished_ender_quartz',
		B: 'createaddition:modular_accumulator',
		D: 'nameless_trinkets:experience_battery',
		E: 'minecraft:netherite_ingot',
        Z: 'chestcavity:ender_appendix'
	})
    event.recipes.create.mechanical_crafting('luna_flesh_reforged:variable_speed_gear', [
		'  P  ',
		' SPB ',
		'PRGDP',
		' BKS ',
		'  P  '
	], {
		G: 'kubejs:revolution_gear',
		S: 'create:cogwheel',
		B: 'create:large_cogwheel',
		P: 'create:brass_sheet',
        K: 'create:rotation_speed_controller',
		R: 'rainbowcompound:radiance_mechanism',
		D: 'rainbowcompound:shadow_mechanism',
	})

	event.recipes.create.sequenced_assembly([
		Item.of('luna_flesh_reforged:chromatic_piston').withChance(80.0),
		Item.of('luna_flesh_reforged:chromatic_rose_muscle').withChance(20.0)
	], 'luna_flesh_reforged:chromatic_rose_muscle', [
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_chromatic_piston', ['luna_flesh_reforged:incomplete_chromatic_piston', 'chestcavity:piston_muscle']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_chromatic_piston', ['luna_flesh_reforged:incomplete_chromatic_piston', 'createaddition:copper_wire']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_chromatic_piston', ['luna_flesh_reforged:incomplete_chromatic_piston', 'createaddition:gold_wire']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_chromatic_piston', ['luna_flesh_reforged:incomplete_chromatic_piston', 'create:mechanical_piston']),
		event.recipes.createPressing('luna_flesh_reforged:incomplete_chromatic_piston', 'luna_flesh_reforged:incomplete_chromatic_piston'),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_chromatic_piston', ['luna_flesh_reforged:incomplete_chromatic_piston', 'create:chromatic_compound'])
	]).transitionalItem('luna_flesh_reforged:incomplete_chromatic_piston').loops(4)

    event.recipes.create.mechanical_crafting('luna_flesh_reforged:warped_battery', [
		' OAO ',
		'MZBZM',
		'MICIM',
		'MZDZM',
		'PPPPP'
	], {
		A: 'createaddition:portable_energy_interface',
		B: 'luna_flesh_reforged:zombie_brain',
		C: '#luna_flesh_reforged:greatone_charm',
		D: 'createaddition:alternator',
		M: 'createaddition:modular_accumulator',
		I: 'rainbowcompound:integrated_circuit',
		P: '#forge:plates/iron',
		O: 'rainbowcompound:obsidianite_ingot',
        Z: '#forge:plates/zinc'
	})
	
	event.recipes.summoningrituals
        .altar('kubejs:magic_muscle')
        .id('luna_flesh_reforged:ritual_psylink_neuro')
        .input('kubejs:bad_ink')
        .input('kubejs:ancient_chip')
        .input('6x kubejs:ritual_catalyst')
        .input('6x luna_flesh_reforged:stardust_fragment')
        .input('2x luna_flesh_reforged:archotech_capsule')
        .itemOutput('luna_flesh_reforged:psylink_neuro')
        .recipeTime(800);

	event.recipes.summoningrituals
        .altar('luna_flesh_reforged:archotech_capsule')
        .id('luna_flesh_reforged:ritual_archotech_mana_reactor')
        .input('64x irons_spellbooks:arcane_essence')
        .input('kubejs:red_ink')
        .input('luna_flesh_reforged:archotech_intestine')
        .input('chestcavity:mana_reactor')
        .itemOutput('luna_flesh_reforged:archotech_mana_reactor')
        .recipeTime(400);

	event.recipes.summoningrituals
        .altar('kubejs:rose_quartz_heart')
        .id('luna_flesh_reforged:ritual_chromatic_rose_heart')
        .input('8x create:chromatic_compound')
        .input('create:precision_mechanism')
        .input('4x biomancy:rejuvenation_serum')
        .input('4x biomancy:absorption_boost')
        .input('kubejs:rose_quartz_muscle')
        .itemOutput('luna_flesh_reforged:chromatic_rose_heart')
        .recipeTime(300);

    event.recipes.summoningrituals
        .altar('kubejs:rose_quartz_muscle')
        .id('luna_flesh_reforged:ritual_chromatic_rose_muscle')
        .input('kubejs:rose_quartz_muscle')
        .input('8x create:chromatic_compound')
        .input('4x biomancy:rejuvenation_serum')
        .input('kubejs:fantasy_muscle')
        .itemOutput('luna_flesh_reforged:chromatic_rose_muscle')
        .recipeTime(300);
		
	event.recipes.summoningrituals
        .altar('kubejs:crimson_mosquito_mouthparts')
        .id('luna_flesh_reforged:ritual_lager_bone_soul')
        .input('rainbowcompound:radiance_mechanism')
        .input('kubejs:bone_soul')
        .input('rainbowcompound:shadow_mechanism')
        .input('kubejs:telescopic_attack_arm')
        .itemOutput('luna_flesh_reforged:lager_bone_soul')
        .recipeTime(300);

    event.recipes.summoningrituals
        .altar('luna_flesh_reforged:archotech_lastinger')
        .id('luna_flesh_reforged:ritual_archotech_dragon_appendix')
        .input('kubejs:fire_dragon_appendix')
        .input('kubejs:lightning_dragon_appendix')
        .input('kubejs:ice_dragon_appendix')
        .itemOutput('luna_flesh_reforged:archotech_dragon_appendix')
        .recipeTime(300);

    event.recipes.summoningrituals
        .altar('irons_spellbooks:upgrade_orb')
        .id('luna_flesh_reforged:ritual_stardust_core')
        .input('16x kubejs:dark_stardust_fragment')
        .input('16x luna_flesh_reforged:stardust_fragment')
        .input('rainbowcompound:enchanted_golden_apple_stew')
        .input('16x goety:ectoplasm')
        .input('irons_spellbooks:legendary_ink')
        .itemOutput('luna_flesh_reforged:stardust_core')
        .recipeTime(300);

    event.recipes.summoningrituals
        .altar('kubejs:magic_muscle')
        .id('luna_flesh_reforged:ritual_dragon_heartstring')
        .input('#iceandfire:dragon_hearts')
        .input('tetra:dragon_sinew')
        .input('#iceandfire:dragon_bloods')
        .input('#kubejs:spine')
        .itemOutput('luna_flesh_reforged:dragon_heartstring')
        .recipeTime(500);

    event.recipes.summoningrituals
        .altar('luna_flesh_reforged:zombie_brain')
        .id('luna_flesh_reforged:ritual_bioferrite_shard')
        .input('16x luna_flesh_reforged:enchanted_infected_flesh')
        .input('kubejs:dreadsteel_ingot')
        .input('goety:dark_ingot')
        .input('2x graveyard:dark_iron_ingot')
        .input('3x luna_flesh_reforged:ectoplasm_wooden_shard')
        .itemOutput('luna_flesh_reforged:bioferrite_shard')
        .recipeTime(100);
})

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

ServerEvents.highPriorityData(event => {
    function registerCustomRecipe(recipeModel) {
        let id = recipeModel.result.id.toString()
        let item = id.split(':')[1]
        event.addJson(`luna_flesh_reforged:recipes/bio_forging/${item}.json`, recipeModel)
    }
	
	registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:heart_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_heart' }], Item.of('luna_flesh_reforged:archotech_heart')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:lung_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_lung' }], Item.of('luna_flesh_reforged:archotech_lung')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:muscle_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_muscle' }], Item.of('luna_flesh_reforged:archotech_muscle')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:intestine_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_intestine' }], Item.of('luna_flesh_reforged:archotech_intestine')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:rib_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_rib' }], Item.of('luna_flesh_reforged:archotech_rib')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:spleen_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_spleen' }], Item.of('luna_flesh_reforged:archotech_spleen')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:spine_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_spine' }], Item.of('luna_flesh_reforged:archotech_spine')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:stomach_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_stomach' }], Item.of('luna_flesh_reforged:archotech_stomach')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:kidney_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_kidney' }], Item.of('luna_flesh_reforged:archotech_kidney')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:liver_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_liver' }], Item.of('luna_flesh_reforged:archotech_liver')).setNutrientsCost(64).setTab('biomancy:weapons'))
	
	registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 4, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:appendix_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_appendix' }], Item.of('luna_flesh_reforged:archotech_appendix')).setNutrientsCost(64).setTab('biomancy:weapons'))
	
	registerCustomRecipe(new BioForgingRecipe([{ 'count': 8, 'item': 'biomancy:flesh_bits' }, { 'count': 8, 'item': 'biomancy:hormone_secretion' }, { 'count': 6, 'item': 'biomancy:mineral_fragment' }, { 'count': 6, 'item': 'biomancy:bone_fragments' }, { 'count': 8, 'item': 'kubejs:common_mineral_cluster' }], Item.of('luna_flesh_reforged:stoneskin_gland')).setNutrientsCost(30).setTab('biomancy:weapons'))
	
	registerCustomRecipe(new BioForgingRecipe([{ 'count': 2, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:absorption_boost' }, { 'count': 1, 'item': 'luna_flesh_reforged:stoneskin_gland' }, { 'count': 1, 'item': 'kubejs:relic_metal_plate' }], Item.of('luna_flesh_reforged:archotech_toughskin_gland')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 3, 'item': 'biomancy:living_flesh' }, { 'count': 4, 'item': 'biomancy:malignant_flesh' }, { 'count': 1, 'item': 'graveyard:corruption' }, { 'count': 2, 'item': 'luna_flesh_reforged:crimson_substance' }, { 'count': 2, 'item': 'luna_flesh_reforged:warped_substance' }], Item.of('8x luna_flesh_reforged:infected_flesh')).setNutrientsCost(100).setTab('biomancy:misc'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:heart_iron' }], Item.of('luna_flesh_reforged:infested_heart')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:lung_iron' }], Item.of('luna_flesh_reforged:infested_lung')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:muscle_iron' }], Item.of('luna_flesh_reforged:infested_muscle')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:intestine_iron' }], Item.of('luna_flesh_reforged:infested_intestine')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:rib_iron' }], Item.of('luna_flesh_reforged:infested_rib')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:spleen_iron' }], Item.of('luna_flesh_reforged:infested_spleen')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:spine_iron' }], Item.of('luna_flesh_reforged:infested_spine')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:stomach_iron' }], Item.of('luna_flesh_reforged:infested_stomach')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:kidney_iron' }], Item.of('luna_flesh_reforged:infested_kidney')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 8, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'kubejs:liver_iron' }], Item.of('luna_flesh_reforged:infested_liver')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:enchanted_infected_flesh' }, { 'count': 1, 'item': 'biomancy:mob_gland' }, { 'count': 1, 'item': 'kubejs:appendix_iron' }], Item.of('luna_flesh_reforged:infested_appendix')).setNutrientsCost(64).setTab('biomancy:weapons'))

})

function DigestingRecipe(ingredient, output) {
    this.type = 'biomancy:digesting'
    this.ingredient = ingredient
    this.result = output
    this.nutrientsCost = 2
    this.processingTime = 20 * 8
}

DigestingRecipe.prototype = {
    setNutrientsCost: function (nutrientsCost) {
        this.nutrientsCost = nutrientsCost
        return this
    },
    setProcessingTime: function (processingTime) {
        this.processingTime = processingTime
        return this
    },
}

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel)
    }

    registerCustomRecipe(new DigestingRecipe(Ingredient.of('rainbowcompound:netherwartite_ingot'), Item.of('luna_flesh_reforged:crimson_substance')))
    registerCustomRecipe(new DigestingRecipe(Ingredient.of('rainbowcompound:warpedite_ingot'), Item.of('luna_flesh_reforged:warped_substance')))
})

ServerEvents.recipes(event => {
    
	event.custom({
		"type": "cataclysm:weapon_fusion",
		"base": {
			"item": "kubejs:blade_of_heart"
		},
		"addition": {
			"item": "rainbowcompound:shadow_steel_sword"
		},
		"result": {
			"item": "luna_flesh_reforged:lights_bane"
		}
	})
	event.custom({
		"type": "cataclysm:weapon_fusion",
		"base": {
			"item": "kubejs:executioner_blade_pieces"
		},
		"addition": {
			"item": "rainbowcompound:refined_radiance_scythes"
		},
		"result": {
			"item": "luna_flesh_reforged:radiance_reaper"
		}
	})
	event.custom({
		"type": "cataclysm:weapon_fusion",
		"base": {
			"item": "luna_flesh_reforged:archotech_appendix"
		},
		"addition": {
			"item": "kubejs:long_lasting_pill_gold"
		},
		"result": {
			"item": "luna_flesh_reforged:archotech_lastinger"
		}
    })
    event.custom({
        "type": "cataclysm:weapon_fusion",
        "base": {
            "item": "luna_flesh_reforged:archotech_spine"
        },
        "addition": {
            "item": "luna_flesh_reforged:archotech_toughskin_gland"
        },
        "result": {
            "item": "luna_flesh_reforged:archotech_toughspine"
        }
    })

    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": "luna_flesh_reforged:infected_flesh"
        },
        "result": "luna_flesh_reforged:enchanted_infected_flesh",
        "cookingTime": 60
    })

    event.custom({
        "type": "goety:brazier",
        "soulCost": 10000,
        "ingredients": [
            {
                "item": "luna_flesh_reforged:psylink_neuro"
            },
            {
                "item": "kubejs:plastic_heart"
            },
            {
                "item": "luna_flesh_reforged:irradiant_stardust_fragment"
            },
            {
                "item": "luna_flesh_reforged:stardust_core"
            },
            {
                "item": "kubejs:magic_vision"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:enchanted_psylink_neuro"
        }
    })

    event.custom({
        "type": "goety:brazier",
        "soulCost": 6666,
        "ingredients": [
            {
                "item": "kubejs:warden_core"
            },
            {
                "item": "luna_flesh_reforged:archotech_capsule"
            },
            {
                "item": "luna_flesh_reforged:stardust_core"
            },
            {
                "item": "kubejs:magic_hippocampus"
            },
            {
                "item": "irons_spellbooks:eldritch_manuscript"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:archotech_warden_core"
        }
    })

    event.custom({
        "type": "goety:brazier",
        "soulCost": 5000,
        "ingredients": [
            {
                "item": "luna_flesh_reforged:archotech_stomach"
            },
            {
                "item": "luna_flesh_reforged:archotech_mana_reactor"
            },
            {
                "item": "luna_flesh_reforged:archotech_intestine"
            },
            {
                "item": "chestcavity:inner_furnace"
            },
            {
                "item": "kubejs:god_consciousness"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:archotech_magic_digestive_system"
        }
    })

    event.custom({
        "type": "goety:brazier",
        "soulCost": 250,
        "ingredients": [
            {
                "item": "minecraft:warped_planks"
            },
            {
                "item": "goety:haunted_wood"
            },
            {
                "item": "rainbowcompound:haunted_membrane"
            },
            {
                "item": "luna_flesh_reforged:warped_substance"
            },
            {
                "item": "iceandfire:ectoplasm"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:ectoplasm_wooden_shard"
        }
    })
    event.custom({
        "type": "goety:brazier",
        "soulCost": 1313,
        "ingredients": [
            {
                "item": "art_of_forging:life_fiber"
            },
            {
                "item": "irons_spellbooks:dragonskin"
            },
            {
                "item": "iceandfire:deathworm_tounge"
            },
            {
                "item": "minecraft:weeping_vines"
            },
            {
                "item": "luna_flesh_reforged:enchanted_infected_flesh"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:flesheating_infection_fiber"
        }
    })
    event.custom({
        "type": "goety:brazier",
        "soulCost": 6666,
        "ingredients": [
            {
                "tag": "luna_flesh_reforged:greatone_charm"
            },
            {
                "item": "luna_flesh_reforged:dragon_heartstring"
            },
            {
                "item": "art_of_forging:eerie_shard"
            },
            {
                "item": "irons_spellbooks:eldritch_manuscript"
            },
            {
                "item": "goety:philosophers_stone"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:abyssalwarlock_eye"
        }
    })
    event.custom({
        "type": "goety:brazier",
        "soulCost": 66666,
        "ingredients": [
            {
                "item": "luna_flesh_reforged:abyssalwarlock_eye"
            },
            {
                "item": "luna_flesh_reforged:psylink_neuro"
            },
            {
                "item": "luna_flesh_reforged:stardust_core"
            },
            {
                "item": "witherstormmod:withered_nether_star"
            },
            {
                "item": "goety:corruption_focus"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:archotech_abyssal_core"
        }
    })
    event.custom({
        "type": "goety:brazier",
        "soulCost": 6666,
        "ingredients": [
            {
                "item": "luna_flesh_reforged:bioferrite_shard"
            },
            {
                "item": "rainbowcompound:shadow_resonant_assembly"
            },
            {
                "tag": "luna_flesh_reforged:greatone_charm"
            },
            {
                "item": "luna_flesh_reforged:archotech_capsule"
            },
            {
                "item": "luna_flesh_reforged:nano_plastids"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:dark_archotech_shard"
        }
    })
    event.custom({
        "type": "goety:brazier",
        "soulCost": 10000,
        "ingredients": [
            {
                "item": "luna_flesh_reforged:archotech_spleen"
            },
            {
                "item": "kubejs:magic_hippocampus"
            },
            {
                "item": "luna_flesh_reforged:stardust_core"
            },
            {
                "item": "luna_flesh_reforged:dark_archotech_shard"
            },
            {
                "item": "kubejs:lust_shard"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:archotech_void_spleen"
        }
    })
    event.custom({
        "type": "goety:brazier",
        "soulCost": 10000,
        "ingredients": [
            {
                "item": "luna_flesh_reforged:archotech_liver"
            },
            {
                "item": "kubejs:embers_liver"
            },
            {
                "item": "art_of_forging:heart_of_ender"
            },
            {
                "item": "luna_flesh_reforged:dark_archotech_shard"
            },
            {
                "item": "kubejs:wrath_shard"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:archotech_void_liver"
        }
    })
    event.custom({
        "type": "goety:brazier",
        "soulCost": 10000,
        "ingredients": [
            {
                "item": "kubejs:pride_shard"
            },
            {
                "item": "luna_flesh_reforged:archotech_warden_core"
            },
            {
                "item": "kubejs:god_consciousness"
            },
            {
                "item": "luna_flesh_reforged:dark_archotech_shard"
            },
            {
                "item": "goety:philosophers_stone"
            }
        ],
        "result": {
            "item": "luna_flesh_reforged:void_shock_core"
        }
    })
})

function GoetyRitualRecipe(craftType, ingredients, activation_item, output) {
    this.type = 'goety:ritual'
    this.ritual_type = 'goety:craft'
    this.craftType = craftType
    this.activation_item = activation_item
    this.ingredients = ingredients
    this.result = output
    this.duration = 20
    this.soulCost = 10
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

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel)
    }

    registerCustomRecipe(new GoetyRitualRecipe('animation', [Ingredient.of('kubejs:magic_hippocampus'), Ingredient.of('luna_flesh_reforged:dragon_heartstring'), Ingredient.of('luna_flesh_reforged:archotech_capsule'),
        Ingredient.of('irons_spellbooks:fire_upgrade_orb'), Ingredient.of('irons_spellbooks:ice_upgrade_orb'), Ingredient.of('irons_spellbooks:lightning_upgrade_orb'), Ingredient.of('irons_spellbooks:holy_upgrade_orb'), Ingredient.of('irons_spellbooks:ender_upgrade_orb'), Ingredient.of('irons_spellbooks:blood_upgrade_orb'), Ingredient.of('irons_spellbooks:evocation_upgrade_orb'), Ingredient.of('irons_spellbooks:nature_upgrade_orb'), Ingredient.of('goety:mystic_core')],
        Item.of('alexsmobs:soul_heart'), Item.of('luna_flesh_reforged:jump_second_spiritual_heart')).setSoulCost(100).setDuration(25))

    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [Ingredient.of('art_of_forging:nano_insectoid'), Ingredient.of('kubejs:random_tumor'), Ingredient.of('biomancy:primordial_core'),
        Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'),
        Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh')],
        Item.of('luna_flesh_reforged:infected_flesh'), Item.of('luna_flesh_reforged:nano_plastids')).setSoulCost(25))

    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [Ingredient.of('luna_flesh_reforged:nano_plastids'), Ingredient.of('biomancy:creator_mix'), Ingredient.of('biomancy:absorption_boost'),
        Ingredient.of('hexerei:blood_bottle'), Ingredient.of('alexsmobs:blood_sac'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh')],
        Item.of('luna_flesh_reforged:infested_heart'), Item.of('luna_flesh_reforged:infested_heart_distortion')).setSoulCost(100))
    
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [Ingredient.of('luna_flesh_reforged:nano_plastids'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('biomancy:creator_mix'),
        Ingredient.of('hexerei:blood_bottle'), Ingredient.of('biomancy:absorption_boost'), Ingredient.of('goety:animation_core'), Ingredient.of('luna_flesh_reforged:stoneskin_gland')],
        Item.of('luna_flesh_reforged:infested_spine'), Item.of('luna_flesh_reforged:infested_spine_distortion')).setSoulCost(100))
    
    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [Ingredient.of('luna_flesh_reforged:nano_plastids'), Ingredient.of('biomancy:malignant_flesh_veins'), Ingredient.of('biomancy:creator_mix'),
        Ingredient.of('hexerei:blood_bottle'), Ingredient.of('luna_flesh_reforged:flesheating_infection_fiber'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('goety:hunger_core')],
        Item.of('luna_flesh_reforged:infested_stomach'), Item.of('luna_flesh_reforged:infested_stomach_distortion')).setSoulCost(100))

    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', 
        [Ingredient.of('kubejs:long_lasting_pill_gold'), Ingredient.of('luna_flesh_reforged:infested_kidney'), Ingredient.of('luna_flesh_reforged:infested_muscle'), Ingredient.of('kubejs:origin_of_tumor'), Ingredient.of('kubejs:worm_neuron'), Ingredient.of('luna_flesh_reforged:infested_appendix'), Ingredient.of('luna_flesh_reforged:nano_plastids'), Ingredient.of('kubejs:random_tumor')],
        Item.of('kubejs:random_tumor'), Item.of('luna_flesh_reforged:infested_tumour_distortion')).setSoulCost(100))

    registerCustomRecipe(new GoetyRitualRecipe('magic', 
        [Ingredient.of('luna_flesh_reforged:mini_silverwood'), Ingredient.of('luna_flesh_reforged:mini_silverwood'), Ingredient.of('luna_flesh_reforged:mini_silverwood'), 
        Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('irons_spellbooks:arcane_essence'), 
        Ingredient.of('hexerei:quicksilver_bucket'), Ingredient.of('kubejs:magic_hippocampus'), 
        Ingredient.of('chestcavity:shifting_leaves'), Ingredient.of('chestcavity:shifting_leaves'), Ingredient.of('chestcavity:shifting_leaves')],Item.of('kubejs:fantasy_heart'), Item.of('luna_flesh_reforged:silverwood_heart')).setSoulCost(100))

    registerCustomRecipe(new GoetyRitualRecipe('animation', 
        [Ingredient.of('kubejs:mini_slime'), Ingredient.of('kubejs:magic_muscle'), Ingredient.of('luna_flesh_reforged:chromatic_rose_muscle'), Ingredient.of('kubejs:warden_muscle'), Ingredient.of('luna_flesh_reforged:bioferrite_shard'), Ingredient.of('luna_flesh_reforged:bioferrite_shard'), Ingredient.of('luna_flesh_reforged:bioferrite_shard'), Ingredient.of('art_of_forging:potent_mixture')],
        Item.of('luna_flesh_reforged:archotech_muscle'), Item.of('luna_flesh_reforged:bioferrite_fluid_muscle')).setSoulCost(100))
        

    registerCustomRecipe(new GoetyRitualRecipe('magic', 
        [Ingredient.of('luna_flesh_reforged:dark_archotech_shard'), Ingredient.of('kubejs:greed_shard'), Ingredient.of('kubejs:paradise_regained'), 
        Ingredient.of('kubejs:infinity_force'), Ingredient.of('kubejs:infinity_force'), Ingredient.of('kubejs:infinity_force'), 
        Ingredient.of('luna_flesh_reforged:zombie_brain'), Ingredient.of('goety:undeath_potion'), Ingredient.of('kubejs:holy_potion'), 
        Ingredient.of('kubejs:storm_metal_plate'), Ingredient.of('kubejs:storm_metal_plate'), Ingredient.of('kubejs:storm_metal_plate')],
        Item.of('kubejs:lost_paradise'), Item.of('luna_flesh_reforged:fallen_paradise')).setSoulCost(666).setDuration(13))

})

function MixingCauldronRecipe(ingredients, output) {
    this.type = 'hexerei:mixingcauldron'
    // 原料长度必须为8
    this.ingredients = ingredients
    this.output = output
    this.liquid = { fluid: 'minecraft:water' }
    this.liquidOutput = { fluid: 'minecraft:water' }
    this.fluidLevelsConsumed = 0
}
function MixingCauldronRecipeWithFluidNBTa(ingredients, output) {
    this.type = 'hexerei:mixingcauldron'
    // 原料长度必须为8
    this.ingredients = ingredients
    this.output = output
    this.liquid = { fluid: 'minecraft:water' }
    this.liquidOutput = { fluid: 'minecraft:water' }
    this.fluidLevelsConsumed = 0
}
MixingCauldronRecipe.prototype = {
    setHeatRequirement: function (requirement) {
        this.heatRequirement = requirement
        return this
    },
    setFluid: function (fluid, amount) {
        this.liquid = { 'fluid': fluid }
        this.fluidLevelsConsumed = amount
        return this
    },
    setFluidOutput: function (fluid) {
        this.liquidOutput = { 'fluid': fluid }
        return this
    },
    addHeatRequirement: function () {
        this.heatRequirement = 'heated'
        return this
    },
}
MixingCauldronRecipeWithFluidNBTa.prototype = {
    setHeatRequirement: function (requirement) {
        this.heatRequirement = requirement
        return this
    },
    setFluid: function (fluid, amount, nbt) {
        this.liquid = { 'fluid': fluid , 'nbt': nbt}
        this.fluidLevelsConsumed = amount
        return this
    },
    setFluidOutput: function (fluid) {
        this.liquidOutput = { 'fluid': fluid }
        return this
    },
    addHeatRequirement: function () {
        this.heatRequirement = 'heated'
        return this
    },
}
ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel)
    }
    registerCustomRecipe(new MixingCauldronRecipe(
        [Ingredient.of('minecraft:snowball'), Ingredient.of('minecraft:snowball'), Ingredient.of('minecraft:snowball'), Ingredient.of('minecraft:snowball'), Ingredient.of('minecraft:snowball'), Ingredient.of('minecraft:snowball'), Ingredient.of('minecraft:snowball'), Ingredient.of('minecraft:snowball')],
        Item.of('minecraft:ice').withCount(4)).setFluid('minecraft:water', 2000))
    registerCustomRecipe(new MixingCauldronRecipe(
        [Ingredient.of('minecraft:ice'), Ingredient.of('minecraft:ice'), Ingredient.of('minecraft:ice'), Ingredient.of('minecraft:ice'), Ingredient.of('minecraft:ice'), Ingredient.of('minecraft:ice'), Ingredient.of('minecraft:ice'), Ingredient.of('minecraft:ice')],
        Item.of('minecraft:ice').withCount(10)).setFluid('minecraft:water', 2000))
    
    registerCustomRecipe(new MixingCauldronRecipeWithFluidNBTa(
        [Ingredient.of('bosses_of_mass_destruction:soul_star'), Ingredient.of('createaddition:diamond_grit'), Ingredient.of('hexerei:selenite_shard'), Ingredient.of('irons_spellbooks:arcane_essence'), Ingredient.of('biomancy:exotic_dust'), Ingredient.of('hexerei:mindful_trance_blend'), Ingredient.of('create:experience_nugget'), Ingredient.of('minecraft:end_crystal')],
        Item.of('luna_flesh_reforged:stardust_fragment').withCount(1)).setFluid('hexerei:potion', 1000, '{"Bottle": "REGULAR","Potion":"irons_spellbooks:instant_mana_four"}').addHeatRequirement())
    registerCustomRecipe(new MixingCauldronRecipeWithFluidNBTa(
        [Ingredient.of('luna_flesh_reforged:stardust_fragment'), Ingredient.of('irons_spellbooks:arcane_essence'), Ingredient.of('hexerei:moon_dust'), Ingredient.of('create:experience_nugget'), Ingredient.of('luna_flesh_reforged:stardust_fragment'), Ingredient.of('create:experience_nugget'), Ingredient.of('hexerei:moon_dust'), Ingredient.of('irons_spellbooks:arcane_essence')],
        Item.of('luna_flesh_reforged:stardust_fragment').withCount(4)).setFluid('hexerei:potion', 1000, '{"Bottle": "REGULAR","Potion":"irons_spellbooks:instant_mana_one"}').addHeatRequirement())
    
    registerCustomRecipe(new MixingCauldronRecipe(
        [Ingredient.of('#minecraft:wool'), Ingredient.of('chestcavity:llama_lung'), Ingredient.of('#minecraft:wool'), Ingredient.of('minecraft:leather_horse_armor'), Ingredient.of('minecraft:dirt'), Ingredient.of('minecraft:grass'), Ingredient.of('#minecraft:wool'), Ingredient.of('chestcavity:llama_lung')],
        Item.of('luna_flesh_reforged:llama_in_chestcavity')))
    registerCustomRecipe(new MixingCauldronRecipeWithFluidNBTa(
        [Ingredient.of('chestcavity:creeper_appendix'), Ingredient.of('minecraft:tnt'), Ingredient.of('biomancy:volatile_gland'), Ingredient.of('minecraft:tnt'), Ingredient.of('art_of_forging:potent_mixture'), Ingredient.of('minecraft:tnt'), Ingredient.of('biomancy:volatile_gland'), Ingredient.of('minecraft:tnt')],
        Item.of('luna_flesh_reforged:tnt_in_chestcavity')).setFluid('hexerei:potion', 1000, '{"Bottle": "SPLASH","Potion":"minecraft:water"}'))
    registerCustomRecipe(new MixingCauldronRecipe(
        [Ingredient.of('#minecraft:dirt'), Ingredient.of('minecraft:dirt'), Ingredient.of('minecraft:dirt'), Ingredient.of('minecraft:dirt'), Ingredient.of('minecraft:dirt'), Ingredient.of('minecraft:dirt'), Ingredient.of('minecraft:dirt'), Ingredient.of('minecraft:dirt')],
        Item.of('luna_flesh_reforged:dirt_in_chestcavity')))

    registerCustomRecipe(new MixingCauldronRecipeWithFluidNBTa(
        [Ingredient.of('luna_flesh_reforged:infested_appendix'), Ingredient.of('minecraft:nether_wart'), Ingredient.of('minecraft:golden_carrot'), Ingredient.of('minecraft:golden_carrot'), Ingredient.of('minecraft:golden_carrot'), Ingredient.of('minecraft:golden_carrot'), Ingredient.of('minecraft:golden_carrot'), Ingredient.of('minecraft:fermented_spider_eye')],
        Item.of('luna_flesh_reforged:nightvision_cholecyst').withCount(1)).setFluid('hexerei:potion', 1000, '{"Bottle": "REGULAR","Potion":"minecraft:night_vision"}').addHeatRequirement())
    registerCustomRecipe(new MixingCauldronRecipeWithFluidNBTa(
        [Ingredient.of('kubejs:god_consciousness'), Ingredient.of('irons_spellbooks:cooldown_upgrade_orb'), Ingredient.of('irons_spellbooks:mana_upgrade_orb'), Ingredient.of('irons_spellbooks:cooldown_upgrade_orb'), Ingredient.of('luna_flesh_reforged:stardust_fragment'), Ingredient.of('irons_spellbooks:cooldown_upgrade_orb'), Ingredient.of('irons_spellbooks:mana_upgrade_orb'), Ingredient.of('irons_spellbooks:cooldown_upgrade_orb')],
        Item.of('luna_flesh_reforged:irradiant_stardust_fragment').withCount(1)).setFluid('hexerei:potion', 1000, '{"Bottle": "LINGERING","Potion":"irons_spellbooks:instant_mana_four"}').addHeatRequirement())
    registerCustomRecipe(new MixingCauldronRecipe(
        [Ingredient.of('biomancy:cleansing_serum'), Ingredient.of('irons_spellbooks:arcane_essence'), Ingredient.of('hexerei:moon_dust'), Ingredient.of('goety:ectoplasm'), Ingredient.of('hexerei:mindful_trance_blend'), Ingredient.of('goety:ectoplasm'), Ingredient.of('hexerei:moon_dust'), Ingredient.of('irons_spellbooks:arcane_essence')],
        Item.of('luna_flesh_reforged:purifying_bath_salts').withCount(3)).setFluid('minecraft:water', 1500).addHeatRequirement())
    registerCustomRecipe(new MixingCauldronRecipeWithFluidNBTa(
        [Ingredient.of('supplementaries:soap_block'), Ingredient.of('hexerei:animal_fat'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('chestcavity:raw_rich_sausage'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('chestcavity:raw_rich_human_sausage'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('hexerei:animal_fat')],
        Item.of('luna_flesh_reforged:sanitizing_soap').withCount(1)).setFluid('hexerei:potion', 1000, '{"Bottle": "REGULAR","Potion":"minecraft:strong_regeneration"}').addHeatRequirement())
    registerCustomRecipe(new MixingCauldronRecipeWithFluidNBTa(
        [Ingredient.of('unusualprehistory:ginkgo_wood'), Ingredient.of('minecraft:birch_sapling'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('kubejs:soul_piece'), Ingredient.of('hexerei:quicksilver_bottle'), Ingredient.of('kubejs:soul_piece'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('create:crushed_raw_silver')],
        Item.of('luna_flesh_reforged:mini_silverwood').withCount(1)).setFluid('hexerei:potion', 1000, '{"Bottle": "LINGERING","Potion":"irons_spellbooks:instant_mana_four"}').addHeatRequirement())
    registerCustomRecipe(new MixingCauldronRecipeWithFluidNBTa(
        [Ingredient.of('luna_flesh_reforged:silverwood_heart'), Ingredient.of('kubejs:god_bless_full_necklace'), Ingredient.of('irons_spellbooks:arcane_essence'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('kubejs:polished_amber'), Ingredient.of('luna_flesh_reforged:purifying_bath_salts'), Ingredient.of('irons_spellbooks:arcane_essence'), Ingredient.of('kubejs:empty_organ_charm')],
        Item.of('luna_flesh_reforged:silverheart_charm').withCount(1)).setFluid('hexerei:potion', 1000, '{"Bottle": "LINGERING","Potion":"minecraft:strong_regeneration"}').setFluidOutput('minecraft:water').addHeatRequirement())
    registerCustomRecipe(new MixingCauldronRecipe(
        [Ingredient.of('extraarmor:blacksmith_hammer'), Ingredient.of('waystones:warp_dust'), Ingredient.of('luna_flesh_reforged:zombie_brain'), Ingredient.of('irons_spellbooks:arcane_essence'), Ingredient.of('goety:eerie_pickaxe'), Ingredient.of('irons_spellbooks:arcane_essence'), Ingredient.of('luna_flesh_reforged:zombie_brain'), Ingredient.of('goety:magic_emerald')],
        Item.of('luna_flesh_reforged:eldritch_hammer').withCount(1)).setFluid('minecraft:water', 1000))
        
    registerCustomRecipe(new MixingCauldronRecipe(
        [Ingredient.of('luna_flesh_reforged:dark_archotech_shard'), Ingredient.of('luna_flesh_reforged:flesh_tentacle'), Ingredient.of('luna_flesh_reforged:flesh_tentacle'), Ingredient.of('luna_flesh_reforged:flesh_tentacle'), Ingredient.of('luna_flesh_reforged:bioferrite_fluid_muscle'), Ingredient.of('hexerei:blood_bucket'), Ingredient.of('luna_flesh_reforged:archotech_muscle'), Ingredient.of('hexerei:blood_bucket')],
        Item.of('luna_flesh_reforged:archotech_void_tentacle').withCount(2)).setFluid('hexerei:quicksilver_fluid', 1666).setFluidOutput('hexerei:blood_fluid'))
    registerCustomRecipe(new MixingCauldronRecipe(
        [Ingredient.of('luna_flesh_reforged:dark_archotech_shard'), Ingredient.of('luna_flesh_reforged:flesh_whip'), Ingredient.of('luna_flesh_reforged:flesh_whip'), Ingredient.of('luna_flesh_reforged:flesh_whip'), Ingredient.of('luna_flesh_reforged:bioferrite_fluid_muscle'), Ingredient.of('hexerei:blood_bucket'), Ingredient.of('luna_flesh_reforged:archotech_muscle'), Ingredient.of('hexerei:blood_bucket')],
        Item.of('luna_flesh_reforged:archotech_void_whip').withCount(2)).setFluid('hexerei:quicksilver_fluid', 1666).setFluidOutput('hexerei:blood_fluid'))
})