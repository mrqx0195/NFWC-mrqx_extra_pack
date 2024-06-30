
/**
 * 造成伤害处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const lunaorganPlayerDamageStrategies = {

    'luna_flesh_reforged:archotech_void_tentacle': function (event, organ, data) {
        let warp = event.source.player.persistentData.getInt(warpCount) ?? 0
        if(Math.random()*100 > (warp/2 - 10)) return;
        let duration = 80
        let amplifier = 0
        let itemMap = getPlayerChestCavityItemMap(event.source.player)
        if(itemMap.has('luna_flesh_reforged:archotech_void_heart_engine')){
            duration = duration * 2
            amplifier = Math.floor(Math.random()*3)
        }
        let potionList = ['minecraft:slowness', 'minecraft:poison', 'minecraft:glowing', 'goety:gold_touched', 'goety:wane', 'cataclysm:abyssal_burn', 'goety:soul_hunger', 'goety:ender_ground', 'tetra:stun', 'goety:freezing', 'goety:cursed', 'goety:busted', 'somebosses:haemophilia']
        event.entity.potionEffects.add(randomGet(potionList), duration, amplifier)
    },
    'luna_flesh_reforged:archotech_void_whip': function (event, organ, data) {
        let warp = event.source.player.persistentData.getInt(warpCount) ?? 0
        if (event.source.type == 'player') {
            let amount = event.amount + warp
            event.amount = amount
        }
        if(Math.random()*100 > (warp/20)) return;
        event.entity.potionEffects.add('goety:doom', 20, 0)
    },
    'luna_flesh_reforged:test_organ': function (event, organ, data) {
        let type = event.source.type
        let amount = event.amount
        let time = event.source.player.server.getTickCount()
        event.source.player.server.runCommandSilent(`say ${`造成伤害类型： ${type.toString()} ，伤害： ${amount.toString()} 点by ${time.toString()}Time`}`)
    },
    
};
var damage =Object.assign(organPlayerDamageStrategies,lunaorganPlayerDamageStrategies);
/**
 * 造成伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const lunaorganPlayerDamageOnlyStrategies = {

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
        let player = event.source.player
        let type = event.source.type
        let amount = event.amount
        let warp = player.persistentData.getInt(warpCount) ?? 0
        if (type == 'irons_spellbooks.eldritch_blast' || type == 'irons_spellbooks.sonic_boom' || type == 'irons_spellbooks.sculk_tentacles') {
            event.entity.invulnerableTime = 0
            let itemMap = getPlayerChestCavityItemMap(player)
            let duration = 20
            if(itemMap.has('luna_flesh_reforged:archotech_void_heart_engine')){duration = 66}
            if(type == 'irons_spellbooks.eldritch_blast'){
                if(!event.entity.hasEffect('goety:sapped')){
                    event.entity.potionEffects.add('goety:sapped', duration, 0, false, false)
                }else{
                    let chance = Math.max(player.getLuck()/10,0.1)
                    let lvl = event.entity.potionEffects.getActive('goety:sapped').getAmplifier()
                    if(Math.random()<chance){
                        event.entity.potionEffects.add('goety:sapped', duration, lvl+1, false, false)
                    }
                    if((itemMap.has('luna_flesh_reforged:archotech_warden_core')||itemMap.has('luna_flesh_reforged:void_shock_core')) && warp>75){
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
                    if (Math.random() < 0.25 && !itemMap.has('luna_flesh_reforged:archotech_void_heart_engine')) {
                        updateWarpCount(player, warp - 1)
                    }
                }
                let playerChestInstance = player.getChestCavityInstance()
                let nerves = playerChestInstance.getOrganScore('chestcavity:nerves')
                amount = amount + nerves
            }
            if (!itemMap.has('luna_flesh_reforged:archotech_warden_core') && !itemMap.has('luna_flesh_reforged:void_shock_core') && type != 'irons_spellbooks.eldritch_blast'){
                return;
            }
            if(event.entity.hasEffect('kubejs:pardon_of_god_magic') && type == 'irons_spellbooks.eldritch_blast'){
                event.entity.causeFallDamage(4,amount * 1.5, DamageSource.indirectMagic(event.entity,player))
                event.amount = 0
            }else{
                event.entity.causeFallDamage(4,amount/2, DamageSource.indirectMagic(event.entity,player))
                event.amount = amount
            }
            if (itemMap.has('luna_flesh_reforged:archotech_void_heart_engine') && itemMap.has('luna_flesh_reforged:void_shock_core')){
                let count = Math.floor(Math.random()*warp/10)+1
                let damageSource = new DamageSource.sonicBoom(player)
                for (let i = 0; i < count; i++) {
                    event.entity.attack(damageSource , warp/2 )
                    event.entity.invulnerableTime = 0}
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
    'luna_flesh_reforged:archotech_void_heart_engine': function (event, organ, data) {
        let type = event.source.type
        if(type == 'player') return;
        let player = event.source.player
        let mainitem = player.mainHandItem
        let offitem = player.offHandItem
        if ((mainitem?.id == 'tetra:modular_sword' && mainitem.nbt && (mainitem.nbt.contains('sword/forefinger_ring_material') || mainitem.nbt.contains('sword/key_guard_material') || mainitem.nbtString.includes('unusual_smilo_fur')))
            || (offitem?.id == 'tetra:modular_sword' && offitem.nbt && (offitem.nbt.contains('sword/forefinger_ring_material') || offitem.nbt.contains('sword/key_guard_material') || offitem.nbtString.includes('unusual_smilo_fur')))
            || (mainitem?.id == 'tetra:modular_bow' && mainitem.nbt && mainitem.nbtString.includes('unusual_smilo_fur'))
            || (offitem?.id == 'tetra:modular_bow' && offitem.nbt && offitem.nbtString.includes('unusual_smilo_fur'))) return;
        let resource = player.persistentData.getInt(resourceCount)
        if(resource <= 100) return;
        let itemMap = getPlayerChestCavityItemMap(player);
        let attackDamage = player.getAttributeValue('minecraft:generic.attack_damage')
        let amount = event.amount
        let amount_add = attackDamage*0.1
        if(player.hasEffect('minecraft:strength')){
            amount_add = amount_add * Math.min(5,player.getEffect('minecraft:strength').getAmplifier()+2)
        }
        if(itemMap.has('luna_flesh_reforged:enchanted_psylink_neuro') || itemMap.has('luna_flesh_reforged:psylink_neuro')){
            let powerModifier = player.getAttributeValue('irons_spellbooks:spell_power')
            amount_add = amount_add * powerModifier
        }
        if(itemMap.has('luna_flesh_reforged:archotech_abyssal_core')){
            let eldritchpowerModifier = player.getAttributeValue('irons_spellbooks:eldritch_spell_power')
            amount_add = amount_add * (1+eldritchpowerModifier)
        }
        event.amount = amount + amount_add
        if(itemMap.has('luna_flesh_reforged:archotech_magic_digestive_system')){
            let magicData = getPlayerMagicData(player)
            let manaCost = magicData.getMana()
            let manaRegen = Math.floor(Math.random()*5)+1
            magicData.setMana(Math.max((manaCost + manaRegen), 0))
        }
    },
    'luna_flesh_reforged:archotech_void_spleen': function (event, organ, data) {
        let player = event.source.player
        let coolDowns = player.getCooldowns()
        if (coolDowns.isOnCooldown('luna_flesh_reforged:archotech_void_spleen')) return;
        let type = event.source.type
        let warp = player.persistentData.getInt(warpCount) ?? 0
        let count = player.persistentData.getInt(resourceCount)
        if (type.startsWith('irons_spellbooks') || type == 'indirectMagic' || type == 'sonic_boom'){
            let typeMap = getPlayerChestCavityTypeMap(player);
            let amount = event.amount
            if (amount>0 && typeMap.has('kubejs:magic')){
                let value = typeMap.get('kubejs:magic').length
                let newcount = count + value
                updateResourceCount(player,newcount)
                if(Math.random() < 0.25){
                    let newwarp = warp + value
                    updateWarpCount(player,newwarp)
                }else if(Math.random() < 0.15){
                    let newwarp = warp - value
                    updateWarpCount(player,newwarp)
                }
                player.addItemCooldown('luna_flesh_reforged:archotech_void_spleen', 20 * 3)
            }
        }
    },
    'luna_flesh_reforged:archotech_void_liver': function (event, organ, data) {
        let player = event.source.player
        let type = event.source.type
        let typeMap = getPlayerChestCavityTypeMap(player);
        let amplifier = 0
        if(typeMap.has('kubejs:warp')){amplifier = typeMap.get('kubejs:warp').length}
        if (player.hasEffect('minecraft:strength')) {
            let value = player.getEffect('minecraft:strength').getAmplifier() + 1
            player.potionEffects.add('minecraft:strength', 8 * 20, Math.min(amplifier,value))
            if(type != player){ event.amount = event.amount + value*3 }
        }else{player.potionEffects.add('minecraft:strength', 8 * 20, 0)}
    },
    'luna_flesh_reforged:fallen_paradise': function (event, organ, data) {
        let player = event.source.player
        let random = Math.random()
        if (random < 0.2) {
            let coolDowns = player.getCooldowns()
            let entityID = event.entity.getEntityType().toShortString()
            if(entityID == 'target_dummy') return;
            if (coolDowns.isOnCooldown('luna_flesh_reforged:fallen_paradise')) return;
            if(random<0.03){player.give(Item.of('lightmanscurrency:coin_gold'))}
            else if(random<0.1){player.give(Item.of('lightmanscurrency:coin_iron'))}
            else{player.give(Item.of('lightmanscurrency:coin_copper'))}
            player.addItemCooldown('luna_flesh_reforged:fallen_paradise', 200)
            return
        }
        if (random < 0.4) {
            event.amount = event.amount + event.entity.maxHealth * 0.025
            return
        }
        if (random < 0.6) {
            let AmplifierTotal = 0
            event.entity.potionEffects.map.forEach((effect, instance) => {
                    AmplifierTotal = AmplifierTotal + instance.getAmplifier() + 1
            })
            event.amount = event.amount * (1+(AmplifierTotal*0.05))
            return
        }
        if (random < 0.8) {
            player.potionEffects.add('minecraft:saturation', 1 , Math.min(5,(event.amount)/100))
            return
        }
        if (random < 1) {
            player.potionEffects.add('minecraft:regeneration', 20 * 15, 2)
            return
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
            if(event.entity.hasEffect('luna_flesh_reforged:harvest_markers')){
                event.amount = event.amount * 1.3
            }else{
                event.amount = event.amount * 1.05}
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
            if(Math.random()<0.5){
                if(event.entity.hasEffect('luna_flesh_reforged:harvest_markers')){
                    let lvl = event.entity.potionEffects.getActive('goety:sapped').getAmplifier()
                    event.entity.potionEffects.add('luna_flesh_reforged:harvest_markers', 20 * 8, lvl+1)
                }
                else{event.entity.potionEffects.add('luna_flesh_reforged:harvest_markers', 20 * 6, 0)}
            }
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
    'luna_flesh_reforged:chromatic_piston': function (event, organ, data) {
        let player = event.source.player
        let itemMap = getPlayerChestCavityItemMap(player)
        if(!itemMap.has('luna_flesh_reforged:chromatic_piston')){return;}
        let chromatic_piston = itemMap.get('luna_flesh_reforged:chromatic_piston').length
        let type = event.source.type
        if (type == 'player'){
            if(chromatic_piston%2 == 0)return;
            let typeMap = getPlayerChestCavityTypeMap(player);
            let chromatic = 1
            if (typeMap.has('kubejs:chromatic')) {
                chromatic = typeMap.get('kubejs:chromatic').length
            }
            event.entity.addMotion(player.getLookAngle().x()*chromatic,player.getLookAngle().y()*chromatic,player.getLookAngle().z()*chromatic)
        }
        if (type == 'arrow'){
            if(chromatic_piston%2 != 0)return;
            let mainitem = player.mainHandItem
            let offitem = player.offHandItem
            if ((mainitem?.id == 'tetra:modular_sword' && mainitem.nbt && (mainitem.nbt.contains('sword/forefinger_ring_material') || mainitem.nbt.contains('sword/key_guard_material') || mainitem.nbtString.includes('unusual_smilo_fur')))
                || (offitem?.id == 'tetra:modular_sword' && offitem.nbt && (offitem.nbt.contains('sword/forefinger_ring_material') || offitem.nbt.contains('sword/key_guard_material') || offitem.nbtString.includes('unusual_smilo_fur')))
                || (mainitem?.id == 'tetra:modular_bow' && mainitem.nbt && mainitem.nbtString.includes('unusual_smilo_fur'))
                || (offitem?.id == 'tetra:modular_bow' && offitem.nbt && offitem.nbtString.includes('unusual_smilo_fur'))) return;
            let amount = event.amount
            let attackDamage = player.getAttributeValue('minecraft:generic.attack_damage')
            let random = Math.random()
            if(amount < attackDamage*random){event.amount = attackDamage*random}
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

    
    'luna_flesh_reforged:llama_in_chestcavity': function (event, organ, data) {
        if (event.source.type != 'mob') {
            return
        }
        let player = event.source.player
		let playerChestInstance = player.getChestCavityInstance()
        let forceful_spit = playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'forceful_spit'))
        let breath_capacity = playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'breath_capacity'))
        let amount = event.amount
        let spit = forceful_spit * breath_capacity
        if(amount < spit && player.hasEffect('chestcavity:forceful_spit_cooldown')){
            event.amount = spit
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
        organPlayerBearStrategies['kubejs:red_ink'](event, organ)
    },
    'luna_flesh_reforged:archotech_magic_digestive_system': function (event, organ, data) {
        organPlayerBearStrategies['kubejs:red_ink'](event, organ)
    },
    'luna_flesh_reforged:test_organ': function (event, organ, data) {
        let type = event.source.type
        let amount = event.amount
        let time = event.entity.server.getTickCount()
        event.entity.server.runCommandSilent(`say ${`收到伤害类型： ${type.toString()} ，伤害： ${amount.toString()} 点by ${time.toString()}Time`}`)
    },
};
var bear = Object.assign(organPlayerBearStrategies, lunaorganPlayerBearStrategies);
/**
 * 玩家承受伤害唯一处理策略
 * @constant
 * @type {Object<string,function(Internal.LivingHurtEvent, organ, EntityHurtCustomModel):void>}
 */
