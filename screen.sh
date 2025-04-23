#!/bin/bash
 
# 创建保存截图的文件夹
echo "Artifact directory: $BUILD_ARTIFACT_STAGING_DIRECTORY"
mkdir -p screenshots
 
# 记录脚本开始时间（以秒为单位）

start_time=$(date +%s)
 
# 循环截图直到超过10分钟

while true; do

  current_time=$(date +%s)

  elapsed=$((current_time - start_time))
 
  if [ $elapsed -ge 600 ]; then

    echo "截图已运行10分钟，任务结束。"

    break

  fi
 
  # 获取当前时间戳

  timestamp=$(date +%Y%m%d-%H%M%S)
 
  # 截图并保存

  xwd -root -out "/home/vsts/work/1/a/screenshot_${timestamp}.xwd"

  convert "/home/vsts/work/1/a/screenshot_${timestamp}.xwd" "screenshots/screenshot_${timestamp}.png"

  rm "/home/vsts/work/1/a/screenshot_${timestamp}.xwd"
 
  # 每隔5秒截图一次

  sleep 5

done
 