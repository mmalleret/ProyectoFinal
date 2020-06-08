-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto_peliculas
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `resenias`
--

DROP TABLE IF EXISTS `resenias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resenias` (
  `idresenias` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `texto_de_resenia` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `puntaje` int(10) NOT NULL,
  `id_usuarios` int(11) unsigned NOT NULL,
  `id_pelicula` int(11) NOT NULL,
  PRIMARY KEY (`idresenias`),
  UNIQUE KEY `idreseñas_UNIQUE` (`idresenias`),
  KEY `id_usuarios` (`id_usuarios`),
  CONSTRAINT `resenias_ibfk_1` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`idusuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenias`
--

LOCK TABLES `resenias` WRITE;
/*!40000 ALTER TABLE `resenias` DISABLE KEYS */;
INSERT INTO `resenias` VALUES (10,'me re gusto ','0000-00-00 00:00:00','0000-00-00 00:00:00',3,6,385103),(11,'terrible','0000-00-00 00:00:00','0000-00-00 00:00:00',2,8,419704),(12,'lo mas','0000-00-00 00:00:00','0000-00-00 00:00:00',6,10,338762),(24,'FIESTAAAA','2020-05-23 22:59:03','2020-06-08 02:15:43',7,22,385103),(33,'re chanta la peli  ','2020-06-01 14:33:42','2020-06-01 14:33:42',7,24,686245),(35,'se parte esta peli ','2020-06-05 18:49:08','2020-06-05 18:49:08',6,27,574982),(36,'re cool ','2020-06-07 14:00:10','2020-06-07 14:00:10',3,30,419704),(37,'DALEEEEEE SUBILAAAAA','2020-06-08 00:34:49','2020-06-08 00:34:49',10,22,454626),(38,'nada para decir  ','2020-06-08 02:13:49','2020-06-08 02:13:49',10,22,454626);
/*!40000 ALTER TABLE `resenias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idusuarios` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `fecha_de_nacimiento` date DEFAULT NULL,
  PRIMARY KEY (`idusuarios`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Milagros ','milimalleret@hotmail.com ','Milagros12','2001-02-11'),(2,'Zoe ','zoehamra@gmail.com ','Zoe123','2001-04-20'),(6,'hola','milimalleret1@gmail.com','$2a$10$vvy','2020-05-20'),(7,'hola','milimalleret1@gmail.com','$2a$10$XWz','2020-05-20'),(8,'hola','milimalleret1@gmail.com','$2a$10$Frt','2020-05-20'),(9,'hola','milimalleret1@gmail.com','$2a$10$Rry','2020-05-20'),(10,'hola','milimalleret1@gmail.com','$2a$10$n3D','2020-05-20'),(11,'hola','milimalleret1@gmail.com','$2a$10$mIS','2020-05-20'),(12,'hola','milimalleret1@gmail.com','$2a$10$kcM','2020-05-20'),(13,'hola','milimalleret1@gmail.com','$2a$10$.HX','2020-05-20'),(14,'hola','milimalleret1@gmail.com','$2a$10$WrZ','2020-05-20'),(15,'milagros ','milimalleret1@gmail.com','$2a$10$RUZ','2020-05-12'),(16,'herni','milimalleret1@gmail.com','$2a$10$soZ','2020-03-11'),(19,'milagros ','mmalleret@udesa.edu.ar','$2a$10$DGM','2020-05-28'),(20,'milagros ','mfdedonatis@gmail.com','$2a$08$Av7','2020-05-13'),(21,'milagros ','milimalleret123@gmail.com','$2a$08$E70','2020-04-28'),(22,'milagros ','milimalleret12@gmail.com','$2a$08$i3j79iuOfWjjxlI2rbaBwesQZ3vqG.k2mWLF8W.2go934iu9lKLlS','2020-05-06'),(23,'milagros ','mfdedonatis@gmail.com','$2a$08$GhusHlaiUo.2S0BTe/lfuuCxAmrsaYSSyZiOBqewCjFl.flm1cL06','2020-06-11'),(24,'hola','mmallerett@udesa.edu.ar','$2a$08$FXB0sUdkalTKs45UzBBHEOYh9LMTOv58PLgTFT4Mwp5KZ294DY8E.','2020-06-04'),(25,'','milimalleret1299@gmail.com','$2a$08$bhX7g49mRXxb1HPSgM2jEOqO/Cz8EtTLTIuApWl3dTl9VXowA68aS','0000-00-00'),(26,'Maria','milimalleret55@gmail.com','$2a$08$SI7vMTqY6/G8Aj90xCCUqeP.LQfmdwlxbr0eYSyEZiu0MwxlNHsPK','2020-02-20'),(27,'joaquin ','jmalleret@fibertel.com.ar','$2a$08$.vupZeZZZQR0I8wDc/DNN.i3DGZkcNPA63mNcrm2/BvoSRHAjOhNu','2010-02-09'),(28,'milagros ','milimalleret12@gmail.com','$2a$08$czFypsjSUhZvinTuDylNNeC7iuo1rzwMJUjKFy/zToXHu0D/YBv1K','0000-00-00'),(29,'milagros ','milimalleret1266@gmail.com','$2a$08$SlOZjSOy8boig.W2akJ/tOSdsIZA3wSTFVEb9A89ugnmu8zi7CUaK','0000-00-00'),(30,'zoe','zoehamra22@gmail.com','$2a$08$lFgTXzGd8QlGE0oTb.263egPYNH1PF6SLI1FRJli7yZ8Rr5OfHGGS','2001-04-20');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-08 17:55:15
