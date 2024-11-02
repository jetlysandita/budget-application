import React, { useEffect, useRef, useState } from 'react';
import Flex from '../atoms/Flex';
import Text from '../atoms/Text';
import IconAdd from '../atoms/IconAdd';
import Modal from '../atoms/Modal';
import { useSupabase } from '@/context/SupabaseContext';
import { formatRupiah } from '@/utility/helpers';
import Select from '../atoms/Select';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { UpsertTransaction } from '@/API/transactions';

const SectionTransaction: React.FC = () => {
  const options = [
    { value: '1', label: 'Essentials' },
    { value: '2', label: 'Debt Repayment' },
    { value: '3', label: 'Short-Term Savings' },
    { value: '4', label: 'Long-Term Savings' },
    { value: '5', label: 'Emergency Fund' },
    { value: '6', label: 'Discretionary Spending' },
  ];
  // const [_, setIsFormCreate] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<UpsertTransaction | null>(null);
  const [page, setPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTransactionElementRef = useRef<HTMLDivElement | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    supabase.getTransactions(1, 10);
  }, []);

  useEffect(() => {
    if (supabase.transactions.length == 0) return; // Prevents fetching if already loading
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting && supabase.transactionsHasMore) {
        supabase.getTransactions(page + 1, 10);
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(observerCallback);
    if (lastTransactionElementRef.current) {
      observer.current.observe(lastTransactionElementRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (observer.current && lastTransactionElementRef.current) {
        observer.current.unobserve(lastTransactionElementRef.current);
      }
    };
  }, [supabase.transactions, supabase.transactionsHasMore]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    supabase.upsertTransactions({
      ...selectedTransaction,
    });
  };

  return (
    <Flex
      margin="20px 0 0"
      direction="column"
      width="90.87%"
      gap="16px"
      height="53vh"
    >
      <Flex width="100%" justifyContent="space-between">
        <Text color="white" size="medium">
          Transactions
        </Text>
        <IconAdd
          color="white"
          cursor="pointer"
          fontSize={24}
          onClick={() => setSelectedTransaction({ tag_id: 1 })}
        />
      </Flex>
      <div
        style={{
          overflowY: 'auto',
          whiteSpace: 'nowrap',
          height: '100%',
          scrollBehavior: 'smooth',
          width: '100%',
        }}
      >
        <style jsx>{`
          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 4px; /* Adjust height for horizontal scrollbar */
          }
          ::-webkit-scrollbar-thumb {
            background: #ccc; /* Color of the scrollbar thumb */
            border-radius: 4px; /* Rounded corners for the thumb */
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #aaa; /* Darker color on hover */
          }
          ::-webkit-scrollbar-track {
            background: transparent; /* Background color of the track */
          }
        `}</style>
        <Flex gap="16px" direction="column" height="100%" width="100%">
          {supabase.transactions.map((transaction, index) => (
            <div
              key={transaction.transaction_id}
              style={{
                width: '100%',
                display: 'flex',
                background: 'linear-gradient(#A4C8E1, #6B9ACB)',
                alignItems: 'center',
                padding: '10px',
                borderRadius: 5,
              }}
              ref={
                index === supabase.transactions.length - 1
                  ? lastTransactionElementRef
                  : null
              }
              onClick={() => {
                setSelectedTransaction({
                  id: transaction.transaction_id,
                  note: transaction.note,
                  amount: transaction.amount,
                  tag_id: transaction.tag_id,
                  transaction_date: transaction.transaction_date_plain,
                });
              }}
            >
              <Flex
                width="100%"
                direction="column"
                gap="5px"
                style={{ cursor: 'pointer', borderRadius: 5 }}
              >
                <Text size="medium">{transaction.note}</Text>
                <Text size="small" width="100%" color="#2F4F4F">
                  {transaction.tag}
                </Text>
              </Flex>
              <Flex direction="column" gap="5px" style={{ cursor: 'pointer' }}>
                <Text color="red" textAlign="right">
                  {formatRupiah(-transaction.amount)}
                </Text>
                <Text
                  size="small"
                  width="100%"
                  textAlign="right"
                  color="#2F4F4F"
                >
                  {transaction.transaction_date}
                </Text>
              </Flex>
            </div>
          ))}
        </Flex>
      </div>
      {selectedTransaction !== null && (
        <Modal
          title={`${
            selectedTransaction?.id == null ? 'Create' : 'Update'
          } Transaction`}
          isOpen={selectedTransaction !== null}
          onClose={() => {
            setSelectedTransaction(null);
            setPage(1);
          }}
        >
          <Flex direction="column" gap="16px">
            <Select
              options={options}
              value={(selectedTransaction?.tag_id || 1).toString()}
              onChange={(e) => {
                setSelectedTransaction((prev) => ({
                  ...prev,
                  tag_id: +e,
                }));
              }}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={selectedTransaction.amount?.toString()}
              onChange={(e) => {
                setSelectedTransaction((prev) => ({
                  ...prev,
                  amount: +e.target.value,
                }));
              }}
            />
            <Input
              placeholder="Description"
              value={selectedTransaction.note}
              onChange={(e) => {
                setSelectedTransaction((prev) => ({
                  ...prev,
                  note: e.target.value,
                }));
              }}
            />
            <Input
              type="date"
              value={selectedTransaction.transaction_date}
              onChange={(e) => {
                setSelectedTransaction((prev) => ({
                  ...prev,
                  transaction_date: e.target.value,
                }));
              }}
            />
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </Flex>
        </Modal>
      )}
    </Flex>
  );
};

export default SectionTransaction;
