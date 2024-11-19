package kr.co.bongdamsafety.onlinemap.LogIn;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository2 extends JpaRepository<User2, String> {
    User2 findByEmail(String email);
}