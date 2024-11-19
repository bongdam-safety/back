package kr.co.bongdamsafety.onlinemap.LogIn;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity // 이 클래스가 JPA 엔티티임을 나타냄
@Table(name = "users") // 데이터베이스의 "users" 테이블과 매핑
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User2 {

    @Id // 기본 키를 나타내는 애너테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID 값 자동 생성 전략 설정
    private Long id; // 사용자 ID값(자동생성)

    @Column(nullable = false, unique = true) // 이 필드는 null이 될 수 없고, 값이 유일해야 함
    private String email; // 사용자 이메일 (username 대신 email 사용)

    @Column(nullable = false) // 이 필드는 null이 될 수 없음
    private String password; // 비밀번호

    @Column(nullable = false) // 이 필드는 null이 될 수 없음
    private String name; // 성명

    @Column(nullable = false, length = 4000) // 이 필드는 null이 될 수 없음
    private String content; // 계정 설명

    @Column(updatable = false)
    private Timestamp date_created; // 계정 생성일자
    @PrePersist
    public void onCreate() {
        this.date_created = new Timestamp(System.currentTimeMillis());
    }
}