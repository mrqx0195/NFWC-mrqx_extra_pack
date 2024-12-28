// priority: 100
global.OrganSkill = new $KeyMapping(`key.kubejs.organ_skill`, $GLFWKey.GLFW_KEY_X, 'key.categories.kubejs')
StartupEvents.init(event => {
    $KeyMappingRegistry.register(global.OrganSkill)
})