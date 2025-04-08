import { afterEach, beforeEach } from "vitest"
import {
  contrastResult,
  start,
  selectFolder,
  preContrastResult,
  installExtensionForFile,
  closeVscode,
  notEmptyFolderContinue,
} from "./common/commonSteps"
import { screenshotSelf, sleep, test } from "./common/utils"
import fs from "node:fs"
import path from "node:path"
import {
  inputProjectName,
  selectEmitters,
  selectTemplate,
} from "./common/createSteps"
import { emitSelectLanguageForOpenapi, emitSelectType } from "./common/emiSteps"

beforeEach(async () => {
  const dir = path.resolve(__dirname, "../CreateTypespecProject")
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file)
      fs.rmSync(filePath, { recursive: true, force: true })
    }
  } else {
    fs.mkdirSync(dir, { recursive: true })
  }
  await sleep(3)
})

test("CreateTypespec-Generic REST API", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("EmitTypespec-OpenAPI Document 2", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("ImportTypespecFromOpenApi3", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

test("ImportTypespecFromOpenApi3 2", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

test("CreateTypespec-Generic REST API3", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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

test("CreateTypespec-Generic REST API4", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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

test("EmitTypespec-OpenAPI Document3", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("EmitTypespec-OpenAPI Document4", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("ImportTypespecFromOpenApi3 3", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

test("ImportTypespecFromOpenApi3 4", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

test("CreateTypespec-Generic REST API5", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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

test("CreateTypespec-Generic REST API6", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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

test("EmitTypespec-OpenAPI Document5", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("EmitTypespec-OpenAPI Document6", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("ImportTypespecFromOpenApi3 5", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

test("ImportTypespecFromOpenApi3 6", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

test("CreateTypespec-Generic REST API7", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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

test("CreateTypespec-Generic REST API8", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf(`createStart${+new Date()}.png`, "create")
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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

test("EmitTypespec-OpenAPI Document7", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("EmitTypespec-OpenAPI Document8", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("emitStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()

  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
  )
})

test("ImportTypespecFromOpenApi3 7", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
})

test("ImportTypespecFromOpenApi3 8", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await screenshotSelf("importStart.png", "create")

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix")
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
  await closeVscode()
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
//   await closeVscode()
// })
