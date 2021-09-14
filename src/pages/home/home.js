import React from 'react';
import Layout from '@/components/layout/Layout';

const Wrap = css.div`
  color: ${({ theme }) => theme.primary};
  font-size: 25px;
  text-align: center;
  padding: 10vh 1vh;
`;

function HomePage() {
  return (
    <Layout>
      <Wrap>homepage</Wrap>
    </Layout>
  );
}

export default HomePage;
