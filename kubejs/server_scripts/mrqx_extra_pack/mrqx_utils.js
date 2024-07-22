// priority: 99
/**
 * 造成元素损伤
 * @param {Internal.LivingEntity} entity 
 * @param {Number} damage
 * @param {String} type 
 */
function mrqxCauseElementDamage(entity, damage, type) {
    let count = (entity.persistentData.getInt("mrqx_" + type + "_damage") ?? 0) + damage
    let elementDamageSource = mrqxElementDamageSource[type]
    let elementDamageEffect = mrqxElementDamageEffect[type]
    if (count >= 100) {
        let damageCount = Math.floor(count / 100)
        count -= damageCount * 100
        entity.attack(elementDamageSource, Math.min(damageCount * 100, entity.getHealth() - 1))
        elementDamageEffect.forEach(effect => {
            let amplifier = damageCount - 1
            let duration = 200
            if (entity.hasEffect(effect)) {
                amplifier += entity.getEffect(effect).getAmplifier() + 1
            }
            entity.potionEffects.add(effect, duration, amplifier)
        })
        entity.persistentData.putInt("mrqx_" + type + "_damage", count)
        return true
    }
    entity.persistentData.putInt("mrqx_" + type + "_damage", count)
    return false
}

/**
 * 检测器官套装
 * @param {Internal.ServerPlayer} player 
 * @param {String} type 
 */
function mrqxCheckOrganSuit(player, type) {
    let playerChest = getPlayerChestCavityItemMap(player)
    let organList = mrqxOrganSuit[type]
    let count = 0
    organList.forEach(organ => {
        if (!playerChest.has(organ)) {
            return 0
        }
        count++
    })
    return count
}

/**
 * 纸器官检测
 * @param {Internal.ServerPlayer} player 
 * @param {organ} organ 
 */
function mrqxPaperOrganInWaterRainBubbleFireOrLava(player, organ) {
    if (!(player.isOnFire() || player.isInWaterRainOrBubble() || player.isInLava())) {
        return
    }
    let instance = player.getChestCavityInstance()
    let paper = Item.of(organ.id, { organData: {} })
    let organData = organ.tag.organData
    organData.allKeys.forEach(key => {
        organData[key] = organData[key] * 0.8
    })
    paper.nbt.put('organData', organData)
    instance.inventory.setItem(organ.Slot, paper)
    global.initChestCavityIntoMap(player, false)
    if (player.persistentData.contains(organActive) &&
        player.persistentData.getInt(organActive) == 1) {
        global.updatePlayerActiveStatus(player)
    }
}

/**
 * 先进单片镜检测
 * @param {Internal.ItemStack} item 
 * @returns {Boolean[]}
 */
function mrqxCheckAdvancedArchivistEyeGlass(item) {
    let list = []
    if (!item.getNbt()) {
        item.setNbt({})
    }
    list.push(item.getNbt().getBoolean('mrqxAAEGSweetDream') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGDragonPower') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGInfinityBeats') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGBurningAndFlaringHeart') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGPrisonSoul') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGMoonSoul') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGMarenol') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGNuclear') ?? false)
    list.push(item.getNbt().getBoolean('mrqxAAEGElement') ?? false)
    return list
}

/**
 * 获取噩梦指数
 * @param {Internal.ServerPlayer} player 
 * @returns {Number}
 */
function mrqxGetMarenolCount(player) {
    let count = 0
    player.potionEffects.map.forEach((effect, instance) => {
        if (!effect.isBeneficial()) {
            count += instance.getAmplifier()
        }
    })
    count *= player.persistentData.getInt(warpCount) * 0.1
    return count
}