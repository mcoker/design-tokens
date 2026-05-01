import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as JSZip from 'jszip';
import './ui.css';

let tokensZip;

const addToZip = (blob, fileName, folderNames, zip) => {
  // Add download files to folder structure
  folderNames.forEach((folderName) => {
    zip.folder(folderName).file(fileName, blob);
  });
};

const saveVars = (text, setJsonFiles, setZipFile) => {
  let splitFiles = text.split('\n\n\n');
  tokensZip = new JSZip();

  for (let i = 0; i < splitFiles.length; i++) {
    const splitFileName = splitFiles[i].split('\n', 1)[0];
    let saveFileName = '';
    let saveFolderNames = [];

    switch (splitFileName) {
      // Color palette
      case '/* Color Palette.Mode 1.tokens.json */':
        saveFileName = 'palette.color.json';
        saveFolderNames = ['default/light', 'default/dark', 'default/highcontrast', 'default/highcontrast-dark', 'default/glass', 'default/glass-dark'];
        break;

      // Base tokens
      // Base color
      case '/* Base Color Tokens - Light.Value.tokens.json */':
        saveFileName = 'base.json';
        saveFolderNames = ['default/light', 'default/highcontrast', 'default/glass'];
        break;
      // Base color - dark
      case '/* Base Color Tokens - Dark.Value.tokens.json */':
        saveFileName = 'base.dark.json';
        saveFolderNames = ['default/dark', 'default/highcontrast-dark', 'default/glass-dark'];
        break;
      // Base dimension
      case '/* Base Dimension Tokens.Mode 1.tokens.json */':
        saveFileName = 'base.dimension.json';
        saveFolderNames = ['default/light', 'default/highcontrast', 'default/glass']; //why not dark?
        break;
      // Base motion
      case '/* Base Motion Tokens.Mode 1.tokens.json */':
        saveFileName = 'base.motion.json';
        saveFolderNames = ['default/light'];
        break;

      // Semantic tokens
      // Semantic color
      case '/* Default Semantic Color Tokens.Light.tokens.json */':
        saveFileName = 'semantic.json';
        saveFolderNames = ['default/light'];
        break;
      // Semantic color - dark
      case '/* Default Semantic Color Tokens.Dark.tokens.json */':
        saveFileName = 'semantic.dark.json';
        saveFolderNames = ['default/dark'];
        break;
      // Semantic color - glass
      case '/* Default Semantic Color Tokens.Light - Glass.tokens.json */':
        saveFileName = 'semantic.glass.json';
        saveFolderNames = ['default/glass'];
        break;
      // Semantic color - dark glass
      case '/* Default Semantic Color Tokens.Dark - Glass.tokens.json */':
        saveFileName = 'semantic.glass.dark.json';
        saveFolderNames = ['default/glass-dark'];
        break;
      // Semantic color - high contrast
      case '/* Default Semantic Color Tokens.Light - High Contrast (Beta).tokens.json */':
        saveFileName = 'semantic.highcontrast.json';
        saveFolderNames = ['default/highcontrast'];
        break;
      // Semantic color - high contrast - dark
      case '/* Default Semantic Color Tokens.Dark - High Contrast (Beta).tokens.json */':
        saveFileName = 'semantic.highcontrast.dark.json';
        saveFolderNames = ['default/highcontrast-dark'];
        break;
      // Semantic dimension
      case ('/* Default Semantic Dimension Tokens.Default.tokens.json */'):
        saveFileName = 'semantic.dimension.json';
        saveFolderNames = ['default/light'];
        break;
      // Semantic dimension - high contrast
      case '/* Default Semantic Dimension Tokens.High Contrast - Beta.tokens.json */':
        saveFileName = 'semantic.dimension.highcontrast.json';
        saveFolderNames = ['default/highcontrast'];
        break;
      case ('/* Default Semantic Dimension Tokens.Glass.tokens.json */'):
        saveFileName = 'semantic.dimension.glass.json';
        saveFolderNames = ['default/glass'];
        break;
      // Semantic motion
      case '/* Semantic Motion Tokens.Semantic Motion tokens.tokens.json */':
        saveFileName = 'semantic.motion.json';
        saveFolderNames = ['default/light'];
        break;

      // Charts tokens
      // Charts
      case '/* Charts.Light.tokens.json */':
        saveFileName = 'charts.json';
        saveFolderNames = ['default/light'];
        break;
      // Charts - dark
      case '/* Charts.Dark.tokens.json */':
        saveFileName = 'charts.dark.json';
        saveFolderNames = ['default/dark'];
        break;
      // Charts - high contrast - light
      case '/* Charts.High Contrast - Light.tokens.json */':
        saveFileName = 'charts.highcontrast.json';
        saveFolderNames = ['default/light'];
        break;
      // Charts - high contrast - dark
      case '/* Charts.High Contrast - Dark.tokens.json */':
        saveFileName = 'charts.highcontrast.dark.json';
        saveFolderNames = ['default/dark'];
        break;

      // Felt color tokens
      case '/* Felt Color Tokens.Light.tokens.json */':
        saveFileName = 'felt.color.json';
        saveFolderNames = ['felt/light'];
        break;
      case '/* Felt Color Tokens.Dark.tokens.json */':
        saveFileName = 'felt.color.dark.json';
        saveFolderNames = ['felt/dark'];
        break;
      case '/* Felt Color Tokens.Light - Glass.tokens.json */':
        saveFileName = 'felt.color.glass.json';
        saveFolderNames = ['felt/glass'];
        break;
      case '/* Felt Color Tokens.Dark - Glass.tokens.json */':
        saveFileName = 'felt.color.glass.dark.json';
        saveFolderNames = ['felt/glass-dark'];
        break;
      case '/* Felt Color Tokens.Light - High Contrast (Beta).tokens.json */':
        saveFileName = 'felt.color.highcontrast.json';
        saveFolderNames = ['felt/highcontrast'];
        break;
      case '/* Felt Color Tokens.Dark - High Contrast (Beta).tokens.json */':
        saveFileName = 'felt.color.highcontrast.dark.json';
        saveFolderNames = ['felt/highcontrast-dark'];
        break;
      // Felt dimension tokens
      case '/* Felt Dimension Tokens.Default.tokens.json */':
        saveFileName = 'felt.dimension.json';
        saveFolderNames = ['felt/light'];
        break;
      case '/* Felt Dimension Tokens.Glass.tokens.json */':
        saveFileName = 'felt.dimension.glass.json';
        saveFolderNames = ['felt/glass'];
        break;
      case '/* Felt Dimension Tokens.High Contrast - Beta.tokens.json */':
        saveFileName = 'felt.dimension.highcontrast.json';
        saveFolderNames = ['felt/highcontrast'];
        break;
      default:
        saveFileName = splitFiles[i].split('\n', 1)[0];
        saveFolderNames = ['default/light'];
    }

    const fileToExport = splitFiles[i].substring(splitFiles[i].indexOf('\n') + 1);
    const textToSaveAsBlob = new Blob([fileToExport], { type: 'text/plain' });

    // create download link per file
    const jsonLink = createLink(textToSaveAsBlob, saveFileName);
    setJsonFiles((prev: React.ReactNode[]) => [...prev, jsonLink]);
    // add each file zip
    addToZip(textToSaveAsBlob, saveFileName, saveFolderNames, tokensZip);
  }

  // create download link for finished zip file
  tokensZip.generateAsync({ type: 'blob' }).then((blob) => {
    const zipLink = createLink(blob, 'tokens.zip');
    setZipFile(zipLink);
  });
};

