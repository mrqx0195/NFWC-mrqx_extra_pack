// priority: 450

/**
 * 器官右键事件策略
 * @constant
 * @type {Object<string,function(Internal.ItemClickedEventJS, organ):void>}
 */
const mrqxOrganRightClickedStrategies = {

}

var assign_organ_right_clicked = Object.assign(organRightClickedStrategies, mrqxOrganRightClickedStrategies)

/**
 * 器官右键事件唯一策略
 * @constant
 * @type {Object<string,function(Internal.ItemClickedEventJS, organ):void>}
 */
const mrqxOrganRightClickedOnlyStrategies = {
	// 神之笔
	'mrqx_extra_pack:divine_pen': function (event, organ) {
		let player = event.player
		let typeMap = getPlayerChestCavityTypeMap(player)
		if (event.item.getId() in mrqxDivinePenAttriBute) {
			if (!(player.getOffHandItem().getId() in mrqxDivinePenInkPower)) {
				player.tell($mrqxSerializer.fromJsonLenient({ "translate": "mrqx_extra_pack.msg.divine_pen.1" }))
				return
			}
			if (typeMap.has('kubejs:mrqx_paper')) {
				player.tell($mrqxSerializer.fromJsonLenient({ "translate": "mrqx_extra_pack.msg.divine_pen.2" }))
				return
			}
			let writtenItem = Item.of(mrqxDivinePenOrgan[event.item.getId()], { organData: {} })
			let inkPower = mrqxDivinePenInkPower[player.getOffHandItem().getId()]
			let playerChestInstance = player.getChestCavityInstance()
			mrqxDivinePenAttriBute[event.item.getId()].forEach(attriBute => {
				let attriButeScore = (inkPower ** 2) - (inkPower ** 4) / (Math.abs(playerChestInstance.getOrganScores().get(new ResourceLocation(attriBute)) ?? 0.0) + (inkPower ** 2))
				let symbol = (playerChestInstance.getOrganScores().get(new ResourceLocation(attriBute)) ?? 0.0) >= 0 ? 1 : -1
				if (!isFinite(attriButeScore)) {
					attriButeScore = 0.0
				}
				writtenItem.nbt.organData.put(attriBute, attriButeScore * symbol)
			})
			writtenItem.nbt.organData.put('chestcavity:hydroallergenic', 4)
			writtenItem.nbt.organData.put('chestcavity:fire_resistant', -1.5)
			player.give(writtenItem)
			event.item.shrink(1)
			player.getOffHandItem().count--
		}
	},

	// 裂变反应堆
	'mrqx_extra_pack:fission_reactor': function (event, organ) {
		let player = event.player
		if (event.item != 'mrqx_extra_pack:nuclear_fuel') {
			return
		}
		if (player.persistentData.organActive != 1) {
			return
		}
		if (player.hasEffect('mrqx_extra_pack:nuclear_power')) {
			player.tell($mrqxSerializer.fromJsonLenient({ "translate": "mrqx_extra_pack.msg.fission_reactor.2" }))
			return
		}
		if (player.getCooldowns().isOnCooldown(Item.of(organ.id))) {
			return
		}
		let posMap = getPlayerChestCavityPosMap(player)
		let itemMap = getPlayerChestCavityItemMap(player)
		let amplifier = 0
		let count = 1
		let duration = 6000
		let durationMultiplier = 1
		let rc = 0
		let pos = organ.Slot
		let onlySet = new Set()
		fourDirectionList.forEach(direction => {
			let currentPos = lookPos(direction, pos)
			if (posMap.has(currentPos) && posMap.get(currentPos).id == 'mrqx_extra_pack:reactor_chamber') {
				amplifier += 1
				count += 1
				duration += 4800 - rc * 1200
				rc++
				fourDirectionList.forEach(direction => {
					let currentPos2 = lookPos(direction, currentPos)
					if (!onlySet.has(currentPos2) && amplifier > 0 && posMap.has(currentPos2) && posMap.get(currentPos2).id == 'mrqx_extra_pack:heat_vent') {
						amplifier -= 1
						durationMultiplier *= 1.2
						onlySet.add(currentPos2)
					}
					else if (!onlySet.has(currentPos2) && posMap.has(currentPos2) && posMap.get(currentPos2).id == 'mrqx_extra_pack:thermal_barrier') {
						amplifier += 1
						durationMultiplier *= 0.8
						onlySet.add(currentPos2)
					}
				})
			}
		})
		if (itemMap.has('mrqx_extra_pack:machine_nuclear_heart_cpu')) {
			amplifier += Math.floor(mrqxGetComputingPower(player) / 15)
			duration += mrqxGetComputingPower(player) * 3
		}
		if (event.item.count < count) {
			player.tell($mrqxSerializer.fromJsonLenient({ "translate": "mrqx_extra_pack.msg.fission_reactor.1" }))
			return
		}
		else {
			player.level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.blaze.shoot', 'players', 1, 1)
			player.potionEffects.add('mrqx_extra_pack:nuclear_power', duration * durationMultiplier, amplifier, false, false)
			player.addItemCooldown(organ.id, 20 * 60 * 3)
			event.item.shrink(count)
			global.updatePlayerActiveStatus(player)
			player.persistentData.putInt(organActive, 1)
		}
	},

	// ‌蒸汽动力机
	'mrqx_extra_pack:steam_power_engine': function (event, organ) {
		let player = event.player
		let itemMap = getPlayerChestCavityItemMap(player)
		let typeMap = getPlayerChestCavityTypeMap(player)
		if (event.item != Item.of('minecraft:potion', '{Potion:"minecraft:water"}')) {
			return
		}
		if (player.hasEffect('kubejs:burning_heart')) {
			let duration = player.getEffect('kubejs:burning_heart').getDuration()
			let amplifier = player.getEffect('kubejs:burning_heart').getAmplifier()
			if (player.hasEffect('mrqx_extra_pack:steam_power')) {
				duration /= 2
				duration += player.getEffect('mrqx_extra_pack:steam_power').getDuration()
				amplifier = player.getEffect('mrqx_extra_pack:steam_power').getAmplifier() + 1
				event.player.removeEffect('mrqx_extra_pack:steam_power')
			}
			if (itemMap.has('mrqx_extra_pack:steam_engine')) {
				amplifier = Math.min(amplifier, typeMap.get('kubejs:mrqx_steam').length * 1 + 1)
				duration = Math.min(duration, amplifier * 2 * 20 * 60)
				player.level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.player.splash', player.getSoundSource(), 1, 1)
				player.potionEffects.add('mrqx_extra_pack:steam_power', duration, amplifier, false, false)
			}
			event.player.removeEffect('kubejs:burning_heart')
			event.item.shrink(1)
		}
		if (player.hasEffect('kubejs:flaring_heart')) {
			let duration = player.getEffect('kubejs:flaring_heart').getDuration()
			let amplifier = player.getEffect('kubejs:flaring_heart').getAmplifier()
			if (player.hasEffect('mrqx_extra_pack:steam_power')) {
				duration /= 2
				duration += player.getEffect('mrqx_extra_pack:steam_power').getDuration()
				amplifier = player.getEffect('mrqx_extra_pack:steam_power').getAmplifier() + 1
				event.player.removeEffect('mrqx_extra_pack:steam_power')
			}
			if (itemMap.has('mrqx_extra_pack:steam_engine')) {
				amplifier = Math.min(amplifier, typeMap.get('kubejs:mrqx_steam').length * 1 + 1)
				duration = Math.min(duration, amplifier * 2 * 20 * 60)
				player.level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.player.splash', player.getSoundSource(), 1, 1)
				player.potionEffects.add('mrqx_extra_pack:steam_power', duration, amplifier, false, false)
			}
			event.player.removeEffect('kubejs:flaring_heart')
			event.item.shrink(1)
		}
	},

	// ‌蒸汽动力涡轮
	'mrqx_extra_pack:steam_power_turbine': function (event, organ) {
		let player = event.player
		let itemMap = getPlayerChestCavityItemMap(player)
		let typeMap = getPlayerChestCavityTypeMap(player)
		if (event.item != Item.of('minecraft:water_bucket')) {
			return
		}
		if (player.hasEffect('mrqx_extra_pack:nuclear_power')) {
			let duration = player.getEffect('mrqx_extra_pack:nuclear_power').getDuration()
			let amplifier = player.getEffect('mrqx_extra_pack:nuclear_power').getAmplifier() * 2
			if (player.hasEffect('mrqx_extra_pack:steam_power')) {
				duration += player.getEffect('mrqx_extra_pack:steam_power').getDuration()
				amplifier = player.getEffect('mrqx_extra_pack:steam_power').getAmplifier() + 2
				event.player.removeEffect('mrqx_extra_pack:steam_power')
			}
			if (itemMap.has('mrqx_extra_pack:steam_engine')) {
				amplifier = Math.min(amplifier, typeMap.get('kubejs:mrqx_steam').length * 2 + 2)
				duration = Math.min(duration, amplifier * 2 * 20 * 60)
				player.level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:entity.player.splash.high_speed', player.getSoundSource(), 1, 1)
				player.potionEffects.add('mrqx_extra_pack:steam_power', duration, amplifier, false, false)
			}
			event.player.removeEffect('mrqx_extra_pack:nuclear_power')
			event.item.shrink(1)
		}
	},
}

var assign_organ_right_clicked_only = Object.assign(organRightClickedOnlyStrategies, mrqxOrganRightClickedOnlyStrategies)