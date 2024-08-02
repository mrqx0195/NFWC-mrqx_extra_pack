// priority: 99
const $mrqxArrayList = Java.loadClass('java.util.ArrayList')
const $mrqxInteger = Java.loadClass('java.lang.Integer')

const mrqxPlayerLoginTime = new Map()
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
 * @param {Boolean} isAll 
 */
function mrqxCheckOrganSuit(player, type, isAll) {
    isAll = typeof isAll !== "undefined" ? isAll : true;
    let playerChest = getPlayerChestCavityItemMap(player)
    let organList = mrqxOrganSuit[type]
    let count = 0
    organList.forEach(organ => {
        if (!playerChest.has(organ) && isAll) {
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

/**
 * 获取幽匿指数
 * @param {Internal.ServerPlayer} player 
 * @returns {Number}
 */
function mrqxGetSculkCount(player) {
    let count = 0
    let itemMap = getPlayerChestCavityItemMap(player)
    let typeMap = getPlayerChestCavityTypeMap(player)
    if (itemMap.has('mrqx_extra_pack:sculk_heart') && typeMap.has('kubejs:mrqx_sculk')) {
        count = typeMap.get('kubejs:mrqx_sculk').length
    }
    let blockSet = new Set()
    count *= mrqxGetConnectedBlocksCount(0, player.getBlockX(), player.getBlockY() - 1, player.getBlockZ(), 100, 'minecraft:sculk', player.getLevel(), blockSet)
    return count
}

/**
 * 相连方块获取
 * @param {Number} count
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} max
 * @param {String} id
 * @param {Internal.Level} level
 * @param {Set<(Number,Number,Number)>} set
 * @returns {Number}
 */
function mrqxGetConnectedBlocksCount(count, x, y, z, max, id, level, set) {
    let key = `${x}_${y}_${z}`
    if (set.has(key)) {
        return count
    }
    set.add(key);
    if (count <= max && level.getBlock(x, y, z).getId() == id) {
        return (mrqxGetConnectedBlocksCount(count, x + 1, y, z, max, id, level, set) + mrqxGetConnectedBlocksCount(count, x - 1, y, z, max, id, level, set) + mrqxGetConnectedBlocksCount(count, x, y + 1, z, max, id, level, set) + mrqxGetConnectedBlocksCount(count, x, y - 1, z, max, id, level, set) + mrqxGetConnectedBlocksCount(count, x, y, z + 1, max, id, level, set) + mrqxGetConnectedBlocksCount(count, x, y, z - 1, max, id, level, set) + 1)
    }
    return count
}

/**
 * 检测方块是否暴露在空气中
 * @param {Internal.Level} level
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @returns {Boolean}
 */
function mrqxIsBlockExposedToAir(level, x, y, z) {
    let directions = [
        [0, -1, 0],
        [0, 1, 0],
        [-1, 0, 0],
        [1, 0, 0],
        [0, 0, -1],
        [0, 0, 1]
    ]
    for (let dir of directions) {
        let blockX = x + dir[0]
        let blockY = y + dir[1]
        let blockZ = z + dir[2]
        let blockState = level.getBlock(blockX, blockY, blockZ)
        if (blockState.getId() == 'minecraft:air') {
            return true
        }
    }
    return false
}

/**
 * 处理玩家登录时间
 */
PlayerEvents.loggedIn(event => {
    let player = event.player
    let uuid = String(player.getUuid())
    mrqxPlayerLoginTime.set(uuid, event.getServer().getTickCount())
})

/**
 * 获取玩家登录时间
 * @param {Internal.ServerPlayer} player 
 * @returns {Number}
 */
function mrqxGetLoggedInTime(player) {
    let uuid = String(player.getUuid())
    return mrqxPlayerLoginTime.get(uuid)
}