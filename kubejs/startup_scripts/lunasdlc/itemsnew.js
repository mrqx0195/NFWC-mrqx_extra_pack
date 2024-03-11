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
	
	event.create('luna_flesh_reforged:incomplete_archotech_framework', 'create:sequenced_assembly').texture('luna_flesh_reforged:item/incomplete_archotech_framework')
	event.create('luna_flesh_reforged:incomplete_archotech_capsule', 'create:sequenced_assembly').texture('luna_flesh_reforged:item/incomplete_archotech_capsule')
	event.create('luna_flesh_reforged:archotech_framework').maxStackSize(8).texture('luna_flesh_reforged:item/archotech_framework').rarity('uncommon').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:archotech_cube').maxStackSize(16).glow(true).texture('luna_flesh_reforged:item/archotech_cube').rarity('uncommon').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:archotech_capsule').glow(true).texture('luna_flesh_reforged:item/archotech_capsule').rarity('uncommon').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:stardust_core').glow(true).texture('luna_flesh_reforged:item/stardust_core').rarity('uncommon').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:crimson_substance').texture('luna_flesh_reforged:item/crimson_substance').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:warped_substance').texture('luna_flesh_reforged:item/warped_substance').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:infected_flesh').texture('luna_flesh_reforged:item/infected_flesh').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:enchanted_infected_flesh').glow(true).texture('luna_flesh_reforged:item/infected_flesh').group("kubejs.lunadlc")
	event.create('luna_flesh_reforged:nano_plastids').glow(true).texture('luna_flesh_reforged:item/nano_plastids').tag('itemborders:iron').group("kubejs.lunadlc")
	
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

	registerOrgan(new Organ('luna_flesh_reforged:archotech_dragon_appendix')
		.addScore('luck', 2.75).addScore('speed', 0.5).addScore('health', 0.25).addScore('strength', 0.125).addScore('defense', 0.125)
		.addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.long_lasting_pill_gold.1" })])
		.build()).texture('luna_flesh_reforged:item/organs/archotech/archotech_dragon_appendix').rarity('epic')
		.tag('kubejs:appendix').tag('kubejs:archotech').tag('kubejs:dragon');

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
	
//异彩
	
	registerOrgan(new Organ('luna_flesh_reforged:lights_bane').addScore('strength', 2)
	.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.lights_bane.0" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.lights_bane.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.blade_of_heart.2" }), Text.gold('25%')])
        .addTextLines('alt', [LEADING_SYMBOL, Text.red({ "translate": "luna_flesh_reforged.tooltips.tonly.0" })])
	.build()).texture('luna_flesh_reforged:item/organs/lights_bane')
	.tag('kubejs:chromatic').tag('kubejs:damage_only')
	.tag('kubejs:relics');
	
	registerOrgan(new Organ('luna_flesh_reforged:radiance_reaper').addScore('strength', 2)
	.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.0" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.1" }), Text.gold({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.2" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.4" }), Text.gold({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.5" }), Text.gray({ "translate": "luna_flesh_reforged.tooltips.radiance_reaper.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.red({ "translate": "luna_flesh_reforged.tooltips.tonly.0" })])
	.build()).texture('luna_flesh_reforged:item/organs/radiance_reaper')
	.tag('kubejs:muscle').tag('kubejs:chromatic').tag('kubejs:damage_only')
	.tag('kubejs:relics');
	
	registerOrgan(new Organ('luna_flesh_reforged:chromatic_rose_heart')
        .addScore('health', 1.75)
        .addScore('nerves', -0.5)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.chromatic_rose_heart.0" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.4" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.5" }), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.6" }), Text.yellow(2), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.7" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.8" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.9" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.10" }), Text.gray('/'), Text.yellow({ "translate": "luna_flesh_reforged.tooltips.chromatic" }), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.11" }), Text.yellow(1), Text.gray({ "translate": "kubejs.tooltips.rose_quartz_heart.12" }), Text.yellow({ "translate": "kubejs.tooltips.rose_quartz_heart.13" })])
        .build())
        .texture('luna_flesh_reforged:item/organs/chromatic_rose_heart')
        .tag('kubejs:heart')
        .tag('itemborders:gold')
        .tag('kubejs:rose').tag('kubejs:chromatic')
        .tag('kubejs:active');
	
	registerOrgan(new Organ('luna_flesh_reforged:lager_bone_soul')
        .addScore('defense', 0.5)
        .addScore('strength', 1)
        .addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.lager_bone_soul.0" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "luna_flesh_reforged.tooltips.lager_bone_soul.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.bone_soul.3" }), Text.gold('40%'), Text.gray({ "translate": "luna_flesh_reforged.tooltips.lager_bone_soul.2" }), Text.red({ "translate": "luna_flesh_reforged.tooltips.lager_bone_soul.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "kubejs.tooltips.bone_soul.3" }), Text.gold('4%'), Text.gray({ "translate": "kubejs.tooltips.bone_soul.5" }), Text.red({ "translate": "kubejs.tooltips.bone_soul.6" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.red({ "translate": "kubejs.tooltips.bone_soul.7" })])
        .build())
        .texture('luna_flesh_reforged:item/organs/lager_bone_soul')
        .tag('kubejs:damage_only').tag('kubejs:chromatic')
		.tag('kubejs:relics');

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

	registerOrgan(new Organ('luna_flesh_reforged:infested_heart_distortion')
		.addTextLines('default', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_organ_distortion.1" })])
		.addTextLines('ctrl', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_heart_distortion.1" })])
		.addTextLines('ctrl', [Text.gray({ "translate": "luna_flesh_reforged.tooltips.infested_heart_distortion.2" })])
		.addScore('health', 3)
		.addScore('fire_resistant', -1).addScore('metabolism', 1)
		.addScore('digestion', 0.025).addScore('nutrition', 0.025).build())
		.texture('luna_flesh_reforged:item/organs/infested/infested_heart_distortion')
		.tag('kubejs:active_only').tag('kubejs:infected').tag('kubejs:heart');
	
})