import { PrismaClient, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.create({
    data: {
      name: 'Homebase Labs',
      users: {
        create: [
          { name: 'Alex Admin', email: 'admin@homebase.dev', role: 'admin' },
          { name: 'Mia Member', email: 'mia@homebase.dev' }
        ]
      }
    },
    include: { users: true }
  });

  const project = await prisma.project.create({
    data: {
      name: 'Unified 13-Step Delivery',
      description: 'Single integrated Next.js project',
      organizationId: org.id
    }
  });

  const task = await prisma.task.create({
    data: {
      title: 'Wire modules end-to-end',
      description: 'Validate all modules in one app',
      status: TaskStatus.IN_PROGRESS,
      projectId: project.id,
      assigneeId: org.users[1]?.id
    }
  });

  await prisma.comment.create({
    data: {
      body: 'Initial integration completed.',
      taskId: task.id,
      authorId: org.users[0]!.id
    }
  });

  await prisma.notification.create({
    data: {
      title: 'Welcome to Homebase',
      userId: org.users[1]!.id
    }
  });

  await prisma.fileAsset.create({
    data: {
      name: 'Architecture Diagram',
      url: '/assets/architecture.png',
      projectId: project.id
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
