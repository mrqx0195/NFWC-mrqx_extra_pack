// priority: 100

const mrqxDivinePenAttriBute = {
    'mrqx_extra_pack:lung_paper': [
        'chestcavity:breath_recovery',
        'chestcavity:breath_capacity',
        'chestcavity:endurance',
        'chestcavity:water_breath',
        'chestcavity:forceful_spit',
        'chestcavity:dragon_breath',
    ],
    'mrqx_extra_pack:appendix_paper': [
        'chestcavity:luck',
        'chestcavity:arrow_dodging',
        'chestcavity:dragon_bombs',
        'chestcavity:creepy',
        'chestcavity:explosive',
    ],
    'mrqx_extra_pack:heart_paper': [
        'chestcavity:health',
        'chestcavity:photosynthesis',
        'chestcavity:knockback_resistant',
        'chestcavity:ease_of_access',
    ],
    'mrqx_extra_pack:intestine_paper': [
        'chestcavity:nutrition',
        'chestcavity:rotgut',
        'chestcavity:herbivorous_nutrition',
        'chestcavity:carnivorous_nutrition',
        'chestcavity:crystalsynthesis',
    ],
    'mrqx_extra_pack:kidney_paper': [
        'chestcavity:filtration',
        'chestcavity:buff_purging',
        'chestcavity:glowing',
    ],
    'mrqx_extra_pack:liver_paper': [
        'chestcavity:detoxification',
        'chestcavity:fire_resistant',
        'chestcavity:shulker_bullets',
    ],
    'mrqx_extra_pack:muscle_paper': [
        'chestcavity:strength',
        'chestcavity:speed',
        'chestcavity:swim_speed',
        'chestcavity:leaping',
        'chestcavity:launching',
    ],
    'mrqx_extra_pack:rib_paper': [
        'chestcavity:defense',
        'chestcavity:impact_resistant',
        'chestcavity:furnace_powered',
        'chestcavity:iron_repair',
    ],
    'mrqx_extra_pack:spine_paper': [
        'chestcavity:nerves',
        'chestcavity:withered',
        'chestcavity:ghastly',
        'chestcavity:pyromancy',
    ],
    'mrqx_extra_pack:spleen_paper': [
        'chestcavity:metabolism',
        'chestcavity:venomous',
        'chestcavity:silk',
        'chestcavity:buoyant',
    ],
    'mrqx_extra_pack:stomach_paper': [
        'chestcavity:digestion',
        'chestcavity:herbivorous_digestion',
        'chestcavity:carnivorous_digestion',
        'chestcavity:rot_digestion',
    ],
}

const mrqxDivinePenInkPower = {
    'irons_spellbooks:common_ink': 0,
    'irons_spellbooks:uncommon_ink': 5,
    'irons_spellbooks:rare_ink': 10,
    'irons_spellbooks:epic_ink': 20,
    'irons_spellbooks:legendary_ink': 30,
}

const mrqxDivinePenOrgan = {
    'mrqx_extra_pack:lung_paper': 'mrqx_extra_pack:lung_paper_written',
    'mrqx_extra_pack:appendix_paper': 'mrqx_extra_pack:appendix_paper_written',
    'mrqx_extra_pack:heart_paper': 'mrqx_extra_pack:heart_paper_written',
    'mrqx_extra_pack:intestine_paper': 'mrqx_extra_pack:intestine_paper_written',
    'mrqx_extra_pack:kidney_paper': 'mrqx_extra_pack:kidney_paper_written',
    'mrqx_extra_pack:liver_paper': 'mrqx_extra_pack:liver_paper_written',
    'mrqx_extra_pack:muscle_paper': 'mrqx_extra_pack:muscle_paper_written',
    'mrqx_extra_pack:rib_paper': 'mrqx_extra_pack:rib_paper_written',
    'mrqx_extra_pack:spine_paper': 'mrqx_extra_pack:spine_paper_written',
    'mrqx_extra_pack:spleen_paper': 'mrqx_extra_pack:spleen_paper_written',
    'mrqx_extra_pack:stomach_paper': 'mrqx_extra_pack:stomach_paper_written',
}

const mrqxElementDamageSource = {
    'ice': DamageSource.FREEZE,
    'fire': DamageSource.LAVA,
    'lighting': DamageSource.LIGHTNING_BOLT,
    'ender': DamageSource.DRAGON_BREATH,
    'wither': DamageSource.WITHER,
}

const mrqxElementDamageEffect = {
    'ice': ['minecraft:slowness', 'goety:snow_skin', 'goety:freezing'],
    'fire': ['goety:burn_hex', 'cataclysm:blazing_brand'],
    'lighting': ['cataclysm:stun', 'goety:spasms', 'goety:arrowmantic'],
    'ender': ['cataclysm:abyssal_burn', 'cataclysm:abyssal_fear', 'alexsmobs:ender_flu'],
    'wither': ['minecraft:wither', 'witherstormmod:wither_sickness', 'goety:wane'],
}

const mrqxOrganSuit = {
    'four_soul': [
        'mrqx_extra_pack:proud_soul',
        'mrqx_extra_pack:prison_soul',
        'mrqx_extra_pack:fox_soul',
        'mrqx_extra_pack:moon_soul'],
    'seaborn': [
        "mrqx_extra_pack:heart_tidal_elegy",
        "mrqx_extra_pack:lung_the_tide_surges_the_tide_recedes",
        "mrqx_extra_pack:kidney_moon_in_the_water",
        "mrqx_extra_pack:liver_tide_observation",
        "mrqx_extra_pack:pancreas_group_hunting",
        "mrqx_extra_pack:muscle_bone_fracture",
        "mrqx_extra_pack:rib_the_pressure_to_survive",
        "mrqx_extra_pack:spleen_adhering_to_nature",
        "mrqx_extra_pack:stomach_stomach_abyssal_predator",
        "mrqx_extra_pack:spine_abyssal_intuition",
        "mrqx_extra_pack:intestine_survival_of_the_fittest",
        "mrqx_extra_pack:appendix_mutation",
    ],
}