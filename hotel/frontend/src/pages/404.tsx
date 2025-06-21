import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Title } from '../constants/enums';

export default function Error() {
  return (
    <Layout title={Title.ERROR}>
      <h1>Error: page not found</h1>
      <Link href="/">Go to home page</Link>
    </Layout>
  );
}
