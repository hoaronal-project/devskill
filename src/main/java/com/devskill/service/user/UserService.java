package com.devskill.service.user;

import java.util.List;

import com.devskill.domain.User;
import com.devskill.model.UserCreateForm;

public interface UserService {

    User register(UserCreateForm userCreateForm);

    List<User> getUsers(int pageNumber, int pageSize);
}
