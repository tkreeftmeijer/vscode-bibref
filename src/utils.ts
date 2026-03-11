import * as vscode from 'vscode'
import * as path from 'path'
import { appendFileSync } from 'fs';
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

  vscode.window.showInformationMessage(`File path reference files: '${filePath}'`)

  appendFileSync(filePath, text)
}