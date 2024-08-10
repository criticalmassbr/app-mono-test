import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Post from './Post';

test('renders post and allows liking', () => {
  const post = { _id: '1', text: 'This is a test post', likes: 0 };
  
  const { getByText } = render(<Post post={post} />);

  // Verifica se o texto da postagem é exibido
  expect(getByText('This is a test post')).toBeInTheDocument();

  // Verifica se o número de curtidas está correto
  const likeElement = getByText('0');
  expect(likeElement).toBeInTheDocument();

  // Simula um clique no botão de "like"
  fireEvent.click(getByText('👍'));

  // Verifica se o número de curtidas foi incrementado
  expect(likeElement.textContent).toBe('1');
});
