'use client';
import { useRouter } from "next/navigation";

export default function PostCard(props) {
    const { post, sectionName } = props;
    const router = useRouter();
    // parse date
    const dateObject = new Date(post.date);
    const prettyDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    return (
        <div className="card" onClick={() => { router.push(`/posts/${post.slug}`) }}>
            <div className="wrapper">
                <h2 className="title">{post.title}</h2>
                <p className="desc">{post.desc.length > 100 ? `${post.desc.slice(0, 100)}...` : post.desc}</p>
                <p className="date">{prettyDate}</p>
            </div>
            <div className="thumbnail">
                <img src={post.thumbnail ? post.thumbnail : "/assets/card_default.jpg"} alt={post.title} />
            </div>
        </div>

    );
}