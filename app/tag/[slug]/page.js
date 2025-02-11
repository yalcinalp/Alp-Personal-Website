import PostCard from "@/components/PostCard";
import { getPostsWithTag, getTags } from "@/utils/fileOperations";
import React from 'react';


export const generateStaticParams = async () => {
    const tags = getTags();
    return tags.map(tag => ({
        slug: tag.name
    }));
};

export async function generateMetadata({ params, searchParams }) {
    const id = params?.slug ? ' - ' + params?.slug : '';
    return {
        title: `Ilc Blog ${id.replaceAll('_', ' ')}`
    }
}


export default function TagPage(props) {
    const tag = props.params.slug;
    const posts = getPostsWithTag(tag);
    return (
        <main className="tag-page">
            <div className="container">
                <div className='header'>
                    <h1 className='title'>tag: {tag.replaceAll('_', ' ')}</h1>
                    <p className='description'>{posts.length > 1 ? posts.length + " Posts" : posts.length + " Post"}</p>
                </div>
                <div className="content">
                    {
                        posts.length > 0 ?
                            posts.map((post, index) => (
                                <PostCard key={index} post={post} />
                            ))
                            : <h2>No posts found with this tag</h2>
                    }
                </div>
            </div>
        </main>
    );
}
