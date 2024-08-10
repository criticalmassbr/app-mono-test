import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Timeline from './Timeline';

jest.mock('axios');

test('renders timeline with posts', async () => {
  const posts = [
    { _id: '1', text: 'First post', likes: 0 },
    { _id: '2', text: 'Second post', likes: 5 }
  ];

  axios.get.mockResolvedValue({ data: posts });

  render(<Timeline />);

  // Verifica se o título da timeline é renderizado
  expect(screen.getByText('Timeline')).toBeInTheDocument();

  // Verifica se os textos das postagens são renderizados
  expect(await screen.findByText('First post')).toBeInTheDocument();
  expect(await screen.findByText('Second post')).toBeInTheDocument();
});
