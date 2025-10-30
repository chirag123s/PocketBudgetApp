import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SplitTransactionScreen } from '@/components/transaction';

export default function SplitTransaction() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const transaction = {
    id: (params.transactionId as string) || '1',
    merchant: (params.merchant as string) || 'Woolworths',
    date: (params.date as string) || 'Today',
    amount: parseFloat((params.amount as string) || '150'),
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SplitTransactionScreen
      visible={true}
      onClose={handleClose}
      transaction={transaction}
    />
  );
}
