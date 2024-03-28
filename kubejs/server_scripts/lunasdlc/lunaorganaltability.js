
/**
 * 造成伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const lunaorganPlayerDamageOnlyStrategies = {

    'luna_flesh_reforged:test_organ': function (event, organ, data) {
        let type = event.source.type
        let amount = event.amount
        let time = event.source.player.server.getTickCount()
        event.source.player.server.runCommandSilent(`say ${`造成伤害类型： ${type.toString()} ，伤害： ${amount.toString()} 点by ${time.toString()}Time`}`)
    },
	'luna_flesh_reforged:abyssalwarlock_eye': function (event, organ, data) {
        let type = event.source.type
        let amount = event.amount
        let warp = event.source.player.persistentData.getInt(warpCount) ?? 0
        let itemMap = getPlayerChestCavityItemMap(event.source.player)
        if(itemMap.has('luna_flesh_reforged:archotech_abyssal_core')){
            return;
        }
        if (type == 'irons_spellbooks.eldritch_blast') {
            event.entity.invulnerableTime = 0
            if(warp < 80){
                amount = amount * ((warp/0.8)/200 + 0.5)
                event.amount = amount
            }
            if(event.entity.hasEffect('kubejs:pardon_of_god_magic')){
                event.entity.causeFallDamage(4,amount, DamageSource.indirectMagic(event.entity,event.source.player))
                event.amount = 0
            }
        }
    },
    'luna_flesh_reforged:archotech_abyssal_core': function (event, organ, data) {
        let type = event.source.type
        let amount = event.amount
        let warp = event.source.player.persistentData.getInt(warpCount) ?? 0
        if (type == 'irons_spellbooks.eldritch_blast' || type == 'irons_spellbooks.sonic_boom' || type == 'irons_spellbooks.sculk_tentacles') {
            event.entity.invulnerableTime = 0
            let itemMap = getPlayerChestCavityItemMap(event.source.player)
            if(type == 'irons_spellbooks.eldritch_blast'){
                if(!event.entity.hasEffect('goety:sapped')){
                    event.entity.potionEffects.add('goety:sapped', 20, 0, false, false)
                }else{
                    let chance = Math.max(event.source.player.getLuck()/10,0.1)
                    let lvl = event.entity.potionEffects.getActive('goety:sapped').getAmplifier()
                    if(Math.random()<chance){
                        event.entity.potionEffects.add('goety:sapped', 20, lvl+1, false, false)
                    }
                    if(itemMap.has('luna_flesh_reforged:archotech_warden_core') && warp>75){
                        if(lvl>74) {event.entity.potionEffects.add('tetra:earthbound', 800, 2, false, false)}
                        else if(lvl>49) {event.entity.potionEffects.add('tetra:earthbound', 600, 2, false, false)}
                        else if(lvl>24) {event.entity.potionEffects.add('tetra:earthbound', 400, 1, false, false)}
                        else {event.entity.potionEffects.add('tetra:earthbound', 200, 0, false, false)}
                    }
                }
                if(warp <= 80){
                    amount = event.amount * ((warp/0.8)/200 + 0.5)
                }else{
                    amount = event.amount * (1+ ((warp-80)/10))
                    if (Math.random() < 0.25) {
                        updateWarpCount(event.source.player, warp - 1)
                    }
                }
                let playerChestInstance = event.source.player.getChestCavityInstance()
                let nerves = playerChestInstance.getOrganScore('chestcavity:nerves')
                amount = amount + nerves
            }
            if (!itemMap.has('luna_flesh_reforged:archotech_warden_core') && type != 'irons_spellbooks.eldritch_blast'){
                return;
            }
            if(event.entity.hasEffect('kubejs:pardon_of_god_magic') && type == 'irons_spellbooks.eldritch_blast'){
                event.entity.causeFallDamage(4,amount * 1.5, DamageSource.indirectMagic(event.entity,event.source.player))
                event.amount = 0
            }else{
                event.entity.causeFallDamage(4,amount/2, DamageSource.indirectMagic(event.entity,event.source.player))
                event.amount = amount
            }
            return;
        }
        if (type == 'indirectMagic') {
            event.entity.invulnerableTime = 0
            let num = Math.min(1 + warp/80, 2)
            event.amount = event.amount * num
            return;
        }
        if (type == 'sonic_boom') {
            let num = Math.min(1 + warp/80, 2)
            event.amount = event.amount * num
            return;
        }
    },
	'luna_flesh_reforged:jump_second_spiritual_heart': function (event, organ, data) {
        let type = event.source.type
        if(!type.startsWith('irons_spellbooks')) return;
        let amount = event.amount
        let player = event.source.player
        let playerChestInstance = player.getChestCavityInstance()
        let addamount = 0
        playerChestInstance.organScores.forEach((key, value) => {
            addamount = Math.max(addamount,value)
        })
        amount = Math.min(amount + addamount, amount * 1.5)
        event.amount = amount
    },
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
    'luna_flesh_reforged:ender_bottle_max': function (event, organ, data) {
        let player = event.source.player
        let count = player.persistentData.getInt(resourceCount)
        let typeMap = getPlayerChestCavityTypeMap(player)
        let chromaticCount = 0
        let amplifier = 0.5
        if (typeMap.has('kubejs:chromatic')) {
            chromaticCount = chromaticCount + typeMap.get('kubejs:chromatic').length
        }
        if (player.hasEffect('kubejs:burning_heart') || player.hasEffect('kubejs:flaring_heart')) {
            amplifier = 2
        }
        updateResourceCount(player, count + Math.floor(chromaticCount * amplifier))
    },
    'luna_flesh_reforged:variable_speed_gear': function (event, organ, data) {
        let player = event.source.player
        let typeMap = getPlayerChestCavityTypeMap(player);
        let cha = 0.05
        if (typeMap.has('kubejs:machine')) {
            let machine = typeMap.get('kubejs:machine').length
            cha = cha + (machine/50)
        }
        if(cha<Math.random()){
            if(player.hasEffect('kubejs:burning_heart')||player.hasEffect('kubejs:flaring_heart')){
                player.potionEffects.add('minecraft:haste', 600, 4, false, false)
                player.potionEffects.add('minecraft:speed', 600, 4, false, false)
            }else{
                player.potionEffects.add('minecraft:haste', 600, 1, false, false)
                player.potionEffects.add('minecraft:speed', 600, 1, false, false)}
        }
    },
    'luna_flesh_reforged:infested_stomach_distortion': function (event, organ, data) {
        let player = event.source.player
        if (event.source.type != 'player') {
            return
        }
        let itemMap = getPlayerChestCavityItemMap(event.source.player)
        if (itemMap.has('luna_flesh_reforged:infested_heart_distortion') && event.amount >= 10) {
            let typeMap = getPlayerChestCavityTypeMap(event.source.player);
            if (typeMap.has('kubejs:infected')) {
                let infestation = typeMap.get('kubejs:infected').length
                if (infestation >= 5){
                    if (Math.random() <= infestation/50) {
                        let num0 = Math.max(infestation/9, 1) + infestation/13
                        player.potionEffects.add('minecraft:saturation', num0 , 0)
                    }
                }
            }
        }
    },
	
};
var damageonly =Object.assign(organPlayerDamageOnlyStrategies,lunaorganPlayerDamageOnlyStrategies);

/**
 * 玩家承受伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const lunaorganPlayerBearStrategies = {
    'luna_flesh_reforged:archotech_mana_reactor': function (event, organ, data) {
        getPlayerMagicData(event.entity).addMana(event.amount * 5)
    },
    'luna_flesh_reforged:archotech_magic_digestive_system': function (event, organ, data) {
        getPlayerMagicData(event.entity).addMana(event.amount * 5)
    },
};
var bear = Object.assign(organPlayerBearStrategies, lunaorganPlayerBearStrategies);
/**
 * 玩家承受伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const lunaorganPlayerBearOnlyStrategies = {
    'luna_flesh_reforged:test_organ': function (event, organ, data) {
        let type = event.source.type
        let amount = event.amount
        let time = event.entity.server.getTickCount()
        event.entity.server.runCommandSilent(`say ${`收到伤害类型： ${type.toString()} ，伤害： ${amount.toString()} 点by ${time.toString()}Time`}`)
    },
    'luna_flesh_reforged:variable_speed_gear': function (event, organ, data) {
        let player = event.entity
        let typeMap = getPlayerChestCavityTypeMap(player);
        let cha = 0.05
        if (typeMap.has('kubejs:machine')) {
            let machine = typeMap.get('kubejs:machine').length
            cha = cha + (machine/50)
        }
        if(cha<Math.random()){
            if(player.hasEffect('kubejs:burning_heart')||player.hasEffect('kubejs:flaring_heart')){
                player.potionEffects.add('minecraft:haste', 600, 4, false, false)
                player.potionEffects.add('minecraft:speed', 600, 4, false, false)
            }else{
                player.potionEffects.add('minecraft:haste', 600, 1, false, false)
                player.potionEffects.add('minecraft:speed', 600, 1, false, false)}
        }
    },
    'luna_flesh_reforged:infested_spine_distortion': function (event, organ, data) {
        let player = event.entity
        let type = event.source.type
        if (player.isOnFire()||type == 'generic') {
            return
        }
        let itemMap = getPlayerChestCavityItemMap(player)
        if (itemMap.has('luna_flesh_reforged:infested_heart_distortion')) {
            let typeMap = getPlayerChestCavityTypeMap(player);
            if (typeMap.has('kubejs:infected')) {
                let infestation = typeMap.get('kubejs:infected').length
                let hpmax = player.getMaxHealth()
                let amount = event.amount
                if(infestation<5){
                    if((hpmax/2)<amount){amount = (hpmax/2)}
                }
                if(infestation>=5 && hpmax<100){
                    if((hpmax/3)<amount){amount = (hpmax/3)}
                }
                if(infestation>=5 && hpmax>=100){
                    if(infestation<10){
                        if((hpmax/4)<amount){amount = (hpmax/4)}
                    }else{
                        if((hpmax/5)<amount){amount = (hpmax/5)}
                    }
                }
                event.amount = amount
            }
        }
    },
}
var bearonly = Object.assign(organPlayerBearOnlyStrategies, lunaorganPlayerBearOnlyStrategies);

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
    'luna_flesh_reforged:eldritch_hammer': function (event, organ) {
        let player = event.player
        let magicData = getPlayerMagicData(player)
        let manaCost = magicData.getMana()
        let amplifier = 1
        let warp = player.persistentData.getInt(warpCount) ?? 0
        if(manaCost<20 && warp<80){return;}
        overOrangeCommonSpellCast(new ResourceLocation('irons_spellbooks', 'spectral_hammer'), amplifier, player, false)
        magicData.setMana(Math.max((manaCost - 20), 0))
        if(warp<10){
            player.addItemCooldown('luna_flesh_reforged:eldritch_hammer', 200)
        }else if(warp<20){
            player.addItemCooldown('luna_flesh_reforged:eldritch_hammer', 150)
        }else if(warp<35){
            player.addItemCooldown('luna_flesh_reforged:eldritch_hammer', 125)
        }else if(warp<50){
            player.addItemCooldown('luna_flesh_reforged:eldritch_hammer', 100)
        }else if(warp<60){
            player.addItemCooldown('luna_flesh_reforged:eldritch_hammer', 80)
        }else if(warp<70){
            player.addItemCooldown('luna_flesh_reforged:eldritch_hammer', 60)
        }else if(warp<80){
            player.addItemCooldown('luna_flesh_reforged:eldritch_hammer', 30)
        }
    },

}
var keypressed = Object.assign(organPlayerKeyPressedOnlyStrategies, lunaorganPlayerKeyPressedOnlyStrategies);

/**
 * 器官右键事件唯一策略
 * @constant
 * @type {Object<string,function(Internal.ItemClickedEventJS, organ):void>}
 */
