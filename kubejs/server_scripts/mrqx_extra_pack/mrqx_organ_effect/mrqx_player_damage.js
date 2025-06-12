// priority: 450

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
		let posMap = getPlayerChestCavityPosMap(event.source.player)
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
			mrqxCauseElementDamage(event.entity, event.amount * ((amplifier + 1) * 0.4), 'fire')
			event.amount *= (((amplifier + 1) * 40 + ColdSweat.getTemperature(player, 'core')) * 0.01) + 1
			ColdSweat.setTemperature(player, 'core', ColdSweat.getTemperature(player, 'core') - event.amount / 7)
			player.removeEffect('mrqx_extra_pack:nuclear_power')
			if (duration - event.amount / 7 > 0) player.potionEffects.add('mrqx_extra_pack:nuclear_power', duration - event.amount / 7, amplifier, false, false)
			player.getCooldowns().removeCooldown(Item.of('mrqx_extra_pack:fission_reactor'))
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
			if (effect.getCategory().name() == 'HARMFUL' && Math.random() < 0.1) {
				let amplifier = instance.getAmplifier()
				let duration = instance.getDuration()
				let effect = instance.getEffect()
				if (player.hasEffect(effect)) {
					amplifier += player.getEffect(effect).getAmplifier() + 1
					duration += player.getEffect(effect).getDuration()
				}
				player.potionEffects.add(effect, duration, amplifier, false, false)
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
			player.hurtMarked = true
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
		let level = entity.getLevel()
		let pos = new BlockPos(entity.getBlock().getPos().getX(), entity.getBlock().getPos().getY(), entity.getBlock().getPos().getZ())
		if (!level.getBlock(pos.x, pos.y - 1, pos.z).hasTag('minecraft:sculk_replaceable')) {
			for (let i = 0; i < 1000; i++) {
				let newPos = new BlockPos(
					entity.getBlock().getPos().getX() + (Math.random() - 0.5) * Math.sqrt(Math.max(count, 20)),
					entity.getBlock().getPos().getY() + (Math.random() - 0.5) * Math.sqrt(Math.max(count, 20)),
					entity.getBlock().getPos().getZ() + (Math.random() - 0.5) * Math.sqrt(Math.max(count, 20))
				)
				if (level.getBlock(newPos).hasTag('minecraft:sculk_replaceable') && mrqxIsBlockExposedToAir(level, newPos.x, newPos.y, newPos.z)) {
					pos = newPos
					break
				}
			}
		}
		$mrqxSculkTaintEffect.perform(level, pos, Math.max(count * Math.sqrt(entity.getMaxHealth() + event.amount) / 100, 10), 1)
	},

	// ‌太阳光镜
	'mrqx_extra_pack:solar_mirror': function (event, organ, data) {
		let player = event.source.player
		if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
			return
		}
		let typeMap = getPlayerChestCavityTypeMap(player)
		mrqxCauseElementDamage(event.entity, Math.sqrt(player.getBlock().getSkyLight() * typeMap.get('kubejs:mrqx_celestial_body').length), 'fire')
		player.getServer().scheduleInTicks(1, () => {
			player.addItemCooldown(organ.id, 19)
		})
	},

	// 损坏骑士剑
	'mrqx_extra_pack:broken_knight_sword': function (event, organ, data) {
		event.amount *= 1.05
	},

	// 骑士剑
	'mrqx_extra_pack:knight_sword': function (event, organ, data) {
		event.amount *= 1.1
	},
}

