import React from 'react';
import styled from 'styled-components';

// 1. 데이터 영역
const GUEST_INFO = {
  title: "이겸이의 첫 번째 생일",
  date: "2026년 6월 6일 토요일 오전 11시30분",
  location: "롯데시티 호텔(2층) 씨카페",
  address: "서울특별시 마포구 마포대로 109",
  tel: "02-6009-1090 ~ 1",
  noti1: "호텔측 지하주차장 B3 또는 B4",
  noti2: "상가 주차장과 B5 주차장은 주차금액 지원 불가",
  content: `어느덧 저희 아이가 태어난 지 일 년이 되었습니다. 
가족분들과 함께 따뜻한 식사 한 끼 나누며 
이겸이의 첫 생일을 축하해 주시면 감사하겠습니다.`,
  mainPhoto: '/assets/baby.jpg' // 메인 사진 경로
};

function App() {
  // 주소 복사 함수
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(GUEST_INFO.address).then(() => {
      alert("주소가 복사되었습니다. 지도로 붙여넣기 하세요!");
    }).catch(err => {
      console.error('복사 실패:', err);
    });
  };

  return (
    <Container>
      <TitleSection>
        <p>1st Birthday</p>
        <h1>{GUEST_INFO.title}</h1>
      </TitleSection>

      {/* 사진 1장 메인 섹션 */}
      <MainImageSection>
        <img src={process.env.PUBLIC_URL + GUEST_INFO.mainPhoto} alt="이겸이 사진" />
      </MainImageSection>

      <InfoSection>
        <p className="content">{GUEST_INFO.content}</p>
        <div className="details">
          <div className="item">
            <strong>언제</strong>
            <span>{GUEST_INFO.date}</span>
          </div>
          
          <div className="item">
            <strong>어디서</strong>
            <span className="loc-text">{GUEST_INFO.location}</span>
            <AddressWrapper>
              <span className="address-text">({GUEST_INFO.address})</span>
              <CopyButton onClick={handleCopyAddress}>복사</CopyButton>
            </AddressWrapper>
          </div>

          {/* 주차 강조 섹션 */}
          <ParkingItem>
            <strong>⚠️ 주차 안내</strong>
            <span className="parking-main">{GUEST_INFO.noti1}</span>
            <div className="parking-warning">
              <span>{GUEST_INFO.noti2}</span>
            </div>
          </ParkingItem>

          <div className="item">
            <strong>씨카페 연락처</strong>
            <span>{GUEST_INFO.tel}</span>
          </div>
        </div>
      </InfoSection>
    </Container>
  );
}

// --- 스타일 정의 ---

const Container = styled.div`
  max-width: 450px;
  margin: 0 auto;
  background-color: #fffaf0;
  min-height: 100vh;
  text-align: center;
  font-family: 'Nanum Gothic', sans-serif;
  padding-bottom: 60px;
`;

const TitleSection = styled.section`
  padding: 60px 20px 40px;
  color: #8d6e63;
  h1 { font-size: 1.8rem; margin-top: 12px; font-weight: 700; }
  p { font-size: 0.85rem; letter-spacing: 3px; }
`;

const MainImageSection = styled.section`
  padding: 0 25px;
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(141, 110, 99, 0.15);
  }
`;

const InfoSection = styled.section`
  padding: 40px 25px;
  .content { 
    line-height: 1.8; 
    color: #6d4c41; 
    margin-bottom: 40px; 
    white-space: pre-wrap; 
    font-size: 1.05rem;
  }
  .details { 
    background: #fff; 
    padding: 30px 20px; 
    border-radius: 20px; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    .item {
      display: flex;
      flex-direction: column;
      margin-bottom: 25px;
      &:last-child { margin-bottom: 0; }
      strong { color: #a1887f; font-size: 0.85rem; margin-bottom: 8px; }
      span { color: #333; font-size: 1.1rem; font-weight: 500; }
    }
  }
`;

// 주차 전용 강조 스타일 컴포넌트
const ParkingItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  background-color: #fff5f5; /* 눈에 띄는 연한 붉은 배경 */
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #ffe3e3;

  strong { 
    color: #e53935 !important; /* 강렬한 경고용 빨간색 */
    font-size: 0.9rem !important; 
    margin-bottom: 8px; 
    font-weight: 700;
  }
  
  .parking-main {
    color: #333;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .parking-warning {
    margin-top: 8px;
    background-color: #fff;
    padding: 8px;
    border-radius: 6px;
    border-left: 3px solid #e53935;
    
    span {
      color: #d32f2f !important; /* 지원 불가 메시지 강조 */
      font-size: 0.85rem !important;
      font-weight: 500;
      line-height: 1.4;
      display: block;
    }
  }
`;

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;
  .address-text {
    font-size: 0.85rem !important;
    color: #999 !important;
    font-weight: 400 !important;
  }
`;

const CopyButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 2px 8px;
  font-size: 0.7rem;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  &:active { background-color: #eee; }
`;

export default App;