// priority: 950
EntityEvents.death(event => {
    let entity = event.getSource().getActual()
    if (!entity || entity.getType() != "minecraft:wolf") return
    if (Math.random() > 0.01) return
    event.entity.block.popItem("mrqx_disc_pack:legend_of_bloodywolf_disc")
})