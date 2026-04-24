import { analyticsService } from '@/modules/analytics/service';
import { organizationsService } from '@/modules/organizations/service';
import { projectsService } from '@/modules/projects/service';
import { tasksService } from '@/modules/tasks/service';

export const dashboardService = {
  hydrate: async () => {
    const [snapshot, organizations, projects, tasks] = await Promise.all([
      analyticsService.snapshot(),
      organizationsService.list(),
      projectsService.list(),
      tasksService.list()
    ]);

    return { snapshot, organizations, projects, tasks };
  }
};
