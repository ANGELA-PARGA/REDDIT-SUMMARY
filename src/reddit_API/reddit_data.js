export const API_ROOT = 'https://www.reddit.com';

export const search = async (searchTerm) => {
    const response = await fetch(`${API_ROOT}/search.json?q=${searchTerm}`);
    const json = await response.json();
    const posts = json.data.children.map((post) => post.data);

    const postsWithLogo = await Promise.all(posts.map(async (post) => {
        const logoUrl = await getSubredditLogo(post.subreddit_name_prefixed);
        return { ...post, icon_img: logoUrl };
    }));

    return postsWithLogo;
}

export async function fetchBestPost(){
    const response = await fetch(`${API_ROOT}/hot.json`);
    const json = await response.json();
    const posts = json.data.children.map((post) => post.data);

    const postsWithLogo = await Promise.all(posts.map(async (post) => {
        const logoUrl = await getSubredditLogo(post.subreddit_name_prefixed);
        return { ...post, icon_img: logoUrl };
    }));

    return postsWithLogo;
}

export const getSubredditsbySearch = async (searchTerm) => {
    const response = await fetch(`${API_ROOT}/subreddits/search.json?q=${searchTerm}`);
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
};

export const fetchSubreddits = async () => {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
};

export const getSubredditLogo = async (subredditName) => {
    const response = await fetch(`${API_ROOT}/${subredditName}/about.json`);
    const json = await response.json();
    return json.data.icon_img;
}


