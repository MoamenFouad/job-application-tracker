// الـ store bta3 el jobs - el jobs list w el filters mahdoodeen hena
import { create } from 'zustand';
import type { Job, JobStatus } from '../types';

interface JobsState {
  jobs: Job[];
  statusFilter: JobStatus | null;
  searchQuery: string;
  setJobs: (jobs: Job[]) => void;
  setStatusFilter: (status: JobStatus | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: [],
  statusFilter: null,
  searchQuery: '',
  setJobs: (jobs) => set({ jobs }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
