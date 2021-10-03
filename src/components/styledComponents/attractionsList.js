import styled from "styled-components";

// SPACING SYSTEM (px):
//   2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

// FONT SIZE SYSTEM (px):
//   10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 50px;
  margin-top: 64px;
  width: 90%;
  margin: 0 auto;
  margin-top: 48px;
`;

export const AttractionCard = styled.figure`
  width: 300px;
  background-color: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  /* border-radius: 5px; */
  overflow: hidden;
  cursor: pointer;
  align-self: start;
  transition: all 0.3s;
  justify-content: space-between;

  .link {
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  padding: 12px;
  font-size: 16px;
  align-self: start;

  .name {
    text-decoration: none;
    color: #065f46;
    margin-bottom: 12px;
    font-size: 25px;
    font-weight: 500;
  }
  .subtitle {
    font-family: "Times New Roman", Times, serif;
    text-transform: lowercase;
    color: black;
    font-size: 18px;
    font-weight: 500;
  }

  .subtitle::first-letter {
    text-transform: uppercase;
  }
`;

export const AttractionImg = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
`;

export const CenterButton = styled.div`
  width: 300px;
  margin: 24px auto;
`;
export const Button = styled.button`
  width: 100%;
  /* height: 52px; */
  color: white;
  background-color: #065f46;
  border: none;
  /* border-radius: 10px; */
  font-size: 25px;
  transition: all 300ms;
  padding: 12px 24px;
  &:hover {
    background-color: #064e3b;
  }
`;

export const Title = styled.h1`
  position: relative;
  font-size: 42px;
  color: #212529;
  margin: 40px 0 100px 0;
`;

export const CenterText = styled.div`
  text-align: center;
`;

export const FlashMessage = styled.p`
  position: absolute;
  font-size: 18px;
  color: #064e3b;
  top: 0;
  right: 50%;
  background-color: #d1fae5;
  padding: 12px;
  border-radius: 10px;
  transform: translate(50% ,65px);

`;
