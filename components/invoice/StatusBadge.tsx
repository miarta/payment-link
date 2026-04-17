'use client';

interface StatusBadgeProps {
  status: 'pending' | 'paid' | 'expired';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
  };

  const labels = {
    pending: 'Pending',
    paid: 'Paid',
    expired: 'Expired',
  };

  return (
    <span className={`px-4 py-2 rounded-full text-sm font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}