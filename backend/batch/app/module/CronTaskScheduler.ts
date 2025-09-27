import { DateTime as luxon } from "luxon"
import cron from "node-cron"
import { PrismaClient, TaskStatus } from "../../type/prisma-client/index.js"
import { ArticleManager } from "./ArticleManager.ts"

export class CronTaskScheduler {
  private client = new PrismaClient()
  private articleManager = new ArticleManager()

  public async deleteTaskSchedule() {
    await this.client.cronTaskSchedule.deleteMany()
  }

  public async manageTaskSchedule(task: cron.ScheduledTask) {
    task.on("execution:started", async (context) => {
      await this.createTaskSchedule(context)
    })

    task.on("execution:finished", async (context) => {
      await this.updateTaskSchedule(context)
    })

    task.on("execution:failed", async (context) => {
      await this.updateTaskSchedule(context)
    })

    task.on("task:started", async (context) => {
      await this.updateTaskSchedule(context)
    })

    task.on("task:stopped", async (context) => {
      await this.updateTaskSchedule(context)
    })

    task.on("task:destroyed", async (context) => {
      await this.updateTaskSchedule(context)
    })
  }

  public async runCreateOrUpdateQiitaArticlesByRss() {
    await this.articleManager.createOrUpdateQiitaByRss(
      "https://qiita.com/popular-items/feed.atom"
    )
  }

  private async createTaskSchedule(context: cron.TaskContext) {
    const task = context.task
    const execution = context.execution

    await this.client.cronTaskSchedule.create({
      data: {
        executionId: execution?.id,
        taskName: task?.name,
        taskStatus: task ? ((await task.getStatus()) as TaskStatus) : undefined,
        scheduledAt: luxon.fromJSDate(context.date).toUTC().toJSDate(),
        triggeredAt: luxon.fromJSDate(context.triggeredAt).toUTC().toJSDate(),
        startedAt:
          execution && execution.startedAt
            ? luxon.fromJSDate(execution.startedAt).toUTC().toJSDate()
            : undefined,
        finishedAt:
          execution && execution.finishedAt
            ? luxon.fromJSDate(execution.finishedAt).toUTC().toJSDate()
            : undefined
      }
    })
  }

  private async updateTaskSchedule(context: cron.TaskContext) {
    const task = context.task
    const execution = context.execution

    await this.client.cronTaskSchedule.update({
      data: {
        executionId: execution?.id,
        taskName: task?.name,
        taskStatus: task ? ((await task.getStatus()) as TaskStatus) : undefined,
        scheduledAt: luxon.fromJSDate(context.date).toUTC().toJSDate(),
        triggeredAt: luxon.fromJSDate(context.triggeredAt).toUTC().toJSDate(),
        startedAt:
          execution && execution.startedAt
            ? luxon.fromJSDate(execution.startedAt).toUTC().toJSDate()
            : undefined,
        finishedAt:
          execution && execution.finishedAt
            ? luxon.fromJSDate(execution.finishedAt).toUTC().toJSDate()
            : undefined,
        errorMessage: execution?.error?.message
      },
      where: { executionId: execution?.id }
    })
  }
}
