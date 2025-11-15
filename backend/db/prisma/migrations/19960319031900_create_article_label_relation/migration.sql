CREATE TABLE `article_label_relation` (
    `id` BIGINT UNSIGNED NOT NULL auto_increment,
    `article_id` BIGINT UNSIGNED NOT NULL,
    `article_label_id` BIGINT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `pk_article_label_relation_id` PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

-- AddForeignKey
ALTER TABLE `article_label_relation`
ADD CONSTRAINT `fk_article_label_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_label_relation`
ADD CONSTRAINT `fk_article_label_article_label_id` FOREIGN KEY (`article_label_id`) REFERENCES `article_label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
