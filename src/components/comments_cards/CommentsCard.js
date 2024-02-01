import { CommentItem } from './CommentItem'


export function CommentsCard({data}){
    const comments = data.data.children;

    return (
        <>
        {comments.map((comment) => (
            <CommentItem comment={comment} key={comment.data.id}/>
        ))}
        </>
    );
}