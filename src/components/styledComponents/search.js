import styled from "styled-components";

export const Input = styled.input`
  width: 50rem;
  height: 6rem;
  margin: 5rem auto;
  padding: 1.2rem;
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

  @media (max-width: 1024px) {
    width: 40rem;
  }
  
 
`;

export const Title = styled.h1`
  margin-top: 2.5rem;
`;
