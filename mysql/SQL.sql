CREATE DATABASE IF NOT EXISTS `ib` charset utf8 COLLATE utf8_general_ci;

DROP TABLE IF EXISTS `ib`.`calls`;
CREATE TABLE `ib`.`calls` (
  `call_id` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` float(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `ib`.`call_rates`;
CREATE TABLE `call_rates` (
  `id` int(10) UNSIGNED NOT NULL,
  `duration_from` int(11) NOT NULL,
  `duration_to` int(11) NOT NULL,
  `rate` float(10,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `call_rates` (`id`, `duration_from`, `duration_to`, `rate`) VALUES
(1, 1, 3, 2.0),
(2, 4, 6, 1.5),
(3, 7, 9, 0.8),
(4, 10, 1000, 0.3);

ALTER TABLE `calls`
  ADD PRIMARY KEY (`call_id`);

ALTER TABLE `call_rates`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `calls`
  MODIFY `call_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `call_rates`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
