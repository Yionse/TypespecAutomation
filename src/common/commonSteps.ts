import { Page } from "@playwright/test"
import { retry, sleep } from "./utils"
import { keyboard, Key } from "@nut-tree/nut-js"
import fs from "node:fs"
import screenshot from "screenshot-desktop"

async function preContrastResult(
  page: Page,
  text: string,
  errorMessage: string,
  [count, sleep]: number[] = [10, 5]
) {
  await retry(
    count,
    async () => {
      const contrastResult = page.getByText(new RegExp(text)).first()
      return (await contrastResult.count()) > 0
    },
    errorMessage,
    sleep
  )
}

async function contrastResult(res: string[], dir: string) {
  let resLength = 0
  if (fs.existsSync(dir)) {
    console.log(fs.readdirSync(dir))
    resLength = fs.readdirSync(dir).length
  }
  if (resLength !== res.length) {
    throw new Error("Failed to matches all files")
  }
}

async function start(
  page: Page,
  { folderName, command }: { folderName: string; command: string }
) {
  await page.locator("li").filter({ hasText: folderName }).first().click()
  let img = await screenshot()
  let buffer = Buffer.from(img)
  fs.writeFileSync(
    `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/top${Date.now()}.png`,
    buffer
  )
  await page
    .getByRole("textbox", { name: "input" })
    .first()
    .fill(`>Typespec: ${command}`)
  await sleep(10)
  img = await screenshot()
  fs.writeFileSync(
    `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/input${Date.now()}.png`,
    buffer
  )
  const listForCreate = page
    .locator("a")
    .filter({ hasText: `TypeSpec: ${command}` })
    .first()
  img = await screenshot()
  fs.writeFileSync(
    `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/item${Date.now()}.png`,
    buffer
  )
  await retry(
    5,
    async () => {
      return (await listForCreate.count()) > 0
    },
    "Failed to find the specified option"
  )

  await listForCreate.click()
}

async function selectFolder(file: string = "") {
  let img = await screenshot()
  let buffer = Buffer.from(img)
  fs.writeFileSync(
    `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/folder${Date.now()}.png`,
    buffer
  )
  await sleep(30)
  img = await screenshot()
  buffer = Buffer.from(img)
  fs.writeFileSync(
    `${process.env.BUILD_ARTIFACT_STAGING_DIRECTORY || "."}/folder-two${Date.now()}.png`,
    buffer
  )
  if (file) {
    await keyboard.pressKey(Key.CapsLock)
    await keyboard.type(file)
  }
  await keyboard.pressKey(Key.Enter)
}

async function closeVscode(page: Page) {
  await page.keyboard.press("Alt+F4")
}

async function notEmptyFolderContinue(page: Page) {
  const yesBtn = page.locator("a").filter({ hasText: "Yes" }).first()
  await retry(
    5,
    async () => {
      return (await yesBtn.count()) > 0
    },
    "Failed to find yes button",
    1
  )
  await yesBtn.click()
}

export {
  start,
  contrastResult,
  selectFolder,
  preContrastResult,
  closeVscode,
  notEmptyFolderContinue,
}
