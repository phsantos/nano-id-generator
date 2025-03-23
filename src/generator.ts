import * as vscode from "vscode";

import { customAlphabet } from "nanoid";

import Settings from "./settings";

export default class Generator {
  constructor(private readonly settings: Settings = new Settings()) {}

  private readonly defaultAlphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private readonly defaultSize = 21;

  private readonly alphabet = this.settings?.alphabet || this.defaultAlphabet;
  private readonly size = Number(this.settings?.size || this.defaultSize);

  generate(toClipboard: boolean = false) {
    const NANOID_RULES = {
      alphabet: this.settings.alphabet,
      size: this.settings.size,
    };

    let id: string;
    try {
      const generateNano = customAlphabet(this.alphabet, this.size);
      id = generateNano();
    } catch (nanoError) {
      console.error("Nano ID generation error:", nanoError);
      const fallbackGenerate = customAlphabet(
        NANOID_RULES.alphabet,
        NANOID_RULES.size
      );
      id = fallbackGenerate();
    }

    if (toClipboard) {
      vscode.env.clipboard.writeText(id);
    } else {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        var selection = editor.selection;

        editor.edit(function (edit) {
          edit.replace(selection, id);
        });
      }
    }
  }
}
