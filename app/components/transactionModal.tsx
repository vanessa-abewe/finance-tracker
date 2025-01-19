import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { useState } from "react";

interface Transaction {
  _id: string;
  amount: number;
  category: string;
  subcategory?: string;
  description?: string;
  date: Date;
}

const TransactionTable = ({ transactions }: { transactions: Transaction[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

const handleViewDetails = (transaction: Transaction): void => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button onClick={() => handleViewDetails(transaction)}>View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalBody>
            {selectedTransaction && (
              <div>
                <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
                <p><strong>Category:</strong> {selectedTransaction.category}</p>
                <p><strong>Subcategory:</strong> {selectedTransaction.subcategory}</p>
                <p><strong>Description:</strong> {selectedTransaction.description || "No description available"}</p>
                <p><strong>Date:</strong> {new Date(selectedTransaction.date).toLocaleDateString()}</p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TransactionTable