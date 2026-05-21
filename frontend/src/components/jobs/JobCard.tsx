// Franco: da el JobCard - bYewarri el info bta3et el job el wa7da
import type { Job } from '../../types';
import StatusBadge from './StatusBadge';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold text-lg">{job.position}</h3>
      <p className="text-gray-600">{job.company}</p>
      {job.location && <p className="text-sm text-gray-500">{job.location}</p>}
      <StatusBadge status={job.status} />
    </div>
  );
};

export default JobCard;
