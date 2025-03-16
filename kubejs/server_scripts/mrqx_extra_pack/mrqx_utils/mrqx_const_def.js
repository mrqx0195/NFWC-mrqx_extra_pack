// priority: 950

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

const mrqxElementDamageTypes = [
    'ice',
    'fire',
    'lighting',
    'ender',
    'wither',
]

const mrqxElementDamageSource = {
    'ice': DamageSource.FREEZE,
    'fire': DamageSource.LAVA,
    'lighting': DamageSource.LIGHTNING_BOLT,
    'ender': DamageSource.DRAGON_BREATH,
    'wither': DamageSource.WITHER,
}

const mrqxElementDamageEffect = {
    'ice': ['minecraft:slowness', 'goety:snow_skin', 'goety:freezing', 'kubejs:cold_down'],
    'fire': ['goety:burn_hex', 'cataclysm:blazing_brand', 'goety:flammable', 'kubejs:heat_up'],
    'lighting': ['cataclysm:stun', 'goety:spasms', 'goety:arrowmantic'],
    'ender': ['cataclysm:abyssal_burn', 'cataclysm:abyssal_fear', 'goety:doom'],
    'wither': ['minecraft:wither', 'witherstormmod:wither_sickness', 'goety:wane'],
}

/**
 * @type {Object<string, Special.Advancement[]>}
 */
