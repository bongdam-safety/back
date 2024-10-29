import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router';
import axios from 'axios'; // axios import

const Login = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // 로그인 처리 로직
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    // 비밀번호 확인
    if (signupPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true); // 로딩 상태 시작
    setError(''); // 이전 오류 초기화

    try {
      // 회원가입 API 요청
      const response = await axios.post('http://localhost:8080/api/users/register', {
        email: signupEmail,
        password: signupPassword,
      });

      console.log('회원가입 성공:', response.data);
      // 성공 시 로그인 페이지로 리디렉션
      navigate('/login');
    } catch (err) {
      console.error('회원가입 요청 오류:', err); // 요청 오류 로그
      // 오류 메시지 출력
      if (err.response) {
        console.error('서버 응답:', err.response); // 서버 응답 로그
        const { data } = err.response; // data 추출
        if (typeof data === 'string') {
          setError(data); // 문자열 오류 메시지
        } else if (data && data.message) {
          setError(data.message); // message 필드가 있는 경우
        } else {
          setError('회원가입에 실패했습니다. 다시 시도하세요.');
        }
      } else if (err.request) {
        // 요청이 서버에 도달하지 않은 경우
        setError('서버에 요청을 보낼 수 없습니다. 네트워크를 확인하세요.');
      } else {
        // 기타 오류
        setError('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };
  return (
    <div className="home-container">
      <div>
        <h1 onClick={handleGoHome} style={{cursor:'pointer'}}>봉담 마을 지도</h1>
      </div>

      <div className="auth-toggle">
        <button onClick={() => setIsLoginMode(true)} className={isLoginMode ? 'active' : ''}>
          로그인
        </button>
        <button onClick={() => setIsLoginMode(false)} className={!isLoginMode ? 'active' : ''}>
          회원가입
        </button>
      </div>

      {error && <div className="error-message">{error}</div>} {/* 오류 메시지 표시 */}

      {isLoginMode ? (
        // 로그인 폼
        <form onSubmit={handleLoginSubmit} className="auth-form">
          <h2>로그인</h2>
          {/* 로그인 입력 필드들 */}
        </form>
      ) : (
        // 회원가입 폼
        <form onSubmit={handleSignupSubmit} className="auth-form">
          <h2>회원가입</h2>
          <div className="form-group">
            <label htmlFor="signupEmail">이메일</label>
            <input
              type="email"
              id="signupEmail"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">비밀번호</label>
            <input
              type="password"
              id="signupPassword"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? '가입 중...' : '회원가입'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;