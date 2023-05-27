import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Profile = () => {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <title>내 프로필 | MySNS</title>
            </Head>
            <AppLayout>내 프로필</AppLayout>
        </>
    );
}

export default Profile;