const mrqxAdvancementsCheck = {
    'mystery_flesh_and_blood': ['biomancy:biomancy/bio_forge', 'biomancy:biomancy/bio_injector', 'biomancy:biomancy/bio_lab', 'biomancy:biomancy/cat_killer', 'biomancy:biomancy/cooked_meat_sacrifice', 'biomancy:biomancy/cradle', 'biomancy:biomancy/decomposer', 'biomancy:biomancy/digester', 'biomancy:biomancy/exotic_compounds', 'biomancy:biomancy/flesh', 'biomancy:biomancy/genetic_compounds', 'biomancy:biomancy/greedy_butcher', 'biomancy:biomancy/healing_activator_sacrifice', 'biomancy:biomancy/organic_compounds', 'biomancy:biomancy/poacher', 'biomancy:biomancy/predator_killer', 'biomancy:biomancy/raw_meat_sacrifice', 'biomancy:biomancy/root'],
    'mystery_soul': ['alexsmobs:alexsmobs/ghostly_pickaxe', 'iceandfire:iceandfire/kill_ghost', 'alexsmobs:alexsmobs/soul_heart', 'alexsmobs:alexsmobs/soul_vulture', 'cataclysm:find_soul_black_smith', 'tetra:spelunking/devils_soul_gem'],
    'mystery_machine': ["create:andesite_alloy", "create:andesite_casing", "create:anvil_plough", "create:arm_blaze_burner", "create:arm_many_targets", "create:backtank", "create:belt", "create:belt_funnel_kiss", "create:brass", "create:brass_casing", "create:burner", "create:cart_pickup", "create:chained_drain", "create:chocolate_bucket", "create:chute", "create:clockwork_bearing", "create:compacting", "create:conductor", "create:contraption_actors", "create:copper", "create:copper_casing", "create:crafter_lazy_000", "create:cross_streams", "create:crusher_maxed_0000", "create:crushing_wheel", "create:cuckoo_clock", "create:deployer", "create:display_board_0", "create:display_link", "create:diving_suit", "create:diving_suit_lava", "create:drain", "create:ejector_maxed", "create:encased_fan", "create:extendo_grip", "create:extendo_grip_dual", "create:fan_processing", "create:fist_bump", "create:foods", "create:funnel", "create:glass_pipe", "create:hand_crank_000", "create:haunted_bell", "create:honey_drain", "create:hose_pulley", "create:hose_pulley_lava", "create:lava_wheel_00000", "create:linked_controller", "create:long_train", "create:long_travel", "create:mechanical_arm", "create:mechanical_crafter", "create:mechanical_mixer", "create:mechanical_press", "create:mechanical_pump_0", "create:millstone", "create:musical_arm", "create:pipe_organ", "create:portable_storage_interface", "create:potato_cannon", "create:potato_cannon_collide", "create:precision_mechanism", "create:pulley_maxed", "create:red_signal", "create:root", "create:rose_quartz", "create:saw_processing", "create:self_deploying", "create:shifting_gears", "create:speed_controller", "create:spout", "create:steam_engine", "create:steam_engine_maxed", "create:steam_whistle", "create:stressometer", "create:stressometer_maxed", "create:sturdy_sheet", "create:super_glue", "create:track_0", "create:track_crafting_factory", "create:track_signal", "create:train", "create:train_casing_00", "create:train_crash", "create:train_crash_backwards", "create:train_portal", "create:train_roadkill", "create:train_whistle", "create:water_supply", "create:water_wheel", "create:windmill", "create:windmill_maxed", "create:wrench_goggles"],
    'mystery_magic': ["goety:goety/become_lich", "goety:goety/craft_all_focus", "goety:goety/craft_all_robes", "goety:goety/craft_animation_core", "goety:goety/craft_arca", "goety:goety/craft_barricade_focus", "goety:goety/craft_biting_focus", "goety:goety/craft_command_focus", "goety:goety/craft_cursed_ingot", "goety:goety/craft_dark_altar", "goety:goety/craft_dark_ingot", "goety:goety/craft_dark_robe", "goety:goety/craft_dark_scythe", "goety:goety/craft_dark_wand", "goety:goety/craft_death_scythe", "goety:goety/craft_empty_focus", "goety:goety/craft_fire_breath_focus", "goety:goety/craft_fireball_focus", "goety:goety/craft_frost_breath_focus", "goety:goety/craft_frost_robe", "goety:goety/craft_grave_gloves", "goety:goety/craft_iceology_focus", "goety:goety/craft_illusion_robe", "goety:goety/craft_infuser", "goety:goety/craft_lightning_focus", "goety:goety/craft_magic_emerald", "goety:goety/craft_necro_brazier", "goety:goety/craft_necro_set", "goety:goety/craft_overgrowth_focus", "goety:goety/craft_philosophers_mace", "goety:goety/craft_pulverize_focus", "goety:goety/craft_resonance_crystal", "goety:goety/craft_ring_of_force", "goety:goety/craft_ring_of_the_dragon", "goety:goety/craft_ring_of_want", "goety:goety/craft_sculk_converter", "goety:goety/craft_sculk_grower", "goety:goety/craft_shocking_focus", "goety:goety/craft_sonic_boom_focus", "goety:goety/craft_star_amulet", "goety:goety/craft_storm_robe", "goety:goety/craft_telekinesis_focus", "goety:goety/craft_totem", "goety:goety/craft_totem_roots", "goety:goety/craft_tunnel_focus", "goety:goety/craft_vexing_focus", "goety:goety/craft_wild_robe", "goety:goety/craft_wind_robe", "goety:goety/craft_witch_hat", "goety:goety/craft_witch_robe", "goety:goety/find_crypt", "goety:goety/gain_fragment", "goety:goety/gain_night_beacon", "goety:goety/get_arca", "goety:goety/get_crying_obsidian", "goety:goety/get_hammer", "goety:goety/get_ruby", "goety:goety/get_sculk_catalyst", "goety:goety/get_stormlander", "goety:goety/get_totem", "goety:goety/kill_a_apostle", "goety:goety/kill_a_cairn_necromancer", "goety:goety/kill_a_crone", "goety:goety/kill_a_envioker", "goety:goety/kill_a_evoker", "goety:goety/kill_a_haunted_armor", "goety:goety/kill_a_minister", "goety:goety/kill_a_skull_lord", "goety:goety/kill_a_vizier", "goety:goety/kill_a_warlock", "goety:goety/kill_a_wraith", "goety:goety/kill_hunting_illagers", "goety:goety/read_floral_scroll", "goety:goety/read_forbidden_scroll", "goety:goety/read_front_scroll", "goety:goety/read_haunting_scroll", "goety:goety/read_mistral_scroll", "goety:goety/read_ravaging_scroll", "goety:goety/read_terminus_scroll", "goety:goety/read_warred_and_haunting_scroll", "goety:goety/read_warred_scroll", "goety:goety/respawn_miniboss", "goety:goety/root", "goety:goety/servant_kill_apostle", "goety:goety/servant_kill_mob", "goety:goety/summon_apostle", "goety:goety/summon_golems", "goety:goety/summon_grave_golem", "goety:goety/summon_leapleaf", "goety:goety/summon_redstone_golem", "goety:goety/summon_redstone_monstrosity", "goety:goety/summon_skeleton", "goety:goety/summon_slime", "goety:goety/summon_squall_golem", "goety:goety/summon_whisperer", "goety:goety/summon_wraith", "goety:goety/summon_zombie", "goety:goety/unlock_necromancer", "irons_spellbooks:grant_patchouli", "irons_spellbooks:irons_spellbooks/enter_catacombs", "irons_spellbooks:irons_spellbooks/ink_legendary", "irons_spellbooks:irons_spellbooks/ink_root", "irons_spellbooks:irons_spellbooks/make_arcane_anvil", "irons_spellbooks:irons_spellbooks/make_inscription_table", "irons_spellbooks:irons_spellbooks/make_scroll_forge", "irons_spellbooks:irons_spellbooks/make_wayward_compass", "irons_spellbooks:irons_spellbooks/root", "irons_spellbooks:irons_spellbooks/spell_book_blaze", "irons_spellbooks:irons_spellbooks/spell_book_dead_king", "irons_spellbooks:irons_spellbooks/spell_book_diamond", "irons_spellbooks:irons_spellbooks/spell_book_dragon", "irons_spellbooks:irons_spellbooks/spell_book_druidic", "irons_spellbooks:irons_spellbooks/spell_book_equip", "irons_spellbooks:irons_spellbooks/spell_book_evoker", "irons_spellbooks:irons_spellbooks/spell_book_gold", "irons_spellbooks:irons_spellbooks/spell_book_iron", "irons_spellbooks:irons_spellbooks/spell_book_netherite", "irons_spellbooks:irons_spellbooks/spell_book_rotten", "irons_spellbooks:irons_spellbooks/spell_book_villager", "irons_spellbooks:irons_spellbooks/staff_artificer", "irons_spellbooks:irons_spellbooks/staff_blood_staff", "irons_spellbooks:irons_spellbooks/staff_ice", "irons_spellbooks:irons_spellbooks/staff_root", "irons_spellbooks:make_inscription_table", "majobroom:root"],
    'mystery_craftsmanship': ["art_of_forging:materials/endsteel_ingot", "art_of_forging:materials/find_all_demonic_items", "art_of_forging:materials/find_demonic_item", "art_of_forging:materials/forged_ingot", "art_of_forging:materials/root", "art_of_forging:materials/sigil_of_eden", "art_of_forging:materials/vobrite_crystal", "art_of_forging:materials/vobrivium_ingot", "tetra:art_of_forging/architects_crucible", "tetra:art_of_forging/crucible_upgrade", "tetra:art_of_forging/dreadnought_upgrade", "tetra:art_of_forging/echo_fuller", "tetra:art_of_forging/eerie_fuller", "tetra:art_of_forging/euclidean_dagger_upgrade", "tetra:art_of_forging/flamberge_upgrade", "tetra:art_of_forging/katana_upgrade", "tetra:art_of_forging/murasama_blade", "tetra:art_of_forging/rapier_upgrade", "tetra:art_of_forging/remembrance_upgrade", "tetra:art_of_forging/rending_scissor_complete_upgrade", "tetra:art_of_forging/rending_scissor_purple_upgrade", "tetra:art_of_forging/rending_scissor_red_upgrade", "tetra:art_of_forging/root", "tetra:art_of_forging/tomahawk_upgrade", "tetra:scrolls/find_scroll_compound_string", "tetra:scrolls/find_scroll_dreadnought_stave", "tetra:scrolls/find_scroll_halberd", "tetra:scrolls/find_scroll_key_guard", "tetra:scrolls/find_scroll_mace", "tetra:scrolls/find_scroll_tonal_blade", "tetra:scrolls/get_scroll_architects_crucible", "tetra:scrolls/get_scroll_crucible", "tetra:scrolls/get_scroll_flamberge", "tetra:scrolls/get_scroll_katana", "tetra:scrolls/get_scroll_murasama", "tetra:scrolls/get_scroll_quarry_hammer", "tetra:scrolls/get_scroll_rending_scissors", "tetra:scrolls/root", "tetra:spelunking/ancient_ruins", "tetra:spelunking/chthonic_automation", "tetra:spelunking/chthonic_cooldown", "tetra:spelunking/chthonic_crossbow", "tetra:spelunking/chthonic_extractor", "tetra:spelunking/chthonic_hammer", "tetra:spelunking/chthonic_module", "tetra:spelunking/containers", "tetra:spelunking/craft_architects_mark", "tetra:spelunking/craft_shockwave_chamber", "tetra:spelunking/devils_soul_gem", "tetra:spelunking/earthpiercer", "tetra:spelunking/eerie_shard", "tetra:spelunking/find_bolt", "tetra:spelunking/find_canister", "tetra:spelunking/find_cell", "tetra:spelunking/find_codex", "tetra:spelunking/find_latch", "tetra:spelunking/find_nano_insectoid", "tetra:spelunking/find_planar", "tetra:spelunking/find_ruins_map", "tetra:spelunking/find_scroll", "tetra:spelunking/find_scroll_efficiency", "tetra:spelunking/find_scroll_expertise", "tetra:spelunking/find_scroll_gild", "tetra:spelunking/find_scroll_howling", "tetra:spelunking/find_scroll_sturdy", "tetra:spelunking/find_scroll_throwing", "tetra:spelunking/find_scroll_warforge", "tetra:spelunking/geode", "tetra:spelunking/geode_open", "tetra:spelunking/hammer_craft", "tetra:spelunking/hammer_fix", "tetra:spelunking/hammer_jam", "tetra:spelunking/hammer_power", "tetra:spelunking/hammer_remove", "tetra:spelunking/hammer_unjam", "tetra:spelunking/loot_ruins", "tetra:spelunking/percussion_scanner", "tetra:spelunking/pristine_socket", "tetra:spelunking/refill_cell", "tetra:spelunking/root", "tetra:spelunking/schematic_complete", "tetra:spelunking/schematic_empower", "tetra:spelunking/schematic_pry", "tetra:spelunking/schematic_shatter", "tetra:spelunking/shockwave_hammer", "tetra:spelunking/stonecutter", "tetra:spelunking/stonecutter_enchant", "tetra:spelunking/suspend_belt", "tetra:spelunking/suspend_bow", "tetra:spelunking/sweeper", "tetra:spelunking/use_bolt", "tetra:story/more_upgrades", "tetra:upgrades/bastard_upgrade", "tetra:upgrades/bow_upgrade", "tetra:upgrades/double_headed", "tetra:upgrades/executioner_upgrade", "tetra:upgrades/hammer_2", "tetra:upgrades/hammer_3", "tetra:upgrades/hammer_4", "tetra:upgrades/hammer_5", "tetra:upgrades/hammer_6", "tetra:upgrades/place_holosphere", "tetra:upgrades/rack", "tetra:upgrades/repairs", "tetra:upgrades/root", "tetra:upgrades/shield_upgrade", "tetra:upgrades/sword_hone", "tetra:upgrades/sword_hone_peak", "tetra:upgrades/sword_improvement_hone", "tetra:upgrades/sword_integrity", "tetra:upgrades/sword_upgrade", "tetra:upgrades/tool_upgrade", "tetra:upgrades/toolbelt", "tetra:upgrades/toolbelt_upgraded", "tetra:upgrades/workbench"],
    'mystery_scholar': ["goety:goety/read_floral_scroll", "goety:goety/read_forbidden_scroll", "goety:goety/read_front_scroll", "goety:goety/read_haunting_scroll", "goety:goety/read_mistral_scroll", "goety:goety/read_ravaging_scroll", "goety:goety/read_terminus_scroll", "goety:goety/read_warred_and_haunting_scroll", "goety:goety/read_warred_scroll", "irons_spellbooks:grant_patchouli", "irons_spellbooks:irons_spellbooks/spell_book_blaze", "irons_spellbooks:irons_spellbooks/spell_book_dead_king", "irons_spellbooks:irons_spellbooks/spell_book_diamond", "irons_spellbooks:irons_spellbooks/spell_book_dragon", "irons_spellbooks:irons_spellbooks/spell_book_druidic", "irons_spellbooks:irons_spellbooks/spell_book_equip", "irons_spellbooks:irons_spellbooks/spell_book_evoker", "irons_spellbooks:irons_spellbooks/spell_book_gold", "irons_spellbooks:irons_spellbooks/spell_book_iron", "irons_spellbooks:irons_spellbooks/spell_book_netherite", "irons_spellbooks:irons_spellbooks/spell_book_rotten", "irons_spellbooks:irons_spellbooks/spell_book_villager", "tetra:scrolls/find_scroll_compound_string", "tetra:scrolls/find_scroll_dreadnought_stave", "tetra:scrolls/find_scroll_halberd", "tetra:scrolls/find_scroll_key_guard", "tetra:scrolls/find_scroll_mace", "tetra:scrolls/find_scroll_tonal_blade", "tetra:scrolls/get_scroll_architects_crucible", "tetra:scrolls/get_scroll_crucible", "tetra:scrolls/get_scroll_flamberge", "tetra:scrolls/get_scroll_katana", "tetra:scrolls/get_scroll_murasama", "tetra:scrolls/get_scroll_quarry_hammer", "tetra:scrolls/get_scroll_rending_scissors", "tetra:scrolls/root", "tetra:spelunking/find_scroll", "tetra:spelunking/find_scroll_efficiency", "tetra:spelunking/find_scroll_expertise", "tetra:spelunking/find_scroll_gild", "tetra:spelunking/find_scroll_howling", "tetra:spelunking/find_scroll_sturdy", "tetra:spelunking/find_scroll_throwing", "tetra:spelunking/find_scroll_warforge",],
    'mystery_nature': ["alexsmobs:alexsmobs/acacia_blossom", "alexsmobs:alexsmobs/alligator_snapping_turtle", "alexsmobs:alexsmobs/bald_eagle_challenge", "alexsmobs:alexsmobs/banana", "alexsmobs:alexsmobs/banana_slug", "alexsmobs:alexsmobs/bison_spyglass", "alexsmobs:alexsmobs/blood_sprayer", "alexsmobs:alexsmobs/breed_anteater", "alexsmobs:alexsmobs/breed_crocodile", "alexsmobs:alexsmobs/breed_froststalker", "alexsmobs:alexsmobs/breed_hummingbird", "alexsmobs:alexsmobs/capsid", "alexsmobs:alexsmobs/cosmic_cod", "alexsmobs:alexsmobs/crimson_mosquito", "alexsmobs:alexsmobs/crimson_mosquito_larva", "alexsmobs:alexsmobs/crimson_mosquito_sick", "alexsmobs:alexsmobs/crocodile", "alexsmobs:alexsmobs/crocodile_chestplate", "alexsmobs:alexsmobs/devils_hole_pupfish_bucket", "alexsmobs:alexsmobs/dimensional_carver", "alexsmobs:alexsmobs/echolocator", "alexsmobs:alexsmobs/elephant_swag", "alexsmobs:alexsmobs/emu", "alexsmobs:alexsmobs/emu_dodge", "alexsmobs:alexsmobs/ender_flu", "alexsmobs:alexsmobs/enderiophage", "alexsmobs:alexsmobs/enderiophage_rocket", "alexsmobs:alexsmobs/endolocator", "alexsmobs:alexsmobs/falconry_glove", "alexsmobs:alexsmobs/falconry_hood", "alexsmobs:alexsmobs/farseer", "alexsmobs:alexsmobs/fish_bones", "alexsmobs:alexsmobs/froststalker_helmet", "alexsmobs:alexsmobs/froststalker_kill", "alexsmobs:alexsmobs/ghostly_pickaxe", "alexsmobs:alexsmobs/gongylidia", "alexsmobs:alexsmobs/grizzly_bear", "alexsmobs:alexsmobs/guster", "alexsmobs:alexsmobs/gustmaker", "alexsmobs:alexsmobs/hemolymph_blaster", "alexsmobs:alexsmobs/hummingbird_feeder", "alexsmobs:alexsmobs/kangaroo", "alexsmobs:alexsmobs/la_cucaracha", "alexsmobs:alexsmobs/laviathan_four_passengers", "alexsmobs:alexsmobs/laviathan_spyglass", "alexsmobs:alexsmobs/leafcutter_ant_pupa", "alexsmobs:alexsmobs/lost_tentacle", "alexsmobs:alexsmobs/maned_wolf_apple", "alexsmobs:alexsmobs/mantis_shrimp_bucket", "alexsmobs:alexsmobs/maraca", "alexsmobs:alexsmobs/murmur", "alexsmobs:alexsmobs/mysterious_worm", "alexsmobs:alexsmobs/novelty_hat", "alexsmobs:alexsmobs/orcas_might", "alexsmobs:alexsmobs/pocket_sand", "alexsmobs:alexsmobs/rainbow_glass", "alexsmobs:alexsmobs/rainbow_jelly", "alexsmobs:alexsmobs/rattlesnake", "alexsmobs:alexsmobs/rocky_chestplate", "alexsmobs:alexsmobs/rocky_roller", "alexsmobs:alexsmobs/rocky_shell", "alexsmobs:alexsmobs/root", "alexsmobs:alexsmobs/save_cachalot_whale", "alexsmobs:alexsmobs/sculk_boomer", "alexsmobs:alexsmobs/seagull_steal", "alexsmobs:alexsmobs/shattered_dimensional_carver", "alexsmobs:alexsmobs/skelewag", "alexsmobs:alexsmobs/skelewag_skull", "alexsmobs:alexsmobs/skreecher", "alexsmobs:alexsmobs/skunk", "alexsmobs:alexsmobs/sopa_de_macaco", "alexsmobs:alexsmobs/soul_heart", "alexsmobs:alexsmobs/soul_vulture", "alexsmobs:alexsmobs/spectre", "alexsmobs:alexsmobs/spiked_scute", "alexsmobs:alexsmobs/spiked_turtle_shell", "alexsmobs:alexsmobs/squid_grapple", "alexsmobs:alexsmobs/stink_bottle", "alexsmobs:alexsmobs/stink_ray", "alexsmobs:alexsmobs/stomp_leafcutter_anthill", "alexsmobs:alexsmobs/straddle_saddle", "alexsmobs:alexsmobs/straddleboard", "alexsmobs:alexsmobs/straddler", "alexsmobs:alexsmobs/stradpole_feed", "alexsmobs:alexsmobs/strange_fish_finder", "alexsmobs:alexsmobs/sunbird_blessing", "alexsmobs:alexsmobs/tame_bald_eagle", "alexsmobs:alexsmobs/tame_capuchin", "alexsmobs:alexsmobs/tame_cosmaw", "alexsmobs:alexsmobs/tame_elephant", "alexsmobs:alexsmobs/tame_elephant_tusked", "alexsmobs:alexsmobs/tame_flutter", "alexsmobs:alexsmobs/tame_gorilla", "alexsmobs:alexsmobs/tame_grizzly_bear", "alexsmobs:alexsmobs/tame_mantis_shrimp", "alexsmobs:alexsmobs/tame_tarantula_hawk", "alexsmobs:alexsmobs/tame_warped_toad", "alexsmobs:alexsmobs/tarantula_hawk", "alexsmobs:alexsmobs/tigers_blessing", "alexsmobs:alexsmobs/underminer", "alexsmobs:alexsmobs/void_worm_kill", "alexsmobs:alexsmobs/void_worm_split", "alexsmobs:alexsmobs/void_worm_summon", "alexsmobs:alexsmobs/warped_mosco_kill", "iceandfire:iceandfire/bestiary", "iceandfire:iceandfire/deathworm_egg", "iceandfire:iceandfire/dragon_egg", "iceandfire:iceandfire/dragon_flute", "iceandfire:iceandfire/dragon_forge_brick", "iceandfire:iceandfire/dragon_forge_core", "iceandfire:iceandfire/dragon_horn", "iceandfire:iceandfire/dragon_meal", "iceandfire:iceandfire/dragon_staff", "iceandfire:iceandfire/dragonarmor", "iceandfire:iceandfire/dragonbone_flaming_sword", "iceandfire:iceandfire/dragonbone_tool", "iceandfire:iceandfire/dragonsteel", "iceandfire:iceandfire/dragonsteel_weapon", "iceandfire:iceandfire/jar_pixie", "iceandfire:iceandfire/kill_cyclops", "iceandfire:iceandfire/kill_deathworm", "iceandfire:iceandfire/kill_ghost", "iceandfire:iceandfire/kill_hydra", "iceandfire:iceandfire/kill_if_dragon", "iceandfire:iceandfire/kill_myrmex", "iceandfire:iceandfire/kill_sea_serpent", "iceandfire:iceandfire/kill_siren", "iceandfire:iceandfire/kill_stymphalian_bird", "iceandfire:iceandfire/kill_troll", "iceandfire:iceandfire/lectern", "iceandfire:iceandfire/myrmex_resin", "iceandfire:iceandfire/pixie_wand", "iceandfire:iceandfire/root", "iceandfire:iceandfire/rotten_egg", "iceandfire:iceandfire/stymphalian_arrow", "iceandfire:iceandfire/tame_amphithere", "iceandfire:iceandfire/tame_cockatrice", "iceandfire:iceandfire/tame_hippocampus", "iceandfire:iceandfire/tame_hippogryph", "iceandfire:iceandfire/tame_pixie", "iceandfire:iceandfire/use_tide_trident"],
    'mystery_stars': ["alexsmobs:alexsmobs/sunbird_blessing", "goety:goety/craft_star_amulet", "nameless_trinkets:obtain/fragile_cloud", "nameless_trinkets:obtain/moon_stone"],
    'mystery_resources': ["lootr:100loot", "lootr:10loot", "lootr:1barrel", "lootr:1cart", "lootr:1chest", "lootr:1shulker", "lootr:25loot", "lootr:50loot", "lootr:root", "lootr:social"],
    'mystery_food': ["extradelight:amethyst", "extradelight:badfood", "extradelight:cactus_juice", "extradelight:desert", "extradelight:doughshaping", "extradelight:dryingrack", "extradelight:feasts", "extradelight:flour", "extradelight:food", "extradelight:gildedblackstone", "extradelight:grater", "extradelight:grind", "extradelight:hellskitchen", "extradelight:ingredients", "extradelight:jelly", "extradelight:jellyall", "extradelight:meals", "extradelight:mixingbowl", "extradelight:mortar", "extradelight:noodles", "extradelight:oven", "extradelight:spoon", "extradelight:start", "extradelight:trays", "extradelight:vinegarpot", "extradelight:yeastpot", "farmersdelight:main/craft_knife", "farmersdelight:main/eat_comfort_food", "farmersdelight:main/eat_nourishing_food", "farmersdelight:main/get_fd_seed", "farmersdelight:main/get_ham", "farmersdelight:main/get_mushroom_colony", "farmersdelight:main/get_rich_soil", "farmersdelight:main/harvest_ropelogged_tomato", "farmersdelight:main/harvest_straw", "farmersdelight:main/hit_raider_with_rotten_tomato", "farmersdelight:main/master_chef", "farmersdelight:main/obtain_netherite_knife", "farmersdelight:main/place_campfire", "farmersdelight:main/place_cooking_pot", "farmersdelight:main/place_feast", "farmersdelight:main/place_organic_compost", "farmersdelight:main/place_skillet", "farmersdelight:main/plant_all_crops", "farmersdelight:main/plant_rice", "farmersdelight:main/root", "farmersdelight:main/use_cutting_board", "farmersdelight:main/use_skillet"],
    'mystery_sinners': ["graveyard:graveyard/black_bone_staff", "graveyard:graveyard/cyan_bone_staff", "graveyard:graveyard/purple_bone_staff", "graveyard:graveyard/red_bone_staff", "graveyard:graveyard/white_bone_staff", "meetyourfight:main/bellringer_kill", "meetyourfight:main/bellringer_summon", "meetyourfight:main/dame_fortuna_kill", "meetyourfight:main/dame_fortuna_summon", "meetyourfight:main/root", "meetyourfight:main/rosalyne_kill", "meetyourfight:main/rosalyne_summon", "meetyourfight:main/swampjaw_kill", "meetyourfight:main/swampjaw_summon"],
    'mystery_disasters': ["cataclysm:find_ancient_factory", "cataclysm:find_burning_arena", "cataclysm:find_cursed_pyramid", "cataclysm:find_ruined_citadel", "cataclysm:find_soul_black_smith", "cataclysm:find_sunken_city", "cataclysm:kill_ender_golem", "cataclysm:kill_ender_guardian", "cataclysm:kill_harbinger", "cataclysm:kill_ignis", "cataclysm:kill_leviathan", "cataclysm:kill_monstrosity", "cataclysm:kill_remnant", "cataclysm:kill_revenant", "cataclysm:root"],
    'mystery_lords': ["bosses_of_mass_destruction:adventure/night_lich_defeat", "bosses_of_mass_destruction:adventure/void_blossom_defeat", "bosses_of_mass_destruction:end/obsidilith_defeat", "bosses_of_mass_destruction:nether/gauntlet_defeat", "cataclysm:find_ancient_factory", "cataclysm:find_burning_arena", "cataclysm:find_cursed_pyramid", "cataclysm:find_ruined_citadel", "cataclysm:find_soul_black_smith", "cataclysm:find_sunken_city", "cataclysm:kill_ender_golem", "cataclysm:kill_ender_guardian", "cataclysm:kill_harbinger", "cataclysm:kill_ignis", "cataclysm:kill_leviathan", "cataclysm:kill_monstrosity", "cataclysm:kill_remnant", "cataclysm:kill_revenant", "cataclysm:root", "somebosses:aesegull_adv", "somebosses:ancient_wizard_adv", "somebosses:darkmask_adv", "somebosses:electrichead_adv", "somebosses:flaming_berserker_adv", "somebosses:frost_magma_adv", "somebosses:froverlord_adv", "somebosses:hand_head_adv", "somebosses:knightgarent_adv", "somebosses:manofwateradv", "somebosses:merciless_assasin_adv", "somebosses:monoeyed_adv", "somebosses:namelessone_adv", "somebosses:ordnance_adv", "somebosses:prismarine_adv", "somebosses:sand_giant_adv", "somebosses:skeletondemonadv", "somebosses:stoneguard_adv", "somebosses:vampire_adv", "somebosses:volcanium_adv", "somebosses:vulcan_adv", "somebosses:world_of_bosses"],
    'mystery_followers': ["modulargolems:golems/anvil_fix", "modulargolems:golems/apply", "modulargolems:golems/apply_sculk", "modulargolems:golems/command", "modulargolems:golems/craft", "modulargolems:golems/dog", "modulargolems:golems/full", "modulargolems:golems/fully_equipped", "modulargolems:golems/hot_fix", "modulargolems:golems/humanoid", "modulargolems:golems/kill_creeper", "modulargolems:golems/kill_guardian", "modulargolems:golems/kill_warden", "modulargolems:golems/oops", "modulargolems:golems/recycle", "modulargolems:golems/retrieve", "modulargolems:golems/root", "modulargolems:golems/sponge", "modulargolems:golems/start", "modulargolems:golems/swim", "modulargolems:golems/thunder", "modulargolems:golems/upgrade"],
    'mystery_memories': ["unusualprehistory:main/adorned_staff", "unusualprehistory:main/amber_fossil", "unusualprehistory:main/amber_gummy", "unusualprehistory:main/ammon", "unusualprehistory:main/ammon_drop", "unusualprehistory:main/ammon_weapon", "unusualprehistory:main/analyzer", "unusualprehistory:main/antarcto", "unusualprehistory:main/antarcto_weapon", "unusualprehistory:main/anuro", "unusualprehistory:main/austro", "unusualprehistory:main/austro_boots", "unusualprehistory:main/barina", "unusualprehistory:main/beelze", "unusualprehistory:main/brachi", "unusualprehistory:main/coty", "unusualprehistory:main/cultivator", "unusualprehistory:main/dryo", "unusualprehistory:main/dunk", "unusualprehistory:main/egg", "unusualprehistory:main/embryo", "unusualprehistory:main/encrusted", "unusualprehistory:main/eryon", "unusualprehistory:main/fossil", "unusualprehistory:main/fossil_stand", "unusualprehistory:main/foxii", "unusualprehistory:main/gigantopithicus", "unusualprehistory:main/gigantopithicus_fruits", "unusualprehistory:main/gigantopithicus_weapons", "unusualprehistory:main/ginkgo", "unusualprehistory:main/golden_scau", "unusualprehistory:main/grog", "unusualprehistory:main/hwacha", "unusualprehistory:main/incubator", "unusualprehistory:main/insulator", "unusualprehistory:main/kentro", "unusualprehistory:main/majunga", "unusualprehistory:main/majunga_helmet", "unusualprehistory:main/mammoth", "unusualprehistory:main/mammoth_meatball", "unusualprehistory:main/meat_stick", "unusualprehistory:main/megalania", "unusualprehistory:main/opal_fossil", "unusualprehistory:main/opal_pearl", "unusualprehistory:main/opal_shuriken", "unusualprehistory:main/pachy", "unusualprehistory:main/palaeophis", "unusualprehistory:main/paraceratherium", "unusualprehistory:main/petrified", "unusualprehistory:main/plants", "unusualprehistory:main/rex", "unusualprehistory:main/rex_passify", "unusualprehistory:main/root", "unusualprehistory:main/scau", "unusualprehistory:main/shedscale", "unusualprehistory:main/sludge", "unusualprehistory:main/smilodon", "unusualprehistory:main/stetha", "unusualprehistory:main/talapanas", "unusualprehistory:main/tame_barina", "unusualprehistory:main/trike", "unusualprehistory:main/trike_shield", "unusualprehistory:main/ulugh", "unusualprehistory:main/veloci", "unusualprehistory:main/veloci_shield", "unusualprehistory:main/zuloagae"],
}

