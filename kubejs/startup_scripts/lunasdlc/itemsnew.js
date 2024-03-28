StartupEvents.registry('item', event => {

	event.create('luna_flesh_reforged:operation_box').texture('kubejs:item/operation_box').maxStackSize(1).group("kubejs.lunadlc")
	.useAnimation('bow')
	.use((level, player, hand) => {
		return true;
	})
	.useDuration(itemStack => 20)
	.finishUsing((itemstack, level, entity) => {
		if (level.isClientSide()) return itemstack
		if (!entity.isPlayer()) return itemstack
		let instance = entity.getChestCavityInstance()
		let oriInv = instance.inventory.getTags()
		let replaceInv = itemstack?.nbt?.inventory
		if (!replaceInv) {
			replaceInv = []
		}
		if (oriInv && replaceInv) {
			instance.inventory.readTags(replaceInv)
			itemstack.setNbt({ inventory: oriInv })
		}
		global.initChestCavityIntoMap(entity, true)
		if (entity.getChestCavityInstance().inventory.hasAnyMatching(item => {
			return pillList_luna.some(ele => ele == item.id.toString())
		})) {
			global.updatePlayerActiveStatus(entity)
			entity.persistentData.putInt(organActive, 1)
		}
		return itemstack
	})

	event.create('luna_flesh_reforged:charm_azathoth').rarity('epic').maxStackSize(1).group("kubejs.lunadlc")
		.texture('luna_flesh_reforged:item/abyssalcraft/charm_azathoth').tag('luna_flesh_reforged:greatone_charm')
	event.create('luna_flesh_reforged:charm_cthulhu').rarity('epic').maxStackSize(1).group("kubejs.lunadlc")
		.texture('luna_flesh_reforged:item/abyssalcraft/charm_cthulhu').tag('luna_flesh_reforged:greatone_charm')
	event.create('luna_flesh_reforged:charm_hastur').rarity('epic').maxStackSize(1).group("kubejs.lunadlc")
		.texture('luna_flesh_reforged:item/abyssalcraft/charm_hastur').tag('luna_flesh_reforged:greatone_charm')
	event.create('luna_flesh_reforged:charm_nyarlathotep').rarity('epic').maxStackSize(1).group("kubejs.lunadlc")
		.texture('luna_flesh_reforged:item/abyssalcraft/charm_nyarlathotep').tag('luna_flesh_reforged:greatone_charm')
	event.create('luna_flesh_reforged:charm_shubniggurath').rarity('epic').maxStackSize(1).group("kubejs.lunadlc")
		.texture('luna_flesh_reforged:item/abyssalcraft/charm_shubniggurath').tag('luna_flesh_reforged:greatone_charm')
	event.create('luna_flesh_reforged:charm_yogsothoth').rarity('epic').maxStackSize(1).group("kubejs.lunadlc")
		.texture('luna_flesh_reforged:item/abyssalcraft/charm_yogsothoth').tag('luna_flesh_reforged:greatone_charm')

	event.create('luna_flesh_reforged:incomplete_archotech_framework', 'create:sequenced_assembly').texture('luna_flesh_reforged:item/incomplete_archotech_framework')
	event.create('luna_flesh_reforged:incomplete_archotech_capsule', 'create:sequenced_assembly').texture('luna_flesh_reforged:item/incomplete_archotech_capsule')
	event.create('luna_flesh_reforged:incomplete_archotech_adrenaline', 'create:sequenced_assembly').texture('biomancy:item/serum/genetic_compound')

	event.create('luna_flesh_reforged:archotech_framework').maxStackSize(8).texture('luna_flesh_reforged:item/archotech_framework').rarity('uncommon').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:archotech_cube').maxStackSize(16).glow(true).texture('luna_flesh_reforged:item/archotech_cube').rarity('uncommon').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:archotech_capsule').maxStackSize(13).glow(true).texture('luna_flesh_reforged:item/archotech_capsule').rarity('uncommon').group("kubejs.lunadlc")

	event.create('luna_flesh_reforged:archotech_adrenaline').texture('luna_flesh_reforged:item/archotech_adrenaline').maxStackSize(1).group("kubejs.lunadlc").glow(true).rarity('epic')
	.useAnimation('bow')
	.use((level, player, hand) => {
		return true;
	})
	.useDuration(itemStack => 10)
	.finishUsing((itemstack, level, entity) => {
		if (level.isClientSide()) return itemstack
		if (!entity.isPlayer()) return itemstack
		entity.potionEffects.add('minecraft:strength', 4*60*20, 3, false, false);
		entity.potionEffects.add('minecraft:luck', 4*60*20, 3, false, false);
		entity.potionEffects.add('minecraft:absorption', 4*60*20, 3, false, false);
		entity.potionEffects.add('minecraft:haste', 4*60*20, 1, false, false);
		entity.potionEffects.add('minecraft:speed', 4*60*20, 0, false, false);
		entity.potionEffects.add('goety:charged', 4*60*20, 1, false, false);
		itemstack.shrink(1);
		return itemstack
	})

	event.create('luna_flesh_reforged:stardust_core').glow(true).texture('luna_flesh_reforged:item/stardust_core').rarity('uncommon').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:irradiant_stardust_fragment').glow(true).texture('luna_flesh_reforged:item/irradiant_stardust_fragment').rarity('epic').group("kubejs.lunadlc").maxStackSize(1)

	event.create('luna_flesh_reforged:crimson_substance').texture('luna_flesh_reforged:item/crimson_substance').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:warped_substance').texture('luna_flesh_reforged:item/warped_substance').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:infected_flesh').texture('luna_flesh_reforged:item/infected_flesh').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:enchanted_infected_flesh').glow(true).texture('luna_flesh_reforged:item/infected_flesh').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:nano_plastids').glow(true).texture('luna_flesh_reforged:item/nano_plastids').tag('itemborders:iron').group("kubejs.lunadlc")

	event.create('luna_flesh_reforged:ectoplasm_wooden_shard').texture('luna_flesh_reforged:item/tetra/ectoplasm_wooden_shard').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:flesheating_infection_fiber').texture('luna_flesh_reforged:item/tetra/flesheating_infection_fiber').group("kubejs.lunadlc")

