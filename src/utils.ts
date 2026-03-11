import * as vscode from 'vscode'
import * as path from 'path'
import { appendFile } from 'fs';
import { existsSync } from 'fs';
import { useLogger } from 'reactive-vscode'
import { displayName } from './generated/meta'

export const logger = useLogger(displayName)

export async function appendBibToFile(
  relativePath: string,
  text: string
) {
  const workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  if (!workspaceRoot) return;

  const filePath = path.join(workspaceRoot, relativePath);

  if (existsSync(filePath)) {
    appendFile(filePath, text, (err) => 
        {if (err) throw err;
          vscode.window.showInformationMessage(`Citation added to file!`)})
    }
}