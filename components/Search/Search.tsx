import React from 'react';
import styled from 'styled-components';

interface SearchProps {
  defaultValue: string;
  placeholder: string;
  buttonType: 'button' | 'submit';
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 2.1875em;
  padding: 0.1875em 0.5em;
  width: 85vw;
  margin: 1.875em auto;
  @media (min-width: 17.5em) and (max-width: 30em) {
    justify-content: center;
  }
`;
const Input = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 0.0625em solid #000;
  height: 1.125em;
  padding: 0.375em;
  margin: 0 0.75em;
  font-weight: 600;
  font-size: 1em;
  font-family: 'JosefinSlab', Helvetica, sans-serif;
  &:active, &:focus {
    outline: 0.0625em solid #029;
    border: none;
    border-radius: 0.1875em;
  }
  ::placeholder {
    font-family: 'JosefinSlab', Helvetica, sans-serif;
  }
`;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  height: 85%;
  &:hover, &:active, &:focus {
    outline: 0.0625em solid #aaa;
  }
`;
const Label = styled.label`
  display: flex;
  span {
    align-self: flex-end;
  }
`;
export default function Search({defaultValue, placeholder, onSubmit, onChange, onBlur, buttonType}: SearchProps) {
  return (
      <Form onSubmit={onSubmit}>
        <Label htmlFor="album-search-box">
          <Input
            name='album-search-box'
            aria-label="album-search-box" 
            placeholder={placeholder} 
            onBlur={onBlur} 
            defaultValue={defaultValue}
            onChange={onChange}
          />
        </Label>
        <Button type={buttonType}>&#x1F50E;</Button>
      </Form>
  )
}
