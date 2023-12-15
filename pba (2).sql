-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 02:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pba`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner_data`
--

CREATE TABLE `banner_data` (
  `id` int(4) NOT NULL,
  `orga_name` varchar(255) NOT NULL,
  `lead_name` varchar(255) NOT NULL,
  `banner_img` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `verify` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banner_data`
--

INSERT INTO `banner_data` (`id`, `orga_name`, `lead_name`, `banner_img`, `created_at`, `verify`) VALUES
(1, 'appsturn software solution, indore', 'shefali sethiya', 'C:\\fakepath\\logo.png', '2023-11-30 13:27:37', 0),
(2, 'appsturn ', 'shefali', 'C:\\fakepath\\logo.png', '2023-11-30 13:32:58', 0),
(3, 'shreedhar gift', 'sumit', 'C:\\fakepath\\slider.png', '2023-11-30 13:36:46', 0),
(4, 'appsturn', 'aarohi', '', '2023-11-30 13:42:36', 0),
(5, 'appsturn', 'shefali', '1701333058742.png', '2023-11-30 14:00:58', 0),
(6, 'appsturn software solutin,indore', 'shefali sethiya', '1701333864567.png', '2023-11-30 14:14:24', 0),
(7, 'appsturn software solution, indore', 'shefali sethiya', '1701337027745.png', '2023-11-30 15:07:07', 0);

-- --------------------------------------------------------

--
-- Table structure for table `business_mast`
--

CREATE TABLE `business_mast` (
  `owner_name` varchar(255) NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `busi_category` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_datetime` datetime NOT NULL,
  `receipt_imag` varchar(255) NOT NULL,
  `verify` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_mast`
--

INSERT INTO `business_mast` (`owner_name`, `organization_name`, `address`, `city`, `busi_category`, `website`, `description`, `created_datetime`, `receipt_imag`, `verify`) VALUES
('shefali sethiya', 'appsturn software', '308 sharma complex,near vaishnav school', 'indore', 'software services', 'appsturnsoftware.com', 'develope all type ofd web and app application', '2023-12-03 22:32:54', '1701622974961.jfif', 0);

-- --------------------------------------------------------

--
-- Table structure for table `category_mast`
--

CREATE TABLE `category_mast` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_mast`
--

INSERT INTO `category_mast` (`cat_id`, `cat_name`) VALUES
(1, 'electric& electronics'),
(2, 'artifical jewellery'),
(3, 'men fashion'),
(4, 'women fashion'),
(5, 'kids fashion'),
(6, 'toy product'),
(7, 'toy product');

-- --------------------------------------------------------

--
-- Table structure for table `contact_detail_query`
--

CREATE TABLE `contact_detail_query` (
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `member_mast`
--

CREATE TABLE `member_mast` (
  `id` int(11) NOT NULL,
  `member_name` varchar(255) NOT NULL,
  `member_email` varchar(255) NOT NULL,
  `member_contact` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `login_password` varchar(255) NOT NULL,
  `member_social_status` varchar(255) NOT NULL,
  `created_datetime` datetime NOT NULL,
  `receipt_imag` varchar(255) NOT NULL,
  `verify` varchar(255) DEFAULT '0',
  `reason` varchar(255) NOT NULL,
  `role` int(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member_mast`
--

INSERT INTO `member_mast` (`id`, `member_name`, `member_email`, `member_contact`, `address`, `city`, `state`, `login_password`, `member_social_status`, `created_datetime`, `receipt_imag`, `verify`, `reason`, `role`) VALUES
(4, 'shefali', 'shefaliratnawat@gmail.com', '8109553925', '308 sharma complex,near vaishnav school', 'indore', 'm.p.', '123', 'member', '2023-11-29 14:11:13', '', 'verified', 'welcome', 2),
(5, 'shefali', 'shefaliratnawat1@gmail.com', '8109553925', '308 sharma complex,near vaishnav school', 'indore', 'm.p.', '123', 'member', '2023-11-29 14:11:53', '', 'verified', 'get payment', 1),
(6, 'test', 'test@gmail.com', '9406875520', 'test', 'test', 'test', '123', 'test', '2023-12-03 12:08:59', '1701585539562.jfif', '0', '', 0),
(7, 'mishthi', 'misthi@gmail.com', '9893606788', 'pancham colony', 'alote', 'm.p.', '123', 'member', '2023-12-05 09:53:46', '1701750226248.jfif', 'verified', 'get payment', 0),
(8, 'neeraj mehta', 'mehta.neeraj@gmail.com', '9009704144', 'pune', 'pune', 'maharastra', '123', 'member', '2023-12-06 14:04:45', '1701851685536.png', 'verified', 'verified', 1),
(9, 'test6', 'test6@gmail.com', '9009704144', 'indore', 'indore', 'm.p.', '123', 'member', '2023-12-06 16:30:05', '1701860405828.jpg', 'verified', 'gett correct details', 1);

-- --------------------------------------------------------

--
-- Table structure for table `newsletter`
--

CREATE TABLE `newsletter` (
  `contact` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_mast`
--

CREATE TABLE `product_mast` (
  `product_name` varchar(255) NOT NULL,
  `oranization_name` varchar(255) NOT NULL,
  `product_description` varchar(255) NOT NULL,
  `product_price` varchar(255) NOT NULL,
  `discount` int(11) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `receipt_imag` varchar(255) NOT NULL,
  `verify` int(4) NOT NULL DEFAULT 0,
  `created_At` datetime NOT NULL DEFAULT current_timestamp(),
  `catogery` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_mast`
--

INSERT INTO `product_mast` (`product_name`, `oranization_name`, `product_description`, `product_price`, `discount`, `contact`, `receipt_imag`, `verify`, `created_At`, `catogery`) VALUES
('', '', 'i-57thgen', '50000', 2, '8109553925', 'C:\\fakepath\\slider.png', 0, '2023-12-03 15:49:01', ''),
('', '', 'i-5 7th gen', '50000', 2, '8109553925', 'C:\\fakepath\\slider.png', 0, '2023-12-03 15:49:01', ''),
('', '', 'learning toy', '500', 2, '8109553925', 'C:\\fakepath\\slider.png', 0, '2023-12-03 15:49:01', ''),
('toy', 'toy house', 'learning toy', '2000', 0, '8109553925', '', 0, '2023-12-03 15:49:01', ''),
('game', 'game world', 'learning game', '5000', 100, '9009704144', 'C:\\fakepath\\slider.png', 0, '2023-12-03 15:49:01', ''),
('toy', 'shishuranjan', 'all types of toys', '', 10, '9009704144', '1701599493090.jfif', 0, '2023-12-03 16:01:33', 'kids');

-- --------------------------------------------------------

--
-- Table structure for table `sub_cat_mast`
--

CREATE TABLE `sub_cat_mast` (
  `sub_cat_id` int(11) NOT NULL,
  `sub_cat_name` varchar(255) NOT NULL,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE `visitor` (
  `sid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitor`
--

INSERT INTO `visitor` (`sid`, `name`, `city`, `contact`, `created_at`) VALUES
(0, 'shefali', 'indore', '8109553925', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner_data`
--
ALTER TABLE `banner_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_mast`
--
ALTER TABLE `category_mast`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `member_mast`
--
ALTER TABLE `member_mast`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner_data`
--
ALTER TABLE `banner_data`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `category_mast`
--
ALTER TABLE `category_mast`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `member_mast`
--
ALTER TABLE `member_mast`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
