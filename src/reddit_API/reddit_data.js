export const API_ROOT = 'https://www.reddit.com';

export async function fetchBestPost(){
    const response = await fetch(`${API_ROOT}/hot.json`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
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

export const search = async (searchTerm) => {
    const response = await fetch(`${API_ROOT}/search.json?q=${searchTerm}`);
    const json = await response.json();
    return json.data.children.map((post) => post.data);
}


