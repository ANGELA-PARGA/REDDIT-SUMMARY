export const API_ROOT = 'https://www.reddit.com';

export const search = async (searchTerm) => {
    try {
        const response = await fetch(`${API_ROOT}/search.json?q=${searchTerm}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status}: ${errorData.code}- ${errorData.message}`);
        }
        const json = await response.json();
        const posts = json.data.children.map((post) => post.data);

        const postsWithLogo = await Promise.all(posts.map(async (post) => {
            const logoUrl = await getSubredditLogo(post.subreddit_name_prefixed);
            return { ...post, icon_img: logoUrl };
        }));
        
        return postsWithLogo;        
    } catch (error) {
        throw Error (error);      
    } 
    
}

export const getSubredditsbySearch = async (searchTerm) => {
    try {
        const response = await fetch(`${API_ROOT}/subreddits/search.json?q=${searchTerm}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        return json.data.children.map((subreddit) => subreddit.data);        
    } catch (error) {
        throw Error (error);       
    }     
};

export async function fetchBestPost(after = '', before = '', count = '0'){
    try {
        const queryParams = new URLSearchParams({
            after,
            before,            
            count,
            limit: '25',
        });
        const response = await fetch(`${API_ROOT}/hot.json?${queryParams}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} ${response.statusText} - ${errorData.message}`);
        }
        const json = await response.json();

        const postsWithLogo = await Promise.all(json.data.children.map(async (post) => {
            const logoUrl = await getSubredditLogo(post.data.subreddit_name_prefixed);
            return { ...post, data: {...post.data, icon_img: logoUrl} };
        }));  
        const completeObject = {
            ...json, 
            data:{
                ...json.data,
                children: postsWithLogo
            }
        }
        return completeObject
    } catch (error) {
        throw Error (error);      
    }  
}

export const fetchSubreddits = async () => {
    try {
        const response = await fetch(`${API_ROOT}/subreddits/popular.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} - ${errorData.message}`);
        }
        const json = await response.json();    
        return json.data.children;
        
    } catch (error) {
        throw Error (error);     
    }
};


export const getSubredditLogo = async (subredditName) => {
    try {
        const response = await fetch(`${API_ROOT}/${subredditName}/about.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        return json.data.icon_img;        
    } catch (error) {
        throw Error (error);    
    }    
}

export const getPostInfo = async (permalink) => {
    try {
        const response = await fetch(`${API_ROOT}${permalink}.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        return json;        
    } catch (error) {
        throw Error (error);    
    }
}

export const getSubredditPosts = async (subredditName) => {
    try {
        const response = await fetch(`${API_ROOT}${subredditName}.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        return json.data.children.map((subreddit) => subreddit.data);        
    } catch (error) {
        throw Error (error);
    }
}

export const getSubredditInfo = async (subredditName) => {
    try {
        const response = await fetch(`${API_ROOT}${subredditName}about.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        return json.data;        
    } catch (error) {
        throw Error (error);   
    }
}
