insert into `map` (name, full_disclosure, member_id) values ('first map', false, 1);
insert into `category` (name, color, map_id) values ('first category', '#FFFFFF', 1);
insert into `place` (name, latitude, longitude, description, map_id, category_id, member_id) values ('starbucks', 127.00, 37.000, 'first place', 1, 1, 1);
insert into `member` (nickname, profile_image, email, resource_server) values ('nickname', 'image', 'email', 'GITHUB');
