insert into `map` (name, emoji, full_disclosure, member_id) values ('first map', 'U+1F600',true, 1);
insert into `category` (name, color, map_id) values ('first category', '#FFFFFF', 1);
insert into `category` (name, color, map_id) values ('second category', '#FFFFFF', 1);
insert into `place` (name, address, latitude, longitude, description, detail_link, map_id, category_id, member_id) values ('starbucks', '봉천동', 127.00, 37.000, 'first place', 'https://kakaomap', 1, 1, 1);
insert into `place` (name, address, latitude, longitude, description, detail_link, map_id, category_id, member_id) values ('star', '염창동', 127.00, 37.000, 'second place', 'https://kakaomap', 1, 1, 1);
insert into `member` (nickname, profile_image, email, resource_server) values ('nickname', 'image', 'email', 'GITHUB');
insert into `member` (nickname, profile_image, email, resource_server) values ('nickname2', 'image2', 'email2', 'NAVER');
insert into `group_member` (map_id, member_id, permission_level) values (1, 1, 'HOST');
insert into `group_member` (map_id, member_id, permission_level) values (1, 2, 'MAINTAIN');
