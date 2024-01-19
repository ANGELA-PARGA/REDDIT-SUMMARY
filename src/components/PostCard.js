export function PostCard({data}){
    return (
        <div>
            <div>
                <p>r/{data.subreddit_name_prefixed}</p>
                <p>Posted by: u/{data.author}</p>                
            </div>
            <h2>{data.title}</h2>
            <p>{data.selftext}</p>
            <div>
                <p>Comments: {data.num_comments}</p>
                <p>Votes: {data.score}</p>                
            </div>
        </div>
    )
}