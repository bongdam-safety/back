package kr.co.bongdamsafety.onlinemap.LogIn;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig2 {

    @Bean(name = "securityFilterChain2")
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .requestMatchers("/admin/**").hasRole("ADMIN") // "/admin/**" 경로는 ADMIN 권한만 접근 가능
                .requestMatchers("/user/**").hasRole("USER")  // "/user/**" 경로는 USER 권한만 접근 가능
                .anyRequest().authenticated()  // 그 외 요청은 인증 필요
                .and()
                .formLogin(Customizer.withDefaults()) // 로그인 폼 기본 설정
                .httpBasic(Customizer.withDefaults()); // HTTP Basic 인증 기본 설정

        return http.build(); // 필터 체인 빌드
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user1 = User.withUsername("admin")
                .password("{noop}admin password") // {noop}는 비밀번호를 암호화하지 않음을 의미
                .roles("ADMIN")
                .build();

        UserDetails user2 = User.withUsername("user")
                .password("{noop}user password")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user1, user2); // InMemoryUserDetailsManager 사용
    }
}