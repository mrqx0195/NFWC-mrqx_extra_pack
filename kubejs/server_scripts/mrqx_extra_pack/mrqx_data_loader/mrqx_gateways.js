// priority: 750

/**
 * @param {boolean} allow_discarding
 * @param {string} color
 * @param {number} completion_xp
 * @param {number} leash_range
 * @param {string} size
 * @param {number} spawn_range
 */
function mrqxGateway(allow_discarding, color, completion_xp, leash_range, size, spawn_range) {
    this.allow_discarding = allow_discarding
    this.color = color
    this.completion_xp = completion_xp
    this.leash_range = leash_range
    this.size = size
    this.spawn_range = spawn_range
    this.failures = []
    this.rewards = []
    this.waves = []
}

mrqxGateway.prototype = {
    /**
     * @param {Object} failure
     * @returns {mrqxGateway}
     */
    addFailure: function (failure) {
        this.failures.push(failure)
        return this
    },
    /**
     * @param {Object} reward
     * @returns {mrqxGateway}
     */
    addReward: function (reward) {
        this.rewards.push(reward)
        return this
    },
    /**
     * @param {mrqxWave} wave
     * @returns {mrqxGateway}
     */
    addWave: function (wave) {
        this.waves.push(wave)
        return this
    },
}

/**
 * @param {number} max_wave_time
 * @param {number} setup_time
 */
function mrqxWave(max_wave_time, setup_time) {
    this.max_wave_time = max_wave_time
    this.setup_time = setup_time
    this.entities = []
    this.modifiers = []
    this.rewards = []
}

mrqxWave.prototype = {
    /**
     * @param {Special.EntityType} entity
     * @param {string} nbt
     * @returns {mrqxWave}
     */
    addEntity: function (entity, nbt) {
        if (nbt) {
            this.entities.push({
                "entity": entity,
                "nbt": nbt
            })
        }
        else {
            this.entities.push({
                "entity": entity,
            })
        }
        return this
    },
    /**
     * @param {number} count
     * @param {Special.EntityType} entity
     * @param {string} nbt
     * @returns {mrqxWave}
     */
    addEntities: function (count, entity, nbt) {
        for (let i = 0; i < count; i++) {
            this.addEntity(entity, nbt)
        }
        return this
    },
    /**
     * @param {Special.Attribute} attribute
     * @param {"ADDITION" | "MULTIPLY_BASE" | "MULTIPLY_TOTAL"} operation
     * @param {number} value
     * @returns {mrqxWave}
     */
    addModifier: function (attribute, operation, value) {
        this.modifiers.push({
            "attribute": attribute,
            "operation": operation,
            "value": value,
        })
        return this
    },
    /**
     * @param {Object} reward
     * @returns {mrqxWave}
     */
    addRewards: function (reward) {
        this.rewards.push(reward)
        return this
    },
}

