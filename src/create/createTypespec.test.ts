import { afterEach, beforeEach } from "vitest"
import {
  contrastResult,
  start,
  selectFolder,
  preContrastResult,
  installExtensionForFile,
  closeVscode,
  notEmptyFolderContinue,
} from "../common/commonSteps"
import { screenshotSelf, test } from "../common/utils"
import fs from "node:fs"
import path from "node:path"
import {
  inputProjectName,
  selectEmitters,
  selectTemplate,
} from "../common/createSteps"
import {
  emitSelectLanguageForOpenapi,
  emitSelectProject,
  emitSelectType,
} from "../common/emiSteps"
import { sleep } from "@nut-tree-fork/nut-js"

beforeEach(async () => {
  const dir = path.resolve(__dirname, "../../CreateTypespecProject")
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file)
      fs.rmSync(filePath, { recursive: true, force: true })
      await sleep(3)
    }
  } else {
    fs.mkdirSync(dir, { recursive: true })
  }
})

test("CreateTypespec-Generic REST API", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../../extension.vsix")
  )

  await start(page, {
    folderName: "CreateTypespecProject",
    command: "Create Typespec Project",
  })
  await selectFolder()
  await selectTemplate(page, "Generic REST API")
  await inputProjectName(page)
  await selectEmitters(page, ["OpenAPI"])
  await preContrastResult(
    page,
    "Project created!",
    "Failed to create project Successful",
    [10, 10]
  )
  await closeVscode(page)
  await contrastResult(
    [
      ".gitignore",
      "main.tsp",
      "node_modules",
      "package-lock.json",
      "package.json",
      "tspconfig.yaml",
    ],
    workspacePath
  )
})

test("CreateTypespec-Generic REST API2", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../../extension.vsix")
  )

  await start(page, {
    folderName: "CreateTypespecProject",
    command: "Create Typespec Project",
  })
  await selectFolder()
  await selectTemplate(page, "Generic REST API")
  await inputProjectName(page)
  await selectEmitters(page, ["OpenAPI"])
  await preContrastResult(
    page,
    "Project created!",
    "Failed to create project Successful",
    [10, 10]
  )
  await closeVscode(page)
  await contrastResult(
    [
      ".gitignore",
      "main.tsp",
      "node_modules",
      "package-lock.json",
      "package.json",
      "tspconfig.yaml",
    ],
    workspacePath
  )
})

test("EmitTypespec-OpenAPI Document", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../../extension.vsix")
  )
  await start(page, {
    folderName: "EmitTypespecProject",
    command: "Emit from Typespec",
  })
  // await emitSelectProject(page, "TextTranslation")

  await page
    .getByRole("option", { name: "Choose another emitter" })
    .locator("a")
    .click()

  await emitSelectType(page, "OpenAPI Document")

  await emitSelectLanguageForOpenapi(page)

  await preContrastResult(
    page,
    "OpenAPI3...Succeeded",
    "Failed to emit project Successful",
    [10, 3]
  )
  await closeVscode(page)

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("EmitTypespec-OpenAPI Document 2", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../../extension.vsix")
  )
  await start(page, {
    folderName: "EmitTypespecProject",
    command: "Emit from Typespec",
  })
  // await emitSelectProject(page, "TextTranslation")

  await page
    .getByRole("option", { name: "Choose another emitter" })
    .locator("a")
    .click()

  await emitSelectType(page, "OpenAPI Document")

  await emitSelectLanguageForOpenapi(page)

  await preContrastResult(
    page,
    "OpenAPI3...Succeeded",
    "Failed to emit project Successful",
    [10, 3]
  )
  await closeVscode(page)

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("ImportTypespecFromOpenApi3", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../../extension.vsix")
  )

  await start(page, {
    folderName: "importTypespecProjectOpenApi3",
    command: "Import TypeSpec from Openapi3",
  })
  await selectFolder()
  await notEmptyFolderContinue(page)
  await selectFolder("openapi.3.0.yaml")
  await preContrastResult(
    page,
    "OpenAPI succeeded",
    "Failed to import project successfully",
    [10, 3]
  )
  await closeVscode(page)
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

test("ImportTypespecFromOpenApi3 2", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../../extension.vsix")
  )

  await start(page, {
    folderName: "importTypespecProjectOpenApi3",
    command: "Import TypeSpec from Openapi3",
  })
  await selectFolder()
  await notEmptyFolderContinue(page)
  await selectFolder("openapi.3.0.yaml")
  await preContrastResult(
    page,
    "OpenAPI succeeded",
    "Failed to import project successfully",
    [10, 3]
  )
  await closeVscode(page)
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

// test("CreateTypespec-Special scenarios-button", async ({ launch }) => {
//   const { page } = await launch({ workspacePath: "./test" })
//   await installExtension(page)

//   await page
//     .getByLabel(/Explorer/)
//     .first()
//     .click()
//   await page.getByRole("button", { name: "Create TypeSpec Project" }).click()
//   await selectFolder()
//   await notEmptyFolderContinue(page)
//   await closeVscode(page)
// })
