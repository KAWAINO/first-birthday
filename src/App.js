import React, { useState } from 'react';
import styled from 'styled-components';

// 1. 데이터 영역
const GUEST_INFO = {
  title: "이겸이의 첫 번째 생일",
  date: "2026년 6월 6일 토요일 오전 11시30분",
  location: "롯데시티 호텔(2층) 씨카페",
  address: "서울특별시 마포구 마포대로 109",
  tel: "02-6009-1090 ~ 1",
  content: `어느덧 저희 아이가 태어난 지 일 년이 되었습니다. 
가족분들과 함께 따뜻한 식사 한 끼 나누며 
이겸이의 첫 생일을 축하하고 싶습니다.`,
};

const ORIGINAL_PHOTOS = [
  { id: 1, src: '/assets/baby_1.jpg', alt: '사진 1' },
  { id: 2, src: '/assets/baby_2.jpg', alt: '사진 2' },
  { id: 3, src: '/assets/baby_3.jpg', alt: '사진 3' },
  { id: 4, src: '/assets/baby_4.jpg', alt: '사진 4' },
  { id: 5, src: '/assets/baby_5.jpg', alt: '사진 5' },
  { id: 6, src: '/assets/baby_6.jpg', alt: '사진 6' },
  { id: 7, src: '/assets/baby_7.jpg', alt: '사진 7' },
  { id: 8, src: '/assets/baby_8.jpg', alt: '사진 8' },
  { id: 9, src: '/assets/baby_9.jpg', alt: '사진 9' },
];

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

      <CollageSection>
        <div className="grid-container">
          {ORIGINAL_PHOTOS.map((photo) => (
            <div key={photo.id} className="grid-item" onClick={() => setSelectedPhoto(photo.src)}>
              <img src={process.env.PUBLIC_URL + photo.src} alt={photo.alt} />
            </div>
          ))}
        </div>
      </CollageSection>

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

          <div className="item">
            <strong>씨카페 연락처</strong>
            <span>{GUEST_INFO.tel}</span>
          </div>
        </div>
      </InfoSection>

      {selectedPhoto && (
        <ModalOverlay onClick={() => setSelectedPhoto(null)}>
          <ModalContent>
            <img src={process.env.PUBLIC_URL + selectedPhoto} alt="확대 사진" />
            <CloseButton>×</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
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

const CollageSection = styled.section`
  padding: 0 25px;
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    background-color: #fff;
    padding: 4px;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(141, 110, 99, 0.1);
    overflow: hidden;
  }
  .grid-item {
    cursor: pointer;
    aspect-ratio: 1/1;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
`;

const InfoSection = styled.section`
  padding: 40px 25px;
  .content { line-height: 1.8; color: #6d4c41; margin-bottom: 40px; white-space: pre-wrap; }
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

// 주소와 복사 버튼을 감싸는 스타일
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  img { width: 100%; border-radius: 10px; }
`;

const CloseButton = styled.div`
  position: absolute;
  top: -50px; right: 0;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

export default App;