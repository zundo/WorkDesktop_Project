-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  sam. 11 juil. 2020 à 17:49
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `dashboard_inglorius`
--

-- --------------------------------------------------------

--
-- Structure de la table `calendrier`
--

DROP TABLE IF EXISTS `calendrier`;
CREATE TABLE IF NOT EXISTS `calendrier` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `id_user` int(32) NOT NULL,
  `id_entreprise` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_entreprise` (`id_entreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `calendrier`
--

INSERT INTO `calendrier` (`id`, `name`, `start`, `end`, `id_user`, `id_entreprise`) VALUES
(1, 'night', '2020-06-26 12:00:00', '2020-06-26 12:00:00', 1, 1),
(2, 'cour', '2020-06-25 12:00:00', '2020-06-25 12:00:00', 1, 1),
(3, 'tkt', '2020-07-06 12:00:00', '2020-07-06 12:00:00', 1, 1),
(4, 'pont', '2020-07-13 12:00:00', '2020-07-13 12:00:00', 1, 1),
(5, 'autre', '2020-07-06 12:00:00', '2020-07-06 12:00:00', 1, 1),
(6, 'autre2', '2020-07-06 12:00:00', '2020-07-06 12:00:00', 1, 1),
(7, 'autre3', '2020-07-06 12:00:00', '2020-07-06 12:00:00', 1, 1),
(8, 'autre5', '2020-07-06 12:00:00', '2020-07-06 12:00:00', 1, 1),
(9, 'test', '2020-07-11 12:00:00', '2020-07-11 12:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) CHARACTER SET utf8 NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `date_naissance` datetime NOT NULL,
  `sexe` enum('Homme','Femme') CHARACTER SET utf8 NOT NULL DEFAULT 'Homme',
  `rue` varchar(50) NOT NULL,
  `codePostal` int(11) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `pays` varchar(64) NOT NULL,
  `site_web` varchar(64) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `poste` varchar(64) NOT NULL,
  `id_entreprise_client` int(32) NOT NULL,
  `id_entreprise_utilisateur` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_entreprise` (`id_entreprise_client`),
  KEY `id_entreprise_utilisateur` (`id_entreprise_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `email`, `lastname`, `firstname`, `date_naissance`, `sexe`, `rue`, `codePostal`, `ville`, `pays`, `site_web`, `phone`, `poste`, `id_entreprise_client`, `id_entreprise_utilisateur`) VALUES
