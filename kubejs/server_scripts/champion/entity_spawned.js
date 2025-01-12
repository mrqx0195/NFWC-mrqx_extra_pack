// priority: 900
EntityEvents.spawned(event => {
    /**
    * @type {Internal.LivingEntity}
    */
    let entity = event.entity
    if (!entity || !entity.isLiving() || !entity.isMonster()) return

    /** @type {String[]} */
    let typeList = entity.persistentData.get('champion') ?? []
    let player = entity.getLevel().getNearestPlayer(entity, 64)
    if (!player) return
    let warp = player.persistentData.getInt(warpCount)
    while (true) {
        if (warp < 20 || Math.random() > 0.001 * warp || typeList.length >= championTypeMap.length) break
        let randomChampionType = randomGet(championTypeMap)
        if (typeList.find((value, index, obj) => (value == randomChampionType))) continue
        typeList.push(randomChampionType)
    }

    if (!typeList || typeList.length < 1) return
    entity.persistentData.put('champion', typeList)

    let name = `{ translate: 'champion.kubejs.connect_symbol', with: [] }`
    if (typeList.length > 1) {
        for (let i = 0; i < typeList.length - 1; i++) {
            if (i != 0) {
                name = `{ translate: 'champion.kubejs.connect_symbol', with: [${name},{ translate: 'champion.kubejs.type.${typeList[i + 1]}'}]}`
            }
            else {
                name = `{ translate: 'champion.kubejs.connect_symbol', with: [{ translate: 'champion.kubejs.type.${typeList[i]}'},{ translate: 'champion.kubejs.type.${typeList[i + 1]}'}]}`

            }
        }
    }
    else {
        name = { translate: `champion.kubejs.type.${typeList[0]}` }
    }
    entity.setCustomName($Serializer.fromJsonLenient({ translate: 'champion.kubejs', with: [name, { translate: entity.getEntityType().getDescriptionId() }] }))
    entity.setCustomNameVisible(true)
})

const championTypeMap = [
    'fight_for_death',
    'low_frequency',
    'purify',
    'fierce_battle',
    'destruction',
    'awed',
    'purity',
    'corrupt',
    'grue',
    'unbending',
    'exhausted',
    'consecration',
    'smash',
    'fate',
    'parry',
]