//扭曲学
	event.create('luna_flesh_reforged:warp_switch').texture('luna_flesh_reforged:item/warp/pure_tear').group("kubejs.lunadlc").tag('luna_flesh_reforged:warp').displayName('扭曲系统内测中，右键使用开关发生扭曲功能').maxStackSize(1)
	event.create('luna_flesh_reforged:zombie_brain').texture('luna_flesh_reforged:item/warp/zombie_brain').group("kubejs.lunadlc").tag('luna_flesh_reforged:warp').food(food => {
        food
            .hunger(4).saturation(0.1).meat().alwaysEdible()
			.effect('minecraft:hunger', 600, 0, 0.8)
    })
	event.create('luna_flesh_reforged:purifying_bath_salts').texture('luna_flesh_reforged:item/warp/purifying_bath_salts').group("kubejs.lunadlc")
	.useAnimation('bow')
	.use((level, player, hand) => {return true;})
	.useDuration(itemStack => 20)
	.finishUsing((itemstack, level, entity) => {
		if (level.isClientSide()) return itemstack
		if (!entity.isPlayer()) return itemstack
		entity.potionEffects.add('luna_flesh_reforged:warpward', 12000, 0, false, false);
		entity.addItemCooldown('luna_flesh_reforged:purifying_bath_salts', 20 * 10)
		itemstack.shrink(1);
		return itemstack
	})
	event.create('luna_flesh_reforged:sanity_checker').texture('luna_flesh_reforged:item/warp/sanity_checker').group("kubejs.lunadlc").tag('luna_flesh_reforged:warp').maxStackSize(1)
	event.create('luna_flesh_reforged:mini_silverwood').texture('luna_flesh_reforged:item/warp/mini_silverwood').group("kubejs.lunadlc").tag('luna_flesh_reforged:warp').maxStackSize(1)
	event.create('luna_flesh_reforged:silverheart_charm').texture('luna_flesh_reforged:item/warp/silverheart_charm').group("kubejs.lunadlc").tag('luna_flesh_reforged:warp').tag('curios:extra').tag('curios:trinkets').tag('curios:charm').maxStackSize(1)
	
//器官	
	function registerOrgan(organ) {
		global.ORGAN_LIST.push(organ)
		let builder = event.create(organ.itemID).maxStackSize(organ.maxStackSize).tag('kubejs:organ').group("kubejs.lunadlc")
		if (organ.ctrlTextLines.length > 0) {
			builder.tag('chestcavity:active')
		}
		if (organ.altTextLines.length > 0) {
			builder.tag('chestcavity:special')
		}
		return builder
	}
	
