import * as vscode from 'vscode'
import { getBiblatexFromId } from './gets'
import { appendBibToFile } from './utils'

export async function fetchBibFromId() {
  const config = vscode.workspace.getConfiguration('bibref');
  const bibFile = config.get<string>('bibFile') || 'references.bib';
  const prompt = `Enter a DOI, PMID, ISBN, Github URL, npm URL, or other identifier to fetch BibLaTeX citation.`
  const id = await vscode.window.showInputBox({ prompt })

  if (!id)
    return

  const progressOptions: vscode.ProgressOptions = {
    location: vscode.ProgressLocation.Notification,
    title: `BibRef`,
    cancellable: false,
  }
  vscode.window.withProgress(progressOptions, async (progress, _token) => {
    progress.report({ message: `Fetching BibLaTeX for ${id}` })
    const bib = await getBiblatexFromId(id)
    const selection = await vscode.window.showInformationMessage(bib, { title: 'Add to bib', isCloseAffordance: false })
    if (selection && selection.title === 'Add to bib') {
      const refName = bib.match(/\{\s*([^,]+)/)
      const bibName = refName ? refName[1].trim() : 'NA'
      vscode.env.clipboard.writeText(bibName)
      vscode.window.showInformationMessage(`Citation name copied to clipboard: '${bibName}'`)
      appendBibToFile(bibFile, bib)
    }
  })
}
