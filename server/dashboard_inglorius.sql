-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  sam. 16 mai 2020 à 21:45
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
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `date_naissance` datetime NOT NULL,
  `sexe` enum('Homme','Femme') CHARACTER SET utf8 NOT NULL DEFAULT 'Homme',
  `rue` varchar(50) NOT NULL,
  `codePostal` int(11) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `pays` varchar(64) NOT NULL,
  `site_web` varchar(64) NOT NULL,
  `personne_contacter` varchar(32) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `poste` varchar(64) NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 NOT NULL,
  `id_entreprise_client` int(32) NOT NULL,
  `id_entreprise_utilisateur` int(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_entreprise` (`id_entreprise_client`),
  KEY `id_entreprise_utilisateur` (`id_entreprise_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `lastname`, `firstname`, `date_naissance`, `sexe`, `rue`, `codePostal`, `ville`, `pays`, `site_web`, `personne_contacter`, `phone`, `poste`, `email`, `id_entreprise_client`, `id_entreprise_utilisateur`) VALUES
(1, 'clientlastname', 'clientfirstname', '2020-05-12 10:00:00', 'Femme', '11 rue clientrue', 75000, 'clientville', 'France', 'client.com', '0123456789', '0654879854', 'Communication', 'client@client.clientcom', 3, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id`, `numSiret`, `nom`, `rue`, `codePostal`, `ville`, `pays`, `email_entreprise`, `telephone`, `site_web`) VALUES
(1, 1717, 'sde', 'sd', 75000, 'sd', 'sd', 'sde@sde.sde', '125', 'Inconnu'),
(2, 998, 'patronENT', 'patronent', 75000, 'patronent', 'patronent', 'patronent@lol.com', '0612365498', 'patronent.com'),
(3, 147896, 'clientENTNom', 'clientENTrue', 95500, 'clientENTVille', 'France', 'clientENT@clientENT.com', '0654548587', 'clientENT.com');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `password`, `lastname`, `firstname`, `date_naissance`, `sexe`, `rue`, `ville`, `codePostal`, `pays`, `site_web`, `personne_contacter`, `phone`, `poste`, `createdAt`, `updateAt`, `lastLogin`, `attempt`, `isAdmin`, `id_entreprise`) VALUES
(1, 'sd@sd.ds', '$2b$10$583PPLEyUU.NZFCc6UPvNOH/NUf0A22CVf9O9Dn5sxNJFbIIphQJi', 'sded', 'sded', '2020-04-21 12:00:00', 'Homme', 'sd', 'sd', 95500, 'sd', 'sded.com', '12345', '123', 'sd', '2020-04-21 19:52:34', '2020-05-01 19:08:14', '2020-05-01 18:19:07', 0, 1, 1),
(2, 'tkt@kt.tkt', '$2b$10$1wvp6ouwa5TjKuCM2aUhz.1Xcc9LfYe1BqBM5OQcBCUX.ZtGqQtwG', 'tkt', 'tkt', '2020-04-21 12:00:00', 'Homme', 'tkt', 'tkt', 95500, 'tkt', 'tkt.com', '456', '123', 'tkt', '2020-04-21 20:59:12', '2020-04-21 20:59:12', '2020-05-16 20:11:20', 0, 1, 1),
(3, 'lol@lol.lol', '$2b$10$v2zGT9L1j9m2nIldB8i9oupJNC742jMCcSXbug/ber7gHtFUsveIK', 'lol', 'olo', '2020-04-21 12:00:00', 'Femme', 'olo', 'lol', 95500, 'lol', 'lol', '34', '12', 'lol', '2020-04-21 21:00:02', '2020-04-21 21:00:02', '2020-05-16 20:31:30', 0, 0, 1),
(4, 'patron@patron.fr', '$2b$10$X2rTGHfwlLXdugJuacIJceXyS7QYuAQ/W.oG9VJIGxEo8FmAgR2E2', 'patron', 'patron', '2020-04-26 12:00:00', 'Femme', 'patron', 'patron2', 95500, 'patron2', 'patron2.com', '0612345678', '0612345678', 'patron', '2020-04-26 17:16:26', '2020-04-26 17:16:26', '2020-05-16 20:13:21', 5, 1, 2);

--
-- Contraintes pour les tables déchargées
--

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
