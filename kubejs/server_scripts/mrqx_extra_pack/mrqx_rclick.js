const mrqxOrganRightClickedStrategies = {

}

var assign1 = Object.assign(organRightClickedStrategies, mrqxOrganRightClickedStrategies);

const mrqxOrganRightClickedOnlyStrategies = {
	// 神之笔
	'mrqx_extra_pack:divine_pen': function (event, organ) {
		let player = event.player
		let typeMap = getPlayerChestCavityTypeMap(player);
		if (event.item.getId() in mrqxDivinePenAttriBute) {
			if (!(player.getOffHandItem().getId() in mrqxDivinePenInkPower)) {
				player.tell(Text.gray({ "translate": "mrqx_extra_pack.msg.divine_pen.1" }))
				return
			}
			/*if (typeMap.has('kubejs:paper')) {
				player.tell(Text.gray({ "translate": "mrqx_extra_pack.msg.divine_pen.2" }))
				return
			}*/
			let writtenItem = Item.of(mrqxDivinePenOrgan[event.item.getId()], { organData: {} })
			let inkPower = mrqxDivinePenInkPower[player.getOffHandItem().getId()]
			player.tell(String(inkPower))
			let playerChestInstance = player.getChestCavityInstance()
			mrqxDivinePenAttriBute[event.item.getId()].forEach(attriBute => {
				let attriButeScore = (inkPower ** 2) - (inkPower ** 4) / (Math.abs(playerChestInstance.getOrganScores().get(new ResourceLocation(attriBute)) ?? 0.0) + (inkPower ** 2))
				let symbol = (playerChestInstance.getOrganScores().get(new ResourceLocation(attriBute)) ?? 0.0) >= 0 ? 1 : -1
				player.tell(String(playerChestInstance.getOrganScores().get(new ResourceLocation(attriBute))))
				player.tell(String(attriButeScore))
				if (!isFinite(attriButeScore)) {
					attriButeScore = 0.0
				}
				writtenItem.nbt.organData.put(attriBute, attriButeScore * symbol)
			})
			writtenItem.nbt.organData.put('chestcavity:hydroallergenic', 4)
			writtenItem.nbt.organData.put('chestcavity:fire_resistant', -1.5)
			player.give(writtenItem)
			event.item.shrink(1)
			//player.setOffHandItem(player.getOffHandItem().setCount(player.getOffHandItem().getCount()))
		}
	},

	// 裂变反应堆
	'mrqx_extra_pack:fission_reactor': function (event, organ) {
		if (event.item != 'mrqx_extra_pack:nuclear_fuel') {
			return
		}
		if (event.player.persistentData.organActive != 1) {
			return
		}
		if (event.player.hasEffect('mrqx_extra_pack:nuclear_power') || event.player.hasEffect('mrqx_extra_pack:nuclear_power_generation')) {
			player.tell(Text.gray({ "translate": "mrqx_extra_pack.msg.fission_reactor.2" }))
			return
		}
		let posMap = getPlayerChestCavityPosMap(event.player);
		let amplifier = 0
		let count = 1
		let duration = 6000
		let durationMultiplier = 1
		let rc = 0
		let pos = organ.Slot
		let onlySet = new Set()
		let player = event.player
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
		if (event.item.count < count) {
			player.tell(Text.gray({ "translate": "mrqx_extra_pack.msg.fission_reactor.1" }))
			return
		}
		else {
			Utils.server.runCommandSilent('playsound minecraft:entity.blaze.shoot player @a ' + player.x + ' ' + player.y + ' ' + player.z)
			player.potionEffects.add('mrqx_extra_pack:nuclear_power', duration * durationMultiplier, amplifier)
			event.item.shrink(count)
			global.updatePlayerActiveStatus(player)
			player.persistentData.putInt(organActive, 1)
		}
	},

};

var assign2 = Object.assign(organRightClickedOnlyStrategies, mrqxOrganRightClickedOnlyStrategies);