//调试用

	registerOrgan(new Organ('luna_flesh_reforged:test_organ')
	.addScore('health', 0.25).addScore('breath_recovery', 0.25).addScore('nerves', 0.25).addScore('strength', 0.25).addScore('filtration', 0.25).addScore('detoxification', 0.25).addScore('defense', 0.125).addScore('nutrition', 0.125).addScore('endurance', 0.25).addScore('digestion', 0.125).addScore('metabolism', 0.125).addScore('breath_capacity', 0.125).addScore('speed', 0.25)
	.build()).texture('luna_flesh_reforged:item/test_item')
	.tag('kubejs:archotech')
	.tag('kubejs:damage_only').tag('kubejs:bear_only');

//超凡仿生
    
	registerOrgan(new Organ('luna_flesh_reforged:archotech_lung').addScore('breath_recovery', 2.5).addScore('breath_capacity', 2.5).addScore('endurance', 2.5).addScore('water_breath', 1.25).addScore('hydrophobia', -0.5)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_lung.1" }), Text.gold(2), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_lung.2" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_lung')
	.tag('kubejs:lung').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_muscle').addScore('strength', 2.5).addScore('speed', 2.5).addScore('fire_resistant', 0.25).addScore('impact_resistant', 0.125).addScore('swim_speed', 0.125)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_muscle.1" }), Text.gold(1), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_muscle.2" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_muscle')
	.tag('kubejs:muscle').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_heart').addScore('health', 3).addScore('hydroallergenic', -2.5).addScore('nerves', 0.25)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_heart.1" }), Text.gold(5), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_heart.2" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_heart')
	.tag('kubejs:heart').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_intestine').addScore('nutrition', 2.5).addScore('detoxification', 0.25).addScore('rotgut', 0.5).addScore('rot_nutrition', 0.125)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_intestine.1" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_intestine')
	.tag('kubejs:intestine').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_rib').addScore('defense', 3).addScore('impact_resistant', 0.5).addScore('strength', 0.5)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_rib.1" }), Text.gold(1), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_rib.2" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_rib')
	.tag('kubejs:rib').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_spine').addScore('defense', 1.25).addScore('nerves', 2.5).addScore('knockback_resistant', 2.5).addScore('health', 0.75).addScore('swim_speed', 0.5)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_spine.1" }), Text.gold(1), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_spine.2" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_spine')
	.tag('kubejs:spine').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_spleen').addScore('metabolism', 3).addScore('health', 0.25)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_spleen.1" }), Text.gold(100), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_spleen.2" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_spleen')
	.tag('kubejs:spleen').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_stomach').addScore('digestion', 2.5).addScore('crystalsynthesis', 1.25).addScore('nutrition', 0.5).addScore('rot_digestion', 0.25)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_stomach.1" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_stomach')
	.tag('kubejs:stomach').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_kidney').addScore('filtration', 2.75).addScore('metabolism',0.25).addScore('health', 0.25)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney.1" }), Text.gold('6%'), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney.2" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_kidney')
	.tag('kubejs:kidney').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_liver').addScore('detoxification', 3).addScore('metabolism',0.25).addScore('health', 0.25)
	.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_liver.1" }), Text.gold('5%'), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_liver.2" })])
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_liver')
	.tag('kubejs:liver').tag('kubejs:archotech').tag('itemborders:gold')
	.tag('kubejs:active');

    registerOrgan(new Organ('luna_flesh_reforged:archotech_appendix').addScore('luck', 2.5).addScore('health', 0.25)
	.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_appendix').tag('kubejs:appendix').tag('kubejs:archotech').tag('itemborders:gold');

	
//超凡进阶
	
	registerOrgan(new Organ('luna_flesh_reforged:archotech_toughskin_gland').addScore('defense', 5)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_toughskin_gland.0" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.1" }), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.2" }), Text.yellow(2), Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_toughskin_gland.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_toughskin_gland.2" }), Text.yellow(3), Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_toughskin_gland.3" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_toughskin_gland').rarity('epic')
		.tag('kubejs:archotech')
		.tag('kubejs:active_only');

	registerOrgan(new Organ('luna_flesh_reforged:archotech_toughspine')
		.addScore('defense', 6).addScore('knockback_resistant', 3).addScore('nerves', 2.5).addScore('health', 1).addScore('swim_speed', 0.5)
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.1" }), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.2" }), Text.yellow(2), Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_toughskin_gland.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_toughskin_gland.2" }), Text.yellow(3), Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_toughskin_gland.3" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_toughspine').rarity('epic')
		.tag('kubejs:archotech').tag('kubejs:spine')
		.tag('kubejs:active_only');
	//对称超凡肋骨
	registerOrgan(new Organ('luna_flesh_reforged:archotech_doublerib_left')
		.addScore('defense', 4).addScore('impact_resistant', 1).addScore('strength', 1).addScore('health', 0.25)
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_rib.1" }), Text.gold(2), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_rib.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_left.2" }), Text.gold({ "translate": "item.luna_flesh_reforged.archotech_doublerib_right" }), Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_left.4" }), Text.gold(4), Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_left.5" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_left.2" }), Text.gold({ "translate": "item.luna_flesh_reforged.archotech_doublerib_right" }), Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_left.4" }), Text.gold(0.1), Text.gray({ "translate": "luna_flesh_reforged.tooltips.spell_resist" })])
		.build())
		.texture('luna_flesh_reforged:item/organs/archotech/archotech_doublerib_left').rarity('epic')
		.tag('kubejs:rib').tag('kubejs:archotech')
		.tag('kubejs:active_only');
	registerOrgan(new Organ('luna_flesh_reforged:archotech_doublerib_right')
		.addScore('defense', 4).addScore('impact_resistant', 1).addScore('strength', 1).addScore('health', 0.25)
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_rib.1" }), Text.gold(2), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_rib.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_right.2" }), Text.gold({ "translate": "item.luna_flesh_reforged.archotech_doublerib_left" }), Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_right.4" }), Text.gold(4), Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_right.5" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_right.2" }), Text.gold({ "translate": "item.luna_flesh_reforged.archotech_doublerib_left" }), Text.gray({ "translate": "kubejs.tooltips.aesegull_rib_right.4" }), Text.gold(0.1), Text.gray({ "translate": "luna_flesh_reforged.tooltips.spell_resist" })])
		.build())
		.texture('luna_flesh_reforged:item/organs/archotech/archotech_doublerib_right').rarity('epic')
		.tag('kubejs:rib').tag('kubejs:archotech')
		.tag('kubejs:active_only');
	//对称超凡肾
	registerOrgan(new Organ('luna_flesh_reforged:archotech_kidney_left')
		.addScore('filtration', 2.8).addScore('metabolism',0.4).addScore('health', 0.4)
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney.1" }), Text.gold('6%'), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney_left.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney_left.2" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_kidney_left').rarity('epic')
		.tag('kubejs:kidney').tag('kubejs:archotech')
		.tag('kubejs:active_only');
	registerOrgan(new Organ('luna_flesh_reforged:archotech_kidney_right')
		.addScore('filtration', 2.8).addScore('metabolism',0.4).addScore('health', 0.4)
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney.1" }), Text.gold('6%'), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney_right.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney_right.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_kidney_right.3" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_kidney_right').rarity('epic')
		.tag('kubejs:kidney').tag('kubejs:archotech')
		.tag('kubejs:active_only');

    registerOrgan(new Organ('luna_flesh_reforged:psylink_neuro').addScore('nerves', 5).addScore('luck', 1.25)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.0" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.1" }), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.2" }), Text.yellow(35), Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.1" }), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.2" }), Text.yellow('0.03'), Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.3" }), Text.yellow('0.25'), Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.4a" }), Text.yellow('0.1'), Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.5a" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/psylink_neuro').rarity('epic')
		.tag('kubejs:archotech').tag('kubejs:magic')
		.tag('kubejs:active_only');

	registerOrgan(new Organ('luna_flesh_reforged:enchanted_psylink_neuro').addScore('nerves', 6).addScore('luck', 1.5)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.0" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.1" }), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.2" }), Text.yellow(45), Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.1" }), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.archotech" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.organlink_per.2" }), Text.yellow('0.035'), Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.3" }), Text.yellow('25%'), Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.4b" }), Text.yellow('0.2'), Text.gray({ "translate": "luna_flesh_reforged.tooltips.psylink_neuro.5b" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.enchanted_psylink_neuro.1" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/psylink_neuro').rarity('epic').glow(true)
		.tag('kubejs:archotech').tag('kubejs:magic')
		.tag('kubejs:active_only');
	
	registerOrgan(new Organ('luna_flesh_reforged:archotech_lastinger').addScore('luck', 2.5).addScore('speed', 0.5).addScore('health', 0.25)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_lastinger.0" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.long_lasting_pill_gold.1" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_lastinger').rarity('epic')
		.tag('kubejs:appendix').tag('kubejs:archotech');
	
	registerOrgan(new Organ('luna_flesh_reforged:archotech_mana_reactor').addScore('nutrition', 2.75).addScore('detoxification', 0.25).addScore('crystalsynthesis', 0.75)
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_intestine.1" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.red_ink.1" }), Text.gold({ "translate": "kubejs.tooltips.red_ink.2" }), Text.gray({ "translate": "kubejs.tooltips.red_ink.3" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_mana_reactor')
		.tag('kubejs:intestine').tag('kubejs:archotech').tag('kubejs:magic').rarity('epic')
		.tag('kubejs:bear').tag('kubejs:active');

	registerOrgan(new Organ('luna_flesh_reforged:archotech_magic_digestive_system')
		.addScore('digestion', 3).addScore('nutrition', 6).addScore('crystalsynthesis', 2).addScore('detoxification', 0.5)
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_stomach.1" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.red_ink.1" }), Text.gold({ "translate": "kubejs.tooltips.red_ink.2" }), Text.gray({ "translate": "kubejs.tooltips.red_ink.3" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_magic_digestive_system.1" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_magic_digestive_system.2" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_magic_digestive_system').glow(true)
		.tag('kubejs:intestine').tag('kubejs:stomach').tag('kubejs:archotech').tag('kubejs:magic').rarity('epic')
		.tag('kubejs:bear').tag('kubejs:active').tag('kubejs:rclick_only');

	registerOrgan(new Organ('luna_flesh_reforged:archotech_dragon_appendix')
		.addScore('luck', 2.75).addScore('speed', 0.5).addScore('health', 0.25).addScore('strength', 0.125).addScore('defense', 0.125)
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.long_lasting_pill_gold.1" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_dragon_appendix').rarity('epic')
		.tag('kubejs:appendix').tag('kubejs:archotech').tag('kubejs:dragon');

	registerOrgan(new Organ('luna_flesh_reforged:jump_second_spiritual_heart')
		.addScore('health', 2.5).addScore('nerves', 2).addScore('luck', 1.5)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.jump_second_spiritual_heart.0" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.jump_second_spiritual_heart.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.jump_second_spiritual_heart.2" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.jump_second_spiritual_heart.3" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.jump_second_spiritual_heart.4" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/jump_second_spiritual_heart')
		.tag('kubejs:archotech').tag('kubejs:magic').rarity('epic')
		.tag('kubejs:active_only').tag('kubejs:damage_only');

	//回响核心
	registerOrgan(new Organ('luna_flesh_reforged:archotech_warden_core')
		.addScore('health', 2.0).addScore('endurance', 1.5).addScore('nerves', 1).addScore('luck', 0.5)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_warden_core.1" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_warden_core.2" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_warden_core.3" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_warden_core.4" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_warden_core.5" })])
		.build())
		.texture('luna_flesh_reforged:item/organs/archotech/archotech_warden_core')
		.tag('kubejs:archotech').tag('kubejs:magic').tag('kubejs:relics').rarity('epic')
		.tag('kubejs:key_pressed').tag('kubejs:active');

//未进阶
	
	registerOrgan(new Organ('luna_flesh_reforged:stoneskin_gland').addScore('defense', 3).addScore('nerves', -0.5).addScore('speed', -1.5)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.stoneskin_gland.0" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.stoneskin_gland.1" }), Text.gold(3), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.stoneskin_gland.2" })])
		.build()).texture('luna_flesh_reforged:item/organs/stoneskin_gland')
		.tag('kubejs:active');

	registerOrgan(new Organ('luna_flesh_reforged:dragon_heartstring')
		.addScore('nerves', 1.5).addScore('strength', 1.5)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.dragon_heartstring.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.dragon_heartstring.2" })])
		.build()).texture('luna_flesh_reforged:item/organs/dragon/dragon_heartstring')
		.tag('kubejs:dragon').tag('kubejs:magic').tag('kubejs:muscle').tag('kubejs:active')
        .tag('itemborders:diamond');

//邪术
	//祛邪肥皂
	registerOrgan(new Organ('luna_flesh_reforged:sanitizing_soap')
		.addScore('health', 1.5).addScore('luck', -0.5).addScore('nerves', -0.5)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.sanitizing_soap.0" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.sanitizing_soap.1" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.sanitizing_soap.2" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.sanitizing_soap.3" })])
		.build()).texture('luna_flesh_reforged:item/organs/warp/sanitizing_soap')
		.tag('kubejs:warp').tag('kubejs:rclick_only').tag('kubejs:pancreas').tag('luna_flesh_reforged:warp')
        .tag('itemborders:diamond');
	//银树之心
	registerOrgan(new Organ('luna_flesh_reforged:silverwood_heart')
		.addScore('health', 1.75).addScore('photosynthesis', 1).addScore('luck', 1).addScore('nerves', 0.5)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.silverwood_heart.0" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.silverwood_heart.1" })])
		.build()).texture('luna_flesh_reforged:item/organs/warp/silverwood_heart')
		.tag('kubejs:warp').tag('kubejs:player_tick_only').tag('kubejs:heart').tag('kubejs:magic').tag('luna_flesh_reforged:warp')
        .tag('itemborders:diamond');
	//魔能爆
	registerOrgan(new Organ('luna_flesh_reforged:abyssalwarlock_eye')
		.addScore('health', 0.05).addScore('nerves', 0.05).addScore('breath_recovery', 0.05).addScore('strength', 0.05).addScore('filtration', 0.05).addScore('detoxification', 0.05).addScore('defense', 0.025).addScore('nutrition', 0.025).addScore('endurance', 0.05).addScore('digestion', 0.025).addScore('metabolism', 0.025).addScore('breath_capacity', 0.025).addScore('speed', 0.05)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.abyssalwarlock_eye.0" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.abyssalwarlock_eye.1" })])
		.addTextLines('alt', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.abyssalwarlock_eye.2" })])
		.addTextLines('alt', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.abyssalwarlock_eye.3" })])
		.addTextLines('alt', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.abyssalwarlock_eye.4" })])
		.build()).texture('luna_flesh_reforged:item/organs/warp/abyssalwarlock_eye').rarity('epic')
		.tag('kubejs:warp').tag('kubejs:magic').tag('kubejs:active').tag('kubejs:damage_only');
	registerOrgan(new Organ('luna_flesh_reforged:archotech_abyssal_core')
		.addScore('nerves', 5).addScore('luck', 1.5)
		.addScore('health', 0.25).addScore('breath_recovery', 0.25).addScore('strength', 0.25).addScore('filtration', 0.25).addScore('detoxification', 0.25).addScore('defense', 0.125).addScore('nutrition', 0.125).addScore('endurance', 0.25).addScore('digestion', 0.125).addScore('metabolism', 0.125).addScore('breath_capacity', 0.125).addScore('speed', 0.25)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_abyssal_core.0" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_abyssal_core.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_abyssal_core.2" })])
		.addTextLines('alt', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_abyssal_core.3" })])
		.addTextLines('alt', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_abyssal_core.4" })])
		.addTextLines('alt', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.archotech_abyssal_core.5" })])
		.build()).texture('luna_flesh_reforged:item/organs/warp/archotech_abyssal_core').rarity('epic')
		.tag('kubejs:archotech').tag('kubejs:warp').tag('kubejs:magic').tag('kubejs:active_only').tag('kubejs:damage_only');
	//位能电池
	registerOrgan(new Organ('luna_flesh_reforged:warped_battery')
		.addScore('health', 1).addScore('endurance', 1).addScore('knockback_resistant', 1).addScore('nerves', 0.5)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.warped_battery.0" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.warped_battery.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.warped_battery.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.warped_battery.3" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.warped_battery.4" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.warped_battery.5" })])
		.build()).texture('luna_flesh_reforged:item/organs/warp/warped_battery').rarity('epic')
		.tag('kubejs:warp').tag('kubejs:machine').tag('kubejs:active_only').tag('kubejs:player_tick_only');
	//邪术之锤
	registerOrgan(new Organ('luna_flesh_reforged:eldritch_hammer')
		.addScore('strength', 1.25)
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.eldritch_hammer.1" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.eldritch_hammer.2" })])
		.build()).texture('luna_flesh_reforged:item/organs/warp/eldritch_hammer')
		.tag('kubejs:warp').tag('kubejs:magic').tag('kubejs:key_pressed');
