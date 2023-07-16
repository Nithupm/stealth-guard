import React, { useState, useEffect } from 'react';
import { styled, keyframes } from 'styled-components';
import backgroundImg from '../assets/background.png';
import baseImg from '../assets/spinBase.png';
import spinImg from '../assets/SpinButton.png';
import circleBase from '../assets/circleBase.png';
import displayCircle from '../assets/groupDisplayCircle.png';
import numberBox from '../assets/numberBox.png';
import congoImg from '../assets/congoImg.png';

const fadeColorAnimation = keyframes`
  0% {
    color: #ffffff;
  }
  50% {
    color: #ff0000;
  }
  100% {
    color: #ffffff;
  }
`;

const SpinPage = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showFirstPrize, setShowFirstPrize] = useState(false);



  useEffect(() => {
    if (isSpinning) {
      const shuffleInterval = setInterval(() => {
        setNumbers((prevNumbers) => {
          const shuffledNumbers = [...prevNumbers];
          for (let i = shuffledNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledNumbers[i], shuffledNumbers[j]] = [
              shuffledNumbers[j],
              shuffledNumbers[i],
            ];
          }
          return shuffledNumbers;
        });
      }, 150);

      setTimeout(() => {
        clearInterval(shuffleInterval);
        setShowFirstPrize(true);
      }, 1500);

      return () => {
        clearInterval(shuffleInterval);
      };
    }
  }, [isSpinning]);

  const handleSpin = () => {
    setIsSpinning(true);
    setShowFirstPrize(false);
  };


  return (
    <RootDiv>
      <MainDiv>
        <HeadSection>
          <img src={congoImg} alt="Congratulations" />
          <TextWrapper>
           {showFirstPrize && <FirstPrizeText>First Prize</FirstPrizeText>}
        </TextWrapper>
        </HeadSection>
        <SpinSection>
          <CircleBaseWrapper>
            <CircleBase src={circleBase} alt="circle base" />
            <DisplayCircle src={displayCircle} alt="display circle" />
            <SpinNum>
              {numbers.map((number, index) => (
                <NumberDiv key={index}>
                  <img src={numberBox} alt={`Number ${number}`} />
                  <TextDiv isSpinning={isSpinning}>
                    <h1>{number}</h1>
                  </TextDiv>
                </NumberDiv>
              ))}
            </SpinNum>
          </CircleBaseWrapper>
        </SpinSection>
        <FooterDiv>
          <BaseImage src={baseImg} alt="spin base" />
          <SpinButton
            src={spinImg}
            alt="spin button"
            onClick={handleSpin}
            disabled={isSpinning}
          />
        </FooterDiv>
      </MainDiv>
    </RootDiv>
  );
};

export default SpinPage;


const RootDiv = styled.div`
  background-color: #0b1952;
  width: 100vw;
  height: 100vh;
`;

const MainDiv = styled.div`
  background-image: url(${backgroundImg});
  background-size: contain;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const FooterDiv = styled.div`
  position: absolute;
  bottom: 0;
`;

const BaseImage = styled.img`
  width: 100vw;
  position: relative;
`;

const SpinButton = styled.img`
  width: 469px;
  height: 119px;
  position: absolute;
  top: 84px;
  left: 0;
  right: 0;
  bottom: 0px;
  margin: auto;
  cursor: pointer;
`;

const SpinSection = styled.div`
  position: relative;
`;

const CircleBaseWrapper = styled.div`
  position: absolute;
  margin-top: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CircleBase = styled.img`
  width: 971px;
  height: 338px;
`;

const DisplayCircle = styled.img`
  position: absolute;
  width: 768px;
  height: 245px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NumberDiv = styled.div`
  margin-right: 2px;
  position: relative;
  display: inline-block;
  img {
    width: 122px;
    height: 173px;
    position: relative;
  }
`;

const SpinNum = styled.div`
  display: flex;
  position: absolute;
  top: 75px;
  left: 113px;
  width: 747px;
  overflow: hidden;
`;

const TextDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  h1 {
    font-size: 100px;
    color: #04d7ff;
  }
`;

const HeadSection = styled.div`
  img {
    width: 1000px;
    height: 144px;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;


const FirstPrizeText = styled.h1`
  font-size: 50px;
  color: #ffffff;
  animation: ${fadeColorAnimation} 2s infinite;
`;
