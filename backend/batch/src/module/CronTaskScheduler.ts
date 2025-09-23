import cron from "node-cron"
import { PrismaClient, TaskStatus } from "../../../db/generated/prisma/index.js"
import { ArticleManager } from "./ArticleManager.ts"

export class CronTaskScheduler {
  private prismaClient = new PrismaClient()
  private articleManager = new ArticleManager()

  public async deleteTaskSchedule() {
    await this.prismaClient.cronTaskSchedule.deleteMany()
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
    await this.prismaClient.$transaction(async (transaction) => {
      await this.articleManager.createOrUpdateQiitaArticlesByRss(
        "https://qiita.com/popular-items/feed.atom",
        transaction
      )
    })
  }

  private async createTaskSchedule(context: cron.TaskContext) {
    const task = context.task
    const execution = context.execution

    await this.prismaClient.cronTaskSchedule.create({
      data: {
        executionId: execution?.id,
        taskName: task?.name,
        taskStatus: task ? ((await task.getStatus()) as TaskStatus) : undefined,
        scheduledAt: context.date,
        triggeredAt: context.triggeredAt,
        startedAt: execution?.startedAt,
        finishedAt: execution?.finishedAt
      }
    })
  }

  private async updateTaskSchedule(context: cron.TaskContext) {
    const task = context.task
    const execution = context.execution

    await this.prismaClient.cronTaskSchedule.update({
      data: {
        executionId: execution?.id,
        taskName: task?.name,
        taskStatus: task ? ((await task.getStatus()) as TaskStatus) : undefined,
        scheduledAt: context.date,
        triggeredAt: context.triggeredAt,
        startedAt: execution?.startedAt,
        finishedAt: execution?.finishedAt,
        errorMessage: execution?.error?.message
      },
      where: { executionId: execution?.id }
    })
  }
}
