import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code;
  res.status(200).json({ message: code });
}
