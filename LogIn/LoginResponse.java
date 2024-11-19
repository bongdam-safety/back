package kr.co.bongdamsafety.onlinemap.LogIn;

public class LoginResponse {
    private String token;

    public LoginResponse(String token) {
        this.token = token;
    }

    // Getter 메서드
    public String getToken() {
        return token;
    }

    // Setter 메서드
    public void setToken(String token) {
        this.token = token;
    }
}