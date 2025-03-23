import * as vscode from "vscode";
import Generator from "./generator";

export function activate(context: vscode.ExtensionContext) {
  const loadingStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  loadingStatusBarItem.text = `$(sync~spin) Generating nano-id`;
  context.subscriptions.push(loadingStatusBarItem);

  context.subscriptions.push(
    vscode.commands.registerCommand("nano-id-generator.toClipboard", () => {
      loadingStatusBarItem.show();
      const generator = new Generator();
      generator.generate(true);
      loadingStatusBarItem.hide();

      vscode.window.showInformationMessage("Nano ID generated for clipboard");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("nano-id-generator.toEditor", () => {
      loadingStatusBarItem.show();
      const generator = new Generator();
      generator.generate();
      loadingStatusBarItem.hide();
    })
  );
}

export function deactivate() {}
