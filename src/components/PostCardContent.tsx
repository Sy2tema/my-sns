import Link from 'next/link';
import PropTypes from 'prop-types';

// const PostCardContent = (props: {postData: string})의 방식으로 타입 지정을 할 수도 있다.
// 위처럼 타입 지정할 경우 props.postData와 같이 props를 앞에 붙여줘야 정상적으로 속성값을 불러올 수 있다.
const PostCardContent = ({ postData }: { postData: string }) => {
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((value, index) => {
                if (value.match(/(#[^\s#]+)/))
                    return <Link href={`/hashtag/${value.slice(1)}`} key={index}><a href='/'>{value}</a></Link>
                return value;
            })}
        </div>
    );
};

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };

export default PostCardContent;