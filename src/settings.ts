import * as vscode from "vscode";

export default class Settings {
  public _alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";
  public _size = 21;

  get alphabet() {
    return this._alphabet;
  }

  get size() {
    return this._size;
  }

  constructor() {
    const configuration = vscode.workspace.getConfiguration("nano-id-generator", undefined);
    this._alphabet = configuration.get("alphabet") || this._alphabet;
    this._size = configuration.get("size") || this._size;
  }
}
