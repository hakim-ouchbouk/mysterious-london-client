import styled from "styled-components";


export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 4rem;
  column-gap: 2rem;
  margin-top: 64px;
  width: 90%;
  margin: 0 auto;
  margin-top: 4.8rem;
  justify-items: center;


  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const AttractionCard = styled.figure`
  width: 24rem;
  background-color: #fff;
  box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  align-self: start;
  transition: all 0.3s;
  justify-content: space-between;
  z-index: 10;
  .link {
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const AttractionImg = styled.img`
  width: 24rem;
  height: 16rem;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 1.2rem;
  font-size: 1.6rem;
  align-self: start;

  .name {
    text-decoration: none;
    color: #065f46;
    margin-bottom: 1.2rem;
    font-size: 2.5rem;
    font-weight: 500;
  }
  .subtitle {
    font-family: "Times New Roman", Times, serif;
    text-transform: lowercase;
    color: black;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .subtitle::first-letter {
    text-transform: uppercase;
  }
`;

export const CenterButton = styled.div`
  width: 30rem;
  margin: 2.4rem auto;
`;
export const Button = styled.button`
  width: 100%;
  /* height: 52px; */
  color: white;
  background-color: #065f46;
  border: none;
  /* border-radius: 10px; */
  font-size: 2.5rem;
  transition: all 300ms;
  padding: 1.2rem 2.4rem;
  &:hover {
    background-color: #064e3b;
  }
`;

export const Title = styled.h1`
  position: relative;
  font-size: 4.2rem;
  color: #212529;
  margin: 4rem 0 10rem 0;
`;

export const CenterText = styled.div`
  text-align: center;
`;

export const FlashMessage = styled.p`
  position: absolute;
  font-size: 1.8rem;
  color: #064e3b;
  top: 0;
  right: 50%;
  background-color: #d1fae5;
  padding: 1.2rem;
  border-radius: 1rem;
  transform: translate(50%, 6.5rem);
`;
