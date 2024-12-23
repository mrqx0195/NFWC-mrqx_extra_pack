ItemEvents.rightClicked("minecraft:wooden_axe", event=>{
    let p = event.player
    let l = p.level
    p.tell('b')
    let ray = p.rayTrace(16, false)
    let entity = ray.entity
    let li = l.getEntitiesWithin(new AABB.of(entity.x-10,entity.y-10,entity.z-10,entity.x+10,entity.y+10,entity.z+10))
    li.forEach(i=>{
        if (i.isAttackable() && !i.isPlayer()){
            p.tell(i.type)
            li.forEach(e=>{ e.invulnerableTime = 0})
            i.attack(1)
        }
    })
    //entity.attack(10)
    p.tell(entity.type)
    p.tell(entity.boundingBox.maxX - entity.boundingBox.minX)
    p.tell(entity.boundingBox.maxY - entity.boundingBox.minY)
    p.tell(entity.boundingBox.maxZ - entity.boundingBox.minZ)

    p.tell('f')
})