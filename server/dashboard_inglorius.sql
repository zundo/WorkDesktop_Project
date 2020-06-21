-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  Dim 21 juin 2020 à 17:05
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `email`, `lastname`, `firstname`, `date_naissance`, `sexe`, `rue`, `codePostal`, `ville`, `pays`, `site_web`, `phone`, `poste`, `id_entreprise_client`, `id_entreprise_utilisateur`) VALUES
(1, 'test@test.com', 'lastname', 'firstname', '2020-06-17 00:00:00', 'Homme', '11 rue street', 95500, 'gonesse', 'france', 'test.com', '12345', 'testeur', 2, 1),
(2, 'dev@dev.com', 'rtgfgfg', 'gffgfg', '2020-06-11 00:00:00', 'Femme', 'fgfg', 55555, 'fgfg', 'fgfg', 'fgfg.vv', '06565454525', 'dev', 2, 1),
(3, 'toto@titi.com', 'ererer', 'fff', '1998-05-17 12:00:00', 'Homme', 'street', 95500, 'goneesse', 'france', 'lol.cme', '12345678888', 'devvvlol', 2, 1),
(4, 'totommmo@titi.com', 'ererermmm', 'fffmmm', '1998-05-17 12:00:00', 'Homme', 'streetmmm', 95500, 'goneessemmm', 'francem', 'lolmmm.cme', '12345678888', 'devvvlolmmmm', 2, 1);

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
(1, 123, 'lol', 'lol', 12345, 'lol', 'lol', 'lol@lol.lol', '06123456789', 'mol.com'),
(2, 52555, 'client', 'client', 95500, 'client', 'client', 'client@client.com', '0612345789', 'client.com');

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
  `id_entreprise_utilisateur` int(32) NOT NULL,
  `id_client` int(32) NOT NULL,
  PRIMARY KEY (`id_f`),
  KEY `id_user` (`id_entreprise_utilisateur`),
  KEY `id_client` (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `facture`
--

INSERT INTO `facture` (`id_f`, `titre`, `statut`, `date`, `montant`, `description`, `id_entreprise_utilisateur`, `id_client`) VALUES
(1, 'projet max', 'impaye', '2020-06-25', '125.00', 'pprojet dashboard', 1, 1),
(3, 'tyty', 'tyty', '2020-06-02', '4.00', 'lmllk', 1, 1),
(4, 'titretest', 'statuttest', '2020-06-20', '175.00', 'loloilolhgk,fdhdfh4152352', 1, 1),
(5, 'titretesting', 'statuttestting', '2020-06-25', '5759.95', 'autrechoseeee', 1, 1),
(6, 'titretest', 'statuttest', '2020-06-20', '175.59', 'loloilolhgk,fdhdfh4152352', 1, 1),
(7, 'titretest', 'statuttest', '2020-06-20', '175.58', 'loloilolhgk,fdhdfh4152352', 1, 1),
(8, 'titretest', 'statuttest', '2020-06-20', '175.52', 'loloilolhgk,fdhdfh4152352', 1, 1),
(9, 'titretest', 'statuttest', '2020-06-20', '175.53', 'loloilolhgk,fdhdfh4152352', 1, 1),
(10, 'titretest', 'statuttest', '2020-06-20', '175.52', 'loloilolhgk,fdhdfh4152352', 1, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `projet`
--

INSERT INTO `projet` (`id`, `nomProjet`, `descriptionProjet`, `date_debutProjet`, `date_finProjet`, `id_user`, `id_entreprise`) VALUES
(2, 'nomProjettesting', 'descriptionProjettesting', '2020-06-25 12:00:00', '2020-08-25 12:00:00', 1, 1),
(5, 'newwwwnomProjettdddestingd', 'newwwwdescriptionProjettestingdddd', '2019-06-22 12:00:00', '2022-08-27 12:00:00', 1, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ticket`
--

INSERT INTO `ticket` (`id`, `sujet`, `theme`, `contenu`, `reponseSupport`, `status`, `dateTicket`, `id_user`, `id_entreprise`) VALUES
(2, 'bug page 7', 'BUG', 'contenuuuuuu', 'c\'est normal, ce n\'est pas un bug', 'Répondu', '2020-06-21 18:46:43', 1, 1),
(3, 'bug page 765', 'BUGg', 'contenuuuuuuggg', 'c\'est normal, ce n\'est pas un bug, j\'ai dit !', 'Répondu', '2020-06-21 19:03:18', 1, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `password`, `lastname`, `firstname`, `date_naissance`, `sexe`, `rue`, `ville`, `codePostal`, `pays`, `site_web`, `personne_contacter`, `phone`, `poste`, `createdAt`, `updateAt`, `lastLogin`, `attempt`, `isAdmin`, `id_entreprise`) VALUES
(1, 'dfdf@dffd.ff', 'fff', 'fff', 'fff', '2020-06-25 00:00:00', 'Homme', 'ff', 'ff', 12345, 'gg', 'gg', '06123456788', '061547245464', 'dev', '2020-06-21 17:52:10', '2020-06-21 17:52:10', '2020-06-21 17:52:10', 0, 1, 1);

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
  ADD CONSTRAINT `facture_ibfk_2` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `facture_ibfk_3` FOREIGN KEY (`id_entreprise_utilisateur`) REFERENCES `entreprise` (`id`);

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
