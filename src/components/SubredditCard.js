import { UilImageBlock } from '@iconscout/react-unicons'

export function SubredditCard({data}){
    return (
        <div>
            {!data.icon_img ? <UilImageBlock size={100} color='#D42B2B'/>: <img src={data.icon_img} alt="icon" />}
            <p>{data.display_name_prefixed}</p>
            {!data.public_description ? <p>No description provided </p>:<p>{data.public_description}</p>}
        </div>
    )
}