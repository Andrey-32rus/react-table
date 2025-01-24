import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { players, rows, removedRows, savedRows } = req.body;

    try {
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