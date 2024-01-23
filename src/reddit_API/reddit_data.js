export const API_ROOT = 'https://www.reddit.com';

export const search = async (searchTerm) => {
    try {
        const response = await fetch(`${API_ROOT}/search.json?q=${searchTerm}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        const posts = json.data.children.map((post) => post.data);

        const postsWithLogo = await Promise.all(posts.map(async (post) => {
            const logoUrl = await getSubredditLogo(post.subreddit_name_prefixed);
            return { ...post, icon_img: logoUrl };
        }));
        
        return postsWithLogo;        
    } catch (error) {
        console.log(`error searching data: ${error.message}`)
        return { error: error.message };        
    }   
    
}

export async function fetchBestPost(){
    try {
        const response = await fetch(`${API_ROOT}/hot.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        const posts = json.data.children.map((post) => post.data);

        const postsWithLogo = await Promise.all(posts.map(async (post) => {
            const logoUrl = await getSubredditLogo(post.subreddit_name_prefixed);
            return { ...post, icon_img: logoUrl };
        }));

        return postsWithLogo;
    } catch (error) {
        console.log(`error fetching best posts: ${error.message}`)
        return { error: error.message };         
    }    
}

export const getSubredditsbySearch = async (searchTerm) => {
    try {
        const response = await fetch(`${API_ROOT}/subreddits/search.json?q=${searchTerm}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        return json.data.children.map((subreddit) => subreddit.data);        
    } catch (error) {
        console.log(`error searching subreddits: ${error.message}`)
        return { error: error.message };         
    }     
};

export const fetchSubreddits = async () => {
    try {
        const response = await fetch(`${API_ROOT}/subreddits.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.message}`);
        }
        const json = await response.json();        
        return json.data.children.map((subreddit) => subreddit.data);
        
    } catch (error) {
        console.log(`error fetching subreddits: ${error.message}`)
        return { error: error.message };         
    }
};

export const getSubredditLogo = async (subredditName) => {
    try {
        const response = await fetch(`${API_ROOT}/${subredditName}/about.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        return json.data.icon_img;        
    } catch (error) {
        console.log(`error getting subreddits logos: ${error.message}`)
        return { error: error.message };         
    }    
}

export const getPostInfo = async (permalink) => {
    try {
        const response = await fetch(`${API_ROOT}${permalink}.json`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.message}`);
        }
        const json = await response.json();
        return json;        
    } catch (error) {
        console.log(`error getting post info: ${error.message}`)
        return { error: error.message };         
    }
}


