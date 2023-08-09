import React, { useState } from 'react';
import { styled } from 'styled-components';
import healthmarket_logo from '../assets/healthmarket_logo.png';
import google_logo from '../assets/google_logo.png';
import 'firebase/firestore';
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../axios/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { SignupButton, SigninButton, SigninWithGoogleButton } from '../components/Buttons';
function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [googleUserData, setGoogleUserData] = useState(null);

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setGoogleUserData(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  const Signin = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('이메일을 입력해주세요');
    } else if (!password) {
      alert('비밀번호를 입력해주세요');
    }

    //try catch를 사용하여 오류 메세지 안내하기
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      navigate('/');
    } catch (error) {
      console.error(error.code);
      if (error.code === 'auth/user-not-found') {
        alert('가입된 정보가 확인되지 않습니다.');
      } else if (error.code === 'auth/invalid-email') {
        alert('올바른 이메일 형식이 아닙니다.');
      } else if (error.code === 'auth/wrong-password') {
        alert('비밀번호를 확인 해주세요 ');
      } else {
        alert('로그인에 실패했습니다.');
      }
    }
    // 오류 안내 후 입력값 초기화
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div></div>
      <StSignup>
        <StSignPic>
          <StLogo src={healthmarket_logo} />
        </StSignPic>
        <StSignInputDiv>
          <StSignForm>
            <div>
              <StSignInput placeholder="이메일" type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div>
              <StSignInput
                placeholder="비밀번호"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <div>
                <SigninButton onClick={Signin}>로그인</SigninButton>
                <SignupButton
                  onClick={() => {
                    navigate('/signUpPage');
                  }}
                >
                  회원가입하러가기
                </SignupButton>
              </div>
            </div>
          </StSignForm>
          <div>
            <SigninWithGoogleButton onClick={handleGoogleLogin}>
              <img src={google_logo} /> 구글로 로그인하기
            </SigninWithGoogleButton>
          </div>
        </StSignInputDiv>
      </StSignup>
    </>
  );
}

export default SignInPage;

const StSignup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 500px;
  text-align: center;
  color: #1a4475;
  // background-color: #e9e6d8;
  background-color: white;
  margin: auto;
`;

const StSignPic = styled.div`
  width: 50%;
  height: 500px;
`;

const StSignInputDiv = styled.div`
  width: 50%;
  height: 500px;
`;
const StLogo = styled.img`
  width: 300px;
  height: auto;
  cursor: pointer;
  margin-top: 100px;
`;

const StSignForm = styled.form`
  padding-top: 100px;
`;
const StSignInput = styled.input`
  width: 80%;
  height: 35px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  padding: 8px;
  boxsizing: border-box;
  margin-bottom: 10px;
  margin-top: 5px;
`;
