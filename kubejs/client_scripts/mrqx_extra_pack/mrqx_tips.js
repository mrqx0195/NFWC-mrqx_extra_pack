// priority: -1

ClientEvents.highPriorityAssets(event => {
    function registeTips(key) {
        let translateKey = `mrqx_extra_pack.tip.${key}`
        event.add(new ResourceLocation(`mrqx_extra_pack:tips/${key}.json`), { "tip": { "translate": translateKey } })
    }

    // 玩家词条注册
    for (let i = 0; i <= 24; i++) {
        registeTips(`tip_${i + 1}`)
    }
})