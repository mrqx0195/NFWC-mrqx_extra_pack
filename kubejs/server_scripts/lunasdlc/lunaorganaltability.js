
/**
 * 造成伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const lunaorganPlayerDamageOnlyStrategies = {
	
    'luna_flesh_reforged:lights_bane': function (event, organ, data) {
        if (event.source.type != 'player') {
            return
        }
        if (event.entity.hasEffect("minecraft:glowing")) {
            event.amount = event.amount * 1.25
        }
    },
    'luna_flesh_reforged:radiance_reaper': function (event, organ, data) {
        let player = event.source.player
        let item = player.mainHandItem
        if (event.source.type != 'player') {
            return
        }
        if (item?.id == 'weaponmaster:wm_broadswordlarge') {
            event.entity.potionEffects.add('minecraft:glowing', 20 * 6, 0)
            event.entity.potionEffects.add('minecraft:weakness', 20 * 6, 1)
            event.source.player.potionEffects.add('minecraft:haste', 20 * 6, 1)
        }
    },
    'luna_flesh_reforged:lager_bone_soul': function (event, organ, data) {
        let player = event.source.player
        let item = player.mainHandItem
        if (event.source.type != 'player') {
            return
        }
        if (item?.id == 'weaponmaster:wm_rapierlarge') {
			if (Math.random() <= 0.4) {
				event.source.player.potionEffects.add('luna_flesh_reforged:lunatouch_attack', 20 * 6, 0)
			}
			if (Math.random() <= 0.04) {
				event.entity.potionEffects.add('kubejs:vulnerable', 20 * 18, 2)
			}
        }
    },
	
};
var result1=Object.assign(organPlayerDamageOnlyStrategies,lunaorganPlayerDamageOnlyStrategies);

/**
 * 玩家承受伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const lunaorganPlayerBearStrategies = {
    'luna_flesh_reforged:archotech_mana_reactor': function (event, organ, data) {
        getPlayerMagicData(event.entity).addMana(event.amount * 5)
    },
};
var result2 = Object.assign(organPlayerBearStrategies, lunaorganPlayerBearStrategies);

/**
 * 主动策略
 * @constant
 * @type {Object<string,function(Internal.NetworkEventJS, organ):void>}
 */
const lunaorganPlayerKeyPressedOnlyStrategies = {

    'luna_flesh_reforged:archotech_warden_core': function (event, organ) {
        let player = event.player
        let magicData = getPlayerMagicData(player)
        let manaCost = magicData.getMana()
        let amplifier = Math.max(Math.cbrt(manaCost), 3)
        overLimitSpellCast(new ResourceLocation('irons_spellbooks', 'sonic_boom'), amplifier, player, false)
        magicData.setMana(Math.max((manaCost - 500), 0))
        if (manaCost < 500) {
            player.setHealth(Math.max((player.getHealth() - (500 - manaCost) * 0.5), 1))
        }
        player.addItemCooldown('luna_flesh_reforged:archotech_warden_core', 20 * 30)
    },

}
var result3 = Object.assign(organPlayerKeyPressedOnlyStrategies, lunaorganPlayerKeyPressedOnlyStrategies);