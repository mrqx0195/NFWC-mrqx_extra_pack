const tagWorth = {
    '#kubejs:organ':1,
    '#itemborders:gold':10,
    '#itemborders:diamond':50,
    '#kubejs:heart':5,
    '#kubejs:magic':10,
    '#kubejs:overmagic_only':10
}

// 初版，目前只有一个coin槽，预计后续增加到6个槽位以适配不同币种
ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine("kubejs:myanmar_market", 10)
        .requireFunctionOnEnd(ctx => {
            let machine = ctx.machine
            let data = ctx.tile.persistentData
            let worth = data.getInt("worth")
            // machine.owner.tell(worth)
            if (worth > 0) {
                let remaining = machine.addItemToSlot("coin_slot", Item.of('lightmanscurrency:coin_copper', worth % 64), false)
                // machine.owner.tell(remaining)
                // if (remaining.count == 0) {
                //     machine.addItemToSlot("coin_slot", Item.of('lightmanscurrency:coin_copper', worth), false)
                // }
                data.putInt("worth", 0)   
                let coin = machine.getItemStored("coin_slot")
                // machine.owner.tell(coin)
                return ctx.success()
            }else{
                data.putInt("worth", 0)
                return ctx.error("no worth organ")
            }
        })
        .requireFunctionToStart(ctx => {
            let machine = ctx.machine
            let organ = machine.getItemStored("organ_slot")
            if (organ.count == 0)  return ctx.error("no organ found")
            let data = ctx.tile.persistentData
            let tags = organ.tags.toArray()
            let worth = 0
            tags.forEach(key => {
                let tag = String(key).split("/")[1].split("]")[0].replace(" ", "#")
                if (tagWorth[tag] != undefined) {
                    worth += tagWorth[tag]
                }
            })
            if (worth) {
                data.putInt("worth", worth)
                organ.count -= 1
                return ctx.success()
            } else{
                data.putInt("worth", worth)
                ctx.machine.owner.tell("no worth organ")
                return ctx.error("no worth organ")
            }
        })
})