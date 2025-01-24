import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { name, data } = req.body;

    try {
      // Путь к файлу saves.json
      const filePath = path.resolve('saves.json');

      // Чтение существующих данных из файла
      let saves: Map<string, { name: string; data: any }> = new Map();

      // Если файл существует, загружаем его содержимое
      if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(rawData);

        // Если данные существуют, создаем Map
        parsedData.forEach((item: { name: string; data: any }) => {
          saves.set(item.name, item);
        });
      }

      // Создаем новый объект Save
      const newSave = { name, data };

      // Добавляем новый объект в Map, используя 'name' как ключ
      saves.set(name, newSave);

      // Сохраняем обновленные данные обратно в файл
      const saveArray = Array.from(saves.values());  // Преобразуем Map в массив значений
      fs.writeFileSync(filePath, JSON.stringify(saveArray));

      return res.status(200).json({ message: 'Game saved successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to save game' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}