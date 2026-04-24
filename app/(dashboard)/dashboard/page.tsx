import { dashboardService } from '@/modules/dashboard/service';
import { activityService } from '@/modules/activity/service';
import { filesService } from '@/modules/files/service';
import { notificationsService } from '@/modules/notifications/service';
import { searchService } from '@/modules/search/service';
import { settingsService } from '@/modules/settings/service';
import { commentsService } from '@/modules/comments/service';
import { authService } from '@/modules/auth/service';
import { MetricCard } from '@/components/MetricCard';
import { SectionList } from '@/components/SectionList';

export default async function DashboardPage() {
  const { snapshot, organizations, projects, tasks } = await dashboardService.hydrate();
  const session = await authService.session();
  const activeUserId = tasks.find((t) => t.assigneeId)?.assigneeId ?? '';
  const notifications = activeUserId ? await notificationsService.listByUser(activeUserId) : [];
  const files = projects[0] ? await filesService.listByProject(projects[0].id) : [];
  const comments = tasks[0] ? await commentsService.listByTask(tasks[0].id) : [];
  const search = await searchService.global('Unified');
  const settings = settingsService.list();
  const activity = await activityService.recent();

  return (
    <main className="grid">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Dashboard</h1>
        <p>
          Session user: <strong>{session?.user?.email ?? 'Not signed in'}</strong>
        </p>
      </section>

      <section className="grid grid-4">
        <MetricCard label="Organizations" value={snapshot.organizations} />
        <MetricCard label="Users" value={snapshot.users} />
        <MetricCard label="Projects" value={snapshot.projects} />
        <MetricCard label="Tasks" value={snapshot.tasks} />
      </section>

      <section className="grid grid-2">
        <SectionList title="Organizations Module">
          <ul>{organizations.map((org) => <li key={org.id}>{org.name}</li>)}</ul>
        </SectionList>

        <SectionList title="Projects + Files Module">
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.name} ({project.tasks.length} tasks)</li>
            ))}
          </ul>
          <small>Files: {files.length}</small>
        </SectionList>

        <SectionList title="Tasks + Comments Module">
          <ul>
            {tasks.slice(0, 5).map((task) => (
              <li key={task.id}>{task.title} - {task.status}</li>
            ))}
          </ul>
          <small>Comments on first task: {comments.length}</small>
        </SectionList>

        <SectionList title="Notifications + Activity Module">
          <p>Notifications for active user: {notifications.length}</p>
          <p>Recent tasks in activity feed: {activity.tasks.length}</p>
        </SectionList>

        <SectionList title="Search Module">
          <p>
            Search matches: {search.projects.length} projects, {search.tasks.length} tasks, {search.users.length} users.
          </p>
        </SectionList>

        <SectionList title="Settings + Analytics Module">
          <p>In progress: {snapshot.inProgressTasks} | Done: {snapshot.doneTasks}</p>
          <ul>{settings.map((s) => <li key={s.key}>{s.key}: {s.value}</li>)}</ul>
        </SectionList>
      </section>
    </main>
  );
}