const lunaorganPlayerBearOnlyStrategies = {

    'luna_flesh_reforged:archotech_void_spleen': function (event, organ, data) {
        let player = event.entity
        let coolDowns = player.getCooldowns()
        if (coolDowns.isOnCooldown('luna_flesh_reforged:archotech_void_spleen')) return;
        let type = event.source.type
        let warp = player.persistentData.getInt(warpCount) ?? 0
        let count = player.persistentData.getInt(resourceCount)
        if (type.startsWith('irons_spellbooks') || type == 'indirectMagic' || type == 'sonic_boom'){
            let typeMap = getPlayerChestCavityTypeMap(player);
            let amount = event.amount
            if (amount>0 && typeMap.has('kubejs:magic')){
                let value = typeMap.get('kubejs:magic').length
                let newcount = count + value
                updateResourceCount(player,newcount)
                if(Math.random() < 0.25){
                    let newwarp = warp + value
                    updateWarpCount(player,newwarp)
                }else if(Math.random() < 0.15){
                    let newwarp = warp - value
                    updateWarpCount(player,newwarp)
                }
                player.addItemCooldown('luna_flesh_reforged:archotech_void_spleen', 20 * 3)
            }
        }
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
    'luna_flesh_reforged:archotech_lung_left': function (event, organ, data) {
        let player = event.entity
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'luna_flesh_reforged:archotech_lung_right') {
            let player = event.entity
            if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1) return
            let oldAirSupply = player.getAirSupply()
            if (oldAirSupply > 0) {
                let curAirSupply = Math.max(oldAirSupply - event.amount * 50, 0)
                let curAmount = Math.max(event.amount - oldAirSupply / 50, 0)
                player.setAirSupply(curAirSupply)
                let count = player.persistentData.getInt(resourceCount)
                let newcount = count + (event.amount - curAmount)
                updateResourceCount(player, newcount)
                event.amount = curAmount
                let itemMap = getPlayerChestCavityItemMap(player);
                if(itemMap.has('luna_flesh_reforged:archotech_void_heart_engine')){
                    let magicData = getPlayerMagicData(player)
                    let manaCost = magicData.getMana()
                    let manaRegen = (event.amount - curAmount)*10
                    magicData.setMana(Math.max((manaCost + manaRegen), 0))
                }
                return
            }
        }
    },
    'luna_flesh_reforged:archotech_lung_right': function (event, organ, data) {
        let player = event.entity
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'luna_flesh_reforged:archotech_lung_left') {
            let count = player.persistentData.getInt(resourceCount)
            let amount = event.amount
            let deamount = Math.min(amount-10, amount/2)
            let itemMap = getPlayerChestCavityItemMap(player);
            if(itemMap.has('luna_flesh_reforged:archotech_void_heart_engine')){deamount = amount/2}
            else{if(amount<10) return;}
            if (count >= deamount*2) {
                event.amount = amount - deamount
                updateResourceCount(player, count - Math.floor(deamount*2))
            }else{
                let deamountnew = count/2
                event.amount = amount - deamountnew
                updateResourceCount(player, 0)
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
    'luna_flesh_reforged:void_shock_core': function (event, organ) {
        let player = event.player
        let magicData = getPlayerMagicData(player)
        let manaCost = magicData.getMana()
        let amplifier = Math.max(Math.cbrt(manaCost), 3)
        overLimitSpellCast(new ResourceLocation('luna_flesh_reforged', 'void_shock'), amplifier, player, false)
        magicData.setMana(Math.max((manaCost - 500), 0))
        if (manaCost < 500) {
            player.setHealth(Math.max((player.getHealth() - (500 - manaCost) * 0.5), 1))
        }
        let warp = player.persistentData.getInt(warpCount) ?? 0
        let cooldown = 20*50
        if(warp>50){ cooldown = cooldown - Math.min(900,(warp*6)) }
        player.addItemCooldown('luna_flesh_reforged:void_shock_core', cooldown)
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
                let itemMap = getPlayerChestCavityItemMap(event.player)
                let digestive = 0
                let digsys = 1
                if(itemMap.has('luna_flesh_reforged:archotech_magic_digestive_system')){
                    digsys = itemMap.get('luna_flesh_reforged:archotech_magic_digestive_system').length
                }
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
                    let num = event.player.mainHandItem.count * digsys
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

    'luna_flesh_reforged:archotech_lastinger': function (event, organ, data) {
        let player = event.player
        if(player.getChestCavityInstance().ccBeingOpened!=null && player.getChestCavityInstance().ccBeingOpened.owner == player && player.hasContainerOpen()) return;
        if (player.persistentData.contains(organActive) &&
            player.persistentData.getInt(organActive) == 1) {return;}
        else{
            global.updatePlayerActiveStatus(player)
            player.persistentData.putInt(organActive, 1)
        }
    },
    'luna_flesh_reforged:archotech_dragon_appendix': function (event, organ, data) {
        organPlayerTickOnlyStrategies['luna_flesh_reforged:archotech_lastinger'](event, organ)
    },
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
    'luna_flesh_reforged:infested_tumour_distortion': function (event, organ) {
        let player = event.player
        let itemMap = getPlayerChestCavityItemMap(player)
        if (!itemMap.has('luna_flesh_reforged:infested_heart_distortion') || !itemMap.has('luna_flesh_reforged:infested_heart_distortion') || !itemMap.has('luna_flesh_reforged:infested_spine_distortion')) {return}
        organPlayerTickOnlyStrategies['luna_flesh_reforged:archotech_lastinger'](event, organ)
        organPlayerTickOnlyStrategies['kubejs:worm_neuron'](event, organ)
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

/**
 * 器官食物食用唯一策略
 * @constant
 * @type {Object<string,function(Internal.FoodEatenEventJS, organ):void>}
 */
const lunaorganFoodEatenOnlyStrategies = {

    'luna_flesh_reforged:infested_tumour_distortion': function (event, organ) {
        let player = event.player
        let item = event.item
        if (!item.hasTag('kubejs:infected')) {return}
        let itemMap = getPlayerChestCavityItemMap(player)
        if (!itemMap.has('luna_flesh_reforged:infested_heart_distortion') || !itemMap.has('luna_flesh_reforged:infested_heart_distortion') || !itemMap.has('luna_flesh_reforged:infested_spine_distortion')) {return}
        if (player.nbt?.ForgeCaps['goety:lichdom']?.lichdom == 1) return
        let playerChestInstance = player.getChestCavityInstance()
        if(item.getId() == 'luna_flesh_reforged:infested_muscle'){
            let warp = player.persistentData.getInt(warpCount) ?? 0
            if(warp<60){return}else{
                let numa = ((warp - 60)/2) + (playerChestInstance.organScores.get(new ResourceLocation('chestcavity', 'metabolism')) / 8)
                if(Math.random()*100 < numa){
                    // 如果该位置存在物品，则不进行生成
                    let randomIndex = Math.floor(Math.random() * 27)
                    if (playerChestInstance.inventory.getItem(randomIndex) != 'minecraft:air') return
                    let flesh = Item.of('luna_flesh_reforged:flesh_tentacle')
                    if (Math.random()<0.4){flesh = Item.of('luna_flesh_reforged:flesh_whip')}
                    playerChestInstance.inventory.setItem(randomIndex, flesh)
                    global.initChestCavityIntoMap(player, false)
                    global.updatePlayerActiveStatus(player)
                }
            }
        }
        if(item.getId() == 'kubejs:random_tumor'){
            organFoodEatenOnlyStrategies['kubejs:origin_of_tumor'](event, organ)
        }
    },
}
var foodeatenonly = Object.assign(organFoodEatenOnlyStrategies, lunaorganFoodEatenOnlyStrategies);

/**
 * 器官实体掉落唯一策略
 * @constant
 * @type {Object<string,function(Internal.LootContextJS, organ):void>}
 */
const lunaentityLootOnlyStrategies = {
    'luna_flesh_reforged:fallen_paradise': function (event, organ) {
        let itemMap = getPlayerChestCavityItemMap(event.killerEntity)
        if(!itemMap.has('kubejs:paradise_regained')){
            event.loot.forEach(loot => {
                loot.setCount(loot.getCount() * 2)
            })
        }
        entityLootOnlyStrategies['kubejs:infinity_force'](event, organ)
    },
}
var lootentityonly = Object.assign(entityLootOnlyStrategies, lunaentityLootOnlyStrategies);

/**
 * 唯一超限施法等级策略
 * @constant
 * @type {Object<string,function(Internal.ServerPlayer, organ):Float>}
 */
const lunaorganOverLimitMagicOnlyStrategies = {
    'luna_flesh_reforged:enchanted_psylink_neuro': function (player, organ) {
        let typeMap = getPlayerChestCavityTypeMap(player)
        let amplifier = 0
        if (typeMap.has('kubejs:archotech')) {
            amplifier = typeMap.get('kubejs:archotech').length
        }
        return amplifier;
    },
};
var overmagiconly = Object.assign(organOverLimitMagicOnlyStrategies, lunaorganOverLimitMagicOnlyStrategies);