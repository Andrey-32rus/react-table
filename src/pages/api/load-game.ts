import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { name } = req.query;

    try {
      const filePath = path.resolve('games', `${name}.json`);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Game not found' });
      }

      const gameData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return res.status(200).json(gameData);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to load game' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}