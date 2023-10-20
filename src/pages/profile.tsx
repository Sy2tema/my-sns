import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { RootState } from "../reducers";
import { useEffect } from "react";
import Router from "next/router";
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from "../reducers/user/actionTypes";

const Profile = () => {
    const dispatch = useDispatch();
    const { ownUser } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
        });
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
        })
    }, [dispatch]);

    useEffect(() => {
        if (!ownUser) {
            Router.replace("/");
        }
    }, [ownUser]);

    if (!ownUser) return null;

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