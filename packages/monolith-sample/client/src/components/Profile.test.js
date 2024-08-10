import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from './Profile';

test('renders profile details', () => {
  const { getByText, getByAltText } = render(<Profile />);

  // Verifica se o nome do usuário é renderizado
  expect(getByText('John Doe')).toBeInTheDocument();

  // Verifica se a ocupação do usuário é renderizada
  expect(getByText('Software Engineer at Example Corp.')).toBeInTheDocument();

  // Verifica se a imagem de perfil é renderizada
  expect(getByAltText('Profile')).toBeInTheDocument();
});
