-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 78.110.166.178    Database: efood
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `efoodcategory`
--

DROP TABLE IF EXISTS `efoodcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `efoodcategory` (
  `catId` int NOT NULL AUTO_INCREMENT,
  `catName` varchar(45) DEFAULT NULL,
  `catDescription` text,
  `catImage` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`catId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `efoodcategory`
--

LOCK TABLES `efoodcategory` WRITE;
/*!40000 ALTER TABLE `efoodcategory` DISABLE KEYS */;
INSERT INTO `efoodcategory` VALUES (1,'tasty burger','Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.','s-1.png'),(2,'tasty pizza','Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.','s-2.png'),(3,'cold ice-cream','Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.','s-3.png'),(4,'cold drinks','Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.','s-4.png'),(5,'tasty sweets','Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.','s-5.png'),(6,'healty breakfast','Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda inventore neque amet ipsa tenetur voluptates aperiam tempore libero labore aut.','s-6.png');
/*!40000 ALTER TABLE `efoodcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_has_category`
--

DROP TABLE IF EXISTS `food_has_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_has_category` (
  `foodId` int NOT NULL,
  `catId` int NOT NULL,
  PRIMARY KEY (`foodId`,`catId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_has_category`
--

LOCK TABLES `food_has_category` WRITE;
/*!40000 ALTER TABLE `food_has_category` DISABLE KEYS */;
INSERT INTO `food_has_category` VALUES (1,1),(2,1),(3,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1);
/*!40000 ALTER TABLE `food_has_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fooditem`
--

DROP TABLE IF EXISTS `fooditem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fooditem` (
  `foodId` int NOT NULL AUTO_INCREMENT,
  `foodName` varchar(45) DEFAULT NULL,
  `foodDescription` text,
  `foodImage` varchar(45) DEFAULT NULL,
  `foodBestSeller` int DEFAULT '0',
  `foodOrderNb` int DEFAULT '0',
  `foodStars` int DEFAULT '1',
  `foodPrice` double DEFAULT '0',
  PRIMARY KEY (`foodId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fooditem`
--

LOCK TABLES `fooditem` WRITE;
/*!40000 ALTER TABLE `fooditem` DISABLE KEYS */;
INSERT INTO `fooditem` VALUES (1,'tasty burger','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','p-1.jpg',1,20,5,12),(2,'tasty cakes','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','p-2.jpg',1,15,4,11),(3,'tasty sweets','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','p-3.jpg',1,10,3,10),(25,'tasty food','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-1.jpg',0,2,1,8),(26,'tasty food','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-2.jpg',0,2,1,9),(27,'tasty food','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-3.jpg',0,2,1,5),(28,'tasty food','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-4.jpg',0,2,1,4),(29,'tasty food','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-5.jpg',0,2,1,12),(30,'tasty food','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-6.jpg',0,2,1,15),(31,'tasty food','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-7.jpg',0,2,1,18),(32,'tasty food','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-8.jpg',0,2,1,22),(33,'tasty food ','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, ipsum.','g-7.jpg',0,2,1,23);
/*!40000 ALTER TABLE `fooditem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-21  0:22:05
