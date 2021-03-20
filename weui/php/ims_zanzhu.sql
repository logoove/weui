/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : weui

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 15/04/2020 00:58:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ims_zanzhu
-- ----------------------------
DROP TABLE IF EXISTS `ims_zanzhu`;
CREATE TABLE `ims_zanzhu`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `zid` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `money` decimal(10, 2) UNSIGNED DEFAULT 0.00,
  `say` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createtime` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ims_zanzhu
-- ----------------------------
INSERT INTO `ims_zanzhu` VALUES (3, '*茶', 2.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (4, '*莫', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (5, '*3', 5.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (6, '*丽', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (7, 'd*l', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (8, '佚名', 2.33, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (9, '枫叶', 1.50, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (10, '*离', 1.10, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (11, '佚名', 3.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (12, '*锦', 10.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (13, '*升', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (14, '*鹏', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (15, 'J*n', 2.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (16, '*峰', 10.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (17, 'daiyi', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (18, 'kayYUI(荷叶)', 10.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (19, 'HH', 2.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (20, '黄*清', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (21, '黎*庭', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (22, '*卓', 16.66, '加油,争取做得更好', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (23, '翁*波', 2.00, '加油,中国建设需要你', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (24, 'Bear Lee', 2.33, 'Bear-加油,向你', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (25, '*焕', 3.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (26, '佚名', 2.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (27, '*平', 3.00, '加油', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (28, '*头', 2.88, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (29, 'H*h', 6.00, '感谢分享!望持更', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (30, '*乐', 2.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (31, '*景飞', 6.60, '感谢,再接再厉!', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (32, '*人', 1.00, '来了,老哥', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (33, '*泓呈', 26.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (34, '*蛋', 15.00, '谢谢老哥,帮到我了', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (35, '*等', 5.00, '赞助weui+,感谢', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (36, '*九', 58.00, '188171814**初九', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (37, '*丽', 1.00, '多多加油', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (38, '*昊', 2.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (39, '*富杰', 6.66, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (40, 'w*t', 6.60, '贝永超 支持优秀项目', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (41, 'k*g', 3.00, '求右侧弹出选择模板', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (42, '*雷', 10.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (43, '*滔', 8.88, 'weui+给力,谢谢', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (44, '*磊', 8.88, '加油', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (45, '*生', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (46, '*刚', 20.00, '支持', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (47, '*继', 10.00, '加油加油', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (48, '*t', 1.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (49, '**桂', 8.88, '不错,希望一直更新下去', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (50, 'M*u', 2.88, '加油,希望多多更新', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (51, '*涯', 10.00, 'weui赞助', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (52, '*兄', 1.00, '感谢作者', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (53, '*乐', 1.00, '非常棒,感谢分享!', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (54, '*植', 20.00, '感谢', 1586875387);
INSERT INTO `ims_zanzhu` VALUES (55, 'Time Better', 5.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (56, '*头', 5.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (57, '*七', 5.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (58, '*国', 100.00, NULL, 1586875387);
INSERT INTO `ims_zanzhu` VALUES (59, '*崟', 10.00, '非常好的ui辅助', 1586875387);

SET FOREIGN_KEY_CHECKS = 1;
