import React from 'react';
import Layout from '@/components/layout/Layout';

const Wrap = css.div`
  color: #ccc;
  font-size: 25px;
`;

function HomePage() {
  return (
    <Layout>
      <Wrap>homepage</Wrap>
    </Layout>
  );
}

export default HomePage;