(1, 'client@ckue.com', 'clientn', 'clientprenom', '2020-07-03 12:00:00', 'Femme', '', 95550, 'Gonesse', 'France', 'clientt.com', '0645755245', 'commercial', 2, 1),
(2, 'ennenn@ennclient.enn', 'ennnom', 'ennprenom', '2020-07-11 12:00:00', 'Femme', '', 0, '', '', '', '456', 'dev', 10, 1),
(3, 'sdd@sdd.sdd', 'sdsfsf', 'sfsdf', '2020-07-01 12:00:00', 'Femme', '', 0, '', '', '', '123564', 'devv', 11, 1);

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
CREATE TABLE IF NOT EXISTS `entreprise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numSiret` bigint(64) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `rue` varchar(50) NOT NULL,
  `codePostal` int(11) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `pays` varchar(64) NOT NULL,
  `email_entreprise` varchar(64) NOT NULL,
  `telephone` varchar(64) NOT NULL,
  `site_web` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id`, `numSiret`, `nom`, `rue`, `codePostal`, `ville`, `pays`, `email_entreprise`, `telephone`, `site_web`) VALUES
(1, 12053642523214, 'NOMENTREPRISE', 'streetrue', 93200, 'villeent', 'France', 'ent@ent.com', '0125362935', ''),
(2, 48919874700029, 'tNOVA IMMOBILIER', '9 AVENUE DU 8 MAI 1945', 95200, 'SARCELLES', 'France', 'nova@nova.com', '012345678', ''),
(4, 98919874700029, 'NOVA CITY', '19 AVENUE DU 17 MAI 1945', 95200, 'Sarcelle', 'France', 'nova@nova.com', '0123456789', ''),
(5, 58919874700029, 'NOVA GALAXY', '75 STREET DU 11 MAI 1945', 95200, 'SARCELLES', 'France', 'novagalxy@nova.com', '012345678', ''),
(6, 45734628727454, 'enetnt', '17 marechal', 75000, '12 arrondissement', 'france', 'entent@entent.com', '0123468975', ''),
(7, 54867524634563, 'ddent', 'ddrue', 95500, 'ddville', 'ddpays', 'ddent@ddent.com', '469873754764', ''),
(8, 45275274678686, 'eeent', 'eeeent', 95500, 'eeent', 'france', 'eeent@eeent.co', '5769484154565', ''),
(9, 95424245785765, 'nnnent', 'nnnentrue', 75000, 'nnnentgonesse', 'nnnentpays', 'nnnent@nnnent.nnnent', '789654', ''),
(10, 42542424242424, 'enn', 'ennrue', 95500, 'ennville', 'france', 'enn@enn.com', '123', ''),
(11, 48919874700029, 'NOVA IMMOBILIER', '9 AVENUE DU 8 MAI 1945', 95200, 'SARCELLES', 'France', 'novatest@test.com', '012345', '');

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

DROP TABLE IF EXISTS `facture`;
CREATE TABLE IF NOT EXISTS `facture` (
  `id_f` int(32) NOT NULL AUTO_INCREMENT,
  `titre` varchar(64) NOT NULL,
  `statut` varchar(64) NOT NULL,
  `date` date NOT NULL,
  `montant` decimal(64,2) NOT NULL,
  `description` varchar(64) NOT NULL,
  `id_utilisateur` int(32) NOT NULL,
  `id_client` int(32) NOT NULL,
  PRIMARY KEY (`id_f`),
  KEY `id_user` (`id_utilisateur`),
  KEY `id_client` (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

DROP TABLE IF EXISTS `projet`;
CREATE TABLE IF NOT EXISTS `projet` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `nomProjet` varchar(64) NOT NULL,
  `descriptionProjet` varchar(64) NOT NULL,
  `date_debutProjet` datetime NOT NULL,
  `date_finProjet` datetime NOT NULL,
  `id_user` int(32) NOT NULL,
  `id_entreprise` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_entreprise` (`id_entreprise`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `sujet` varchar(64) NOT NULL,
  `theme` varchar(64) NOT NULL,
  `contenu` text NOT NULL,
  `reponseSupport` text NOT NULL,
  `status` varchar(64) NOT NULL,
  `dateTicket` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int(32) NOT NULL,
  `id_entreprise` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_entreprise` (`id_entreprise`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `token` varchar(256) DEFAULT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `date_naissance` datetime NOT NULL,
  `sexe` enum('Homme','Femme') NOT NULL DEFAULT 'Homme',
  `rue` varchar(64) NOT NULL,
  `ville` varchar(64) NOT NULL,
  `codePostal` int(11) NOT NULL,
  `pays` varchar(64) NOT NULL,
  `site_web` varchar(64) NOT NULL,
  `personne_contacter` varchar(64) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `poste` varchar(64) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastLogin` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `attempt` int(11) NOT NULL DEFAULT '0',
  `isAdmin` tinyint(1) NOT NULL,
  `id_entreprise` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_entreprise` (`id_entreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `token`, `email`, `password`, `lastname`, `firstname`, `date_naissance`, `sexe`, `rue`, `ville`, `codePostal`, `pays`, `site_web`, `personne_contacter`, `phone`, `poste`, `createdAt`, `updateAt`, `lastLogin`, `attempt`, `isAdmin`, `id_entreprise`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTQ0NzY1MTQsImRhdGEiOjEsImlhdCI6MTU5NDQ3MjkxNH0.N1qWQbMhTjhWPotri8VyzSeS0Q2EI4i3QiTq_iUJe58', 'lol@lol.com', '$2b$10$.iBCqwEkFWH4S2C7o1fnoeHD5XYNWB4uE5x6KIgCWpS3b6.0kahJu', 'lolnomm', 'lolprenom', '1988-09-17 12:00:00', 'Homme', 'azezaezae', 'azeazeaze', 92300, 'azeazezae', '', '', '0120456285', 'dev', '2020-06-26 16:34:15', '2020-07-11 19:28:48', '2020-07-11 15:08:35', 0, 1, 1),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTQzMzA2NjgsImRhdGEiOjIsImlhdCI6MTU5NDMyNzA2OH0.D7fwnJXo52rR_1CmIINJRrhrCP8StdClks-hrSUNR2Y', 'mou@glail.com', '$2b$10$K9pMw9JbBEc/sNo9xM9kXOPH5at.KaHmcTQQwqg5TJ3uRjbLQv0kq', 'mouglailnomm', 'mouglailprenomm', '2020-07-03 12:00:00', 'Homme', '11', 'gonesse', 95500, 'France', '', '', '061234567', 'develop', '2020-07-03 20:15:37', '2020-07-11 18:04:13', '2020-07-09 22:37:48', 0, 0, 1),
