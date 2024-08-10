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
	},

	// 幽匿裂岩体
	'mrqx_extra_pack:sculk_rock_breaker': function (event, organ, data) {
		event.amount += Math.min(mrqxGetSculkCount(event.source.player), 100)
	},

	// 幽匿寄染体
	'mrqx_extra_pack:sculk_infester': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		let count = Math.sqrt(Math.sqrt(mrqxGetSculkCount(player)))
		if (event.amount > entity.getHealth()) {
			let level = entity.getLevel()
			for (let i = 0; i < Math.max(count * Math.sqrt(entity.getMaxHealth()) / 10, 1); i++) {
				for (let j = 0; j < 100; j++) {
					let block = level.getBlock(entity.getX() + (Math.random() - 0.5) * count, entity.getY() - 1 + (Math.random() - 0.5) * count, entity.getZ() + (Math.random() - 0.5) * count)
					if (block.getTags().find(tag => (tag == 'minecraft:sculk_replaceable')) && mrqxIsBlockExposedToAir(level, block.getX(), block.getY(), block.getZ())) {
						block.set('minecraft:sculk')
						break
					}
				}
			}
		}
	},
}

var assign_organ_player_damage = Object.assign(organPlayerDamageStrategies, mrqxOrganPlayerDamageStrategies);

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
		if (mrqxCheckOrganSuit(player, 'four_soul', true)) {
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
		if (mrqxCheckOrganSuit(player, 'four_soul', true)) {
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
		if (mrqxCheckOrganSuit(player, 'four_soul', true)) {
			player.setSaturation(Math.min(player.getSaturation() + event.amount * 0.05, player.getFoodLevel()))
		}
		else {
			player.setSaturation(Math.min(player.getSaturation() + event.amount * 0.25, player.getFoodLevel()))
		}
	},

	// 山月之魂
	'mrqx_extra_pack:moon_soul': function (event, organ, data) {
		let player = event.source.player
		let combo = player.persistentData.getInt('mrqx_moon_soul_combo') ?? 0
		if (mrqxCheckOrganSuit(player, 'four_soul', true)) {
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
		mrqxCauseElementDamage(event.entity, event.amount, 'fire')
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
		if (mrqxCheckOrganSuit(player, 'seaborn', true)) {
			amplifier *= 2
		}
		let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 5)
		entityList.forEach(entity => {
			if (!entity.isPlayer()) {
				event.entity.getServer().scheduleInTicks(1, () => {
					if (entity.isLiving()) {
						entity.attack(DamageSource.playerAttack(player).bypassArmor().bypassEnchantments().bypassInvul().bypassMagic(), player.getAttributeTotalValue('minecraft:generic.attack_damage') * amplifier * 0.05)
					}
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
				if (mrqxCheckOrganSuit(player, 'seaborn', true)) {
					event.entity.getServer().scheduleInTicks(1, () => {
						if (entity.isLiving()) {
							entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 2)
						}
					})
				}
				else {
					event.entity.getServer().scheduleInTicks(1, () => {
						if (entity.isLiving()) {
							entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage'))
						}
					})
				}
				entity.potionEffects.add('cataclysm:stun', 20, 0)
				amplifier--
			}
		})
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
		if (mrqxCheckOrganSuit(player, 'seaborn', true)) {
			amplifier *= 2
		}
		if ((entity.getHealth() / entity.getMaxHealth()) >= ((player.getHealth() / player.getMaxHealth()))) {
			event.entity.getServer().scheduleInTicks(1, () => {
				if (entity.isLiving()) {
					entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * amplifier * 0.1)
				}
			})
		}
		else {
			player.setHealth(player.getHealth() - player.getMaxHealth() * 0.02)
		}
	},

	// “深海掠食者”胃
	'mrqx_extra_pack:stomach_abyssal_predator': function (event, organ, data) {
		let player = event.source.player
		if (mrqxCheckOrganSuit(player, 'seaborn', true)) {
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
		if (mrqxCheckOrganSuit(player, 'seaborn', true)) {
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
		if (mrqxCheckOrganSuit(player, 'seaborn', true)) {
			event.entity.getServer().scheduleInTicks(1, () => {
				if (entity.isLiving()) {
					entity.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.01 * amplifier * 2)
				}
			})
		}
		else {
			event.entity.getServer().scheduleInTicks(1, () => {
				if (entity.isLiving()) {
					entity.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.01 * amplifier)
				}
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
	},

	// “道士十五狗”
	'mrqx_extra_pack:taoist_fifteen_dogs': function (event, organ, data) {
		let player = event.source.player
		player.getServer().getEntities().forEach(entity => {
			if (entity.getPersistentData().getString('mrqxTaoistFifteenDogs') && entity.getPersistentData().getString('mrqxTaoistFifteenDogs') == player.getStringUuid()) {
				event.amount += 1
				entity.attack(1)
			}
		})
	},

	// “法师控制强”
	'mrqx_extra_pack:mage_control_strong': function (event, organ, data) {
		mrqxCauseElementDamage(event.entity, event.amount * event.source.player.getAttributeTotalValue('irons_spellbooks:ice_spell_power'), 'ice')
	},

	// “战士输出高”
	'mrqx_extra_pack:warrior_output_high': function (event, organ, data) {
		let damageModifier = event.source.player.getAttribute('minecraft:generic.attack_damage').getModifier(new UUID.fromString('cb3f55d3-645c-4f38-a497-9c13a33db5cf'))
		event.amount = (((damageModifier) ? damageModifier.getAmount() : 0) + 1) * 10
		event.entity.setSecondsOnFire(10)
		event.entity.getServer().scheduleInTicks(1, () => {
			let explosion = event.entity.block.createExplosion()
			explosion.strength(1)
			explosion.causesFire(true)
			explosion.explode()
		})
	},

	// 国王的铠甲
	'mrqx_extra_pack:kings_armor': function (event, organ, data) {
		let player = event.source.player
		if (Math.floor(player.getHealth()) > 1 || player.getAbsorptionAmount() >= player.getMaxHealth()) {
			return
		}
		let amount = Math.min(player.getAbsorptionAmount() + 2, player.getMaxHealth())
		player.setAbsorptionAmount(amount)
		player.setHealth(Math.max(player.getHealth() - 2, 1))
	},
}

var assign_organ_player_damage_only = Object.assign(organPlayerDamageOnlyStrategies, mrqxOrganPlayerDamageOnlyStrategies);