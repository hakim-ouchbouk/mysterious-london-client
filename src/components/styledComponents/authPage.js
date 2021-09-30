import styled from "styled-components";

// SPACING SYSTEM (px):
//   2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

// FONT SIZE SYSTEM (px):
//   10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

//#f76707
//#e9ecef
// #78350F

export const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* background-color: #e9ecef; */
  padding: 44px 55px;
  /* border-radius: 10px; */
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  margin: 12px 0;
  margin-bottom: 30px;
  font-family: inherit;
  outline: none;
  border: none;
  padding: 10px;
  font-size: 18px;
  background-color: #f3f4f6;
`;

export const Label = styled.label`
  color: #212529;
  font-size: 20px;
`;

export const Button = styled.button`
  width: 100%;
  height: 52px;
  color: white;
  background-color: #065f46;
  border: none;
  font-size: 25px;
  transition: all 300ms;
  &:hover {
    background-color: #064e3b;
  }
`;

export const Title = styled.h1`
  font-size: 42px;
  color: #212529;
  margin: 86px 0 42px 0;
`;

export const CenterText = styled.div`
  text-align: center;
`;
