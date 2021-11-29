import * as vscode from "vscode";

import { customAlphabet } from "nanoid";

import Settings from "./settings";

export default class Generator {
  constructor(private readonly settings: Settings = new Settings()) {}

  generate(toClipboard: boolean = false) {
    const NANOID_RULES = {
      alphabet: this.settings.alphabet,
      size: this.settings.size,
    };

    const nanoid = customAlphabet(NANOID_RULES.alphabet, NANOID_RULES.size);

    if (toClipboard) {
      vscode.env.clipboard.writeText(nanoid());
    } else {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        var selection = editor.selection;

        editor.edit(function (edit) {
          edit.replace(selection, nanoid());
        });
      }
    }
  }
}
