INSERT INTO `user`
(login_id, login_password, name_first, name_last, nickname, email, description, created_at, created_by, updated_at, updated_by)
VALUES('hoaronal', '$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS', 'Hoa', 'Doan', 'hoaronal', 'hoa9x3@gmail.com', 'âaa', '2019-01-30 00:00:00', 'admin', '2019-01-30 00:00:00', 'admin');
INSERT INTO `user_role` VALUES (1,'ADMIN'),(1,'EDITOR'),(1,'AUTHOR'),(1,'VIEWER');


