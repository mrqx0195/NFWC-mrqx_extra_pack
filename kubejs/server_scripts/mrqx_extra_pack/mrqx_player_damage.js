// priority: 9

/**
 * 造成伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const mrqxOrganPlayerDamageStrategies = {
	// 反应热喷口
	'mrqx_extra_pack:thermal_injector': function (event, organ, data) {
		let player = event.source.player
		let flag = false
		let pos = organ.Slot
		let posMap = getPlayerChestCavityPosMap(event.source.player);
		fourDirectionList.forEach(direction => {
			let currentPos = lookPos(direction, pos)
			if (posMap.has(currentPos) && posMap.get(currentPos).id == 'mrqx_extra_pack:reactor_chamber') {
				flag = true
			}
		})
		if (flag && player.hasEffect('mrqx_extra_pack:nuclear_power')) {
			let effect = player.getEffect('mrqx_extra_pack:nuclear_power')
			let amplifier = effect.getAmplifier()
			let duration = effect.getDuration()
			event.amount *= ((amplifier + 1) * 0.3) + 1
			player.removeEffect('mrqx_extra_pack:nuclear_power')
			if (duration - event.amount > 0) player.potionEffects.add('mrqx_extra_pack:nuclear_power', duration - event.amount, amplifier, false, false)
		}
	},

	// 噩梦醇
	'mrqx_extra_pack:marenol': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		if (player.persistentData.organActive != 1) {
			return
		}
		entity.potionEffects.map.forEach((effect, instance) => {
			if (!effect.isBeneficial() && Math.random() < 0.1) {
				let amplifier = instance.getAmplifier()
				let duration = instance.getDuration()
				let effect = instance.getEffect()
				if (player.hasEffect(effect)) {
					amplifier += player.getEffect(effect).getAmplifier() + 1
					duration += player.getEffect(effect).getDuration()
				}
				player.potionEffects.add(effect, duration, amplifier)
				instance.setDuration(0)
			}
		})
		event.amount *= 1 + mrqxGetMarenolCount(player) * 0.1
	},

	// 风暴重锤
	'mrqx_extra_pack:storm_mace': function (event, organ, data) {
		let player = event.source.player
		let item = player.mainHandItem
		let fallDistance = player.fallDistance
		if (fallDistance && fallDistance >= 1.5) {
			if (item?.id == 'tetra:modular_double' && item.nbt && item.nbt.contains('double/basic_hammer_left_material') && item.nbt.contains('double/basic_hammer_right_material')) {
				if (item.nbt.contains('double/head_left:double/warforged') && item.nbt.contains('double/head_right:double/warforged')) {
					event.amount += 3 * fallDistance
				}
				event.amount += Math.min(6, 2 * fallDistance) + Math.min(8, fallDistance) + fallDistance
			}
			player.resetFallDistance()
			if (item.nbt.contains('double/head_left:double/warforged') && item.nbt.contains('double/head_right:double/warforged')) {
				player.setMotionY(Math.min(fallDistance / 5, 10))
			}
			else {
				player.setMotionY(Math.min(fallDistance / 10, 10))
			}
			player.attack(0.001)
		}
	}
}

var assign1 = Object.assign(organPlayerDamageStrategies, mrqxOrganPlayerDamageStrategies);

/**
 * 造成伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const mrqxOrganPlayerDamageOnlyStrategies = {
	// 荣耀之魂
	'mrqx_extra_pack:proud_soul': function (event, organ, data) {
		let player = event.source.player
		let item = player.mainHandItem
		if (player.persistentData.organActive != 1) {
			return
		}
		let itemMap = getPlayerChestCavityItemMap(player)
		if (mrqxCheckOrganSuit(player, 'four_soul')) {
			if (item?.id == 'tetra:modular_sword' && item.nbt && (item.nbt.contains('sword/katana_blade_material') || item.nbt.contains('sword/blade:sword/murasama_imprv') || item.nbt.contains('sword/blade:sword/thousand_cold_'))) {
				event.entity.invulnerableTime = 0
			}
		}
		else {
			if (item?.id == 'tetra:modular_sword' && item.nbt && item.nbt.contains('sword/katana_blade_material') && !(item.nbt.contains('sword/blade:sword/murasama_imprv') || item.nbt.contains('sword/blade:sword/thousand_cold_'))) {
				event.entity.invulnerableTime = 0
			}
		}
	},

	// 死狱之魂
	'mrqx_extra_pack:prison_soul': function (event, organ, data) {
		let player = event.source.player
		let count = player.persistentData.getInt('mrqx_kill_count') ?? 0
		if (mrqxCheckOrganSuit(player, 'four_soul')) {
			event.amount += Math.sqrt(count) * 0.1
		}
		if (event.amount > event.entity.getHealth()) {
			count++
		}
		player.persistentData.putInt('mrqx_kill_count', count)
	},

	// 灵狐之魂
	'mrqx_extra_pack:fox_soul': function (event, organ, data) {
		let player = event.source.player
		let itemMap = getPlayerChestCavityItemMap(player)
		if (mrqxCheckOrganSuit(player, 'four_soul')) {
			player.setSaturation(player.getSaturation() + event.amount * 0.05)
		}
		else {
			player.setSaturation(player.getSaturation() + event.amount * 0.25)
		}
	},

	// 山月之魂
	'mrqx_extra_pack:moon_soul': function (event, organ, data) {
		let player = event.source.player
		let itemMap = getPlayerChestCavityItemMap(player)
		let combo = player.persistentData.getInt('mrqx_moon_soul_combo') ?? 0
		if (mrqxCheckOrganSuit(player, 'four_soul')) {
			if (combo >= 100) {
				combo = 100
			}
		}
		else {
			if (combo >= 50) {
				combo = 50
			}
		}
		event.amount *= Math.min(Math.max(combo / 10, 1), 10)
		player.persistentData.putInt('mrqx_moon_soul_combo', combo + 3)
	},

	// 激活·冰龙宝玉
	'mrqx_extra_pack:active_ice_dragon_bead': function (event, organ, data) {
		mrqxCauseElementDamage(event.entity, event.amount, 'ice')
	},

	// 激活·火龙宝玉
	'mrqx_extra_pack:active_fire_dragon_bead': function (event, organ, data) {
		if (mrqxCauseElementDamage(event.entity, event.amount, 'fire')) {
			event.entity.setSecondsOnFire(10)
		}
	},

	// 激活·电龙宝玉
	'mrqx_extra_pack:active_lightning_dragon_bead': function (event, organ, data) {
		mrqxCauseElementDamage(event.entity, event.amount, 'lighting')
	},

	// 激活·末影龙宝玉
	'mrqx_extra_pack:active_ender_dragon_bead': function (event, organ, data) {
		mrqxCauseElementDamage(event.entity, event.amount, 'ender')
	},

	// 风暴之星碎片
	'mrqx_extra_pack:withered_nether_star_shard': function (event, organ, data) {
		mrqxCauseElementDamage(event.entity, event.amount * event.source.player.getChestCavityInstance().organScores.get(new ResourceLocation('chestcavity', 'withered')) ?? 0, 'wither')
	},

	// “潮涌，潮枯”肺脏
	'mrqx_extra_pack:lung_the_tide_surges_the_tide_recedes': function (event, organ, data) {
		let player = event.source.player
		if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
			return
		}
		player.addItemCooldown(organ.id, 20)
		player.setHealth(player.getHealth() - player.getMaxHealth() * 0.05)
		let typeMap = getPlayerChestCavityTypeMap(player)
		let amplifier = 0
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			amplifier += typeMap.get('kubejs:mrqx_seaborn').length
		}
		if (mrqxCheckOrganSuit(player, 'seaborn')) {
			amplifier *= 2
		}
		let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 5)
		entityList.forEach(entity => {
			if (!entity.isPlayer()) {
				event.entity.getServer().scheduleInTicks(1, () => {
					entity.attack(DamageSource.playerAttack(player).bypassArmor().bypassEnchantments().bypassInvul().bypassMagic(), player.getAttributeTotalValue('minecraft:generic.attack_damage') * amplifier * 0.05)
				})
			}
		})
	},

	// “镜花水月”肾
	'mrqx_extra_pack:kidney_moon_in_the_water': function (event, organ, data) {
		let player = event.source.player
		if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
			return
		}
		player.addItemCooldown(organ.id, 20)
		let typeMap = getPlayerChestCavityTypeMap(player)
		let amplifier = 0
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			amplifier += typeMap.get('kubejs:mrqx_seaborn').length
		}
		let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 8)
		entityList.forEach(entity => {
			if (amplifier > 0 && !entity.isPlayer()) {
				if (mrqxCheckOrganSuit(player, 'seaborn')) {
					event.entity.getServer().scheduleInTicks(1, () => {
						entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 2)
					})
				}
				else {
					event.entity.getServer().scheduleInTicks(1, () => {
						entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage'))
					})
				}
				entity.potionEffects.add('cataclysm:stun', 20, 0)
				amplifier--
			}
		})
		if (amplifier > 0) {
			player.setHealth(player.getHealth() - player.getMaxHealth() * 0.05)
		}
	},

	// “生存的重压”肋骨
	'mrqx_extra_pack:rib_the_pressure_to_survive': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
			return
		}
		player.addItemCooldown(organ.id, 20)
		let typeMap = getPlayerChestCavityTypeMap(player)
		let amplifier = 0
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			amplifier += typeMap.get('kubejs:mrqx_seaborn').length
		}
		if (mrqxCheckOrganSuit(player, 'seaborn')) {
			amplifier *= 2
		}
		if ((entity.getHealth() / entity.getMaxHealth()) >= ((player.getHealth() / player.getMaxHealth()))) {
			event.entity.getServer().scheduleInTicks(1, () => {
				entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * amplifier * 0.1)
			})
		}
		else {
			player.setHealth(player.getHealth() - player.getMaxHealth() * 0.02)
		}
	},

	// “深海掠食者”胃
	'mrqx_extra_pack:stomach_abyssal_predator': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		if (mrqxCheckOrganSuit(player, 'seaborn')) {
			event.amount *= 1 + ((1 - player.getFoodLevel() / 20) + (player.getFoodLevel() - player.getSaturation()) / player.getFoodLevel()) * 2
		}
		else {
			event.amount *= 1 + ((1 - player.getFoodLevel() / 20) + (player.getFoodLevel() - player.getSaturation()) / player.getFoodLevel())
		}
	},

	// “弱肉强食”肠
	'mrqx_extra_pack:intestine_survival_of_the_fittest': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		let typeMap = getPlayerChestCavityTypeMap(player)
		let amplifier = 0
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			amplifier += typeMap.get('kubejs:mrqx_seaborn').length
		}
		if (mrqxCheckOrganSuit(player, 'seaborn')) {
			amplifier *= 2
		}
		if ((entity.getHealth() / entity.getMaxHealth()) < ((player.getHealth() / player.getMaxHealth())) || entity.getMaxHealth() < player.getMaxHealth()) {
			event.amount *= 1 + amplifier * 0.05
		}
	},

	// “同化，变异”阑尾
	'mrqx_extra_pack:appendix_assimilation_mutation': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
			return
		}
		player.addItemCooldown(organ.id, 20)
		let typeMap = getPlayerChestCavityTypeMap(player)
		let magicData = getPlayerMagicData(player)
		let manaCost = magicData.getMana()
		let amplifier = 0
		if (typeMap.has('kubejs:warp')) {
			amplifier += typeMap.get('kubejs:warp').length
		}
		if (typeMap.has('kubejs:relics')) {
			amplifier += typeMap.get('kubejs:relics').length
		}
		if (typeMap.has('kubejs:legends')) {
			amplifier += typeMap.get('kubejs:legends').length
		}
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			amplifier += typeMap.get('kubejs:mrqx_seaborn').length
		}
		amplifier = Math.min(Math.floor(manaCost / 50), amplifier)
		if (mrqxCheckOrganSuit(player, 'seaborn')) {
			event.entity.getServer().scheduleInTicks(1, () => {
				entity.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.01 * amplifier * 2)
			})
		}
		else {
			event.entity.getServer().scheduleInTicks(1, () => {
				entity.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.01 * amplifier)
			})
		}
		magicData.setMana(Math.max((manaCost - amplifier * 50), 0))
	},

	// 充能刀刃
	'mrqx_extra_pack:charged_blade': function (event, organ, data) {
		let player = event.source.player
		if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
			return
		}
		player.addItemCooldown(organ.id, 10)
		player.potionEffects.add('mrqx_extra_pack:charged_blade_effect', 2, 0, false, false)
	}
}

var assign2 = Object.assign(organPlayerDamageOnlyStrategies, mrqxOrganPlayerDamageOnlyStrategies);