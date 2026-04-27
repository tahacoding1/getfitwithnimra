-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2026 at 11:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `getfitwithnimra`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_features`
--

CREATE TABLE `about_features` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `about_section_id` bigint(20) UNSIGNED DEFAULT NULL,
  `icon` varchar(50) NOT NULL DEFAULT '?',
  `title` varchar(100) NOT NULL,
  `description` varchar(150) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about_features`
--

INSERT INTO `about_features` (`id`, `about_section_id`, `icon`, `title`, `description`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, '🏆', 'Certified Trainer', 'Internationally Certified', 1, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(2, 1, '💪', '500+ Clients', 'Successfully Trained', 2, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(3, 1, '🎯', 'Custom Plans', 'Tailored For You', 3, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(4, 1, '🥗', 'Nutrition Guide', 'Diet Plans Included', 4, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `about_sections`
--

CREATE TABLE `about_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subtitle` varchar(50) NOT NULL DEFAULT 'About Me',
  `title_line1` varchar(100) NOT NULL DEFAULT 'Passionate About',
  `title_line2` varchar(100) NOT NULL DEFAULT 'Your Fitness Journey',
  `title_highlight` varchar(50) NOT NULL DEFAULT 'Your Fitness',
  `paragraph1` text DEFAULT NULL,
  `paragraph2` text DEFAULT NULL,
  `button_text` varchar(50) NOT NULL DEFAULT 'Explore Services',
  `button_link` varchar(255) NOT NULL DEFAULT '#services',
  `image` varchar(255) DEFAULT NULL,
  `experience_years` varchar(20) NOT NULL DEFAULT '8+',
  `experience_label1` varchar(50) NOT NULL DEFAULT 'Years of',
  `experience_label2` varchar(50) NOT NULL DEFAULT 'Experience',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about_sections`
--

INSERT INTO `about_sections` (`id`, `subtitle`, `title_line1`, `title_line2`, `title_highlight`, `paragraph1`, `paragraph2`, `button_text`, `button_link`, `image`, `experience_years`, `experience_label1`, `experience_label2`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'About Me', 'Passionate About', 'Your Fitness Journey', 'Your Fitness', 'I\'m Nimra, a certified personal fitness trainer with over 8 years of experience in transforming lives through customized workout programs and nutritional guidance. I train at Body Evolution gym, where I provide a professional and motivating environment for my clients.', 'Whether you\'re a beginner or an advanced athlete, I design personalized plans that fit your lifestyle, goals, and body type. My approach combines scientific training methods with motivational coaching to deliver real results.', 'Explore Services', '#services', '/images/hero_image.png', '8+', 'Years of', 'Experience', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `action` varchar(100) NOT NULL COMMENT 'create, update, delete, login, etc.',
  `module` varchar(50) NOT NULL COMMENT 'hero, services, testimonials, etc.',
  `description` text DEFAULT NULL,
  `old_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_values`)),
  `new_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_values`)),
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certifications`
--

CREATE TABLE `certifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('award','cert') NOT NULL DEFAULT 'cert',
  `icon_name` varchar(50) NOT NULL DEFAULT 'GraduationCap',
  `name` varchar(150) NOT NULL,
  `organization` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `featured_title` varchar(200) DEFAULT NULL,
  `featured_description` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `certifications`
--

INSERT INTO `certifications` (`id`, `type`, `icon_name`, `name`, `organization`, `description`, `is_featured`, `featured_title`, `featured_description`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'award', 'Trophy', 'Top Tier Fitness Expert', 'Body Evolution', 'Awarded for exceptional training results and client transformations', 1, 'Top Tier Fitness Expert Award', 'Honored by Body Evolution for consistently delivering exceptional client transformations, maintaining the highest training standards, and being one of the most sought-after trainers at the facility.', 0, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(2, 'cert', 'GraduationCap', 'Internationally Certified', 'ISSA — International Sports Sciences Association', 'Certified Personal Trainer & Fitness Coach', 0, NULL, NULL, 1, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(3, 'cert', 'Shield', 'Science-Based Training', 'NASM — National Academy of Sports Medicine', 'Certified in corrective exercise and performance training', 0, NULL, NULL, 2, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(4, 'cert', 'Award', 'Precision Nutrition Coach', 'Precision Nutrition Level 1', 'Certified nutrition coach for body composition goals', 0, NULL, NULL, 3, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(5, 'cert', 'Sparkles', 'Elite Performance Coach', 'ACE — American Council on Exercise', 'Advanced health & fitness specialist certification', 0, NULL, NULL, 4, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `message` text NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `is_replied` tinyint(1) NOT NULL DEFAULT 0,
  `replied_at` timestamp NULL DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `status` enum('new','in_progress','replied','closed','spam') NOT NULL DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `footer_links`
--

CREATE TABLE `footer_links` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category` varchar(50) NOT NULL DEFAULT 'quick_links',
  `title` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `footer_links`
--

INSERT INTO `footer_links` (`id`, `category`, `title`, `url`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'quick_links', 'About', '#about', 1, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(2, 'quick_links', 'Services', '#services', 2, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(3, 'quick_links', 'Testimonials', '#testimonials', 3, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(4, 'quick_links', 'Contact', '#contact', 4, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(5, 'services', 'Personal Training', '#services', 1, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(6, 'services', 'Home Training', '#services', 2, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(7, 'services', 'Online Coaching', '#services', 3, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(8, 'services', 'Nutrition Plan', '#services', 4, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(9, 'services', 'Transformation', '#services', 5, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59');

-- --------------------------------------------------------

--
-- Table structure for table `hero_sections`
--

CREATE TABLE `hero_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `badge_text` varchar(100) NOT NULL DEFAULT 'Certified Personal Trainer',
  `badge_icon` varchar(50) DEFAULT NULL,
  `title_line1` varchar(100) NOT NULL DEFAULT 'Transform',
  `title_line2` varchar(100) NOT NULL DEFAULT 'Your Body',
  `title_highlight` varchar(50) NOT NULL DEFAULT 'Body',
  `title_line3` varchar(100) NOT NULL DEFAULT '& Mind',
  `description` text DEFAULT NULL,
  `primary_button_text` varchar(50) NOT NULL DEFAULT 'Start Your Journey',
  `primary_button_link` varchar(255) NOT NULL DEFAULT '#services',
  `secondary_button_text` varchar(50) NOT NULL DEFAULT 'Learn More',
  `secondary_button_link` varchar(255) NOT NULL DEFAULT '#about',
  `image` varchar(255) DEFAULT NULL,
  `rating_badge_text` varchar(20) NOT NULL DEFAULT '4.9★',
  `rating_badge_label` varchar(50) NOT NULL DEFAULT 'Rating',
  `clients_badge_text` varchar(20) NOT NULL DEFAULT '500+',
  `clients_badge_label` varchar(50) NOT NULL DEFAULT 'Clients',
  `status_badge_text` varchar(50) NOT NULL DEFAULT 'Available for Training',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_sections`
--

INSERT INTO `hero_sections` (`id`, `badge_text`, `badge_icon`, `title_line1`, `title_line2`, `title_highlight`, `title_line3`, `description`, `primary_button_text`, `primary_button_link`, `secondary_button_text`, `secondary_button_link`, `image`, `rating_badge_text`, `rating_badge_label`, `clients_badge_text`, `clients_badge_label`, `status_badge_text`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Certified Personal Trainer', NULL, 'Transform', 'Your Body', 'Body', '& Mind', 'Personalized fitness training programs at Body Evolution gym, designed to help you achieve your dream physique. Your transformation starts here.', 'Start Your Journey', '#services', 'Learn More', '#about', '/images/hero_image.png', '4.9★', 'Rating', '500+', 'Clients', 'Available for Training', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `hero_stats`
--

CREATE TABLE `hero_stats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hero_section_id` bigint(20) UNSIGNED DEFAULT NULL,
  `number` varchar(50) NOT NULL,
  `label` varchar(100) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_stats`
--

INSERT INTO `hero_stats` (`id`, `hero_section_id`, `number`, `label`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, '500+', 'Happy Clients', 1, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(2, 1, '8+', 'Years Exp.', 2, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(3, 1, '98%', 'Success Rate', 3, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_url` varchar(500) NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `file_size` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `dimensions` varchar(50) DEFAULT NULL COMMENT 'width x height',
  `alt_text` varchar(255) DEFAULT NULL,
  `collection` varchar(50) DEFAULT NULL COMMENT 'hero, about, testimonials, etc.',
  `uploaded_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(150) NOT NULL,
  `subscribed_at` timestamp NULL DEFAULT current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icon_name` varchar(50) NOT NULL DEFAULT 'Dumbbell',
  `title` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `whatsapp_message` text NOT NULL,
  `whatsapp_number` varchar(20) NOT NULL DEFAULT '923001234567',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `icon_name`, `title`, `slug`, `description`, `whatsapp_message`, `whatsapp_number`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Dumbbell', 'Personal Training', 'personal-training', 'One-on-one sessions at Body Evolution gym with customized workout plans tailored to your specific goals, body type, and fitness level.', 'Hi Nimra, I\'m interested in Personal Training at Body Evolution. Can you share more details?', '923001234567', 1, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(2, 'Home', 'Home Training', 'home-training', 'Get professional female-only training in the comfort of your home. Safe, comfortable environment with minimal equipment needed.', 'Hi Nimra, I\'m interested in Home Training (Females Only). Can you share more details?', '923001234567', 2, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(3, 'Users', 'Group Training', 'group-training', 'High-energy group sessions at Body Evolution gym that motivate and push you beyond limits with like-minded fitness enthusiasts.', 'Hi Nimra, I\'m interested in Group Training at Body Evolution. Can you share more details?', '923001234567', 3, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(4, 'Globe', 'Online Coaching', 'online-coaching', 'Access expert coaching from anywhere in the world. Available for both male and female clients with virtual sessions and digital programs.', 'Hi Nimra, I\'m interested in Online Coaching. Can you share more details?', '923001234567', 4, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(5, 'Sparkles', 'Nutrition Plan', 'nutrition-plan', 'Scientifically designed meal plans that complement your training and accelerate your transformation results.', 'Hi Nimra, I\'m interested in the Nutrition Plan. Can you share more details?', '923001234567', 5, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(6, 'ArrowRight', 'Transformation Plan', 'transformation-plan', 'Complete 12-week body transformation program at Body Evolution gym combining training, nutrition, and lifestyle changes.', 'Hi Nimra, I\'m interested in the Transformation Plan at Body Evolution. Can you share more details?', '923001234567', 6, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `service_features`
--

CREATE TABLE `service_features` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `text` varchar(100) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_features`
--

INSERT INTO `service_features` (`id`, `service_id`, `text`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'At Body Evolution Gym', 1, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(2, 1, 'Custom Workout Plans', 2, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(3, 1, 'Form Correction', 3, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(4, 1, 'Progress Tracking', 4, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(5, 2, 'Females Only', 1, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(6, 2, 'No Gym Needed', 2, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(7, 2, 'Flexible Schedule', 3, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(8, 2, 'Equipment Guidance', 4, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(9, 3, 'At Body Evolution Gym', 1, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(10, 3, 'Team Motivation', 2, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(11, 3, 'Fun Workouts', 3, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(12, 3, 'Social Support', 4, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(13, 4, 'For Both Male & Female', 1, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(14, 4, 'Live Sessions on Zoom', 2, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(15, 4, 'Video Demos', 3, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(16, 4, 'Global Access', 4, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(17, 5, 'Meal Planning', 1, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(18, 5, 'Macro Tracking', 2, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(19, 5, 'Recipe Guides', 3, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(20, 6, 'At Body Evolution Gym', 1, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(21, 6, '12 Week Program', 2, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(22, 6, 'Before/After Tracking', 3, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(23, 6, 'Full Support', 4, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_name` varchar(50) NOT NULL DEFAULT 'general',
  `key` varchar(100) NOT NULL,
  `value` text DEFAULT NULL,
  `type` enum('text','textarea','image','number','boolean','json') NOT NULL DEFAULT 'text',
  `description` varchar(255) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `group_name`, `key`, `value`, `type`, `description`, `is_public`, `created_at`, `updated_at`) VALUES
(1, 'general', 'site_name', 'GetFitWithNimra', 'text', 'Website Name', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(2, 'general', 'site_tagline', 'Transform Your Body & Mind', 'text', 'Website Tagline', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(3, 'general', 'favicon', '/favicon.ico', 'image', 'Favicon URL', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(4, 'contact', 'phone', '+92 300 1234567', 'text', 'Primary Phone Number', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(5, 'contact', 'email', 'info@getfitwithnimra.com', 'text', 'Primary Email', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(6, 'contact', 'whatsapp_number', '923001234567', 'text', 'WhatsApp Number (without +)', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(7, 'location', 'gym_name', 'Body Evolution', 'text', 'Gym Name', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(8, 'location', 'address', 'Shop No.10, Al Bari Exclusive Towers, Bahadurabad, Karachi', 'textarea', 'Full Address', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(9, 'location', 'maps_url', 'https://www.google.com/maps/search/Body+Evolution+Bahadurabad+Karachi', 'text', 'Google Maps URL', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(10, 'seo', 'meta_title', 'GetFitWithNimra - Certified Personal Trainer in Karachi', 'text', 'Meta Title', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(11, 'seo', 'meta_description', 'Transform your body with certified personal trainer Nimra at Body Evolution gym. Personal training, home training, online coaching, and nutrition plans.', 'textarea', 'Meta Description', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(12, 'seo', 'og_image', '/images/og-image.jpg', 'image', 'Open Graph Image', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(13, 'community', 'total_members_text', '1000+ Members', 'text', 'Members Count Display', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(14, 'community', 'member_avatars', '[\"seed-comm1\",\"seed-comm2\",\"seed-comm3\",\"seed-comm4\",\"seed-comm5\"]', 'json', 'Avatar Seeds Array', 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `platform` varchar(50) NOT NULL,
  `url` varchar(500) NOT NULL,
  `icon_svg` text DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `platform`, `url`, `icon_svg`, `display_name`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'instagram', 'https://www.instagram.com/getfit_with_nimra/', NULL, '@getfit_with_nimra', 1, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(2, 'whatsapp', 'https://wa.me/923001234567', NULL, 'WhatsApp', 2, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(3, 'youtube', 'https://youtube.com/@getfitwithnimra', NULL, 'YouTube', 3, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(4, 'facebook', 'https://facebook.com/getfitwithnimra', NULL, 'Facebook', 4, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(5, 'tiktok', 'https://tiktok.com/@getfitwithnimra', NULL, 'TikTok', 5, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `source` varchar(150) NOT NULL DEFAULT 'Google Review — Body Evolution',
  `rating` tinyint(3) UNSIGNED NOT NULL DEFAULT 5 CHECK (`rating` between 1 and 5),
  `review_text` text NOT NULL,
  `review_date` varchar(50) DEFAULT NULL,
  `client_avatar` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `client_name`, `source`, `rating`, `review_text`, `review_date`, `client_avatar`, `is_verified`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Nimra Hamirca', 'Google Review — Body Evolution', 5, 'Absolutely love training here! The environment at Body Evolution is incredible — professional equipment, clean space, and the trainers are top-notch. I\'ve seen amazing results since I started. Highly recommend to anyone serious about their fitness journey!', '3 months ago', NULL, 1, 1, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(2, 'Nimra', 'Google Review — Body Evolution', 5, 'Body Evolution is hands down the best gym in Karachi. The staff is super supportive, the ambiance is motivating, and the personal training sessions are worth every penny. My physique has completely transformed in just a few months!', '1 month ago', NULL, 1, 2, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(3, 'Nimra Hamirca', 'Google Review — Body Evolution', 5, 'I\'ve been to many gyms but Body Evolution stands out. The trainers actually care about your progress. They customize plans according to your body type and goals. The female section is very comfortable and well-maintained. 10/10 recommend!', '2 weeks ago', NULL, 1, 3, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(4, 'Nimra', 'Google Review — Body Evolution', 5, 'Joining Body Evolution was the best decision I made for my health. Nimra\'s training style is amazing — she pushes you just the right amount. Lost 12kg in 3 months and feeling stronger than ever!', '1 week ago', NULL, 1, 4, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(5, 'Nimra Hamirca', 'Google Review — Body Evolution', 5, 'The personal attention you get at Body Evolution is unmatched. Nimra tracks every single detail — from my workouts to my diet. It\'s not just a gym, it\'s a complete fitness transformation center.', '5 months ago', NULL, 1, 5, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(6, 'Nimra', 'Google Review — Body Evolution', 5, 'As a working woman, I needed flexible timings and Body Evolution provided exactly that. The early morning batches are great. Nimra makes sure you never skip a session. Best investment ever!', '2 months ago', NULL, 1, 6, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(7, 'Nimra Hamirca', 'Google Review — Body Evolution', 5, 'The nutrition guidance along with training at Body Evolution is a game changer. Nimra doesn\'t just train you, she educates you about your body. I understand fitness so much better now.', '3 weeks ago', NULL, 1, 7, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(8, 'Nimra', 'Google Review — Body Evolution', 5, 'Clean gym, professional trainers, amazing results. Body Evolution has everything you need. Nimra is particularly great with beginners — she makes you feel comfortable from day one.', '4 months ago', NULL, 1, 8, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(9, 'Nimra Hamirca', 'Google Review — Body Evolution', 5, 'I brought my sister here after my own transformation and she\'s already seeing results in just 4 weeks. Body Evolution and Nimra\'s coaching is genuinely life-changing. Thank you!', '6 days ago', NULL, 1, 9, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(10, 'Nimra', 'Google Review — Body Evolution', 5, 'The group training sessions at Body Evolution are so much fun! You don\'t even realize you\'re working hard because the energy is incredible. Nimra keeps everyone motivated throughout.', '6 weeks ago', NULL, 1, 10, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(11, 'Nimra Hamirca', 'Google Review — Body Evolution', 5, 'After trying multiple trainers, I finally found the right one. Nimra understands female fitness needs perfectly. The environment at Body Evolution is so comfortable and professional.', '1 month ago', NULL, 1, 11, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59'),
(12, 'Nimra', 'Google Review — Body Evolution', 5, 'I was skeptical about joining a gym but Body Evolution changed my mind completely. The trial session with Nimra convinced me. Now 6 months in, I\'m in the best shape of my life!', '3 weeks ago', NULL, 1, 12, 1, '2026-04-26 14:01:59', '2026-04-26 14:01:59');

-- --------------------------------------------------------

--
-- Table structure for table `trust_badges`
--

CREATE TABLE `trust_badges` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon_name` varchar(50) DEFAULT 'Shield',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trust_badges`
--

INSERT INTO `trust_badges` (`id`, `name`, `icon_name`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'ISSA', 'Shield', 1, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(2, 'NASM', 'Shield', 2, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(3, 'ACE', 'Shield', 3, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(4, 'Precision Nutrition', 'Shield', 4, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58'),
(5, 'Body Evolution', 'Shield', 5, 1, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` enum('super_admin','admin','editor') NOT NULL DEFAULT 'admin',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `avatar`, `role`, `is_active`, `last_login_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Nimra Admin', 'admin@getfitwithnimra.com', NULL, '$2y$12$LJ3m4ys3Lk6JSq8qN0KXOez9YqK7cQqN0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0', NULL, 'super_admin', 1, NULL, NULL, '2026-04-26 14:01:58', '2026-04-26 14:01:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_features`
--
ALTER TABLE `about_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_features_about` (`about_section_id`);

--
-- Indexes for table `about_sections`
--
ALTER TABLE `about_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_logs_user` (`user_id`),
  ADD KEY `idx_logs_module` (`module`),
  ADD KEY `idx_logs_action` (`action`),
  ADD KEY `idx_logs_date` (`created_at`);

--
-- Indexes for table `certifications`
--
ALTER TABLE `certifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_certs_type` (`type`),
  ADD KEY `idx_certs_featured` (`is_featured`),
  ADD KEY `idx_certs_sort` (`sort_order`);

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_contact_email` (`email`),
  ADD KEY `idx_contact_status` (`status`),
  ADD KEY `idx_contact_read` (`is_read`),
  ADD KEY `idx_contact_date` (`created_at`);

--
-- Indexes for table `footer_links`
--
ALTER TABLE `footer_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_footer_category` (`category`),
  ADD KEY `idx_footer_sort` (`sort_order`);

--
-- Indexes for table `hero_sections`
--
ALTER TABLE `hero_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_stats`
--
ALTER TABLE `hero_stats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_stats_hero` (`hero_section_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_media_collection` (`collection`),
  ADD KEY `idx_media_uploader` (`uploaded_by`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `uk_subscriber_email` (`email`),
  ADD KEY `idx_subscriber_active` (`is_active`),
  ADD KEY `idx_subscriber_date` (`subscribed_at`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `uk_services_slug` (`slug`),
  ADD KEY `idx_services_sort` (`sort_order`),
  ADD KEY `idx_services_active` (`is_active`);

--
-- Indexes for table `service_features`
--
ALTER TABLE `service_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_sfeat_service` (`service_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_settings_key` (`key`),
  ADD KEY `idx_settings_group` (`group_name`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `platform` (`platform`),
  ADD UNIQUE KEY `uk_social_platform` (`platform`),
  ADD KEY `idx_social_sort` (`sort_order`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_testimonials_rating` (`rating`),
  ADD KEY `idx_testimonials_sort` (`sort_order`),
  ADD KEY `idx_testimonials_active` (`is_active`);

--
-- Indexes for table `trust_badges`
--
ALTER TABLE `trust_badges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_badges_sort` (`sort_order`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_features`
--
ALTER TABLE `about_features`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `about_sections`
--
ALTER TABLE `about_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `certifications`
--
ALTER TABLE `certifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `footer_links`
--
ALTER TABLE `footer_links`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hero_sections`
--
ALTER TABLE `hero_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hero_stats`
--
ALTER TABLE `hero_stats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `service_features`
--
ALTER TABLE `service_features`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `trust_badges`
--
ALTER TABLE `trust_badges`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `about_features`
--
ALTER TABLE `about_features`
  ADD CONSTRAINT `fk_features_about` FOREIGN KEY (`about_section_id`) REFERENCES `about_sections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `fk_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `hero_stats`
--
ALTER TABLE `hero_stats`
  ADD CONSTRAINT `fk_stats_hero` FOREIGN KEY (`hero_section_id`) REFERENCES `hero_sections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `fk_media_uploader` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `service_features`
--
ALTER TABLE `service_features`
  ADD CONSTRAINT `fk_sfeat_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
