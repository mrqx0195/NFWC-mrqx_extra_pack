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
			if (duration - event.amount > 0) player.potionEffects.add('mrqx_extra_pack:nuclear_power', duration - event.amount, amplifier)
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
		let count = 0
		player.potionEffects.map.forEach((effect, instance) => {
			if (!effect.isBeneficial()) {
				count += instance.getAmplifier()
			}
		})
		count *= player.persistentData.getInt(warpCount) * 0.1
		event.amount *= 1 + count * 0.1
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
}

var assign1 = Object.assign(organPlayerDamageStrategies, mrqxOrganPlayerDamageStrategies);

const mrqxOrganPlayerDamageOnlyStrategies = {
	// 荣耀之魂
	'mrqx_extra_pack:proud_soul': function (event, organ, data) {
		let player = event.source.player
		let item = player.mainHandItem
		if (player.persistentData.organActive != 1) {
			return
		}
		let itemMap = getPlayerChestCavityItemMap(player)
		if (itemMap.has('mrqx_extra_pack:prison_soul') && itemMap.has('mrqx_extra_pack:fox_soul') && itemMap.has('mrqx_extra_pack:moon_soul')) {
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
		let itemMap = getPlayerChestCavityItemMap(player)
		if (!organ?.tag?.killcount) {
			let instance = player.getChestCavityInstance()
			let soul = instance.inventory.getItem(organ.Slot)
			soul.nbt.put('killcount', 0)
			global.initChestCavityIntoMap(player, false)
			if (player.persistentData.contains(organActive) && player.persistentData.getInt(organActive) == 1) {
				global.updatePlayerActiveStatus(player)
			}
		}
		else {
			if (itemMap.has('mrqx_extra_pack:proud_soul') && itemMap.has('mrqx_extra_pack:fox_soul') && itemMap.has('mrqx_extra_pack:moon_soul')) {
				event.amount += Math.sqrt(organ.tag.killcount) * 0.1
			}
		}
	},

	// 灵狐之魂
	'mrqx_extra_pack:fox_soul': function (event, organ, data) {
		let player = event.source.player
		let itemMap = getPlayerChestCavityItemMap(player)
		if (itemMap.has('mrqx_extra_pack:proud_soul') && itemMap.has('mrqx_extra_pack:prison_soul') && itemMap.has('mrqx_extra_pack:moon_soul')) {
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
		let combo = player.persistentData.getInt('combo') ?? 0
		if (itemMap.has('mrqx_extra_pack:proud_soul') && itemMap.has('mrqx_extra_pack:prison_soul') && itemMap.has('mrqx_extra_pack:fox_soul')) {
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
		player.persistentData.putInt('combo', combo + 3)
	},
}

var assign2 = Object.assign(organPlayerDamageOnlyStrategies, mrqxOrganPlayerDamageOnlyStrategies);