const lunaorganRightClickedOnlyStrategies = {

    'luna_flesh_reforged:archotech_magic_digestive_system': function (event, organ) {
        if (event.item != 'irons_spellbooks:arcane_essence') {
            return
        }
        let typeMap = getPlayerChestCavityTypeMap(event.player);
        if (typeMap.has('kubejs:archotech')) {
            let archotech = typeMap.get('kubejs:archotech').length
            if (archotech >= 5) {
                let digestive = 0
                if (typeMap.has('kubejs:stomach')) {
                    let stomach = typeMap.get('kubejs:stomach').length
                    digestive = digestive + stomach
                }
                if (typeMap.has('kubejs:intestine')) {
                    let intestine = typeMap.get('kubejs:intestine').length
                    digestive = digestive + intestine
                }
                if (digestive < 5) {
                    let magic = 0
                    if (typeMap.has('kubejs:magic')) {
                        magic = typeMap.get('kubejs:magic').length
                    }
                    let num = event.player.mainHandItem.count
                    let duration = num * 20
                    let ambient = Math.min(Math.max(magic -1, 0), 4)
                    event.player.swing()
                    event.player.potionEffects.add('chestcavity:furnace_power', duration, ambient, false, false);
                    event.item.shrink(64);
                    event.player.addMana(num*5)
                }
            }
        }
    },
    'luna_flesh_reforged:sanitizing_soap': function (event, organ) {
        if (event.item != 'luna_flesh_reforged:purifying_bath_salts') return;
        let player = event.player
        if (!player.shiftKeyDown) return;
		player.potionEffects.add('luna_flesh_reforged:warpward', 12000, 0, false, false);
		player.addItemCooldown('luna_flesh_reforged:purifying_bath_salts', 20 * 10)
        event.item.shrink(1)
        let warp = player.persistentData.getInt(warpCount) ?? 0
        if(warp<=12) return;
        let luck = player.getLuck()
        let opportunity = Math.max(10,100-(Math.sqrt(warp)*6)+luck)
        if((Math.random()*100)>opportunity) return;
        updateWarpCount(player, warp - 1)
        Client.getInstance().gameRenderer.displayItemActivation('luna_flesh_reforged:sanitizing_soap')
        player.server.entities.filterSelector(player).playSound('minecraft:entity.experience_orb.pickup')
    },

}
var rclickonly = Object.assign(organRightClickedOnlyStrategies, lunaorganRightClickedOnlyStrategies);

