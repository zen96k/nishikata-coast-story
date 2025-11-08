-- CreateTable
CREATE TABLE `article` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `rss_publisher_id` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `summary` LONGTEXT NULL,
    `published_at` DATETIME NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `uq_article_link` (`link`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cron_task_schedule` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `execution_id` VARCHAR(255) NULL,
    `task_name` VARCHAR(255) NULL,
    `task_status` ENUM ('idle', 'running', 'stopped', 'destroyed') NULL,
    `scheduled_at` DATETIME NULL,
    `triggered_at` DATETIME NULL,
    `started_at` DATETIME NULL,
    `finished_at` DATETIME NULL,
    `errorMessage` LONGTEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `uq_cron_task_schedule_execution_id` (`execution_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rss_publisher` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `uq_rss_publisher_url` (`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `fk_article_rss_publisher_id` FOREIGN KEY (`rss_publisher_id`) REFERENCES `rss_publisher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO
    `rss_publisher` (`name`, `url`)
VALUES
    ('Qiita', 'https://qiita.com/feeds'),
    ('Zenn', 'https://zenn.dev/feeds');
