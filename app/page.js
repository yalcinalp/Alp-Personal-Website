import PostCard from "@/components/PostCard";
import { getAllPostsMetadata, getTags } from "@/utils/fileOperations";
import Link from "next/link";

export default function Home() {
  const posts = getAllPostsMetadata();
  const tags = getTags();
  const recentPosts = posts;
  console.log(tags);
  return (
    <main className="home">
      <div className="container">
        <div className="home-showcase">
          <div className="content">
            <div className="texts">
              <h1 className="title">Alp Yalcin</h1>
              <p className="description">
                👋 Hi!
                <br />
                I&apos;m Alp. I&apos;m a Computer Science & Engineering student from Istanbul
              </p>
            </div>
            <img className="image" src="/assets/home_pic.jpg"></img>
          </div>
        </div>

        <div className="recent-posts section">
          <div className="heading">
            <h1 className="title">Recent Posts</h1>
          </div>
          <div className="content">
            {recentPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="tags section">
          <div className="heading">
            <h1 className="title">Tags</h1>
          </div>
          <div className="content">
            {tags.map((tag, index) => (
              <Link className="tag" key={index} href={`/tag/${tag.name}`}>
                <div className="name">{tag.name.replaceAll("_", " ")}</div>
                <div className="count">
                  {tag.count > 1 ? tag.count + " Posts" : tag.count + " Post"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="background-ambiance">
        <img src="/assets/home_pic.jpg"></img>
      </div>
    </main>
  );
}