const mrqxHarmfulEffectWhiteList = [

]

const mrqxCoinToChocolateCoin = {
    'lightmanscurrency:coin_copper': 'lightmanscurrency:coin_chocolate_copper',
    'lightmanscurrency:coin_iron': 'lightmanscurrency:coin_chocolate_iron',
    'lightmanscurrency:coin_gold': 'lightmanscurrency:coin_chocolate_gold',
    'lightmanscurrency:coin_emerald': 'lightmanscurrency:coin_chocolate_emerald',
    'lightmanscurrency:coin_diamond': 'lightmanscurrency:coin_chocolate_diamond',
    'lightmanscurrency:coin_netherite': 'lightmanscurrency:coin_chocolate_netherite',
}

const mrqxVanillaDamageSource = [
    "wither",
    "lightningBolt",
    "lava",
    "outOfWorld",
    "starve",
    "dragonBreath",
    "fallingBlock",
    "inWall",
    "cactus",
    "onFire",
    "stalagmite",
    "flyIntoWall",
    "dryout",
    "freeze",
    "anvil",
    "fall",
    "magic",
    "inFire",
    "sweetBerryBush",
    "generic",
    "fallingStalactite",
    "cramming",
    "hotFloor",
    "drown",
    "thrown",
    "fireball",
    "sting",
    "playerAttack",
    "player",
    "create",
    "indirectMagic",
    "explosion",
    "sonicBoom",
    "thorns",
    "mobAttack",
    "mob",
    "witherSkull",
    "badRespawnPointExplosion",
    "indirectMobAttack",
    "indirectMob",
    "fireworks",
    "trident",
    "arrow",
    "explosion",
]

const mrqxCoeVeinList = [
    'createoreexcavation:drilling/coal',
    'createoreexcavation:drilling/copper',
    'createoreexcavation:drilling/diamond',
    'createoreexcavation:drilling/emerald',
    'createoreexcavation:drilling/glowstone',
    'createoreexcavation:drilling/gold',
    'createoreexcavation:drilling/hardened_diamond',
    'createoreexcavation:drilling/iron',
    'createoreexcavation:drilling/quartz',
    'createoreexcavation:drilling/redstone',
    'createoreexcavation:drilling/zinc',
    'createoreexcavation:drilling/water',
    'kubejs:drilling_arcane',
    'kubejs:drilling_lapis',
    'kubejs:drilling_nether_gold',
    'kubejs:drilling_netherite',
    'kubejs:drilling_silver',
    'minecraft:extracting_lava_nether',
    'minecraft:extracting_quicksilver',
    'minecraft:extracting_lava_overworld',
    'mrqx_extra_pack:drilling_raw_uranium'
]