CREATE TABLE `rss_publisher` (
  `id` BIGINT UNSIGNED NOT NULL auto_increment,
  `name` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX `uq_rss_publisher_url` (`url`),
  CONSTRAINT `pk_rss_publisher_id` PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

INSERT INTO
  rss_publisher (name, url)
VALUES
  (
    'Qiita',
    'https://qiita.com/popular-items/feed.atom'
  ),
  ('Zenn', 'https://zenn.dev/feed');
