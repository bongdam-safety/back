package kr.co.bongdamsafety.onlinemap.LogIn;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.io.IOException;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    // 생성자에서 AuthenticationManager를 주입받습니다.
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        // Authorization 헤더에서 JWT 토큰 추출
        String token = httpRequest.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // 'Bearer ' 제거
        }

        if (token != null && JwtUtils.validateToken(token)) {
            // 토큰이 유효한 경우 사용자 이름 추출
            String username = JwtUtils.getUsernameFromToken(token);

            // 인증 토큰 생성
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(username, null, null);

            // 인증 처리
            authenticationManager.authenticate(authentication);

            // 인증 성공 후 SecurityContext에 저장된 인증 객체를 설정
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 필터 체인 계속 진행
        chain.doFilter(request, response);
    }
}