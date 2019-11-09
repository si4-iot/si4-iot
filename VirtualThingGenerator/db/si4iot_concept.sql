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
-- Table structure for table `concept`
--

DROP TABLE IF EXISTS `concept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concept` (
  `idconcept` int(11) NOT NULL AUTO_INCREMENT,
  `idontology` int(11) DEFAULT NULL,
  `concept` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idconcept`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concept`
--

LOCK TABLES `concept` WRITE;
/*!40000 ALTER TABLE `concept` DISABLE KEYS */;
INSERT INTO `concept` VALUES (1,1,'saref:Temperature'),(2,1,'saref:Humidity'),(3,1,'saref:Pressure'),(4,1,'saref:Lighting device'),(5,1,'saref:Smoke'),(6,2,'om:Rankine_temperature_scale'),(7,2,'om:Luminance_unit'),(8,2,'om:Fahrenheit_temperature_scale'),(9,2,'om:Celsius_temperature_scale'),(10,1,'saref:Occupancy'),(11,1,'saref:Pressure'),(12,4,'geo:Point'),(13,1,'saref:Actuator'),(14,1,'saref:Sensor'),(15,3,'m3-lite:GPSSensor'),(16,3,'m3-lite:HeartBeatSensor'),(17,3,'m3-lite:PrecipitationSensor'),(18,3,'m3-lite:WeightSensor'),(19,3,'m3-lite:CO2'),(20,3,'m3-lite:BeatPerMinute'),(21,3,'m3-lite:HeartBeatSensor'),(22,3,'m3-lite:Humidity'),(23,3,'m3-lite:MeterPerSecond'),(24,3,'m3-lite:KilometerPerHour'),(25,3,'m3-lite:Decibel'),(26,3,'m3-lite:Lux'),(27,3,'m3-lite:LightSensor'),(28,3,'m3-lite:Magnetometer'),(29,3,'m3-lite:Tesla'),(30,3,'m3-lite:PPM'),(31,1,'saref:OnOffFunction'),(32,3,'m3-lite:BodyThermometer'),(33,3,'m3-lite:FallDetector'),(34,1,'saref:OnOffState'),(35,3,'m3-lite:Glucometer'),(36,3,'m3-lite:MmolPerLiter'),(37,3,'m3-lite:Odometer'),(38,3,'m3-lite:Miles'),(39,3,'m3-lite:GyroscopeSensor'),(40,3,'m3-lite:Pascal'),(41,3,'m3-lite:Kilo'),(42,3,'m3-lite:Inch'),(43,3,'m3-lite:SoundSensor'),(44,3,'m3-lite:MilligramPerCubicMetre'),(45,3,'m3-lite:Centimetre'),(46,2,'om:Angular_acceleration_unit'),(47,3,'m3-lite:Pedometer'),(48,5,'xsd:positiveInteger');
/*!40000 ALTER TABLE `concept` ENABLE KEYS */;
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
