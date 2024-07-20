StartupEvents.registry('item', event => {
    /**
     * 
     * @param {Organ} organ 
     * @returns {Internal.BasicItemJS$Builder}
     */
    function registerOrgan(organ) {
        global.ORGAN_LIST.push(organ)
        let builder = event.create(organ.itemID).maxStackSize(organ.maxStackSize).tag('kubejs:organ').group("kubejs.mrqxextrapack")
        if (organ.ctrlTextLines.length > 0) {
            builder.tag('chestcavity:active')
        }
        if (organ.altTextLines.length > 0) {
            builder.tag('chestcavity:special')
        }
        return builder
    }

    {// 纸器官
        // 纸器官
        registerOrgan(new Organ('mrqx_extra_pack:lung_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.lung_paper.1" })]).addScore('breath_recovery', 0.5).addScore('breath_capacity', 0.5).addScore('endurance', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/lung_paper').tag('itemborders:iron').tag('kubejs:lung').tag('kubejs:evolution').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:muscle_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_paper.1" })]).addScore('strength', 0.5).addScore('speed', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/muscle_paper').tag('itemborders:iron').tag('kubejs:muscle').tag('kubejs:evolution').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:heart_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.heart_paper.1" })]).addScore('health', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/heart_paper').tag('kubejs:evolution').tag('itemborders:iron').tag('kubejs:heart').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:intestine_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.intestine_paper.1" })]).addScore('nutrition', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/intestine_paper').tag('itemborders:iron').tag('kubejs:evolution').tag('kubejs:intestine').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:rib_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_paper.1" })]).addScore('defense', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/rib_paper').tag('itemborders:iron').tag('kubejs:rib').tag('kubejs:evolution').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:spine_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.spine_paper.1" })]).addScore('defense', 0.25).addScore('nerves', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/spine_paper').tag('itemborders:iron').tag('kubejs:evolution').tag('kubejs:spine').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:spleen_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.spleen_paper.1" })]).addScore('metabolism', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/spleen_paper').tag('itemborders:iron').tag('kubejs:evolution').tag('kubejs:spleen').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:stomach_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.stomach_paper.1" })]).addScore('digestion', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/stomach_paper').tag('itemborders:iron').tag('kubejs:evolution').tag('kubejs:stomach').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:kidney_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_paper.1" })]).addScore('filtration', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/kidney_paper').tag('itemborders:iron').tag('kubejs:evolution').tag('kubejs:kidney').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:liver_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.liver_paper.1" })]).addScore('detoxification', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/liver_paper').tag('itemborders:iron').tag('kubejs:evolution').tag('kubejs:liver').tag('kubejs:mrqx_paper');
        registerOrgan(new Organ('mrqx_extra_pack:appendix_paper').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_paper.1" })]).addScore('luck', 0.5).addScore('hydroallergenic', 3).addScore('fire_resistant', -1).build()).texture('mrqx_extra_pack:item/organs/paper/appendix_paper').tag('itemborders:iron').tag('kubejs:evolution').tag('kubejs:appendix').tag('kubejs:mrqx_paper');

        // 书写过的纸器官
        registerOrgan(new Organ('mrqx_extra_pack:lung_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.lung_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/lung_paper_written').tag('itemborders:gold').tag('kubejs:lung').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:muscle_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/muscle_paper_written').tag('itemborders:gold').tag('kubejs:muscle').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:heart_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.heart_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/heart_paper_written').tag('itemborders:gold').tag('kubejs:heart').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:intestine_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.intestine_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/intestine_paper_written').tag('itemborders:gold').tag('kubejs:intestine').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:rib_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/rib_paper_written').tag('itemborders:gold').tag('kubejs:rib').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:spine_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.spine_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/spine_paper_written').tag('itemborders:gold').tag('kubejs:spine').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:spleen_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.spleen_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/spleen_paper_written').tag('itemborders:gold').tag('kubejs:spleen').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:stomach_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.stomach_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/stomach_paper_written').tag('itemborders:gold').tag('kubejs:stomach').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:kidney_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/kidney_paper_written').tag('itemborders:gold').tag('kubejs:kidney').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:liver_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.liver_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/liver_paper_written').tag('itemborders:gold').tag('kubejs:liver').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');
        registerOrgan(new Organ('mrqx_extra_pack:appendix_paper_written').addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_paper_written.1" })]).addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.paper_written.1" })]).build()).texture('mrqx_extra_pack:item/organs/paper_written/appendix_paper_written').tag('itemborders:gold').tag('kubejs:appendix').tag('kubejs:mrqx_paper').tag('kubejs:player_tick');

        // 神之笔
        registerOrgan(new Organ('mrqx_extra_pack:divine_pen')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.divine_pen.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.divine_pen.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.divine_pen.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.divine_pen.4" })])
            .addScore('hydrophobia', 1)
            .addScore('hydroallergenic', 5)
            .build())
            .texture('mrqx_extra_pack:item/organs/divine_pen')
            .tag('itemborders:diamond')
            .tag('kubejs:legends')
            .tag('kubejs:rclick_only');
    }

    // 迷你末地水晶
    registerOrgan(new Organ('mrqx_extra_pack:mini_end_crystal')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.mini_end_crystal.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.mini_end_crystal.2" })])
        .addScore('explosive', 5)
        .build())
        .texture('mrqx_extra_pack:item/organs/mini_end_crystal')
        .tag('itemborders:iron')
        .tag('kubejs:player_tick');

    {// 核能套
        // 裂变反应堆
        registerOrgan(new Organ('mrqx_extra_pack:fission_reactor')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.fission_reactor.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.fission_reactor.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.fission_reactor.3" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.fission_reactor.4" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.fission_reactor.5" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.fission_reactor.6" })])
            .addScore('health', -3)
            .addScore('filtration', -1)
            .addScore('detoxification', -1)
            .build())
            .texture('mrqx_extra_pack:item/organs/nuclear/fission_reactor')
            .tag('itemborders:diamond')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_nuclear')
            .tag('kubejs:rclick_only')
            .tag('kubejs:active_only');

        // 反应散热器
        registerOrgan(new Organ('mrqx_extra_pack:heat_vent')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.heat_vent.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.heat_vent.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.heat_vent.3" })])
            .addScore('defense', 0.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/nuclear/heat_vent')
            .tag('itemborders:gold')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_nuclear');

        // 反应热隔层
        registerOrgan(new Organ('mrqx_extra_pack:thermal_barrier')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.thermal_barrier.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.thermal_barrier.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.thermal_barrier.3" })])
            .addScore('defense', 0.5)
            .addScore('fire_resistant', 2)
            .build())
            .texture('mrqx_extra_pack:item/organs/nuclear/thermal_barrier')
            .tag('itemborders:gold')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_nuclear');

        // 反应热喷口
        registerOrgan(new Organ('mrqx_extra_pack:thermal_injector')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.thermal_injector.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.thermal_injector.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.thermal_injector.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.thermal_injector.4" })])
            .addScore('strength', 1)
            .addScore('breath_recovery', -3)
            .build())
            .texture('mrqx_extra_pack:item/organs/nuclear/thermal_injector')
            .tag('itemborders:gold')
            .tag('kubejs:damage')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_nuclear');

        // 反应舱室
        registerOrgan(new Organ('mrqx_extra_pack:reactor_chamber')
            .addScore('defense', 1)
            .addScore('nerves', -0.25)
            .addScore('filtration', 0.25)
            .addScore('detoxification', 0.25)
            .build())
            .texture('mrqx_extra_pack:item/organs/nuclear/reactor_chamber')
            .tag('itemborders:iron')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_nuclear');

        // 汽轮机
        registerOrgan(new Organ('mrqx_extra_pack:steam_turbine')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.steam_turbine.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.steam_turbine.2" })])
            .addScore('defense', 2)
            .addScore('endurance', 1)
            .addScore('fire_resistant', 2)
            .build())
            .texture('mrqx_extra_pack:item/organs/nuclear/steam_turbine')
            .tag('itemborders:iron')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_nuclear')
            .tag('kubejs:player_tick_only');

        // 核反应燃料
        event.create('mrqx_extra_pack:uranium').texture('mrqx_extra_pack:item/uranium')
        event.create('mrqx_extra_pack:raw_uranium').texture('mrqx_extra_pack:item/raw_uranium')
        event.create('mrqx_extra_pack:nuclear_fuel').texture('mrqx_extra_pack:item/nuclear_fuel').tag('kubejs:mrqx_nuclear')
    }

    // 黄金天秤
    registerOrgan(new Organ('mrqx_extra_pack:golden_libra')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.golden_libra.1" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.golden_libra.2" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.golden_libra.3" })])
        .addScore('defense', 1)
        .addScore('nerves', -1)
        .addScore('speed', -0.5)
        .build())
        .texture('mrqx_extra_pack:item/organs/golden_libra')
        .tag('itemborders:gold')
        .tag('kubejs:active_only');

    // 冒险者证章
    registerOrgan(new Organ('mrqx_extra_pack:adventurers_badge')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.1" })])
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.2" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.3" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.4" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.5" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.6" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.7" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.8" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.adventurers_badge.9" })])
        .addScore('strength', 2)
        .addScore('defense', 2)
        .build())
        .texture('mrqx_extra_pack:item/organs/adventurers_badge')
        .tag('itemborders:gold')
        .tag('kubejs:active_only')
        .tag('kubejs:loot_entity_only');

    {// 四魂
        // 荣耀之魂
        registerOrgan(new Organ('mrqx_extra_pack:proud_soul')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.proud_soul.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.proud_soul.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.proud_soul.3" })])
            .addScore('defense', -1)
            .addScore('nerves', 1)
            .addScore('speed', 2)
            .build())
            .texture('mrqx_extra_pack:item/organs/soul/proud_soul')
            .tag('itemborders:gold')
            .tag('kubejs:damage_only')
            .tag('kubejs:legends')
            .tag('kubejs:active_only');

        // 死狱之魂
        registerOrgan(new Organ('mrqx_extra_pack:prison_soul')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.prison_soul.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.prison_soul.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.prison_soul.3" })])
            .addScore('strength', 2)
            .addScore('nerves', -1)
            .addScore('defense', 2)
            .build())
            .texture('mrqx_extra_pack:item/organs/soul/prison_soul')
            .tag('itemborders:gold')
            .tag('kubejs:damage_only')
            .tag('kubejs:legends')
            .tag('kubejs:active_only');

        // 灵狐之魂
        registerOrgan(new Organ('mrqx_extra_pack:fox_soul')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.fox_soul.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.fox_soul.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.fox_soul.3" })])
            .addScore('defense', 1)
            .addScore('strength', -1)
            .addScore('speed', 1)
            .build())
            .texture('mrqx_extra_pack:item/organs/soul/fox_soul')
            .tag('itemborders:gold')
            .tag('kubejs:damage_only')
            .tag('kubejs:legends')
            .tag('kubejs:active_only');

        // 山月之魂
        registerOrgan(new Organ('mrqx_extra_pack:moon_soul')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.moon_soul.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.moon_soul.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.moon_soul.3" })])
            .addScore('strength', 1)
            .addScore('nerves', 2)
            .addScore('speed', -1)
            .build())
            .texture('mrqx_extra_pack:item/organs/soul/moon_soul')
            .tag('itemborders:gold')
            .tag('kubejs:damage_only')
            .tag('kubejs:player_tick_only')
            .tag('kubejs:legends')
            .tag('kubejs:active_only');
    }

    // 耀阳种子
    registerOrgan(new Organ('mrqx_extra_pack:sun_seed')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.sun_seed.1" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.sun_seed.2" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.sun_seed.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.sun_seed.4" })])
        .addScore('hydroallergenic', -3)
        .addScore('fire_resistant', 7.5)
        .build())
        .texture('mrqx_extra_pack:item/organs/sun_seed')
        .tag('itemborders:diamond')
        .tag('kubejs:player_tick_only')
        .tag('kubejs:legends')
        .tag('kubejs:active_only');

    // 暗日种子
    registerOrgan(new Organ('mrqx_extra_pack:dark_sun_seed')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.dark_sun_seed.1" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.dark_sun_seed.2" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.dark_sun_seed.3" })])
        .addScore('filtration', -2)
        .addScore('fire_resistant', 1.5)
        .build())
        .texture('mrqx_extra_pack:item/organs/dark_sun_seed')
        .tag('itemborders:diamond')
        .tag('kubejs:key_pressed')
        .tag('kubejs:legends')
        .tag('kubejs:active_only');

    // 噩梦醇
    registerOrgan(new Organ('mrqx_extra_pack:marenol')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.marenol.1" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.marenol.2" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.marenol.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.marenol.4" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.marenol.5" })])
        .addScore('health', -1)
        .build())
        .texture('mrqx_extra_pack:item/organs/marenol')
        .tag('itemborders:gold')
        .tag('kubejs:damage')
        .tag('kubejs:active');

    // 活化巨瘤
    registerOrgan(new Organ('mrqx_extra_pack:activated_giant_tumor')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.activated_giant_tumor.1" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.activated_giant_tumor.2" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.activated_giant_tumor.3" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.activated_giant_tumor.4" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.activated_giant_tumor.5" })])
        .addScore('health', -8)
        .build())
        .texture('mrqx_extra_pack:item/organs/activated_giant_tumor')
        .tag('itemborders:gold')
        .tag('kubejs:infected')
        .tag('kubejs:active');

    {// 处理器
        // 处理器
        registerOrgan(new Organ('mrqx_extra_pack:cpu')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.cpu.1" })])
            .addScore('nerves', 4)
            .build())
            .texture('mrqx_extra_pack:item/organs/cpu/cpu')
            .tag('itemborders:iron')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_cpu')
            .tag('kubejs:evolution');

        // 魔能速充处理器
        registerOrgan(new Organ('mrqx_extra_pack:magic_fast_charging_cpu')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.magic_fast_charging_cpu.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.magic_fast_charging_cpu.2" })])
            .addScore('nerves', 2)
            .build())
            .texture('mrqx_extra_pack:item/organs/cpu/magic_fast_charging_cpu')
            .tag('itemborders:gold')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_cpu')
            .tag('kubejs:magic')
            .tag('kubejs:active');

        // 魔能过载处理器
        registerOrgan(new Organ('mrqx_extra_pack:magic_overload_cpu')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.magic_overload_cpu.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.magic_overload_cpu.2" })])
            .addScore('nerves', 2)
            .build())
            .texture('mrqx_extra_pack:item/organs/cpu/magic_overload_cpu')
            .tag('itemborders:gold')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_cpu')
            .tag('kubejs:magic')
            .tag('kubejs:active');

        // 魔能“玻璃大炮”处理器
        registerOrgan(new Organ('mrqx_extra_pack:magic_glass_cannon_cpu')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.magic_glass_cannon_cpu.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.magic_glass_cannon_cpu.2" })])
            .addScore('nerves', 2)
            .build())
            .texture('mrqx_extra_pack:item/organs/cpu/magic_glass_cannon_cpu')
            .tag('itemborders:gold')
            .tag('kubejs:machine')
            .tag('kubejs:mrqx_cpu')
            .tag('kubejs:magic')
            .tag('kubejs:active');
    }
    // 风暴重锤
    registerOrgan(new Organ('mrqx_extra_pack:storm_mace')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.storm_mace.1" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.storm_mace.2" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.storm_mace.3" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.storm_mace.4" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.storm_mace.5" })])
        .addScore('strength', 2)
        .addScore('knockback_resistant', 2)
        .addScore('endurance', -3)
        .build())
        .texture('mrqx_extra_pack:item/organs/storm_mace')
        .tag('itemborders:gold')
        .tag('kubejs:damage');

    {// 反物质器官
        registerOrgan(new Organ('mrqx_extra_pack:lung_antimatter').addScore('breath_recovery', -6).addScore('breath_capacity', -6).addScore('endurance', -6).addScore('endurance', -6).addScore('water_breath', -1).addScore('forceful_spit', -1).addScore('dragon_breath', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/lung_antimatter').tag('itemborders:iron').tag('kubejs:lung').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:muscle_antimatter').addScore('strength', -6).addScore('speed', -6).addScore('swim_speed', -1).addScore('leaping', -1).addScore('launching', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/muscle_antimatter').tag('itemborders:iron').tag('kubejs:muscle').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:intestine_antimatter').addScore('nutrition', -6).addScore('rotgut', -1).addScore('herbivorous_nutrition', -1).addScore('carnivorous_nutrition', -1).addScore('crystalsynthesis', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/intestine_antimatter').tag('itemborders:iron').tag('kubejs:intestine').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:rib_antimatter').addScore('defense', -6).addScore('impact_resistant', -1).addScore('furnace_powered', -1).addScore('iron_repair', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/rib_antimatter').tag('itemborders:iron').tag('kubejs:rib').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:spine_antimatter').addScore('defense', -3).addScore('nerves', -6).addScore('withered', -1).addScore('ghastly', -1).addScore('pyromancy', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/spine_antimatter').tag('itemborders:iron').tag('kubejs:spine').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:spleen_antimatter').addScore('metabolism', -6).addScore('venomous', -1).addScore('silk', -1).addScore('buoyant', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/spleen_antimatter').tag('itemborders:iron').tag('kubejs:spleen').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:stomach_antimatter').addScore('digestion', -6).addScore('herbivorous_digestion', -1).addScore('carnivorous_digestion', -1).addScore('rot_digestion', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/stomach_antimatter').tag('itemborders:iron').tag('kubejs:stomach').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:kidney_antimatter').addScore('filtration', -6).addScore('buff_purging', -1).addScore('glowing', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/kidney_antimatter').tag('itemborders:iron').tag('kubejs:kidney').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:liver_antimatter').addScore('detoxification', -6).addScore('fire_resistant', -1).addScore('shulker_bullets', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/liver_antimatter').tag('itemborders:iron').tag('kubejs:liver').tag('kubejs:mrqx_antimatter');
        registerOrgan(new Organ('mrqx_extra_pack:appendix_antimatter').addScore('luck', -6).addScore('arrow_dodging', -1).addScore('dragon_bombs', -1).addScore('creepy', -1).addScore('explosive', -1).build()).texture('mrqx_extra_pack:item/organs/antimatter/appendix_antimatter').tag('itemborders:iron').tag('kubejs:appendix').tag('kubejs:mrqx_antimatter');

        // 反物质心脏
        registerOrgan(new Organ('mrqx_extra_pack:heart_antimatter')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.heart_antimatter.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.heart_antimatter.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.heart_antimatter.3" })])
            .addScore('health', -6)
            .addScore('photosynthesis', -1)
            .addScore('knockback_resistant', -1)
            .addScore('ease_of_access', -1)
            .build())
            .texture('mrqx_extra_pack:item/organs/antimatter/heart_antimatter')
            .tag('itemborders:iron')
            .tag('kubejs:heart')
            .tag('kubejs:mrqx_antimatter')
            .tag('kubejs:active');
    }

    // 梦魇之触
    registerOrgan(new Organ('mrqx_extra_pack:nightmare_tentacles')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.nightmare_tentacles.1" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.nightmare_tentacles.2" })])
        .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.nightmare_tentacles.3" })])
        .addScore('defense', -2)
        .addScore('nerves', -1.5)
        .build())
        .texture('mrqx_extra_pack:item/organs/nightmare_tentacles')
        .tag('itemborders:gold')
        .tag('kubejs:bear');

    {// 元素损伤单件
        // 激活·冰龙宝玉
        registerOrgan(new Organ('mrqx_extra_pack:active_ice_dragon_bead')
            .addScore('crystalsynthesis', 3)
            .addScore('knockback_resistant', 2)
            .addScore('endurance', 1)
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_ice_dragon_bead.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_ice_dragon_bead.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_ice_dragon_bead.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_ice_dragon_bead.4" })])
            .build())
            .texture('mrqx_extra_pack:item/organs/active_ice_dragon_bead')
            .tag('itemborders:diamond')
            .tag('kubejs:legends')
            .tag('kubejs:dragon')
            .tag('kubejs:mrqx_element_damage')
            .tag('kubejs:damage_only');

        // 激活·火龙宝玉
        registerOrgan(new Organ('mrqx_extra_pack:active_fire_dragon_bead')
            .addScore('crystalsynthesis', 3)
            .addScore('knockback_resistant', 2)
            .addScore('endurance', 1)
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_fire_dragon_bead.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_fire_dragon_bead.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_fire_dragon_bead.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_fire_dragon_bead.4" })])
            .build())
            .texture('mrqx_extra_pack:item/organs/active_fire_dragon_bead')
            .tag('itemborders:diamond')
            .tag('kubejs:legends')
            .tag('kubejs:dragon')
            .tag('kubejs:mrqx_element_damage')
            .tag('kubejs:damage_only');

        // 激活·电龙宝玉
        registerOrgan(new Organ('mrqx_extra_pack:active_lightning_dragon_bead')
            .addScore('crystalsynthesis', 3)
            .addScore('knockback_resistant', 2)
            .addScore('endurance', 1)
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_lightning_dragon_bead.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_lightning_dragon_bead.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_lightning_dragon_bead.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_lightning_dragon_bead.4" })])
            .build())
            .texture('mrqx_extra_pack:item/organs/active_lightning_dragon_bead')
            .tag('itemborders:diamond')
            .tag('kubejs:legends')
            .tag('kubejs:dragon')
            .tag('kubejs:mrqx_element_damage')
            .tag('kubejs:damage_only');

        // 激活·末影龙宝玉
        registerOrgan(new Organ('mrqx_extra_pack:active_ender_dragon_bead')
            .addScore('crystalsynthesis', 3)
            .addScore('knockback_resistant', 2)
            .addScore('endurance', 1)
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_ender_dragon_bead.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_ender_dragon_bead.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_ender_dragon_bead.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.active_ender_dragon_bead.4" })])
            .build())
            .texture('mrqx_extra_pack:item/organs/active_ender_dragon_bead')
            .tag('itemborders:diamond')
            .tag('kubejs:legends')
            .tag('kubejs:dragon')
            .tag('kubejs:mrqx_element_damage')
            .tag('kubejs:damage_only');

        // 风暴之星碎片
        registerOrgan(new Organ('mrqx_extra_pack:withered_nether_star_shard')
            .addScore('crystalsynthesis', 3)
            .addScore('knockback_resistant', 2)
            .addScore('endurance', 1)
            .addScore('withered', 5)
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.withered_nether_star_shard.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.withered_nether_star_shard.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.withered_nether_star_shard.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.withered_nether_star_shard.4" })])
            .build())
            .texture('mrqx_extra_pack:item/organs/withered_nether_star_shard')
            .tag('itemborders:diamond')
            .tag('kubejs:legends')
            .tag('kubejs:mrqx_element_damage')
            .tag('kubejs:damage_only');
    }

    // 压缩饼干
    registerOrgan(new Organ('mrqx_extra_pack:compressed_biscuit')
        .addScore('defense', 3)
        .addScore('speed', -0.5)
        .addScore('hydroallergenic', 0.5)
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.compressed_biscuit.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.compressed_biscuit.2" })])
        .build())
        .texture('mrqx_extra_pack:item/organs/compressed_biscuit')
        .food(food => { food.hunger(20).saturation(1) })
        .tag('itemborders:iron')
        .tag('kubejs:food')
        .tag('kubejs:eat_effect');

    // 黄金压缩饼干
    registerOrgan(new Organ('mrqx_extra_pack:golden_compressed_biscuit')
        .addScore('defense', 5)
        .addScore('speed', -1)
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.golden_compressed_biscuit.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.golden_compressed_biscuit.2" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.golden_compressed_biscuit.3" })])
        .build())
        .texture('mrqx_extra_pack:item/organs/golden_compressed_biscuit')
        .food(food => { food.hunger(50).saturation(2.5) })
        .tag('itemborders:gold')
        .tag('kubejs:food')
        .tag('kubejs:eat_effect')
        .tag('kubejs:eat_effect_only');

    // 恶性肿瘤
    registerOrgan(new Organ('mrqx_extra_pack:malignant_tumor')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.malignant_tumor.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.malignant_tumor.2" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.malignant_tumor.3" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.malignant_tumor.4" })])
        .build())
        .texture('mrqx_extra_pack:item/organs/malignant_tumor')
        .food(food => {
            food.hunger(1).saturation(0.5)
            food.effect('minecraft:poison', 20 * 30, 3, 1)
            food.effect('minecraft:hunger', 20 * 30, 3, 1)
            food.alwaysEdible()
        })
        .tag('itemborders:gold')
        .tag('kubejs:player_tick')
        .tag('kubejs:infected');

    {// 深海器官
        // “涌潮悲歌”心脏
        registerOrgan(new Organ('mrqx_extra_pack:heart_tidal_elegy')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.heart_tidal_elegy.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.heart_tidal_elegy.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.heart_tidal_elegy.3" })])
            .addScore('health', 3)
            .addScore('strength', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/heart_tidal_elegy')
            .tag('itemborders:diamond')
            .tag('kubejs:heart')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:active_only');

        // “潮涌，潮枯”肺脏
        registerOrgan(new Organ('mrqx_extra_pack:lung_the_tide_surges_the_tide_recedes')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.lung_the_tide_surges_the_tide_recedes.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.lung_the_tide_surges_the_tide_recedes.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.lung_the_tide_surges_the_tide_recedes.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.lung_the_tide_surges_the_tide_recedes.4" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.lung_the_tide_surges_the_tide_recedes.5" })])
            .addScore('breath_recovery', 1.5)
            .addScore('breath_capacity', 3)
            .addScore('endurance', 3)
            .addScore('water_breath', 3)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/lung_the_tide_surges_the_tide_recedes')
            .tag('itemborders:diamond')
            .tag('kubejs:lung')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:damage_only');

        // “镜花水月”肾
        registerOrgan(new Organ('mrqx_extra_pack:kidney_moon_in_the_water')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_moon_in_the_water.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_moon_in_the_water.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_moon_in_the_water.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_moon_in_the_water.4" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_moon_in_the_water.5" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_moon_in_the_water.6" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.kidney_moon_in_the_water.7" })])
            .addScore('filtration', 3)
            .addScore('endurance', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/kidney_moon_in_the_water')
            .tag('itemborders:diamond')
            .tag('kubejs:kidney')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:damage_only')
            .tag('kubejs:loot_entity_only');

        // “潮汐守望”肝
        registerOrgan(new Organ('mrqx_extra_pack:liver_tide_observation')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.liver_tide_observation.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.liver_tide_observation.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.liver_tide_observation.3" })])
            .addScore('detoxification', 3)
            .addScore('buff_purging', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/liver_tide_observation')
            .tag('itemborders:diamond')
            .tag('kubejs:liver')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:active_only');

        // “集群狩猎”胰
        registerOrgan(new Organ('mrqx_extra_pack:pancreas_group_hunting')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.pancreas_group_hunting.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.pancreas_group_hunting.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.pancreas_group_hunting.3" })])
            .addScore('endurance', 3)
            .addScore('strength', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/pancreas_group_hunting')
            .tag('itemborders:diamond')
            .tag('kubejs:pancreas')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:active_only');

        // “肉斩骨断”肌肉
        registerOrgan(new Organ('mrqx_extra_pack:muscle_bone_fracture')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_bone_fracture.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_bone_fracture.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_bone_fracture.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_bone_fracture.4" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_bone_fracture.5" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_bone_fracture.6" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_bone_fracture.7" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.muscle_bone_fracture.8" })])
            .addScore('strength', 3)
            .addScore('speed', 3)
            .addScore('swim_speed', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/muscle_bone_fracture')
            .tag('itemborders:diamond')
            .tag('kubejs:muscle')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:active')
            .tag('kubejs:player_tick')
            .tag('kubejs:bear_only');

        // “生存的重压”肋骨
        registerOrgan(new Organ('mrqx_extra_pack:rib_the_pressure_to_survive')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_the_pressure_to_survive.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_the_pressure_to_survive.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_the_pressure_to_survive.3" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_the_pressure_to_survive.4" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_the_pressure_to_survive.5" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_the_pressure_to_survive.6" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.rib_the_pressure_to_survive.7" })])
            .addScore('defense', 3)
            .addScore('impact_resistant', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/rib_the_pressure_to_survive')
            .tag('itemborders:diamond')
            .tag('kubejs:rib')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:active')
            .tag('kubejs:damage_only');

        // “本性的坚守”脾
        registerOrgan(new Organ('mrqx_extra_pack:spleen_adhering_to_nature')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.spleen_adhering_to_nature.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.spleen_adhering_to_nature.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.spleen_adhering_to_nature.3" })])
            .addScore('metabolism', 3)
            .addScore('health', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/spleen_adhering_to_nature')
            .tag('itemborders:diamond')
            .tag('kubejs:spleen')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:bear_only');

        // “深海掠食者”胃
        registerOrgan(new Organ('mrqx_extra_pack:stomach_abyssal_predator')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.stomach_abyssal_predator.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.stomach_abyssal_predator.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.stomach_abyssal_predator.3" })])
            .addScore('digestion', 3)
            .addScore('carnivorous_digestion', 1.5)
            .addScore('strength', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/stomach_abyssal_predator')
            .tag('itemborders:diamond')
            .tag('kubejs:stomach')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:damage_only');

        // “深海直觉”脊柱
        registerOrgan(new Organ('mrqx_extra_pack:spine_abyssal_intuition')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.spine_abyssal_intuition.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.spine_abyssal_intuition.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.spine_abyssal_intuition.3" })])
            .addScore('nerves', 3)
            .addScore('defense', 3)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/spine_abyssal_intuition')
            .tag('itemborders:diamond')
            .tag('kubejs:spine')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:active_only');

        // “弱肉强食”肠
        registerOrgan(new Organ('mrqx_extra_pack:intestine_survival_of_the_fittest')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.intestine_survival_of_the_fittest.1" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.intestine_survival_of_the_fittest.2" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.intestine_survival_of_the_fittest.3" })])
            .addScore('nutrition', 3)
            .addScore('herbivorous_nutrition', 3)
            .addScore('strength', 1.5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/intestine_survival_of_the_fittest')
            .tag('itemborders:diamond')
            .tag('kubejs:intestine')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:damage_only');

        // “变异”阑尾
        registerOrgan(new Organ('mrqx_extra_pack:appendix_assimilation_mutation')
            .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_assimilation_mutation.1" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_assimilation_mutation.2" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_assimilation_mutation.3" })])
            .addTextLines('ctrl', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_assimilation_mutation.4" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_assimilation_mutation.5" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_assimilation_mutation.6" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_assimilation_mutation.7" })])
            .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.appendix_assimilation_mutation.8" })])
            .addScore('luck', 3)
            .addScore('hydrophobia', -5)
            .build())
            .texture('mrqx_extra_pack:item/organs/seaborn/appendix_assimilation_mutation')
            .tag('itemborders:diamond')
            .tag('kubejs:appendix')
            .tag('kubejs:mrqx_seaborn')
            .tag('kubejs:damage_only')
            .tag('kubejs:active_only');
    }

    // 充能刀刃
    registerOrgan(new Organ('mrqx_extra_pack:charged_blade')
        .addTextLines('default', [Text.gray({ "translate": "mrqx_extra_pack.tooltips.charged_blade.1" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.charged_blade.2" })])
        .addTextLines('alt', [LEADING_SYMBOL, Text.gray({ "translate": "mrqx_extra_pack.tooltips.charged_blade.3" })])
        .addScore('strength', 3)
        .build())
        .texture('mrqx_extra_pack:item/organs/charged_blade')
        .tag('itemborders:diamond')
        .tag('kubejs:damage_only')
        .tag('kubejs:bear_only');

    // 便携式体检仪
    event.create('mrqx_extra_pack:portable_medical_checkup_device').texture('mrqx_extra_pack:item/portable_medical_checkup_device')
        .maxStackSize(1)
        .useAnimation('bow')
        .use((level, player, hand) => {
            return true;
        })
        .useDuration(itemStack => 20)
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            let ray = entity.rayTrace(4, true)
            let target = entity
            if (ray.entity && ray.entity.isLiving()) {
                target = ray.entity
            }
            target.getChestCavityInstance().getOrganScores().forEach((key, value) => {
                entity.tell([LEADING_SYMBOL, Text.yellow(global.SCORE_MAP[key]).hover(global.SCORE_HOVER_MAP[key]), Text.white(' : '), Text.white(value)])
            })
            entity.addItemCooldown(itemstack, 20 * 15)
            return itemstack;
        })

    // 肿瘤诱变剂
    event.create('mrqx_extra_pack:tumor_mutagen').texture('mrqx_extra_pack:item/tumor_mutagen')
        .maxStackSize(64)
        .useAnimation('drink')
        .use((level, player, hand) => {
            return true;
        })
        .useDuration(itemStack => 20)
        .food(food => {
            food.hunger(1).saturation(0.5)
            food.effect('minecraft:poison', 20 * 30, 3, 1)
            food.effect('minecraft:hunger', 20 * 30, 3, 1)
            food.alwaysEdible()
        })

    // 先进单片镜
    event.create('mrqx_extra_pack:advanced_eyeglass')
        .texture('mrqx_extra_pack:item/advanced_eyeglass')
        .maxStackSize(1)
        .tag('curios:head')
        .tag('itemborders:diamond')
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .onEquip((itemFrom, ctx, itemTo) => {
                if (ctx.entity().level.isClientSide()) return
                global.mrqxAdvancedArchivistEyeGlassOnEquip(itemFrom, ctx, itemTo)
            })
            .onUnequip((itemFrom, ctx, itemTo) => {
                if (ctx.entity().level.isClientSide()) return
                global.mrqxAdvancedArchivistEyeGlassOnUnequip(itemFrom, ctx, itemTo)
            })
            .curioTick((item, ctx) => {
                if (ctx.entity().level.isClientSide()) return
                global.mrqxAdvancedArchivistEyeGlassTick(item, ctx)
            }))

    // 散发着光亮的种子
    event.create('mrqx_extra_pack:shining_seed').texture('mrqx_extra_pack:item/shining_seed')

    // 风暴金属锭
    event.create('mrqx_extra_pack:storm_metal_ingot').texture('mrqx_extra_pack:item/storm_metal_ingot')

    // 未完成的物品
    event.create('mrqx_extra_pack:incomplete_storm_metal_ingot').texture('mrqx_extra_pack:item/storm_metal_ingot')
    event.create('mrqx_extra_pack:incomplete_fission_reactor').texture('mrqx_extra_pack:item/organs/nuclear/fission_reactor')
    event.create('mrqx_extra_pack:incomplete_nuclear_fuel').texture('mrqx_extra_pack:item/nuclear_fuel')
    event.create('mrqx_extra_pack:incomplete_compressed_biscuit').texture('mrqx_extra_pack:item/organs/compressed_biscuit')
    event.create('mrqx_extra_pack:incomplete_golden_compressed_biscuit').texture('mrqx_extra_pack:item/organs/golden_compressed_biscuit')
})