const createLink = (text, file) => {
  const textToSaveAsURL = window.URL.createObjectURL(text);
  return (
    <a key={file} download={file} href={textToSaveAsURL}>
      {file}
    </a>
  );
};

const exportTokens = () => parent.postMessage({ pluginMessage: { type: 'EXPORT' } }, '*');

const App = () => {
  const [jsonFiles, setJsonFiles] = React.useState([]);
  const [zipFile, setZipFile] = React.useState(null);
  const resetDownloads = () => {
    setJsonFiles([]);
    setZipFile(null);
  };

  React.useEffect(() => {
    exportTokens();
    // Listen for messages sent from the plugin code.ts file
    window.onmessage = ({ data: { pluginMessage } }) => {
      if (pluginMessage?.type === 'EXPORT_RESULT') {
        // Reset download files
        resetDownloads();
        // Display all tokens in textarea
        let textOutput = pluginMessage.files
          .map(({ fileName, body }) => `/* ${fileName} */\n\n${JSON.stringify(body, null, 2)}`)
          .join('\n\n\n');
        textOutput = textOutput.replaceAll('$type', 'type').replaceAll('$value', 'value');
        document.querySelector('textarea').innerHTML = textOutput;

        // Create downloadable token files
        saveVars(textOutput, setJsonFiles, setZipFile);
      }
    };
  }, []);

  return (
    <main>
      <div className="button-container">
        <button type="button" onClick={exportTokens}>
          Export Tokens
        </button>
      </div>
      <textarea placeholder="All exported tokens will render here..." readOnly></textarea>
      <div className="tokens-download-wrapper zip-wrapper">
        <p>Download all files:</p>
        <div className="zip-downloads">{zipFile}</div>
      </div>
      <div className="tokens-download-wrapper json-wrapper">
        <p>Download individual JSON files:</p>
        <div className="json-downloads">{jsonFiles}</div>
      </div>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById('export-patternfly-tokens-app')).render(<App />);
