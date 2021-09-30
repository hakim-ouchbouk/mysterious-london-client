import styled from "styled-components";

export const Input = styled.input`
  width: 500px;
  height: 60px;
  margin: 50px auto;
  padding: 12px;
  display: flex;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  border: none;
  outline: none;
  &:focus {
    box-shadow: 0 0 0 1px #065f46;
  }
  &::placeholder {
    font-weight: 400;
    color: #065f46;
  }
`;

export const Title = styled.h1`
  margin-top: 25px;
`;
