import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
    const followerList = [{ nickname: "이건혁" }, { nickname: "sy2tema" }, { nickname: "프론트" }];
    const followingList = [{ nickname: "이건혁" }, { nickname: "sy2tema" }, { nickname: "프론트" }];

    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <title>내 프로필 | MySNS</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followingList} />
                <FollowList header="팔로워 목록" data={followerList} />
            </AppLayout>
        </>
    );
}

export default Profile;