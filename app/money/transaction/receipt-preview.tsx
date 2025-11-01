import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ReceiptPreviewScreen } from '@/components/transaction';

export default function ReceiptPreview() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const handleSave = (uri: string) => {
    console.log('Receipt saved:', uri);
    // TODO: Save to database/cloud storage
    // Navigate back to transaction detail
    router.back();
  };

  const handleRetake = () => {
    router.back();
    // The AddReceiptModal will be shown again by the parent component
  };

  return (
    <ReceiptPreviewScreen
      receiptUri={params.uri as string}
      onSave={handleSave}
      onRetake={handleRetake}
    />
  );
}
