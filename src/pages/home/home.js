import React from 'react';
import Layout from '@/components/layout/Layout';

import { Button, Card } from 'antd';

const Wrap = css.div`
  color: #ccc;
  font-size: 25px;
`;

function HomePage() {
  return (
    <Layout>
      <Wrap>homepage</Wrap>
      <Button>hello world</Button>
      <Card>hello world</Card>
    </Layout>
  );
}

export default HomePage;
