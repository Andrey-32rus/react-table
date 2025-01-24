// pages/api/save-game.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { players, rows, removedRows, savedRows } = req.body;

    // Логика для сохранения игры (например, сохраняем в файл или базу данных)
    // Пример с сохранением в файл:
    try {
      const fs = require('fs');
      const path = require('path');

      const filePath = path.resolve('games', `${Date.now()}.json`);
      const gameData = { players, rows, removedRows, savedRows };

      fs.writeFileSync(filePath, JSON.stringify(gameData));  // Сохраняем в файл

      return res.status(200).json({ message: 'Game saved successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save game' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}