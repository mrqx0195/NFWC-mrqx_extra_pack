@echo off
:: 将当前文件夹mod备份
echo "备份mod文件"
xcopy "%~dp0\mods" "%~dp0\.tempMod" /s/e/i/q >nul 
:: 刷新packwiz状态
echo "检测Curseforge Mod"
packwiz curseforge detect >nul 
echo "刷新packwiz状态"
packwiz refresh >nul 
:: 按照规则导出整合包
echo "Curseforge版本导出"
packwiz curseforge export
:: 还原mod文件
echo "还原mod文件"
del "%~dp0\mods\*.*" /q >nul 
xcopy "%~dp0\.tempMod" "%~dp0\mods" /s/e >nul 
rd "%~dp0\.tempMod" /s/q >nul 
pause
@echo on