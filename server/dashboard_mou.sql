-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  sam. 18 avr. 2020 à 22:12
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
-- Base de données :  `dashboard_mou`
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id`, `numSiret`, `nom`, `rue`, `codePostal`, `ville`, `pays`, `email_entreprise`, `telephone`, `site_web`) VALUES
(1, 1234567899, 'Inglorius\'s Entreprise', '17 rue inglor', 95500, 'Gonesse', 'France', 'support@inglorius.com', '0125458678', 'http://localhost:8080/inglorius'),
(2, 1457987548, 'zundo\'s entreprise', '12 rue zumbo', 75000, 'Paris', 'France', 'support@zundo.com', '0125487633', 'http://localhost:8080/zundo');

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
  `id_entreprise` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_entreprise` (`id_entreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `password`, `lastname`, `firstname`, `date_naissance`, `sexe`, `rue`, `ville`, `codePostal`, `pays`, `site_web`, `personne_contacter`, `phone`, `poste`, `createdAt`, `updateAt`, `lastLogin`, `attempt`, `id_entreprise`) VALUES
(1, 'mou@mou.mou', '$2b$10$s1GnIuYebIKsaGj1QP/7ge1Bojoh0qdCB1uxBuyH8O58xGJW25aeW', 'nirkos', 'mounir', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:20:00', '2020-04-18 23:20:00', '2020-04-18 23:20:00', 0, 1),
(2, 'mou2@mou2.mou2', '$2b$10$zu5tHcLEkDtXM5XBy58fWuVbahcKRrXyGaeEVxflqp9gOAeBDEoe2', 'nirkos2', 'mounir2', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'http://localhost:3000/mou2', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:34:20', '2020-04-18 23:34:20', '2020-04-18 23:34:20', 0, 1),
(3, 'mou3@mou3.mou3', '$2b$10$VZSMNC5ecJxiW2bF1achKOwU.eH81lYV5ompOA1D2bCXOufbb2X5y', 'nirkos3', 'mounir3', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:38:37', '2020-04-18 23:38:37', '2020-04-18 23:38:37', 0, 1),
(4, 'mou4@mou4.mou4', '$2b$10$e4nWdn/VhT6HSML0BisZiOYA7fGlWZavbz1Byc8tVVoeW1qKjqRbS', 'nirkos4', 'mounir4', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:44:07', '2020-04-18 23:44:07', '2020-04-18 23:44:07', 0, 1),
(5, 'mou5@mou5.mou5', '$2b$10$IDIVTW2A4xRCJXJhaf25YeY24l3jqBnrv8tb3oqlaXGGQfm1iZdlG', 'nirkos5', 'mounir5', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-18 23:55:45', '2020-04-18 23:55:45', '2020-04-18 23:55:45', 0, 1),
(6, 'mou6@mou6.mou6', '$2b$10$irPZMCb/G0WCWFGUfwYuXOHIa8Ehfwas57GTLtQ2JBuldYUe0.Ece', 'nirkos6', 'mounir6', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-19 00:03:00', '2020-04-19 00:03:00', '2020-04-19 00:03:00', 0, 1),
(7, 'mou7@mou7.mou7', '$2b$10$DzFZvuFESza8wWszrIEfcO//fdXuT29KV2tQzXy60m.R89LxbKYWG', 'nirkos7', 'mounir7', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-19 00:05:46', '2020-04-19 00:05:46', '2020-04-19 00:05:46', 0, 1),
(8, 'mou8@mou8.mou8', '$2b$10$K5rruJtOAjfGZY2703737eGoaIV2MT3HSZWiTMHe3SM/SOuF4yP3G', 'nirkos8', 'mounir8', '1998-05-17 12:00:00', 'Homme', '17 rue alexandre', 'Gonesse', 95500, 'France', 'Inconnu', 'Inconnu', '0614587425', 'Developpeur', '2020-04-19 00:11:25', '2020-04-19 00:11:25', '2020-04-19 00:11:25', 0, 1);

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
