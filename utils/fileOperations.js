import fs from 'fs';
import matter from 'gray-matter';

// This function returns the metadata of all the posts in specified folder
function getAllPostsMetadata() {
    const folder = 'content/';
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter(file => file.endsWith('.md'))
    const posts = markdownPosts.map((filename) => {
        const fileContents = fs.readFileSync(`content/${filename}`, 'utf8');
        const matterResult = matter(fileContents);
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            author: matterResult.data.author,
            tags: matterResult.data.tags.split(',').map(tag => tag.trim()),
            desc: matterResult.data.description,
            thumbnail: matterResult.data.thumbnail,
            slug: filename.replace('.md', '')
        }
    });
    posts.sort((a, b) => b.date - a.date);
    return posts;
}

// This function returns the matter of a post
function getPostContent(slug) {
    const folder = 'content/';
    const file = `${folder}/${slug}.md`;
    const fileContents = fs.readFileSync(file, 'utf8');
    const matterResult = matter(fileContents);
    return (
        {
            ...matterResult,
            data: {
                ...matterResult.data,
                date: matterResult.data.date,
                tags: matterResult.data.tags.split(',').map(tag => tag.trim())
            }
        }
    );
}

function getPostsWithTag(tag) {
    const posts = getAllPostsMetadata();
    return posts.filter(post => post.tags.includes(tag));
}

// This function returns all the tags with the number of posts associated with it
function getTags() {
    const posts = getAllPostsMetadata();
    const tags = {};
    posts.forEach(post => {
        post.tags.forEach(tag => {
            if (tags[tag]) {
                tags[tag] += 1;
            } else {
                tags[tag] = 1;
            }
        });
    });
    const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
    return sortedTags.map(tag => ({ name: tag, count: tags[tag] }));
}

export { getAllPostsMetadata, getPostContent, getPostsWithTag, getTags };