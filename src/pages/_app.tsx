import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { NextComponentType } from "next"
import { AppContext, AppInitialProps, AppProps } from 'next/app';

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({ Component }) => {
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

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default App;