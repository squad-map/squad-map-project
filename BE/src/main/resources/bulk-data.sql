-- LOAD DATA LOCAL INFILE '/Users/cmsskkk/Desktop/dev/GitHub/squad-map-project/BE/src/main/resources/bulk-data/all/member.csv' INTO TABLE member FIELDS
-- TERMINATED BY ',' (nickname, profile_image, email, resource_server);
--
-- LOAD DATA LOCAL INFILE '/Users/cmsskkk/Desktop/dev/GitHub/squad-map-project/BE/src/main/resources/bulk-data/all/map.csv'
-- INTO TABLE `map` FIELDS TERMINATED BY ','
-- (name, emoji, full_disclosure, member_id);
--
-- LOAD DATA LOCAL INFILE '/Users/cmsskkk/Desktop/dev/GitHub/squad-map-project/BE/src/main/resources/bulk-data/all/group_member.csv'
-- INTO TABLE `group_member` FIELDS TERMINATED BY ','
-- (map_id, member_id, permission_level);
--
-- LOAD DATA LOCAL INFILE '/Users/cmsskkk/Desktop/dev/GitHub/squad-map-project/BE/src/main/resources/bulk-data/all/category.csv'
-- INTO TABLE `category` FIELDS TERMINATED BY ','
-- (name, color, map_id);
--
-- LOAD DATA LOCAL INFILE '/Users/cmsskkk/Desktop/dev/GitHub/squad-map-project/BE/src/main/resources/bulk-data/all/place.csv'
-- INTO TABLE `place` FIELDS TERMINATED BY ','
-- (name, address, latitude, longitude, description, detail_link, map_id, category_id, member_id);
--
-- LOAD DATA LOCAL INFILE '/Users/cmsskkk/Desktop/dev/GitHub/squad-map-project/BE/src/main/resources/bulk-data/all/comment.csv'
-- INTO TABLE `comment` FIELDS TERMINATED BY ','
-- (member_id, place_id, content, written_at, modified_at);

LOAD DATA LOCAL INFILE '/Users/cmsskkk/Desktop/dev/GitHub/squad-map-project/BE/src/main/resources/bulk-data/map-member/member500.csv' INTO TABLE member FIELDS
TERMINATED BY ',' (nickname, profile_image, email, resource_server);

LOAD DATA LOCAL INFILE '/Users/cmsskkk/Desktop/dev/GitHub/squad-map-project/BE/src/main/resources/bulk-data/map-member/map500.csv'
INTO TABLE `map` FIELDS TERMINATED BY ','
(name, emoji, full_disclosure, member_id);
