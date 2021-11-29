import * as vscode from "vscode";
import Generator from "./generator";

export function activate(context: vscode.ExtensionContext) {
  const loadingStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

  loadingStatusBarItem.text = `$(sync~spin) Generating nano-id`;
  context.subscriptions.push(loadingStatusBarItem);

  let generatorToClipboard = vscode.commands.registerCommand("nano-id-generator.generatorToClipboard", () => {
    loadingStatusBarItem.show();
    const generator = new Generator();
    generator.generate(true);
    loadingStatusBarItem.hide();

    vscode.window.showInformationMessage("Nano ID generated for clipboard");
  });

  let generatorToEditor = vscode.commands.registerCommand("nano-id-generator.generatorToEditor", () => {
    loadingStatusBarItem.show();
    const generator = new Generator();
    generator.generate();
    loadingStatusBarItem.hide();
  });

  context.subscriptions.push(generatorToClipboard);
  context.subscriptions.push(generatorToEditor);
}

export function deactivate() {}
