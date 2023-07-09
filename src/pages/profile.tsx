import Head from "next/head";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { RootState } from "../reducers";

const Profile = () => {
    const { ownUser } = useSelector((state: RootState) => state.user);

    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <title>내 프로필 | MySNS</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={ownUser.Followings} />
                <FollowList header="팔로워 목록" data={ownUser.Followers} />
            </AppLayout>
        </>
    );
}

export default Profile;