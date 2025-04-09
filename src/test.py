import win32gui
print("测试调用")
window = win32gui.GetForegroundWindow()
title = win32gui.GetWindowText(window)

print(title)
