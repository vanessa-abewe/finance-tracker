import type { NextApiRequest, NextApiResponse } from 'next';
import  connectDB  from '../../db';
import  Budget  from '../../models/budget';
import  Transaction  from '../../models/transaction';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectDB();

  try {
    const { category, period } = req.query;
    
    const budget = await Budget.findOne({
      category,
      period,
      startDate: { $lte: new Date() },
      $or: [
        { endDate: { $gte: new Date() } },
        { endDate: null }
      ]
    });

    if (!budget) {
      return res.status(404).json({ error: 'No budget found' });
    }

    
    const startOfPeriod = new Date();
    startOfPeriod.setDate(1); 
    
    const totalExpenses = await Transaction.aggregate([
      {
        $match: {
          category,
          type: 'expense',
          date: { $gte: startOfPeriod }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const total = totalExpenses[0]?.total || 0;
    const isExceeded = total > budget.amount;

    res.status(200).json({
      budgetAmount: budget.amount,
      currentAmount: total,
      isExceeded,
      percentage: (total / budget.amount) * 100
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check budget' });
  }
}