// Franco: da el JobForm - el form bta3 create w update el job
import type { CreateJobInput } from '../../types';

interface JobFormProps {
  onSubmit: (data: CreateJobInput) => void;
  isLoading?: boolean;
}

const JobForm = ({ onSubmit, isLoading }: JobFormProps) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p>JobForm - todo</p>
      <button type="submit" disabled={isLoading}>Submit</button>
    </form>
  );
};

export default JobForm;
