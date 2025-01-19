import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'json2csv';
import PDFDocument from 'pdfkit';
import connectToDatabase from "../../db";
import Transaction from "../../models/transaction";

// Helper to validate request inputs
const validateInputs = (startDate: string, endDate: string, format: string) => {
  const validFormats = ['csv', 'pdf'];
  if (!startDate || !endDate || !format) {
    throw new Error('startDate, endDate, and format are required.');
  }
  if (!validFormats.includes(format)) {
    throw new Error(`Invalid format. Supported formats: ${validFormats.join(', ')}`);
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date format.');
  }
  return { start, end };
};

// Helper to fetch transactions from the database
const fetchTransactions = async (start: Date, end: Date) => {
  await connectToDatabase();
  return Transaction.find({
    date: { $gte: start, $lte: end },
  });
};

// Helper to generate a CSV file
const generateCSV = (transactions: any[]) => {
  const fields = ['date', 'category', 'amount', 'type', 'description'];
  return parse(transactions, { fields });
};

// Helper to generate a PDF file
const generatePDF = (transactions: any[], res: NextApiResponse) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=transactions_report.pdf');
  doc.pipe(res);

  // Title and headers
  doc.fontSize(18).text('Transactions Report', { align: 'center' }).moveDown();
  doc.fontSize(12).text('Date', { continued: true, width: 100 });
  doc.text('Category', { continued: true, width: 150 });
  doc.text('Amount', { continued: true, width: 100 });
  doc.text('Type', { continued: true, width: 100 });
  doc.text('Description');
  doc.moveDown();

  // Transaction data
  transactions.forEach((transaction) => {
    doc.text(new Date(transaction.date).toLocaleDateString(), { continued: true, width: 100 });
    doc.text(transaction.category || 'N/A', { continued: true, width: 150 });
    doc.text(`$${transaction.amount.toFixed(2)}`, { continued: true, width: 100 });
    doc.text(transaction.type || 'N/A', { continued: true, width: 100 });
    doc.text(transaction.description || 'N/A');
  });

  doc.end();
};

const generateReport = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { startDate, endDate, format } = req.body;

    // Validate inputs
    const { start, end } = validateInputs(startDate, endDate, format);

    // Fetch transactions
    const transactions = await fetchTransactions(start, end);
    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found in the specified date range.' });
    }

    // Generate report
    if (format === 'csv') {
      const csv = generateCSV(transactions);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=transactions_report.csv');
      return res.status(200).send(csv);
    }

    if (format === 'pdf') {
      generatePDF(transactions, res);
      return;
    }

    res.status(400).json({ message: 'Invalid format. Supported formats: csv, pdf' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error generating report:', errorMessage);
    res.status(500).json({ message: errorMessage });
  }
};

export default generateReport;
