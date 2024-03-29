import { Card, List } from "antd";
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { ReactNode } from "react";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user/actionTypes";
import { UserData, IdData } from "../reducers/user/types";

const FollowList = ({ header, data }: { header: ReactNode, data: (UserData | IdData)[] }) => {
    const dispatch = useDispatch();
    // 반복문 안에 onClick이 있기 때문에 고차함수로 선언해준다
    const onDelete = (id: number) => () => {
        if (header === '팔로잉 목록') {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: id,
            });
        } else {
            dispatch({
                type: REMOVE_FOLLOWER_REQUEST,
                data: id,
            });
        }
    };

    return (
        <List
            style={{ marginBottom: 20 }}
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }}><button>더보기</button></div>}
            bordered
            dataSource={data}
            renderItem={(item: UserData | IdData) => (
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[<StopOutlined key="stop" onClick={onDelete(item.id)} />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    );
};

FollowList.propType = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
}

export default FollowList;