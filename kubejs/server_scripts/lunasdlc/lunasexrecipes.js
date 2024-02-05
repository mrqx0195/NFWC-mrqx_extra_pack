ServerEvents.recipes(event => {
	
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
        .id('luna_flesh_reforged:ritual_archotech_cube')
        .input('64x biomancy:exotic_compound')
        .input('32x kubejs:mysterious_trinket')
        .input('16x lightmanscurrency:coinpile_gold')
        .input('8x cataclysm:mech_eye')
        .input('4x cataclysm:witherite_ingot')
        .itemOutput('luna_flesh_reforged:archotech_cube')
        .recipeTime(500);
	
	event.recipes.create.sequenced_assembly([
		Item.of('13x luna_flesh_reforged:archotech_capsule')
	], 'luna_flesh_reforged:archotech_cube', [
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'biomancy:shrinking_serum']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'kubejs:relic_metal_plate']),
		event.recipes.createPressing('luna_flesh_reforged:incomplete_archotech_capsule', 'luna_flesh_reforged:incomplete_archotech_capsule'),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'biomancy:living_flesh']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'kubejs:sculk_pieces']),
		event.recipes.createDeploying('luna_flesh_reforged:incomplete_archotech_capsule', ['luna_flesh_reforged:incomplete_archotech_capsule', 'kubejs:empty_organ_charm']),
		event.recipes.createCutting('luna_flesh_reforged:incomplete_archotech_capsule', 'luna_flesh_reforged:incomplete_archotech_capsule')
	]).transitionalItem('luna_flesh_reforged:incomplete_archotech_capsule').loops(5)
	
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
	
	registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:heart_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_heart' }], Item.of('luna_flesh_reforged:archotech_heart')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:lung_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_lung' }], Item.of('luna_flesh_reforged:archotech_lung')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:muscle_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_muscle' }], Item.of('luna_flesh_reforged:archotech_muscle')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:intestine_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_intestine' }], Item.of('luna_flesh_reforged:archotech_intestine')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:rib_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_rib' }], Item.of('luna_flesh_reforged:archotech_rib')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:spleen_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_spleen' }], Item.of('luna_flesh_reforged:archotech_spleen')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:spine_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_spine' }], Item.of('luna_flesh_reforged:archotech_spine')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:stomach_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_stomach' }], Item.of('luna_flesh_reforged:archotech_stomach')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:kidney_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_kidney' }], Item.of('luna_flesh_reforged:archotech_kidney')).setNutrientsCost(64).setTab('biomancy:weapons'))

    registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:liver_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_liver' }], Item.of('luna_flesh_reforged:archotech_liver')).setNutrientsCost(64).setTab('biomancy:weapons'))
	
	registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 1, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 4, 'item': 'biomancy:living_flesh' }, { 'count': 1, 'item': 'kubejs:appendix_diamond' }, { 'count': 1, 'item': 'kubejs:prehistory_appendix' }], Item.of('luna_flesh_reforged:archotech_appendix')).setNutrientsCost(64).setTab('biomancy:weapons'))
	
	registerCustomRecipe(new BioForgingRecipe([{ 'count': 8, 'item': 'biomancy:flesh_bits' }, { 'count': 8, 'item': 'biomancy:hormone_secretion' }, { 'count': 6, 'item': 'biomancy:mineral_fragment' }, { 'count': 6, 'item': 'biomancy:bone_fragments' }, { 'count': 8, 'item': 'kubejs:common_mineral_cluster' }], Item.of('luna_flesh_reforged:stoneskin_gland')).setNutrientsCost(30).setTab('biomancy:weapons'))
	
	registerCustomRecipe(new BioForgingRecipe([{ 'count': 1, 'item': 'kubejs:random_tumor' }, { 'count': 2, 'item': 'luna_flesh_reforged:archotech_capsule' }, { 'count': 8, 'item': 'biomancy:absorption_boost' }, { 'count': 1, 'item': 'luna_flesh_reforged:stoneskin_gland' }, { 'count': 1, 'item': 'kubejs:relic_metal_plate' }], Item.of('luna_flesh_reforged:archotech_toughskin_gland')).setNutrientsCost(64).setTab('biomancy:weapons'))
	
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
	
})