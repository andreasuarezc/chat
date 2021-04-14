import '@testing-library/jest-dom'
import SignIn from './App';
import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

test('verificando comportamientos', () => {
  render(<SignIn/>);
  expect(screen.queryByText("Ingresar")).toBeInTheDocument();
})
