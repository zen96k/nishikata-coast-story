import { DateTime as luxon } from "luxon"
import cron from "node-cron"
import { CronTaskStatusEnum, PrismaClient } from "../../type/prisma/client.ts"
import Article from "./article.ts"

class CronTaskSchedule {
  private article: Article
  private dbClient: PrismaClient

  public constructor(article: Article, dbClient: PrismaClient) {
    this.article = article
    this.dbClient = dbClient
  }

  public async deleteAll() {
    await this.dbClient.$transaction(async (transaction) => {
      await transaction.cronTaskSchedule.deleteMany()
      await transaction.$queryRaw`
        ALTER TABLE cron_task_schedule AUTO_INCREMENT = 1;
      `
    })
  }

  public async manage(task: cron.ScheduledTask) {
    task.on("execution:started", async (context) => {
      await this.create(context)
    })

    task.on("execution:finished", async (context) => {
      await this.update(context)
    })

    task.on("execution:failed", async (context) => {
      await this.update(context)
    })

    task.on("task:started", async (context) => {
      await this.update(context)
    })

    task.on("task:stopped", async (context) => {
      await this.update(context)
    })

    task.on("task:destroyed", async (context) => {
      await this.update(context)
    })
  }

  public async runCreateOrUpdateArticlesWithApi() {
    await this.article.createOrUpdateWithApi()
  }

  public async runCreateOrUpdateArticlesWithRss() {
    await this.article.createOrUpdateWithRss()
  }

  private async create(context: cron.TaskContext) {
    const task = context.task
    const execution = context.execution

    await this.dbClient.cronTaskSchedule.create({
      data: {
        executionId: execution?.id,
        taskName: task?.name,
        taskStatus: task
          ? ((await task.getStatus()) as CronTaskStatusEnum)
          : undefined,
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

  private async update(context: cron.TaskContext) {
    const task = context.task
    const execution = context.execution

    await this.dbClient.cronTaskSchedule.update({
      data: {
        executionId: execution?.id,
        taskName: task?.name,
        taskStatus: task
          ? ((await task.getStatus()) as CronTaskStatusEnum)
          : undefined,
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

export default CronTaskSchedule
