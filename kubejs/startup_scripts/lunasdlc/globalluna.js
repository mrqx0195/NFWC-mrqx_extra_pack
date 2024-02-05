
global.lunaTYPE_MAP = {
	'kubejs:archotech': Text.of({ "translate": "luna_flesh_reforged.tooltips.archotech" }).color('#9fa07e'),
	'kubejs:chromatic': Text.of({ "translate": "luna_flesh_reforged.tooltips.chromatic" }).color('#873d75'),
}

var result1=Object.assign(global.TYPE_MAP,global.lunaTYPE_MAP);


global.lunaCAST_TIME_REDUCTION = { key: 'irons_spellbooks:cast_time_reduction', name: 'LunaKJSCastTimeReduction', operation: 'addition' }

global.lunaATTRIBUTE_MAP = {
    'LunaKJSCastTimeReduction': global.lunaCAST_TIME_REDUCTION,
}

var result2=Object.assign(global.ATTRIBUTE_MAP,global.lunaATTRIBUTE_MAP);