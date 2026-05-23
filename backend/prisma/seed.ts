import { PrismaClient, JobStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('password123', 12);

  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: { email: 'demo@example.com', name: 'Demo User', password: hashed },
  });

  console.log(`Seeded user: ${user.email}`);

  const jobs: { company: string; position: string; status: JobStatus; location: string; appliedDate: Date }[] = [
    { company: 'Google', position: 'Software Engineer', status: 'APPLIED', location: 'Mountain View, CA', appliedDate: new Date('2026-04-01') },
    { company: 'Meta', position: 'Frontend Engineer', status: 'INTERVIEW', location: 'Menlo Park, CA', appliedDate: new Date('2026-04-10') },
    { company: 'Stripe', position: 'Full Stack Engineer', status: 'OFFER', location: 'Remote', appliedDate: new Date('2026-03-15') },
    { company: 'Notion', position: 'Backend Engineer', status: 'REJECTED', location: 'San Francisco, CA', appliedDate: new Date('2026-03-20') },
    { company: 'Linear', position: 'TypeScript Engineer', status: 'WISHLIST', location: 'Remote', appliedDate: new Date('2026-05-01') },
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: { ...job, userId: user.id } });
  }

  console.log(`Seeded ${jobs.length} sample jobs`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