//异彩
	
	registerOrgan(new Organ('luna_flesh_reforged:chromatic_rose_heart')
        .addScore('health', 1.75).addScore('nerves', -0.5)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.chromatic_rose_heart.0" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.4" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.5" }), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.6" }), Text.yellow(2), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.7" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.8" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.9" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.10" }), Text.gray('/'), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.chromatic" }), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.11" }), Text.yellow(1), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.12" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.13" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.red({ "translate": "luna_flesh_reforged.tooltips.chromatic_rose_heart.1" }), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.9" }),Text.yellow({ "translate": "luna_flesh_reforged.tooltips.chromatic" }), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.11" }), Text.yellow(2), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.12" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.13" })])
        .build())
        .texture('luna_flesh_reforged:item/organs/chromatic/chromatic_rose_heart')
        .tag('kubejs:heart')
        .tag('itemborders:gold')
        .tag('kubejs:rose').tag('kubejs:chromatic')
        .tag('kubejs:active_only').tag('kubejs:active');

	registerOrgan(new Organ('luna_flesh_reforged:chromatic_rose_muscle')
		.addScore('strength', 1.75).addScore('speed', 1).addScore('crystalsynthesis', 0.125)
        .addScore('endurance', 1).addScore('nerves', -0.5).addScore('breath_recovery', -0.5)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.chromatic_rose_muscle.0" })])
        .build())
        .texture('luna_flesh_reforged:item/organs/chromatic/chromatic_rose_muscle')
        .tag('kubejs:muscle').tag('itemborders:gold').tag('kubejs:rose').tag('kubejs:chromatic');

	registerOrgan(new Organ('luna_flesh_reforged:lights_bane').addScore('strength', 1)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.lights_bane.0" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.lights_bane.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.blade_of_heart.2" }), Text.gold('25%')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.red({ "translate": "luna_flesh_reforged.tooltips.tonly.0" })])
		.build()).texture('luna_flesh_reforged:item/organs/chromatic/lights_bane')
		.tag('kubejs:chromatic').tag('kubejs:damage_only')
		.tag('kubejs:relics');
	
	registerOrgan(new Organ('luna_flesh_reforged:radiance_reaper').addScore('strength', 2)
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.0" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.1" }), Text.gold({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.2" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.4" }), Text.gold({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.5" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.red({ "translate": "luna_flesh_reforged.tooltips.tonly.0" })])
		.build()).texture('luna_flesh_reforged:item/organs/chromatic/radiance_reaper')
		.tag('kubejs:muscle').tag('kubejs:chromatic').tag('kubejs:damage_only')
		.tag('kubejs:relics');
	
	registerOrgan(new Organ('luna_flesh_reforged:lager_bone_soul')
        .addScore('defense', 0.5).addScore('strength', 1)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.lager_bone_soul.0" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.lager_bone_soul.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.bone_soul.3" }), Text.gold('40%'), Text.gray({ "translate": "luna_flesh_reforged.tooltips.lager_bone_soul.2" }), Text.red({ "translate": "luna_flesh_reforged.tooltips.lager_bone_soul.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.bone_soul.3" }), Text.gold('4%'), Text.gray({ "translate": "kubejs.tooltips.bone_soul.5" }), Text.red({ "translate": "kubejs.tooltips.bone_soul.6" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.red({ "translate": "kubejs.tooltips.bone_soul.7" })])
        .build())
        .texture('luna_flesh_reforged:item/organs/chromatic/lager_bone_soul')
        .tag('kubejs:damage_only').tag('kubejs:chromatic')
		.tag('kubejs:relics');

	registerOrgan(new Organ('luna_flesh_reforged:ender_bottle_max')
        .addScore('filtration', 1.5).addScore('detoxification', 0.5)
		.addScore('arrow_dodging', 1).addScore('hydroallergenic', 1)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.ender_bottle_max.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.enery_bottle_max.2" }), Text.darkPurple({ "translate": "luna_flesh_reforged.tooltips.chromatic" }), Text.gray({ "translate": "kubejs.tooltips.enery_bottle_max.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.enery_bottle_max.4" }), Text.gold({ "translate": "effect.kubejs.flaring_heart" }), Text.gold('/'), Text.gold({ "translate": "effect.kubejs.burning_heart" }), Text.gray({ "translate": "kubejs.tooltips.enery_bottle_max.5" })])
        .build())
        .texture('luna_flesh_reforged:item/organs/chromatic/ender_bottle_max')
        .tag('kubejs:machine').tag('kubejs:damage_only').tag('kubejs:kidney').tag('kubejs:chromatic')
        .tag('itemborders:diamond');
    // 变速齿轮
    registerOrgan(new Organ('luna_flesh_reforged:variable_speed_gear')
        .addScore('defense', 0.75).addScore('nerves', 0.75).addScore('speed', 0.75)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.variable_speed_gear.0" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.variable_speed_gear.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.variable_speed_gear.2" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.variable_speed_gear.3" })])
        .build())
        .texture('luna_flesh_reforged:item/organs/chromatic/variable_speed_gear')
        .tag('itemborders:diamond').tag('kubejs:bear_only').tag('kubejs:damage_only').tag('kubejs:player_tick_only')
        .tag('kubejs:machine').tag('kubejs:chromatic');

