package com.techblog.service.user;

import com.techblog.web.support.AuthorizedUser;
import com.techblog.domain.User;
import com.techblog.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Transactional(rollbackFor=Exception.class)
public class AuthorizedUserDetailsService extends SavedRequestAwareAuthenticationSuccessHandler implements UserDetailsService {
	
	@Resource
	private UserRepository userRepository;
	
	private static Logger logger = LoggerFactory.getLogger(AuthorizedUserDetailsService.class); 
	
	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException, DataAccessException {
		if (!StringUtils.hasText(username)) {
			throw new UsernameNotFoundException("Username is empty");
		}

		User user;
		if (!username.contains("@")) {
			user = userRepository.findOneByLoginId(username);
		} else {
			user = userRepository.findOneByEmail(username);
		}

		if (user == null) {
			throw new UsernameNotFoundException("User ID not existing. [" + username + "]");
		}

		return new AuthorizedUser(user);
	}
	
	@Transactional(readOnly=false)
	@Override
	public void onAuthenticationSuccess(
			HttpServletRequest request,
			HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		AuthorizedUser authorizedUser = (AuthorizedUser) authentication.getPrincipal();
		userRepository.updateLastLoginTime(authorizedUser.getUsername(), new Date());
		
		logger.info("\"{}\" logged in. IP: [{}]", authorizedUser.toString(), request.getRemoteAddr());
		
		super.onAuthenticationSuccess(request, response, authentication);
	}
}
