import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Определяем путь к JSON-файлу
      const filePath = path.resolve('saves.json');

      // Проверяем, существует ли файл
      if (!fs.existsSync(filePath)) {
        return res.status(200).json('{}');
      }

      // Читаем содержимое файла
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      // Парсим JSON-данные
      const games = JSON.parse(fileContent);

      return res.status(200).json({ games });
    } catch (error) {
      console.error('Error reading saves file:', error);
      return res.status(500).json({ error: 'Failed to read saves file' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}