(4, NULL, 'test@test.com', '$2b$10$.v/DJuhvV/xm0vb5QV0YzurW5HUq6grSQ6WytcTyoVoaafC.GE8J2', 'testno', 'testpreno', '2020-07-03 12:00:00', 'Homme', 'testrue', 'testville', 95500, 'France', '', '', '0612345678', 'testeur', '2020-07-06 19:48:53', '2020-07-06 19:48:53', '2020-07-06 19:48:53', 0, 1, 4),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTQwNjIzMTgsImRhdGEiOjUsImlhdCI6MTU5NDA1ODcxOH0.rdpxNxNIBCDtuyTc9hYv7QkvqpMkeA5kitsId0hv6OE', 'mdr@mdr.mdr', '$2b$10$T/T8vKk4v56nNsJElGyAieoSz6M3f0AM.xDW64Ocel2QG8GlX3mLm', 'mdrnom', 'mdrprenom', '2020-05-06 12:00:00', 'Homme', '17 rue street', 'gonesse', 95500, 'France', '', '', '0612345678', 'Comedien', '2020-07-06 19:52:58', '2020-07-06 19:52:58', '2020-07-06 20:05:19', 0, 1, 5),
(6, NULL, 'ab@ab.ab', '$2b$10$2Cb1XjXahuNCBjXAjkGyWOhTCLt1acmd5pH2CymjF/Ax7oOmm.DSi', 'dfdf', 'dfdf', '2020-07-02 12:00:00', 'Homme', '17 steet', 'gonesse', 95500, 'fr', '', '', '0123456789', 'abposte', '2020-07-06 20:21:34', '2020-07-06 20:21:34', '2020-07-06 20:21:34', 0, 1, 6),
(7, NULL, 'ddd@ddd.com', '$2b$10$QWdLI.c7YQ8Xu2ZGuRYuOeYSm4jXEN4ZYTg5q8i5/oab2CVIeSvmi', 'ddd', 'ddd', '2020-07-06 12:00:00', 'Homme', 'dd', 'dd', 12345, 'dd', '', '', '0125346245', 'ddd', '2020-07-06 20:27:59', '2020-07-06 20:27:59', '2020-07-06 20:27:59', 0, 1, 7),
(8, NULL, 'bbb@bbb.bbb', '$2b$10$geX1V/C6.IU50BXxXe010emZ3xWag8jK8xPfij5gKlEejKarFfMl2', 'bbb', 'bbb', '2020-07-06 12:00:00', 'Homme', 'bbb', 'bbb', 12345, 'bbb', '', '', '123', 'bbb', '2020-07-06 20:32:18', '2020-07-06 20:32:18', '2020-07-06 20:32:18', 0, 1, 8),
(9, NULL, 'nnn@nnn.nn', '$2b$10$68sQq.Atylg/D5P.EuJlM.fkGgGREPvYV7UJdiaUr/jEfKFXi9QMC', 'nnn', 'nnn', '2020-07-06 12:00:00', 'Femme', 'nnn', 'nnn', 12345, 'nnn', '', '', '123456', 'nnn', '2020-07-06 20:36:29', '2020-07-06 20:36:29', '2020-07-06 20:36:29', 0, 1, 9),
(10, NULL, 'new@new.com', '$2b$10$e15TDxsUJmL.x90QgLDHXukdNC9Bl3UenMZtE18jf8dZL39nWgtbG', 'newnewnom', 'newnewprenom', '2020-07-11 12:00:00', 'Homme', '11 rue', 'Goneesse', 95502, 'France', 'loli.com', '123', '1234567', 'newDev', '2020-07-11 18:38:51', '2020-07-11 19:10:01', '2020-07-11 18:38:51', 0, 0, 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `calendrier`
--
ALTER TABLE `calendrier`
  ADD CONSTRAINT `calendrier_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `calendrier_ibfk_2` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id`);

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`id_entreprise_client`) REFERENCES `entreprise` (`id`),
  ADD CONSTRAINT `clients_ibfk_2` FOREIGN KEY (`id_entreprise_utilisateur`) REFERENCES `entreprise` (`id`);

--
-- Contraintes pour la table `facture`
--
ALTER TABLE `facture`
  ADD CONSTRAINT `facture_ibfk_2` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `facture_ibfk_3` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `projet_ibfk_2` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id`);

--
-- Contraintes pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
