// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { newMvvmPage } from './commands/new-blk-page.command';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand("extension.new-blk-page", newMvvmPage);
	context.subscriptions.push(disposable);

}

// This method is called when your extension is deactivated
export function deactivate() { }
