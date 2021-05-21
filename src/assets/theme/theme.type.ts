import office from './office.json';
import party from './party.json';
import phone from './phone.json';

export interface GameTheme {
  name: string;
  script?: string[];
  length: number
}

const themes = [party, phone, office];

export function themeFinder(name: string): GameTheme{
  let currentTheme: GameTheme;
  currentTheme = { name: 'default', length: 0}
  themes.forEach((theme) => {
    if (theme.name === name) {
      currentTheme = {...theme, length: theme.script.length };
    }
  })

  return currentTheme;
}