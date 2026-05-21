// Franco: da el StatusBadge - badge mlawwan based 3ala el status bta3 el job
import { JobStatus } from '../../types';

interface StatusBadgeProps {
  status: JobStatus;
}

const statusColors: Record<JobStatus, string> = {
  [JobStatus.WISHLIST]: 'bg-gray-100 text-gray-700',
  [JobStatus.APPLIED]: 'bg-blue-100 text-blue-700',
  [JobStatus.INTERVIEW]: 'bg-yellow-100 text-yellow-700',
  [JobStatus.OFFER]: 'bg-green-100 text-green-700',
  [JobStatus.REJECTED]: 'bg-red-100 text-red-700',
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
