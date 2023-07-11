import React from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import { NextComponentType } from "next"
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import wrapper from '../store/configureStore';

const MySNS: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <title>MySNS</title>
            </Head>
            <Component />
        </>
    );
};

export default wrapper.withRedux(MySNS);