/**
 * 玩家Tick秒级唯一策略
 * @constant
 * @type {Object<string,function(Internal.SimplePlayerEventJS, organ):void>}
 */
const lunaorganPlayerTickOnlyStrategies = {

    'luna_flesh_reforged:variable_speed_gear': function (event, organ, data) {
        let player = event.player
        if(player.hasEffect('minecraft:haste')||player.hasEffect('minecraft:speed')){
            let itemMap = getPlayerChestCavityItemMap(player)
            if(itemMap.has('kubejs:machine_clockwork')){
                let num = itemMap.get('kubejs:machine_clockwork').length
                let count = player.persistentData.getInt(resourceCount)
                updateResourceCount(player, count + num)
            }
        }
    },
    'luna_flesh_reforged:infested_heart_distortion': function (event, organ) {
        let player = event.player
        if (player.hasEffect('minecraft:fire_resistance')) {
            if(player.potionEffects.getDuration('minecraft:fire_resistance') > 60*20){
                player.removeEffect('minecraft:fire_resistance');
            }
        }
    },
    'luna_flesh_reforged:infested_spine_distortion': function (event, organ) {
        let player = event.player
        const api = new $CuriosApi();
        let optionalCurios = api.getCuriosHelper().getEquippedCurios(player)
        if (!optionalCurios.isPresent()) {
            return
        }
        let curios = optionalCurios.resolve().get()

        if (event.player.age % 20 == 0) {
            for (let slot = 0; slot < curios.getSlots(); slot++) {
                let item = curios.getStackInSlot(slot);
                if (item.id == 'irons_spellbooks:fireward_ring') {
                    player.attack(1)
                }
            }
        }
    },
    'luna_flesh_reforged:nightvision_cholecyst': function (event, organ) {
        if (!event.player || event.player.age % 80 != 0) {
            return
        }
        event.player.potionEffects.add('minecraft:night_vision', 600 , 0 , false, false)
    },
    'luna_flesh_reforged:warped_battery': function (event, organ) {
        if (!event.player || event.player.age % 1200 != 0) {
            return
        }
        if (event.player.hasEffect('luna_flesh_reforged:warpward')) {
            return
        }
        let resource = event.player.persistentData.getInt(resourceCount) ?? 0
        let warp = event.player.persistentData.getInt(warpCount) ?? 0
        updateResourceCount(event.player, resource + warp)   
    },
    'luna_flesh_reforged:silverwood_heart': function (event, organ) {
        if (!event.player || event.player.age % 80 != 0) {
            return
        }
        event.player.potionEffects.add('luna_flesh_reforged:warpward', 600 , 0 , false, false)
    },

}
var playertickonly = Object.assign(organPlayerTickOnlyStrategies, lunaorganPlayerTickOnlyStrategies);