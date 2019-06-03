package com.devskill.service.user;

import com.devskill.domain.User;

import java.util.List;

public interface UserService {

    public User add(User user);

    public User getByEmail(String email);

    public List<User> getUsers(int pageNumber, int pageSize);
}
