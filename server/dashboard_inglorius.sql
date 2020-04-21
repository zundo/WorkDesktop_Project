-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  mar. 21 avr. 2020 à 15:31
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
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `rue` varchar(50) NOT NULL,
  `codePostal` int(11) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `pays` varchar(64) NOT NULL,
  `site_web` varchar(64) NOT NULL,
  `personne_contacter` varchar(32) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 NOT NULL,
  `id_entreprise` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_entreprise` (`id_entreprise`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
CREATE TABLE IF NOT EXISTS `entreprise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numSiret` int(64) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `rue` varchar(50) NOT NULL,
  `codePostal` int(11) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `pays` varchar(64) NOT NULL,
  `email_entreprise` varchar(64) NOT NULL,
  `telephone` varchar(64) NOT NULL,
  `site_web` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id`, `numSiret`, `nom`, `rue`, `codePostal`, `ville`, `pays`, `email_entreprise`, `telephone`, `site_web`) VALUES
(1, 1234567899, 'Inglorius\'s Entreprise', '17 rue inglor', 95500, 'Gonesse', 'France', 'support@inglorius.com', '0125458678', 'http://localhost:8080/inglorius'),
(2, 1457987548, 'zundo\'s entreprise', '12 rue zumbo', 75000, 'Paris', 'France', 'support@zundo.com', '0125487633', 'http://localhost:8080/zundo'),
(3, 1234, 'lol', 'lol', 7500, 'lol', 'lol', 'loli@loli.loli', '061234568', 'lol'),
(4, 159, 'azerty', 'azerty', 75000, 'azerty', 'azerty', 'azerty@azerty.azerty', '0698765439', 'azerty.com'),
(5, 159, 'azerty', 'azerty', 75000, 'azerty', 'azerty', 'azerty@azerty.azerty', '0698765439', 'azerty.com'),
(6, 159, 'azerty', 'azerty', 75000, 'azerty', 'azerty', 'azerty@azerty.azerty', '0698765439', 'azerty.com'),
(7, 159, 'azerty', 'azerty', 75000, 'azerty', 'azerty', 'azerty@azerty.azerty', '0698765439', 'azerty.com'),
(8, 159, 'azerty', 'azerty', 75000, 'azerty', 'azerty', 'azerty@azerty.azerty', '0698765439', 'azerty.com'),
(9, 159, 'azerty', 'azerty', 75000, 'azerty', 'azerty', 'azerty@azerty.azerty', '0698765439', 'azerty.com'),
(10, 159, 'azerty', 'azerty', 75000, 'azerty', 'azerty', 'azerty@azerty.azerty', '0698765439', 'azerty.com'),
(11, 159, 'azerty', 'azerty', 75000, 'azerty', 'azerty', 'azerty@azerty.azerty', '0698765439', 'azerty.com'),
(12, 789, 'cas', 'cas', 75000, 'cas', 'cas', 'casi@casi.casi', '0612345679', 'casi.com'),
(13, 789, 'cas', 'cas', 75000, 'cas', 'cas', 'casi@casi.casi', '0612345679', 'casi.com'),
(14, 159, 'goodi', 'goodi', 75000, 'goodi', 'goodi', 'goodi@goodi.go', '012345678', 'goodi.com');

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

