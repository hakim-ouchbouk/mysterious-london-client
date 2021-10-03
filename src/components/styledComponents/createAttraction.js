import styled from "styled-components";

// SPACING SYSTEM (px):
//   2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

// FONT SIZE SYSTEM (px):
//   10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

//#e9ecef
// #065f46

export const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 48px;
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
  font-family: sans-serif;
  outline: none;
  border: none;
  padding: 10px;
  font-size: 18px;
  background-color: #f3f4f6;
  border: ${({ error }) => (error ? "1px solid red" : "none")};
`;

export const Label = styled.label`
  color: #212529;
  font-size: 24px;
  font-weight: bold;
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
  position: relative;
  font-size: 42px;
  color: #212529;
  margin: 42px 0 92px 0;
`;

export const CenterText = styled.div`
  text-align: center;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;
  outline: none;
  margin: 12px 0;
  padding: 12px;
  line-height: 1.3;
  background-color: #f3f4f6;
  border: ${({ error }) => (error ? "1px solid red" : "none")};
`;

export const Select = styled.select`
  width: 100%;
  height: 52px;
  border: none;
  outline: none;
  margin-bottom: 30px;
  padding: 12px;
  background-color: #f3f4f6;
`;

export const FlashMessage = styled.p`
  position: absolute;
  font-size: 25px;
  color: #064e3b;
  background-color: #d1fae5;
  border-radius: 10px;
  right: 50%;
  transform: translate(50%, 20px);
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 30px;
`;
