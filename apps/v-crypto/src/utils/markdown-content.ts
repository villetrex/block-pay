import fs, { readFileSync } from 'fs';
import path from 'path';

export const getMarkdownContent = (locale: string, page: string) => {
  const configDirectory = path.resolve(process.cwd(), `src/markdown/${locale}/${page}`);
  const directoryContent = fs.readdirSync(configDirectory);
  return directoryContent.map((name, index) => ({
    description: readFileSync(path.join(configDirectory, name), 'utf8'),
    title: decodeURIComponent(name.split('-')[1].split('.')[0].replaceAll('_', ' ')),
    id: index,
  }));
};