DROP TABLE IF EXISTS `facture`;
CREATE TABLE IF NOT EXISTS `facture` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `nom` varchar(64) NOT NULL,
  `statut` varchar(64) NOT NULL,
  `date` date NOT NULL,
  `montant` decimal(64,3) NOT NULL,
  `description` varchar(64) NOT NULL,
  `id_user` int(32) NOT NULL,
  `id_client` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_client` (`id_client`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

DROP TABLE IF EXISTS `projet`;
CREATE TABLE IF NOT EXISTS `projet` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `nom` varchar(64) NOT NULL,
  `description` varchar(64) NOT NULL,
  `id_user` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
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
  `id_user` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `password`, `lastname`, `firstname`, `date_naissance`, `sexe`, `rue`, `ville`, `codePostal`, `pays`, `site_web`, `personne_contacter`, `phone`, `poste`, `createdAt`, `updateAt`, `lastLogin`, `attempt`, `isAdmin`, `id_entreprise`) VALUES
(1, 'mou@mou.mou', '$2b$10$s1GnIuYebIKsaGj1QP/7ge1Bojoh0qdCB1uxBuyH8O58xGJW25aeW', 'nirkos', 'mounir', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:20:00', '2020-04-18 23:20:00', '2020-04-18 23:20:00', 0, 0, 1),
(2, 'mou2@mou2.mou2', '$2b$10$zu5tHcLEkDtXM5XBy58fWuVbahcKRrXyGaeEVxflqp9gOAeBDEoe2', 'nirkos2', 'mounir2', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'http://localhost:3000/mou2', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:34:20', '2020-04-18 23:34:20', '2020-04-18 23:34:20', 0, 0, 1),
(3, 'mou3@mou3.mou3', '$2b$10$VZSMNC5ecJxiW2bF1achKOwU.eH81lYV5ompOA1D2bCXOufbb2X5y', 'nirkos3', 'mounir3', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:38:37', '2020-04-18 23:38:37', '2020-04-18 23:38:37', 0, 0, 1),
(4, 'mou4@mou4.mou4', '$2b$10$e4nWdn/VhT6HSML0BisZiOYA7fGlWZavbz1Byc8tVVoeW1qKjqRbS', 'nirkos4', 'mounir4', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:44:07', '2020-04-18 23:44:07', '2020-04-18 23:44:07', 0, 0, 1),
(5, 'mou5@mou5.mou5', '$2b$10$IDIVTW2A4xRCJXJhaf25YeY24l3jqBnrv8tb3oqlaXGGQfm1iZdlG', 'nirkos5', 'mounir5', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:55:45', '2020-04-18 23:55:45', '2020-04-18 23:55:45', 0, 0, 1),
(6, 'mou6@mou6.mou6', '$2b$10$irPZMCb/G0WCWFGUfwYuXOHIa8Ehfwas57GTLtQ2JBuldYUe0.Ece', 'nirkos6', 'mounir6', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-19 00:03:00', '2020-04-19 00:03:00', '2020-04-19 00:03:00', 0, 0, 1),
(7, 'mou7@mou7.mou7', '$2b$10$DzFZvuFESza8wWszrIEfcO//fdXuT29KV2tQzXy60m.R89LxbKYWG', 'nirkos7', 'mounir7', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-19 00:05:46', '2020-04-19 00:05:46', '2020-04-19 00:05:46', 0, 0, 1),
(8, 'mou8@mou8.mou8', '$2b$10$K5rruJtOAjfGZY2703737eGoaIV2MT3HSZWiTMHe3SM/SOuF4yP3G', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-19 00:11:25', '2020-04-19 00:11:25', '2020-04-19 00:11:25', 0, 0, 1),
(9, 'mou9@mou9.mou9', '$2b$10$9TXsPPNdQtlygh0WYvsyQ.E3rLK2l1MelOakQZDwnLCeIfMbjSYWG', 'nirkos9', 'mounir9', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 16:58:57', '2020-04-20 16:58:57', '2020-04-20 16:58:57', 0, 0, 1),
(10, 'mou0@mou0.mou0', '$2b$10$n24/kBYCkHN0pbdP6j6msuL4l6Z4WQMyhHrQ6m6x5D596EFuuIknS', 'nirkos0', 'mounir0', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:01:02', '2020-04-20 17:01:02', '2020-04-20 17:01:02', 0, 0, 1),
(11, 'mou11@mou11.mou11', '$2b$10$tNhTHTEbLX9XXZE6cEJeDuIHPR0Q3pSZWd0OL1SDfLipHr0JwjJLO', 'nirkos11', 'mounir11', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:05:26', '2020-04-20 17:05:26', '2020-04-20 17:05:26', 0, 0, 1),
(12, 'mou12@mou12.mou12', '$2b$10$SJ9x3AxlB0v0KlkpNzAgleSVcTJVvX4myDmkPON5mFF53Hbl1OA16', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:08:37', '2020-04-20 17:08:37', '2020-04-20 17:08:37', 0, 0, 1),
(13, 'mou13@mou13.mou13', '$2b$10$XUQ90fQuzZ3W42h756ucXuJ5nprPs7gz2K1sXjuoMui0sKN7nML16', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:10:04', '2020-04-20 17:10:04', '2020-04-20 17:10:04', 0, 0, 1),
(14, 'mou14@mou14.mou14', '$2b$10$UtNGCSlev8dq7BAOgqaLJuEZ7ajSYAVFq./e1Rl3eTGC/ycV4aoWW', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:11:43', '2020-04-20 17:11:43', '2020-04-20 17:11:43', 0, 0, 1),
(15, 'mou15@mou15.mou15', '$2b$10$bCRvBBxt8Ya81YCfh1/Ut.sP.oJQq90X/jubfZVY/GX.UihuHtk2i', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:15:57', '2020-04-20 17:15:57', '2020-04-20 17:15:57', 0, 0, 1),
(16, 'mou16@mou16.mou16', '$2b$10$w9QDWq8Xv84atu3Hz3rXi.hd/FM4kjg9/FSV8yrBExENtvvNb0rq2', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:17:12', '2020-04-20 17:17:12', '2020-04-20 17:17:12', 0, 0, 1),
(17, 'mou17@mou17.mou17', '$2b$10$Hzftp0.bfqPAB7TUKs9uGOWU192/T7RhVfIGwMqwJ8tvcge8yHPla', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:22:41', '2020-04-20 17:22:41', '2020-04-20 17:22:41', 0, 0, 1),
(18, 'mou18@mou18.mou18', '$2b$10$BjNnvzdERASexuSYZW8vFO1pyrz6WeMJrLGSW1k4df7NZWEDCS.i2', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:24:47', '2020-04-20 17:24:47', '2020-04-20 17:24:47', 0, 0, 1),
(19, 'mou19@mou19.mou19', '$2b$10$Xmbxkg/9UFjgyA96owM.HONQ9X0BbZbUw2iRSeQ41jMw21p8muZD.', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:27:15', '2020-04-20 17:27:15', '2020-04-20 17:27:15', 0, 0, 1),
(20, 'mou20@mou20.mou20', '$2b$10$7lGqxOoKRQ0dFs5f17TrvePRLtBfGQ391JNtNwbDMnVLi5U0Gvsne', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:27:47', '2020-04-20 17:27:47', '2020-04-20 17:27:47', 0, 0, 1),
(21, 'mou21@mou21.mou21', '$2b$10$jJd0BJ0XJwdgnn1dPtV/1eh03.XWQ3diRfYW9B3aV.IbDLEYCleNe', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:32:02', '2020-04-20 17:32:02', '2020-04-20 17:32:02', 0, 0, 1),
(22, 'mou22@mou22.mou22', '$2b$10$Fk0dRs9N0F35Sg98GWt3HOdARtxtCr0Y5lSBb3BxPP9D9.lxtR7P.', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:34:20', '2020-04-20 17:34:20', '2020-04-20 17:34:20', 0, 0, 1),
(23, 'mou23@mou23.mou23', '$2b$10$uGFjaSHlB29MxR5nGXWkRO7BiEJf5BXA3gtw1cElujf0eCz5FDZb.', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:35:08', '2020-04-20 17:35:08', '2020-04-20 17:35:08', 0, 0, 1),
(24, 'mou24@mou24.mou24', '$2b$10$4r49MOfeys8KqW0zCCgok.ueTbF2XEEHW74eKdpmupofO1.h1.sNe', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:36:28', '2020-04-20 17:36:28', '2020-04-20 17:36:28', 0, 0, 1),
(25, 'mou24@mou24.mou25', '$2b$10$TOvplA32XQmOekFwnDxcu.aNdS/dc.QoLZd91fTNN0ZwltTj7mBry', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:42:24', '2020-04-20 17:42:24', '2020-04-20 17:42:24', 0, 0, 1),
(26, 'mou24@mou24.mou26', '$2b$10$5NEXp3X.vV0BMhM.s15iHuHmQLR5.D2NolI0KFuLDjBgejzUX7Mvm', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:46:22', '2020-04-20 17:46:22', '2020-04-20 17:46:22', 0, 0, 1),
(27, 'mou24@mou24.mou27', '$2b$10$IcpZ75MSvDhT/KC4kwIZfuN9IcjJcV5SAZr7omtK8nnQ0mFHHmdAW', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 17:49:07', '2020-04-20 17:49:07', '2020-04-20 17:49:07', 0, 0, 1),
(28, 'mou22@mou22.mou22u', '$2b$10$n9uJ2hCB082jHNAMK.tIkuM4e6AkXTcvpLdTKCFSru7hdfFGO/3iC', 'nirkos4', 'mounir4', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-20 20:51:59', '2020-04-20 20:51:59', '2020-04-20 20:51:59', 0, 0, 1),
(29, 'lol@lol.lol', '$2b$10$Zi8JyInZZzrTVGCToSsGb.68vcx/rR4ifztsB/uj0SW8htQg2wDdO', 'lol', 'lol', '2020-04-20 12:00:00', 'Homme', 'lol', 'lol', 95500, 'lol', 'lol', '061234568', '061234568', 'lol', '2020-04-20 22:11:42', '2020-04-20 22:11:42', '2020-04-20 22:11:42', 0, 0, 3),
(31, 'good@good.good', '$2b$10$X.Xxjw.TzwvgJ5NxrDXqt.AVOj5UlHGngTbUoj0.q0Wfj/Lkzv4aO', 'good', 'good', '2020-04-20 12:00:00', 'Homme', 'good', 'good', 95500, 'good', 'good.com', '0612345678', '0612345678', 'good', '2020-04-20 22:50:45', '2020-04-20 22:50:45', '2020-04-20 22:50:45', 0, 0, 14);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id`);

--
-- Contraintes pour la table `facture`
--
ALTER TABLE `facture`
  ADD CONSTRAINT `facture_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `facture_ibfk_2` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`);

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
