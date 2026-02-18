declare module 'turndown-plugin-gfm' {
  import TurndownService from 'turndown';

  export const gfm: (turndownService: TurndownService) => void;
  export const tables: (turndownService: TurndownService) => void;
  export const strikethrough: (turndownService: TurndownService) => void;
}