var assign_organ_player_damage = Object.assign(organPlayerDamageStrategies, mrqxOrganPlayerDamageStrategies)

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
		if (mrqxCheckOrganSuit(player, 'four_soul', 'isAll')) {
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
		if (player.persistentData.organActive != 1) {
			return
		}
		if (mrqxCheckOrganSuit(player, 'four_soul', 'isAll')) {
			event.amount += Math.sqrt(count) * 0.1
		}
	},

	// 灵狐之魂
	'mrqx_extra_pack:fox_soul': function (event, organ, data) {
		let player = event.source.player
		if (player.persistentData.organActive != 1) {
			return
		}
		if (mrqxCheckOrganSuit(player, 'four_soul', 'isAll')) {
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
		if (player.persistentData.organActive != 1) {
			return
		}
		if (mrqxCheckOrganSuit(player, 'four_soul', 'isAll')) {
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
		let damage = 0
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			damage += typeMap.get('kubejs:mrqx_seaborn').length
		}
		if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
			damage *= 2
		}
		let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 5)
		entityList.forEach(entity => {
			if (!entity.isPlayer()) {
				event.entity.getServer().scheduleInTicks(1, () => {
					if (mrqxCheckTarget(entity, player)) {
						entity.attack(DamageSource.playerAttack(player).bypassArmor().bypassEnchantments().bypassInvul().bypassMagic(), player.getAttributeTotalValue('minecraft:generic.attack_damage') * damage * 0.05)
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
		let damage = 0
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			damage += typeMap.get('kubejs:mrqx_seaborn').length
		}
		let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 8)
		entityList.forEach(entity => {
			if (damage > 0 && !entity.isPlayer()) {
				if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
					event.entity.getServer().scheduleInTicks(1, () => {
						if (mrqxCheckTarget(entity, player)) {
							entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 2)
						}
					})
				}
				else {
					event.entity.getServer().scheduleInTicks(1, () => {
						if (mrqxCheckTarget(entity, player)) {
							entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage'))
						}
					})
				}
				entity.potionEffects.add('cataclysm:stun', 20, 0, false, false)
				damage--
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
		let damage = 0
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			damage += typeMap.get('kubejs:mrqx_seaborn').length
		}
		if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
			damage *= 2
		}
		if ((entity.getHealth() / entity.getMaxHealth()) >= ((player.getHealth() / player.getMaxHealth()))) {
			event.entity.getServer().scheduleInTicks(1, () => {
				if (entity.isLiving()) {
					entity.attack(DamageSource.playerAttack(player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * damage * 0.1)
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
		if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
			event.amount *= Math.min(1 + ((1 - player.getFoodLevel() / 20) + 1 - (player.getSaturation() - player.getFoodLevel()) / 20) * 2, 20)
		}
		else {
			event.amount *= Math.min(1 + ((1 - player.getFoodLevel() / 20) + 1 - (player.getSaturation() - player.getFoodLevel()) / 20), 10)
		}
	},

	// “弱肉强食”肠
	'mrqx_extra_pack:intestine_survival_of_the_fittest': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		let typeMap = getPlayerChestCavityTypeMap(player)
		let damage = 0
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			damage += typeMap.get('kubejs:mrqx_seaborn').length
		}
		if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
			damage *= 2
		}
		if ((entity.getHealth() / entity.getMaxHealth()) < ((player.getHealth() / player.getMaxHealth())) || entity.getMaxHealth() < player.getMaxHealth()) {
			event.amount *= 1 + damage * 0.05
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
		let damage = 0
		if (typeMap.has('kubejs:warp')) {
			damage += typeMap.get('kubejs:warp').length
		}
		if (typeMap.has('kubejs:relics')) {
			damage += typeMap.get('kubejs:relics').length
		}
		if (typeMap.has('kubejs:legends')) {
			damage += typeMap.get('kubejs:legends').length
		}
		if (typeMap.has('kubejs:mrqx_seaborn')) {
			damage += typeMap.get('kubejs:mrqx_seaborn').length
		}
		damage = Math.min(Math.floor(manaCost / 10), damage)
		if (mrqxCheckOrganSuit(player, 'seaborn', 'isAll')) {
			event.entity.getServer().scheduleInTicks(1, () => {
				if (entity.isLiving()) {
					entity.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.01 * damage * 2)
				}
			})
		}
		else {
			event.entity.getServer().scheduleInTicks(1, () => {
				if (entity.isLiving()) {
					entity.attack(DamageSource.indirectMagic(player, player), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.01 * damage)
				}
			})
		}
		magicData.setMana(Math.max((manaCost - damage * 50), 0))
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
		let count = 0
		player.getServer().getEntities().forEach(entity => {
			if (entity.getPersistentData().getString('mrqxTaoistFifteenDogs') && entity.getPersistentData().getString('mrqxTaoistFifteenDogs') == player.getStringUuid()) {
				count++
				let move = entity.getDeltaMovement()
				entity.attack(DamageSource.mobAttack(event.entity), 1)
				entity.setDeltaMovement(move)
			}
		})
		event.amount += count ** 2
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
		if (Math.floor(player.getHealth()) > 1 || player.getAbsorptionAmount() < player.getMaxHealth()) {
			let amount = Math.min(player.getAbsorptionAmount() + 2, player.getMaxHealth())
			player.setAbsorptionAmount(amount)
		}
		player.setHealth(Math.max(player.getHealth() - 2, 1))
	},

	// 远古巫妖之心
	'mrqx_extra_pack:ancient_lich_heart': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1) {
			if (!entity.isUndead()) {
				entity.persistentData.putBoolean('mrqxAncientLichHeartTarget', true)
			}
		}
	},

	// ‌“怒守”
	'mrqx_extra_pack:furious_defense': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
			return
		}
		let criticalPunchCount = player.persistentData.getInt(criticalPunch)
		if (criticalPunchCount >= 10) {
			player.addItemCooldown(organ.id, 20)
			let damage = event.amount * (1 + (criticalPunchCount + player.persistentData.getInt(resourceCount)) * mrqxGetSteamCount(player) * 0.1)
			player.persistentData.putInt(criticalPunch, 0)
			updateResourceCount(player, 0)
			event.amount = damage
			entity.getServer().scheduleInTicks(1, () => {
				entity.attack(DamageSource.playerAttack(player), damage)
				entity.getServer().scheduleInTicks(2, () => {
					entity.attack(DamageSource.playerAttack(player), damage)
				})
			})
		}
	},

	// 墨染
	'mrqx_extra_pack:mrqx0195': function (event, organ, data) {
		let player = event.source.player
		if (player.persistentData.organActive != 1) {
			return
		}
		event.amount = 0
	},

	// ‌“记录者”
	'mrqx_extra_pack:recorder': function (event, organ, data) {
		let entityType = event.getEntity().getType()
		let player = event.source.player
		if (player.persistentData.getCompound('mrqxRecorder')) {
			event.amount *= 1 + Math.sqrt(player.persistentData.getCompound('mrqxRecorder').getInt(entityType) ?? 0)
		}
	},

	// 原罪·贪食「别西卜」
	'mrqx_extra_pack:sin_gula_beelzebub': function (event, organ, data) {
		let player = event.source.player
		if (player.persistentData.organActive != 1) {
			return
		}
		player.setSaturation(Math.min(player.getSaturation() + event.amount * 0.1, player.getFoodLevel()))
		if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
			player.setSaturation(Math.min(player.getSaturation() + event.amount * 0.1, player.getFoodLevel()))
		}
	},

	// ‌‌原罪·嫉妒「利维坦」
	'mrqx_extra_pack:sin_invidia_leviathan': function (event, organ, data) {
		let player = event.source.player
		if (player.persistentData.organActive != 1) {
			return
		}
		if (event.entity.getType() in bossTypeList) {
			event.amount += event.entity.getMaxHealth() * 0.1
			if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
				event.amount += event.entity.getMaxHealth() * 0.1
			}
		}
	},

	// ‌原罪·暴怒「萨迈尔」
	'mrqx_extra_pack:sin_ira_samael': function (event, organ, data) {
		let player = event.source.player
		if (player.persistentData.organActive != 1) {
			return
		}
		event.amount *= 3
		if (mrqxCheckOrganSuit(player, 'seven_sins', 'isAll')) {
			event.amount *= 3
		}
	},

	// ‌原罪·罪源
	'mrqx_extra_pack:origin_sin': function (event, organ, data) {
		organPlayerDamageOnlyStrategies['mrqx_extra_pack:sin_gula_beelzebub'](event, organ, data)
		organPlayerDamageOnlyStrategies['mrqx_extra_pack:sin_invidia_leviathan'](event, organ, data)
		organPlayerDamageOnlyStrategies['mrqx_extra_pack:sin_ira_samael'](event, organ, data)
	},

	// ‌“罪与罚”
	'mrqx_extra_pack:sin_and_judgement': function (event, organ, data) {
		organPlayerDamageOnlyStrategies['mrqx_extra_pack:origin_sin'](event, organ, data)
	},

	// 蒸汽刺剑
	'mrqx_extra_pack:steam_rapier': function (event, organ, data) {
		event.amount *= 1 + mrqxGetSteamCount(event.source.player)
		event.entity.getServer().scheduleInTicks(5, () => {
			mrqxCauseElementDamage(event.entity, event.amount * mrqxGetSteamCount(event.source.player) * 0.1, 'fire')
		})
	},

	// 激活·冰龙宝玉·极光化
	'mrqx_extra_pack:aurora_active_ice_dragon_bead': function (event, organ, data) {
		mrqxCauseElementDamage(event.entity, -event.amount * ColdSweat.getTemperature(event.source.player, 'body'), 'ice')
	},

	// 激活·火龙宝玉·炽血化
	'mrqx_extra_pack:buring_blood_active_fire_dragon_bead': function (event, organ, data) {
		mrqxCauseElementDamage(event.entity, event.amount * ColdSweat.getTemperature(event.source.player, 'body'), 'fire')
	},

	// 幻魔心脏
	'mrqx_extra_pack:phantom_heart': function (event, organ, data) {
		let player = event.source.player
		/** @type {Internal.LivingEntity} */
		let entity = event.entity
		if (entity.isLiving() && player.hasEffect('mrqx_extra_pack:demonization_kill') && Math.random() < 0.2) {
			let amplifier = 0
			if (entity.hasEffect('art_of_forging:mortal_wounds')) {
				amplifier += entity.getEffect('art_of_forging:mortal_wounds').getAmplifier() + 1
			}
			entity.potionEffects.add('art_of_forging:mortal_wounds', 20 * 60, amplifier, false, false)
			amplifier = 0
			if (entity.hasEffect('tetra:severed')) {
				amplifier += entity.getEffect('tetra:severed').getAmplifier() + 1
			}
			entity.potionEffects.add('tetra:severed', 20 * 60, amplifier, false, false)
		}
	},

	// 幻影骑士甲
	'mrqx_extra_pack:phantom_knight_armor': function (event, organ, data) {
		if (Math.random() < 0.125) {
			event.source.bypassArmor()
		}
	},

	// “耀阳”
	'mrqx_extra_pack:blazing_sun': function (event, organ, data) {
		event.amount *= 1.2

		let player = event.source.player
		let entity = event.entity
		if (entity.position().distanceTo(new Vec3(player.x, player.y, player.z)) < 3) {
			event.source.bypassArmor()
			event.source.bypassEnchantments()
			event.source.bypassInvul()
			event.source.bypassMagic()
		}
		if (mrqxGetCoreOfKnightCount(player) > 0) {
			for (let i = mrqxGetCoreOfKnightCount(player); i > 0; i--) {
				let entityList = getLivingWithinRadius(player.getLevel(), new Vec3(player.x, player.y, player.z), 3)
				entityList.forEach(e => {
					if (!e.isPlayer() && mrqxCheckTarget(e, player)) {
						e.getServer().scheduleInTicks(1, () => {
							e.attack(DamageSource.playerAttack(player).bypassArmor().bypassEnchantments().bypassInvul().bypassMagic(), player.getAttributeTotalValue('minecraft:generic.attack_damage') * 0.2)
						})
					}
				})
			}
		}
	},

	// 湮灭链锤
	'mrqx_extra_pack:knight_chain_hammer_of_annihilation': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		let entityList = entity.level.getEntitiesWithin(entity.boundingBox.inflate(0.5))
		let count = 0
		entityList.forEach(e => {
			if (e.getType() == 'twilightforest:cube_of_annihilation') {
				event.source.callBypassArmor().bypassEnchantments().callBypassInvul().callBypassMagic()
				count++
			}
		})
		if (Math.random() < 0.1 / (count + 1) ** 2) {
			/** @type {Internal.ThrowableProjectile} */
			let e = event.entity.level.createEntity('twilightforest:cube_of_annihilation')
			e.setPos(entity.getX(), entity.getY(), entity.getZ())
			e.setOwner(player)
			e.spawn()
			entity.invulnerableTime = 0
		}
		if (mrqxGetCoreOfKnightCount(player) > 0) {
			event.amount *= count + 1
		}
	},

	// 龙皇核心
	'mrqx_extra_pack:core_of_dragon_emperor': function (event, organ, data) {
		let player = event.source.player
		let entity = event.entity
		if (player.hasEffect('mrqx_extra_pack:dragon_emperor_passion')) {
			let duration = player.getEffect('mrqx_extra_pack:dragon_emperor_passion').duration
			entity.invulnerableTime = 0
			overLimitSpellCast(new ResourceLocation('irons_spellbooks', 'eldritch_blast'), Math.max(1, Math.sqrt(duration / 20)), player, false)
			entity.invulnerableTime = 0
		}
		else if (player.hasEffect('mrqx_extra_pack:dragon_emperor_brilliant')) {
			entity.modifyAttribute("minecraft:generic.attack_damage", 'mrqxDragonEmperorBrilliant', -0.5, 'multiply_total')
		}
	},
}

var assign_organ_player_damage_only = Object.assign(organPlayerDamageOnlyStrategies, mrqxOrganPlayerDamageOnlyStrategies)