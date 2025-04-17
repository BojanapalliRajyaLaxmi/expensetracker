import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

export default function EditTransactionDialog({
  open,
  onClose,
  transaction,
  refresh,
}) {
  const [form, setForm] = useState(transaction);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log('Transaction received in EditTransactionDialog:', transaction);
    setForm(transaction);
  }, [transaction]);

  const handleUpdate = async () => {
    // Basic validation: Ensure required fields are present
    if (!form.amount || !form.description || !form.date) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!form._id) {
      console.error("Error: Missing transaction ID");
      alert('Transaction ID is missing!');
      return;
    }

    try {
      const response = await fetch(`https://expenseserver-pn1c.onrender.com/api/transactions/${form._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount), // Make sure it's a number
          date: form.date,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to update transaction: ${errorText}`);
      }

      // After successful update, refresh the transactions list and close the dialog
      await refresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to update the transaction. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent style={{ backgroundColor: '#f0f4f8' }}>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {errorMessage && (
            <div className="text-red-500 mb-2">
              <p>{errorMessage}</p>
            </div>
          )}
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={form.date?.split('T')[0]}  // Ensure form.date is in a valid format
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <Button onClick={handleUpdate}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
