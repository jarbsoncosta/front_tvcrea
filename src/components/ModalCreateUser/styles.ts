import styled from "styled-components";

export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 1rem;
padding: 0 1rem;

button{
    padding: 0.4rem 1rem;
    border-radius: 4px;
    background:  ${(props) => props.theme["blue"]};
    color: ${(props) => props.theme["white"]} ;
    border: 0;
    transition: 1s;
    &:hover{
        background:  ${(props) => props.theme["blue-back"]};
    }
}
`;

export const Input = styled.input`
border-radius: 4px;
display: flex;
padding: 0.5rem;
border: 1px solid ${(props) => props.theme["gray-300"]};
`;
