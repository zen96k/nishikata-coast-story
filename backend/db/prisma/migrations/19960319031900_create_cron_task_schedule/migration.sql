CREATE TABLE `cron_task_schedule` (
  `id` BIGINT UNSIGNED NOT NULL auto_increment,
  `execution_id` VARCHAR(255) NULL,
  `task_name` VARCHAR(255) NULL,
  `task_status` ENUM('idle', 'running', 'stopped', 'destroyed') NULL,
  `scheduled_at` DATETIME NULL,
  `triggered_at` DATETIME NULL,
  `started_at` DATETIME NULL,
  `finished_at` DATETIME NULL,
  `errorMessage` LONGTEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX `uq_cron_task_schedule_execution_id` (`execution_id`),
  CONSTRAINT `pk_cron_task_schedule_id` PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