//Infested感染
	registerOrgan(new Organ('luna_flesh_reforged:infested_lung').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('breath_recovery', 1.75).addScore('breath_capacity', 1.75).addScore('endurance', 1.75)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_lung').tag('kubejs:lung').tag('kubejs:infected');

	registerOrgan(new Organ('luna_flesh_reforged:infested_muscle').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('strength', 1.75).addScore('speed', 1.75)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_muscle').tag('kubejs:muscle').tag('kubejs:infected');

	registerOrgan(new Organ('luna_flesh_reforged:infested_heart').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('health', 2)
		.addScore('fire_resistant', -0.5).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_heart').tag('kubejs:infected').tag('kubejs:heart');

	registerOrgan(new Organ('luna_flesh_reforged:infested_intestine').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('nutrition', 1.875)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_intestine').tag('kubejs:infected').tag('kubejs:intestine');

	registerOrgan(new Organ('luna_flesh_reforged:infested_rib').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('defense', 1.75)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_rib').tag('kubejs:rib').tag('kubejs:infected');

	registerOrgan(new Organ('luna_flesh_reforged:infested_spine').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('defense', 1.125).addScore('nerves', 1.75)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_spine').tag('kubejs:infected').tag('kubejs:spine');

	registerOrgan(new Organ('luna_flesh_reforged:infested_spleen').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('metabolism', 2)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_spleen').tag('kubejs:infected').tag('kubejs:spleen');

	registerOrgan(new Organ('luna_flesh_reforged:infested_stomach').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('digestion', 1.875)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_stomach').tag('kubejs:infected').tag('kubejs:stomach');

	registerOrgan(new Organ('luna_flesh_reforged:infested_kidney').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('filtration', 1.75)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_kidney').tag('kubejs:infected').tag('kubejs:kidney');

	registerOrgan(new Organ('luna_flesh_reforged:infested_liver').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('detoxification', 1.75)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_liver').tag('kubejs:infected').tag('kubejs:liver');

	registerOrgan(new Organ('luna_flesh_reforged:infested_appendix').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('luck', 1.75)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_appendix').tag('kubejs:infected').tag('kubejs:appendix');
	//效果胆囊
	registerOrgan(new Organ('luna_flesh_reforged:nightvision_cholecyst').addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ.1" })])
		.addScore('luck', 1.75)
		.addScore('fire_resistant', -0.5).addScore('health', 0.25).addScore('metabolism', 0.125)
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.nightvision_cholecyst.1" })])
		.build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_appendix')
		.tag('kubejs:player_tick_only').tag('kubejs:infected').tag('kubejs:appendix');
//感染进阶
	registerOrgan(new Organ('luna_flesh_reforged:infested_heart_distortion')
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ_distortion.1" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_heart_distortion.0" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_heart_distortion.4" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_heart_distortion.1" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_heart_distortion.2" })])
		.addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_heart_distortion.3" })])
		.addScore('health', 3)
		.addScore('fire_resistant', -1).addScore('metabolism', 1)
		.addScore('digestion', 0.025).addScore('nutrition', 0.025).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_heart_distortion')
		.tag('kubejs:active_only').tag('kubejs:infected').tag('kubejs:heart').tag('kubejs:player_tick_only');
	
	registerOrgan(new Organ('luna_flesh_reforged:infested_spine_distortion')
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ_distortion.1" })])
		.addTextLines('ctrl', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ_distortion.3" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ_distortion.2" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_spine_distortion.1" })])
		.addTextLines('alt', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_spine_distortion.2" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_spine_distortion.3" })])
		.addScore('defense', 2.5).addScore('nerves', 2)
		.addScore('fire_resistant', -1).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_spine_distortion')
		.tag('kubejs:infected').tag('kubejs:spine').tag('kubejs:bear_only').tag('kubejs:player_tick_only').tag('kubejs:active_only');
	
	registerOrgan(new Organ('luna_flesh_reforged:infested_stomach_distortion')
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ_distortion.1" })])
		.addTextLines('ctrl', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ_distortion.3" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ_distortion.2" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_stomach_distortion.1" })])
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_stomach_distortion.2" })])
		.addScore('digestion', 2).addScore('nutrition', 0.25)
		.addScore('fire_resistant', -1).addScore('health', 0.25).addScore('metabolism', 0.125).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_stomach_distortion')
		.tag('kubejs:infected').tag('kubejs:stomach').tag('kubejs:damage_only').tag('kubejs:active_only');
	

})