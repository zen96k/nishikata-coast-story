-- CreateTable
CREATE TABLE `article_label` (
    `id` BIGINT UNSIGNED NOT NULL auto_increment,
    `value` ENUM('new', 'popular') NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP (3),
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP (3) ON UPDATE CURRENT_TIMESTAMP (3),
    UNIQUE INDEX `uq_article_label_value` (`value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

INSERT INTO
    article_label (value)
VALUES
    ('new'),
    ('popular');
