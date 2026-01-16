import type { editor } from 'monaco-editor';

// Custom Monaco theme matching Prism GitHub Light theme
export const githubLightTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '999988', fontStyle: 'italic' },
    { token: 'string', foreground: 'e3116c' },
    { token: 'string.key.json', foreground: '00a4db' },
    { token: 'string.value.json', foreground: 'e3116c' },
    { token: 'number', foreground: '36acaa' },
    { token: 'keyword', foreground: '00009f' },
    { token: 'delimiter', foreground: '393A34' },
    { token: 'delimiter.bracket', foreground: '393A34' },
  ],
  colors: {
    'editor.background': '#f6f8fa',
    'editor.foreground': '#393A34',
    'editor.lineHighlightBackground': '#f6f8fa',
    'editorLineNumber.foreground': '#999988',
    'editorLineNumber.activeForeground': '#393A34',
    'editor.selectionBackground': '#c8e1ff',
    'editorCursor.foreground': '#393A34',
    'editorIndentGuide.background': '#eff1f3',
    'editorIndentGuide.activeBackground': '#d0d7de',
  },
};

// Custom Monaco theme matching Prism Dracula theme
export const draculaTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6272a4' },
    { token: 'string', foreground: 'ff79c6' },
    { token: 'string.key.json', foreground: 'f1fa8c' },
    { token: 'string.value.json', foreground: 'ff79c6' },
    { token: 'number', foreground: 'bd93f9' },
    { token: 'keyword', foreground: 'bd93f9', fontStyle: 'italic' },
    { token: 'delimiter', foreground: 'f8f8f2' },
    { token: 'delimiter.bracket', foreground: 'f8f8f2' },
  ],
  colors: {
    'editor.background': '#282A36',
    'editor.foreground': '#F8F8F2',
    'editor.lineHighlightBackground': '#282A36',
    'editorLineNumber.foreground': '#6272a4',
    'editorLineNumber.activeForeground': '#F8F8F2',
    'editor.selectionBackground': '#44475a',
    'editorCursor.foreground': '#F8F8F2',
    'editorIndentGuide.background': '#3b3d4a',
    'editorIndentGuide.activeBackground': '#6272a4',
  },
};
