package com.devskill.service.user;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devskill.common.exception.DuplicateEmailException;
import com.devskill.domain.User;
import com.devskill.model.UserCreateForm;
import com.devskill.repository.UserRepository;
import com.devskill.service.email.MailService;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final MailService mailService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public User register(UserCreateForm userCreateForm) {
        Optional<User> duplicate = userRepository.findOneByEmail(userCreateForm.getEmail());;
        if (duplicate.isPresent()) {
            throw new DuplicateEmailException(userCreateForm.getEmail());
        }
        User user = new User();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = RandomStringUtils.random(8, true, true);

        user.setLoginId(RandomStringUtils.random(8, true, true));
        user.setLoginPassword(passwordEncoder.encode(password));
        user.getName().setFirstName("");
        user.getName().setLastName("");
        user.setEmail(userCreateForm.getEmail());
        user.getRoles().add(User.Role.VIEWER);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user = userRepository.saveAndFlush(user);
        mailService.sendRegisterMail(user.getEmail(), password);
        return user;
    }

    @Override
    public List<User> getUsers(int pageNumber, int pageSize) {
        return userRepository.findAll();
    }
}
