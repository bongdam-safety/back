/*import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  const [isLoginMode, setIsLoginMode] = useState(true); // 로그인 모드 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // 로그인 성공 처리
    console.log('로그인 성공:', { email, password });
    navigate('/admin'); // `/admin` 페이지로 이동
  };


  return (
    <div className="home-container">
      <div>
        <h1 onClick={handleGoHome} style={{ cursor: 'pointer' }}>
          봉담읍 마을 안전지도
        </h1>
      </div>

      {isLoginMode && (
        <form onSubmit={handleLoginSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <button type="submit">로그인</button>
        </form>
      )}
    </div>
  );
};

export default Login;*/

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  const [isLoginMode, setIsLoginMode] = useState(true); // 로그인 모드 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // 로그인 요청 보내기
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // 응답 처리
      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // JWT 토큰을 로컬 스토리지에 저장
        localStorage.setItem('authToken', token);

        console.log('로그인 성공:', { email, password });

        // 인증된 후, admin 페이지로 이동
        navigate('/admin');
      } else {
        // 로그인 실패 시 에러 메시지 처리
        const data = await response.json();
        setErrorMessage(data.message || '로그인 실패');
      }
    } catch (error) {
      setErrorMessage('서버 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('로그인 오류:', error);
    }
  };

  return (
    <div className="home-container">
      <div>
        <h1 onClick={handleGoHome} style={{ cursor: 'pointer' }}>
          봉담읍 마을 안전지도
        </h1>
      </div>

      {isLoginMode && (
        <form onSubmit={handleLoginSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {/* 로그인 실패 시 에러 메시지 출력 */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit">로그인</button>
        </form>
      )}
    </div>
  );
};

export default Login;
