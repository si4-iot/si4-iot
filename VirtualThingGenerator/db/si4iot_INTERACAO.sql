-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: si4iot
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `INTERACAO`
--

DROP TABLE IF EXISTS `INTERACAO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `INTERACAO` (
  `idinteracao` int(11) NOT NULL AUTO_INCREMENT,
  `nome_interacao` varchar(100) DEFAULT NULL,
  `min_valor` float DEFAULT NULL,
  `max_valor` float DEFAULT NULL,
  `context` varchar(200) DEFAULT NULL,
  `observable` varchar(50) DEFAULT NULL,
  `readonly` varchar(50) DEFAULT NULL,
  `idconcept_context` int(11) DEFAULT NULL,
  `idconcept_unit_measurement` int(11) DEFAULT NULL,
  PRIMARY KEY (`idinteracao`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `INTERACAO`
--

LOCK TABLES `INTERACAO` WRITE;
/*!40000 ALTER TABLE `INTERACAO` DISABLE KEYS */;
INSERT INTO `INTERACAO` VALUES (7,'temperature',0,100,'saref:Temperature','true','true',1,9),(8,'temperature',-20,80,'saref:Temperature','true','true',2,8),(9,'temperature',-5,120,'saref:Temperature','true','true',1,6),(10,'luminosity',0,5000,NULL,'true','true',4,7),(11,'humidity',0,100,'saref:Humidity','true','true',2,22),(12,'gps',-100,100,NULL,'true','true',15,12),(13,'ultrasonic',0,100,NULL,'true','true',14,45),(14,'magnetic',0,1000,NULL,'true','true',28,29),(15,'pressure',0,100,'saref:Pressure','true','true',11,40),(16,'weight',0,100,NULL,'true','true',18,41),(17,'heart_rate',0,200,NULL,'true','true',21,20),(18,'oxygen',0,200,NULL,'true','true',14,30),(19,'speed',0,200,NULL,'true','true',14,24),(20,'speed',0,1000,NULL,'true','true',14,23),(21,'height',0,4000,NULL,'true','true',14,42),(22,'precipitation',0,100,NULL,'true','true',17,44),(23,'carbon_monoxide ',0,100,NULL,'true','true',14,30),(24,'carbon_dioxide',0,100,NULL,'true','true',14,19),(25,'Pedometer',0,1,NULL,'true','true',47,48),(26,'sound',0,52,NULL,'true','true',43,25),(27,'led',0,1,NULL,'true','false',4,31),(28,'light',0,100,'saref:Light','true','true',27,26),(29,'engine',0,1,NULL,'true','true',13,31),(30,'smoke',0,100,'saref:Smoke','true','true',5,30),(31,'accelerometer',0,1000,NULL,'true','true',14,46),(32,'gyroscope',0,1000,NULL,'true','true',39,46),(33,'odometer',0,100,NULL,'true','true',37,38),(34,'falldetector',0,100,NULL,'true','true',33,34),(35,'buzzer',0,1,NULL,'true','true',13,31),(36,'ozone',0,100,NULL,'true','true',14,30),(37,'Glucometer',0,100,NULL,'true','true',35,36);
/*!40000 ALTER TABLE `INTERACAO` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-08 21:16:53
