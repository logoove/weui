/*
 Navicat Premium Data Transfer

 Source Server         : 阿里
 Source Server Type    : MySQL
 Source Server Version : 50640
 Source Host           : 121.42.172.1:3306
 Source Schema         : weui

 Target Server Type    : MySQL
 Target Server Version : 50640
 File Encoding         : 65001

 Date: 18/12/2018 14:38:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ims_demo
-- ----------------------------
DROP TABLE IF EXISTS `ims_demo`;
CREATE TABLE `ims_demo`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '20',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `fen` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createtime` int(10) DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ims_demo
-- ----------------------------
INSERT INTO `ims_demo` VALUES (1, '李白', '18291448888', '22', 1539838202);
INSERT INTO `ims_demo` VALUES (2, 'yoby', '1111', '111', 1539745920);
INSERT INTO `ims_demo` VALUES (3, '李白', '18291448888', '22', 1539659520);
INSERT INTO `ims_demo` VALUES (4, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (5, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (6, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (7, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (8, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (9, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (10, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (11, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (12, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (13, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (14, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (15, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (16, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (17, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (18, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (19, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (20, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (21, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (22, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (23, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (24, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (25, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (26, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (27, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (28, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (29, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (30, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (31, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (32, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (33, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (34, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (35, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (36, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (37, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (38, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (39, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (40, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (41, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (42, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (43, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (44, '李白', '18291448888', '22', NULL);
INSERT INTO `ims_demo` VALUES (45, '李白', '18291448888', '22', NULL);

SET FOREIGN_KEY_CHECKS = 1;
