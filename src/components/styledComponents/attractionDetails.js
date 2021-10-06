import styled from "styled-components";
import {
  IoFlagSharp,
  IoStarSharp,
  IoListSharp,
  IoArrowBackSharp,
  IoArrowForwardSharp,
  IoHappySharp,
} from "react-icons/io5";

// SPACING SYSTEM (px):
//   2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

// FONT SIZE SYSTEM (px):
//   10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

export const Header = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  row-gap: 48px;
  margin-top: 32px;
  margin-bottom: 48px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #065f46;
  position: relative;
  .location {
    font-size: 30px;
    margin: 10px 0;
  }
`;

export const Btn = styled.button`
  padding: 12px;
  border: none;
  background-color: white;
  color: #065f46;
  .number {
    font-size: 24px;
  }
`;

export const Flag = styled(IoFlagSharp)`
  color: #065f46;
  font-size: 35px;
  margin-bottom: 10px;
`;

export const Star = styled(IoStarSharp)`
  color: #065f46;
  font-size: 35px;
  margin-bottom: 10px;
`;

export const List = styled(IoListSharp)`
  color: #065f46;
  font-size: 35px;
  margin-bottom: 10px;
`;

export const ImgsWrapper = styled.div`
  position: relative;
`;

export const ImgsContainer = styled.div`
  display: flex;
  overflow: hidden;
  gap: 10px;
  margin-bottom: 50px;
  position: relative;
`;

export const Img = styled.img`
  height: 400px;
  width: auto;
`;

export const LeftBtn = styled(IoArrowBackSharp)`
  position: absolute;
  left: -70px;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  font-size: 50px;
  transform: translate(0, -50%);
  color: #065f46;
`;

export const RightBtn = styled(IoArrowForwardSharp)`
  position: absolute;
  right: -70px;
  top: 50%;
  z-index: 10;
  font-size: 50px;
  transform: translate(0, -50%);
  cursor: pointer;

  color: #065f46;
`;

export const BodyContainer = styled.div`
  background-color: #ecfdf5;
`;

export const SmallContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  /* grid-template-rows: 1fr 1fr; */
  column-gap: 30px;
  padding: 64px;
  margin: 0 auto;
`;

export const Description = styled.p`
  font-size: 20px;
  font-family: "IBM Plex Serif";
  line-height: 1.5;
  color: #111827;
  margin-bottom: 48px;
  /* word-break: break-all; */
`;

export const MapContainer = styled.div`
  justify-self: end;
`;

export const AddReview = styled.div`
  width: 70%;
  grid-column: 1 / -1;
  margin-bottom: 48px;
`;

export const TextArea = styled.textarea`
  background-color: #f9fafb;
  width: 100%;
  display: block;
  margin-bottom: 12px;
  border: none;
  padding: 12px;
  outline: none;
  border: ${({ error }) => (error ? "1px solid red" : "none")};
  &:focus {
    box-shadow: 0 0 0 1px #065f46;
  }
`;

export const ReviewButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #065f46;
  color: #fff;
  transition: all 0.3s;
  &:hover {
    background-color: #064e3b;
  }
`;
export const Stars = styled.div`
  margin: 12px 0;
`;

export const Face = styled(IoHappySharp)`
  color: #065f46;
  font-size: 48px;
`;

export const Author = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .name {
    font-weight: bold;
    margin: 0;
  }
`;

export const DeleteButton = styled.button`
  margin-left: 10px;
  border: none;
  background-color: #065f46;
  padding: 8px 16px;
  color: white;
`;

export const Reviews = styled.div`
  .title {
    font-size: 40px;
    margin-bottom: 25px;
  }
`;
export const Review = styled.div`
  margin-bottom: 48px;
  .content {
    font-size: 20px;
    line-height: 1.3;
  }
`;


export const Delete = styled.button`
  background-color: #f87171;
  border: none;
  padding: 8px 16px;
  color: black;
`;

export const Edit = styled.button`
  background-color: #fde68a;
  border: none;
  padding: 8px 16px;
  margin-right: 20px;
  .link {
    text-decoration: none;
    color: black;
  }
`;

export const Label = styled.p`
  font-size: 25px;
  font-weight: bold;
`;

export const LoginButton = styled.button`
  padding: 12px;
  border: none;
  background-color: #065f46;
  transition: all 0.3s;
  margin-right: 30px;
  margin-left: 10px;
  .link {
    color: #fff;
    text-decoration: none;
  }

  &:hover {
    background-color: #064e3b;
  }
`;

export const RegisterButton = styled.button`
  padding: 12px;
  border: none;
  background-color: #d1fae5;
  transition: all 0.3s;

  .link {
    color: #064e3b;
    text-decoration: none;
  }

  &:hover {
    background-color: #a7f3d0;
  }
`;

export const FlashMessage = styled.p`
  position: absolute;
  font-size: 25px;
  color: #064e3b;
  top: 10%;
  left: 50%;
  background-color: #d1fae5;
  padding: 12px;
  border-radius: 10px;
`;


export const Rating = styled.div`
  margin: 0px 0 15px 0;
  display: flex;
  align-items: center;
  gap:10px;
`;

export const RatingsNumber = styled.p`
  color: #064e3b;
  margin-bottom: 0;
  padding: 0;
`;

