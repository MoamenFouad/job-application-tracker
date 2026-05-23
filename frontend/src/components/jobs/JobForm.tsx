import { useForm } from 'react-hook-form'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import type { Job, CreateJobInput, JobStatus } from '../../types'

interface JobFormProps {
  initialData?: Job
  onSubmit: (data: CreateJobInput) => void
  isLoading: boolean
}

const statuses: { value: JobStatus; label: string }[] = [
  { value: 'WISHLIST', label: 'Wishlist' },
  { value: 'APPLIED', label: 'Applied' },
  { value: 'INTERVIEW', label: 'Interview' },
  { value: 'OFFER', label: 'Offer' },
  { value: 'REJECTED', label: 'Rejected' },
]

export default function JobForm({ initialData, onSubmit, isLoading }: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateJobInput>({
    defaultValues: initialData
      ? {
          company: initialData.company,
          position: initialData.position,
          status: initialData.status,
          appliedDate: initialData.appliedDate
            ? initialData.appliedDate.slice(0, 10)
            : '',
          notes: initialData.notes ?? '',
          salary: initialData.salary ?? '',
          location: initialData.location ?? '',
          url: initialData.url ?? '',
        }
      : { status: 'WISHLIST' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Company *"
          placeholder="e.g. Google"
          error={errors.company?.message}
          {...register('company', { required: 'Company is required' })}
        />
        <Input
          label="Position *"
          placeholder="e.g. Software Engineer"
          error={errors.position?.message}
          {...register('position', { required: 'Position is required' })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Status"
          error={errors.status?.message}
          {...register('status', { required: 'Status is required' })}
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
        <Input
          label="Applied Date"
          type="date"
          error={errors.appliedDate?.message}
          {...register('appliedDate')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location"
          placeholder="e.g. Remote, New York, NY"
          {...register('location')}
        />
        <Input
          label="Salary"
          placeholder="e.g. $120,000 / yr"
          {...register('salary')}
        />
      </div>

      <Input
        label="Job URL"
        type="url"
        placeholder="https://..."
        error={errors.url?.message}
        {...register('url')}
      />

      <Textarea
        label="Notes"
        placeholder="Interview notes, contacts, key details…"
        {...register('notes')}
      />

      <Button type="submit" isLoading={isLoading} className="self-start">
        {initialData ? 'Save Changes' : 'Add Job'}
      </Button>
    </form>
  )
}
