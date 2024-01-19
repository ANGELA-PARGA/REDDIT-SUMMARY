export function SubredditCard({data}){
    return (
        <div>
            <img src={data.icon_img} alt="icon" />
            <p>{data.display_name_prefixed}</p>
            <p>{data.public_description}</p>
        </div>
    )
}