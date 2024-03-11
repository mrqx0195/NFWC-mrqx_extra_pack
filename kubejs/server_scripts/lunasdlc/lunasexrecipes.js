ServerEvents.recipes(event => {
	
    event.shapeless('luna_flesh_reforged:operation_box', ['kubejs:operation_box'])
        .modifyResult((grid, stack) => {
            let nbt = grid.find('kubejs:operation_box').nbt
            stack = Item.of('luna_flesh_reforged:operation_box', nbt)
                return stack;
        });
    event.shapeless('kubejs:operation_box', ['luna_flesh_reforged:operation_box'])
        .modifyResult((grid, stack) => {
            let nbt = grid.find('kubejs:operation_box').nbt
            stack = Item.of('luna_flesh_reforged:operation_box', nbt)
                return stack;
        });
	
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
		Item.of('luna_flesh_reforged:archotech_framework')
	], 'create_crystal_clear:brass_glass_casing', [
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'rainbowcompound:netherstar_ingot']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'createaddition:electrum_spool']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'rainbowcompound:shadow_resonant_assembly']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'create:precision_mechanism']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'rainbowcompound:radiance_resonant_assembly']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'createaddition:electrum_spool']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_framework', ['luna_flesh_reforged:incomplete_archotech_framework', 'rainbowcompound:overcharged_alloy'])
	]).transitionalItem('luna_flesh_reforged:incomplete_archotech_framework').loops(3)

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
	
	event.recipes.summoningrituals
        .altar('kubejs:magic_muscle')
        .id('luna_flesh_reforged:ritual_psylink_neuro')
        .input('kubejs:bad_ink')
        .input('kubejs:ancient_chip')
        .input('6x kubejs:ritual_catalyst')
        .input('6x kubejs:stardust_fragment')
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
        .itemOutput('luna_flesh_reforged:chromatic_rose_heart')
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
        .input('16x kubejs:stardust_fragment')
        .input('rainbowcompound:enchanted_golden_apple_stew')
        .input('16x goety:ectoplasm')
        .itemOutput('luna_flesh_reforged:stardust_core')
        .recipeTime(300);
		
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
                "item": "kubejs:god_consciousness"
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

    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [Ingredient.of('art_of_forging:nano_insectoid'), Ingredient.of('kubejs:random_tumor'), Ingredient.of('biomancy:primordial_core'),
        Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'),
        Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh')],
        Item.of('luna_flesh_reforged:infected_flesh'), Item.of('luna_flesh_reforged:nano_plastids')).setSoulCost(25))

    registerCustomRecipe(new GoetyRitualRecipe('necroturgy', [Ingredient.of('luna_flesh_reforged:nano_plastids'), Ingredient.of('biomancy:creator_mix'), Ingredient.of('biomancy:absorption_boost'),
        Ingredient.of('hexerei:blood_bottle'), Ingredient.of('alexsmobs:blood_sac'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh'), Ingredient.of('luna_flesh_reforged:enchanted_infected_flesh')],
        Item.of('luna_flesh_reforged:infested_heart'), Item.of('luna_flesh_reforged:infested_heart_distortion')).setSoulCost(100))

})