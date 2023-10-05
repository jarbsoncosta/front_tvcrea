import { styled } from "styled-components";

export const ContentModal = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 strong{
    margin-bottom: 1rem;
 }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  input {
    width: 465px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme["gray-300"]};
    margin-bottom: 0.5rem;
  }
  label {
    width: 100%;
  }
  button{
    padding: 5px;
    border-radius: 4px;
    margin-top: 1rem;
    background:${(props) => props.theme["blue"]};
    border: 0;
    color: white;
    &:hover{
        background:${(props) => props.theme["blue-back"]}; 
    }
  }
`;