ServerEvents.highPriorityData(event => {
    function registerGateway(dataModel, id) {
        event.addJson(`mrqx_extra_pack:gateways/mrqx_${id}.json`, dataModel)
    }

    // 深蓝之树之影
    registerGateway(new mrqxGateway(true, '#0000FF', 50000, 128, "large", 8)
        .addFailure({
            "block_damage": true,
            "fire": false,
            "strength": 10,
            "type": "gateways:explosion"
        })
        .addReward({
            "desc": "深海器官",
            "loot_table": "mrqx_extra_pack:seaborn_organs",
            "rolls": 4,
            "type": "gateways:loot_table"
        })
        .addWave(new mrqxWave(6000, 200)
            .addEntities(10, 'alexsmobs:mantis_shrimp')
            .addEntities(10, 'alexsmobs:lobster')
            .addEntities(10, 'alexsmobs:mudskipper')
            .addEntities(10, 'alexsmobs:skelewag')
            .addEntities(10, 'cataclysm:lionfish')
            .addEntities(10, 'alexsmobs:seal')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_BASE', 10)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_BASE', 5)
        )
        .addWave(new mrqxWave(6000, 200)
            .addEntities(8, 'alexsmobs:crocodile')
            .addEntities(8, 'alexsmobs:alligator_snapping_turtle')
            .addEntities(8, 'alexsmobs:frilled_shark')
            .addEntities(8, 'alexsmobs:hammerhead_shark')
            .addEntities(8, 'alexsmobs:giant_squid')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_BASE', 16)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_BASE', 8)
            .addModifier('minecraft:generic.armor', 'ADDITION', 20)
        )
        .addWave(new mrqxWave(12000, 200)
            .addEntities(10, 'cataclysm:deepling')
            .addEntities(10, 'cataclysm:deepling_angler')
            .addEntities(6, 'cataclysm:deepling_brute')
            .addEntities(4, 'cataclysm:deepling_priest')
            .addEntities(4, 'cataclysm:deepling_warlock')
            .addEntities(2, 'somebosses:man_of_water')
            .addEntities(2, 'somebosses:prismarine_watcher')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_BASE', 24)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_BASE', 9)
            .addModifier('minecraft:generic.armor', 'ADDITION', 50)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.9)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_BASE', 2)
        )
        .addWave(new mrqxWave(72000, 400)
            .addEntity('cataclysm:the_leviathan', '{ActiveEffects:[{\"forge:id\":\"kubejs:glare_of_god\",Amplifier: 0,Duration: 42,ShowParticles: 0b}]}')
            .addEntities(8, 'cataclysm:the_baby_leviathan')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_BASE', 40)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_BASE', 24)
            .addModifier('minecraft:generic.armor', 'ADDITION', 150)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.8)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_BASE', 4)
            .addModifier('obscure_api:penetration', 'ADDITION', 70)
        ),
        'shadow_of_caerula_arbor'
    )

    // 机械狂潮
    registerGateway(new mrqxGateway(true, '#992222', 50000, 128, "large", 8)
        .addFailure({
            "block_damage": true,
            "fire": false,
            "strength": 10,
            "type": "gateways:explosion"
        })
        .addReward({
            "stack": {
                "item": "mrqx_extra_pack:seance_cpu"
            },
            "type": "gateways:stack"
        })
        .addReward({
            "stack": {
                "item": "mrqx_extra_pack:basic_uncoded_cpu",
                "count": 4
            },
            "type": "gateways:stack"
        })
        .addReward({
            "stack": {
                "item": "mrqx_extra_pack:advanced_uncoded_cpu",
                "count": 2
            },
            "type": "gateways:stack"
        })
        .addWave(new mrqxWave(6000, 200)
            .addEntities(4, 'irons_spellbooks:citadel_keeper')
            .addEntities(4, 'goety:hostile_redstone_golem')
            .addEntities(4, 'goety:squall_golem')
            .addEntities(4, 'cataclysm:the_watcher')
            .addEntities(4, 'minecraft:snow_golem')
            .addEntities(4, 'minecraft:iron_golem')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_BASE', 5)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_BASE', 5)
            .addModifier('minecraft:generic.armor', 'ADDITION', 20)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_BASE', 1.2)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.1)
        )
        .addWave(new mrqxWave(6000, 200)
            .addEntities(2, 'goety:redstone_monstrosity')
            .addEntities(2, 'cataclysm:the_prowler')
            .addEntities(2, 'cataclysm:ender_golem')
            .addEntities(2, 'cataclysm:coral_golem')
            .addEntities(2, 'cataclysm:coralssus')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_BASE', 20)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_BASE', 8)
            .addModifier('minecraft:generic.armor', 'ADDITION', 40)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_BASE', 2)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.2)
            .addModifier('minecraft:generic.knockback_resistance', 'ADDITION', 0.5)
            .addModifier('obscure_api:parry', 'ADDITION', 20)
        )
        .addWave(new mrqxWave(6000, 200)
            .addEntity('cataclysm:ender_guardian', '{ActiveEffects:[{\"forge:id\":\"kubejs:glare_of_god\",Amplifier: 0,Duration: 42,ShowParticles: 0b}]}')
            .addEntity('cataclysm:netherite_monstrosity', '{ActiveEffects:[{\"forge:id\":\"kubejs:glare_of_god\",Amplifier: 0,Duration: 42,ShowParticles: 0b}]}')
            .addEntity('cataclysm:the_harbinger', '{ActiveEffects:[{\"forge:id\":\"kubejs:glare_of_god\",Amplifier: 0,Duration: 42,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_BASE', 32)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_BASE', 16)
            .addModifier('minecraft:generic.armor', 'ADDITION', 128)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_BASE', 4)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.8)
            .addModifier('minecraft:generic.knockback_resistance', 'ADDITION', 1)
            .addModifier('obscure_api:parry', 'ADDITION', 32)
        ),
        'mechanical_frenzy'
    )

    // 神之惩戒
    registerGateway(new mrqxGateway(true, '#dddd22', 100000, 128, "large", 8)
        .addFailure({
            "block_damage": true,
            "fire": false,
            "strength": 10,
            "type": "gateways:explosion"
        })
        .addReward({
            "stack": {
                "item": "mrqx_extra_pack:sin_and_judgement"
            },
            "type": "gateways:stack"
        })
        .addWave(new mrqxWave(72000, 200)
            .addRewards({
                "stack": {
                    "item": "mrqx_extra_pack:sin_ira_samael"
                },
                "type": "gateways:stack"
            })
            .addEntity('cataclysm:netherite_monstrosity', '{KubeJSPersistentData:{champion:[\"smash\",\"fight_for_death\",\"mrqx_remote_defence\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('cataclysm:netherite_monstrosity', '{KubeJSPersistentData:{champion:[\"smash\",\"fight_for_death\",\"mrqx_remote_defence\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('cataclysm:netherite_monstrosity', '{KubeJSPersistentData:{champion:[\"smash\",\"fight_for_death\",\"mrqx_remote_defence\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 24)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 5)
            .addModifier('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 5)
            .addModifier('minecraft:generic.armor', 'MULTIPLY_TOTAL', 4.2)
            .addModifier('minecraft:generic.armor_toughness', 'ADDITION', 80)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.42)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_TOTAL', 4.2)
            .addModifier('obscure_api:penetration', 'ADDITION', 70)
        )
        .addWave(new mrqxWave(72000, 200)
            .addRewards({
                "stack": {
                    "item": "mrqx_extra_pack:sin_acedia_belphegor"
                },
                "type": "gateways:stack"
            })
            .addEntity('bosses_of_mass_destruction:obsidilith', '{KubeJSPersistentData:{champion:[\"fierce_battle\",\"mrqx_element_reflection\",\"low_frequency\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('bosses_of_mass_destruction:obsidilith', '{KubeJSPersistentData:{champion:[\"fierce_battle\",\"mrqx_element_reflection\",\"low_frequency\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('bosses_of_mass_destruction:obsidilith', '{KubeJSPersistentData:{champion:[\"fierce_battle\",\"mrqx_element_reflection\",\"low_frequency\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 36)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 4)
            .addModifier('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 2)
            .addModifier('minecraft:generic.armor', 'MULTIPLY_TOTAL', 5)
            .addModifier('minecraft:generic.armor_toughness', 'ADDITION', 100)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.6)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_TOTAL', 6)
            .addModifier('obscure_api:penetration', 'ADDITION', 40)
        )
        .addWave(new mrqxWave(72000, 200)
            .addRewards({
                "stack": {
                    "item": "mrqx_extra_pack:sin_invidia_leviathan"
                },
                "type": "gateways:stack"
            })
            .addEntity('cataclysm:ender_guardian', '{KubeJSPersistentData:{champion:[\"unbending\",\"grudge\",\"destruction\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('cataclysm:ender_guardian', '{KubeJSPersistentData:{champion:[\"unbending\",\"grudge\",\"destruction\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('cataclysm:ender_guardian', '{KubeJSPersistentData:{champion:[\"unbending\",\"grudge\",\"destruction\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 30)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 6)
            .addModifier('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 4)
            .addModifier('minecraft:generic.armor', 'MULTIPLY_TOTAL', 3)
            .addModifier('minecraft:generic.armor_toughness', 'ADDITION', 60)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.3)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_TOTAL', 3)
            .addModifier('obscure_api:penetration', 'ADDITION', 50)
        )
        .addWave(new mrqxWave(72000, 200)
            .addRewards({
                "stack": {
                    "item": "mrqx_extra_pack:sin_gula_beelzebub"
                },
                "type": "gateways:stack"
            })
            .addEntity('alexsmobs:void_worm', '{KubeJSPersistentData:{champion:[\"exhausted\",\"corrupt\",\"mrqx_proliferation\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('alexsmobs:void_worm', '{KubeJSPersistentData:{champion:[\"exhausted\",\"corrupt\",\"mrqx_proliferation\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('alexsmobs:void_worm', '{KubeJSPersistentData:{champion:[\"exhausted\",\"corrupt\",\"mrqx_proliferation\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 50)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 10)
            .addModifier('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 10)
            .addModifier('minecraft:generic.armor', 'MULTIPLY_TOTAL', 25)
            .addModifier('minecraft:generic.armor_toughness', 'ADDITION', 500)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.5)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_TOTAL', 5)
            .addModifier('minecraft:generic.flying_speed', 'MULTIPLY_TOTAL', 7)
            .addModifier('obscure_api:penetration', 'ADDITION', 80)
        )
        .addWave(new mrqxWave(72000, 200)
            .addRewards({
                "stack": {
                    "item": "mrqx_extra_pack:sin_avaritia_mammon"
                },
                "type": "gateways:stack"
            })
            .addEntity('meetyourfight:bellringer', '{KubeJSPersistentData:{champion:[\"mrqx_undying\",\"mrqx_marksman\",\"mrqx_remote_defence\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('meetyourfight:bellringer', '{KubeJSPersistentData:{champion:[\"mrqx_undying\",\"mrqx_marksman\",\"mrqx_remote_defence\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('meetyourfight:bellringer', '{KubeJSPersistentData:{champion:[\"mrqx_undying\",\"mrqx_marksman\",\"mrqx_remote_defence\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 50)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 10)
            .addModifier('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 10)
            .addModifier('minecraft:generic.armor', 'MULTIPLY_TOTAL', 25)
            .addModifier('minecraft:generic.armor_toughness', 'ADDITION', 500)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.5)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_TOTAL', 7)
            .addModifier('minecraft:generic.flying_speed', 'MULTIPLY_TOTAL', 7)
            .addModifier('obscure_api:penetration', 'ADDITION', 80)
        )
        .addWave(new mrqxWave(72000, 200)
            .addRewards({
                "stack": {
                    "item": "mrqx_extra_pack:sin_luxuria_asmodeus"
                },
                "type": "gateways:stack"
            })
            .addEntity('twilightforest:snow_queen', '{KubeJSPersistentData:{champion:[\"purify\",\"mrqx_element_attack\",\"mrqx_curse\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('twilightforest:snow_queen', '{KubeJSPersistentData:{champion:[\"purify\",\"mrqx_element_attack\",\"mrqx_curse\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('twilightforest:snow_queen', '{KubeJSPersistentData:{champion:[\"purify\",\"mrqx_element_attack\",\"mrqx_curse\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 25)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 12)
            .addModifier('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 15)
            .addModifier('minecraft:generic.armor', 'MULTIPLY_TOTAL', 20)
            .addModifier('minecraft:generic.armor_toughness', 'ADDITION', 400)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.8)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_TOTAL', 10)
            .addModifier('minecraft:generic.flying_speed', 'MULTIPLY_TOTAL', 10)
            .addModifier('obscure_api:penetration', 'ADDITION', 100)
        )
        .addWave(new mrqxWave(72000, 200)
            .addRewards({
                "stack": {
                    "item": "mrqx_extra_pack:sin_superbia_lucifer"
                },
                "type": "gateways:stack"
            })
            .addEntity('cataclysm:ignis', '{KubeJSPersistentData:{champion:[\"fight_for_death\",\"awed\",\"mrqx_fracture_defend\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('cataclysm:ignis', '{KubeJSPersistentData:{champion:[\"fight_for_death\",\"awed\",\"mrqx_fracture_defend\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('cataclysm:ignis', '{KubeJSPersistentData:{champion:[\"fight_for_death\",\"awed\",\"mrqx_fracture_defend\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 40)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 10)
            .addModifier('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 10)
            .addModifier('minecraft:generic.armor', 'MULTIPLY_TOTAL', 50)
            .addModifier('minecraft:generic.armor_toughness', 'ADDITION', 1000)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.99)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_TOTAL', 8)
            .addModifier('obscure_api:penetration', 'ADDITION', 90)
        )
        .addWave(new mrqxWave(72000, 200)
            .addRewards({
                "stack": {
                    "item": "mrqx_extra_pack:origin_sin"
                },
                "type": "gateways:stack"
            })
            .addEntity('goety:apostle', '{secondPhase:1b,KubeJSPersistentData:{champion:[\"mrqx_origin\",\"parry\",\"fate\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 2,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('goety:apostle', '{secondPhase:1b,KubeJSPersistentData:{champion:[\"mrqx_origin\",\"consecration\",\"parry\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 2,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('goety:apostle', '{secondPhase:1b,KubeJSPersistentData:{champion:[\"mrqx_origin\",\"consecration\",\"fate\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 2,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('goety:apostle', '{secondPhase:1b,KubeJSPersistentData:{champion:[\"mrqx_origin\",\"parry\",\"unbending\",\"grue\",\"awed\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b},{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('goety:apostle', '{secondPhase:1b,KubeJSPersistentData:{champion:[\"mrqx_origin\",\"consecration\",\"unbending\",\"corrupt\",\"destruction\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b},{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('goety:apostle', '{secondPhase:1b,KubeJSPersistentData:{champion:[\"mrqx_origin\",\"fate\",\"unbending\",\"grudge\",\"low_frequency\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b},{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addEntity('goety:apostle', '{secondPhase:1b,KubeJSPersistentData:{champion:[\"mrqx_origin\",\"mrqx_curse\",\"mrqx_undying\",\"low_frequency\",\"mrqx_reflection\",\"mrqx_element_attack\",\"mrqx_element_reflection\"]},ActiveEffects:[{\"forge:id\":\"kubejs:pardon_of_god_projectile\",Amplifier: 0,Duration: 2147483600,ShowParticles: 0b},{\"forge:id\":\"kubejs:pardon_of_god_magic\",Amplifier: 0,Duration: 2147483600,ShowParticles: 0b},{\"forge:id\":\"kubejs:pardon_of_god_melee\",Amplifier: 1,Duration: 2147483600,ShowParticles: 0b}]}')
            .addModifier('minecraft:generic.max_health', 'MULTIPLY_TOTAL', 50)
            .addModifier('minecraft:generic.attack_damage', 'MULTIPLY_TOTAL', 20)
            .addModifier('minecraft:generic.attack_speed', 'MULTIPLY_TOTAL', 20)
            .addModifier('minecraft:generic.armor', 'MULTIPLY_TOTAL', 100)
            .addModifier('minecraft:generic.armor_toughness', 'ADDITION', 2000)
            .addModifier('irons_spellbooks:spell_resist', 'ADDITION', 0.8)
            .addModifier('minecraft:generic.movement_speed', 'MULTIPLY_TOTAL', 10)
            .addModifier('obscure_api:penetration', 'ADDITION', 100)
        ),
        'god_judgement'
    )
})