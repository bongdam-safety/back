package kr.co.bongdamsafety.onlinemap.LogIn;

import kr.co.bongdamsafety.onlinemap.entity.User;
import kr.co.bongdamsafety.onlinemap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService2 {
    @Autowired
    private UserRepository2 userRepository2;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String login(String email, String password) throws Exception {
        User2 user2 = userRepository2.findByEmail(email);
        if (user2 == null) {
            throw new Exception("사용자를 찾을 수 없습니다.");
        }

        if (!passwordEncoder.matches(password, user2.getPassword())) {
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }

        // 로그인 성공 시 JWT 토큰 발급
        return JwtUtils.generateToken(user2.getEmail());
    }
}