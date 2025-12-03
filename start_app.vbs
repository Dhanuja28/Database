Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & "auto.bat" & chr(34), 0
Set WshShell = Nothing
