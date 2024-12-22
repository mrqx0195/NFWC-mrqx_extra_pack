const tagWorth = {
    '#kubejs:organ': 1,
    '#itemborders:gold': 10,
    '#itemborders:diamond': 50,
    '#kubejs:heart': 5,
    '#kubejs:magic': 10,
    '#kubejs:overmagic_only': 10
}

ServerEvents.recipes(event => {
    event.recipes.custommachinery.custom_machine("kubejs:myanmar_market", 100)
        .requireFunctionEachTick(ctx => {
            let organ = ctx.machine.getItemStored("organ_slot")
            if (!organ || organ.isEmpty()) return ctx.error("no organ")
            return ctx.success()
        })
        .requireFunctionOnEnd(ctx => {
            let machine = ctx.machine
            let organ = machine.getItemStored("organ_slot")
            let worth = calculateOrganWorth(organ)
            let coinSlotItem = machine.getItemStored('coin_output')
            if (worth == 0) return ctx.error("no worth organ")
            if (coinSlotItem && coinSlotItem.hasTag('lightmanscurrency:wallet')) {
                $WalletItem.PickupCoin(coinSlotItem, Item.of('lightmanscurrency:coin_copper', worth))
            } else {
                let playerBankAccount = $BankSaveData.GetBankAccount(false, ctx.machine.ownerId)
                playerBankAccount.depositMoney(ConvertMainMoneyValue(worth))
                if (machine.owner.isAlive()) {
                    machine.owner.setStatusMessage(Text.translatable('kubejs.statusmsg.organ_sell.1', Text.gold(worth.toFixed(0))))
                }
            }
            machine.removeItemFromSlot("organ_slot", 1, false)
            return ctx.success()
        })
        .requireFunctionToStart(ctx => {
            let machine = ctx.machine
            let organ = machine.getItemStored("organ_slot")
            let worth = calculateOrganWorth(organ)
            if (worth <= 0) {
                return ctx.error("no worth organ")
            }
            return ctx.success()
        })
        .resetOnError()
})

/**
 * @param {Internal.ItemStack} organ 
 * @returns {number}
 */
function calculateOrganWorth(organ) {
    let worth = 0
    organ.tags.toArray().forEach(/**@param {Internal.TagKey} tag*/tag => {
        let tagString = '#' + String(tag.location())
        if (tagWorth[tagString]) {
            worth += tagWorth[tagString]
        }
    })
    return worth
}