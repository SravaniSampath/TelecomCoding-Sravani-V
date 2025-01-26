import React, { useEffect, useState } from "react";
import './UserDashboard.css';
import Avatar from '../userDashboardwithActivityStats/avatar-profile-colorful-illustration-2_549209-82.avif'


const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {     
        fetchUserData();
    }, []);
    
    //Fetching APIS 
    const fetchUserData = async () => {
        try {
            setLoading(true);

            // Fetching user info
            const userResponse = await fetch(
                "https://jsonplaceholder.typicode.com/users/1"
            );
            if (!userResponse.ok) throw new Error("Failed to fetch user info.");
            const userData = await userResponse.json();

            // Fetch posts
            const postsResponse = await fetch(
                "https://jsonplaceholder.typicode.com/posts?userId=1"
            );
            if (!postsResponse.ok) throw new Error("Failed to fetch posts.");
            const postsData = await postsResponse.json();

            // Fetch comments for each post
            const updatedPosts = await Promise.all(
                postsData.map(async (post) => {
                    const commentsResponse = await fetch(
                        "https://jsonplaceholder.typicode.com/comments?postId=${post.id}"
                    );
                    if (!commentsResponse.ok) throw new Error("Failed to fetch comments.");
                    const commentsData = await commentsResponse.json();
                    return { ...post, commentsCount: commentsData.length };
                })
            );

            setUser(userData);
            setPosts(updatedPosts);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <>            
            <div className="dashboard">
            <h3 >UserDashboard with Activity Stats</h3>
                <div className="container-md">
                    <h2>User Profile</h2>
                    <img src={Avatar} className="avatar" alt="User Avatar"></img>
                    <h5>User name:{user.name}</h5>
                    <h5>User E-mail:{user.email}</h5>

                </div>


                {/* Posts Section */}
                <div className="container-md">
                    <h2>Recent Posts</h2>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                {post.title} <span>({post.commentsCount} comments)</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    );
};

export default UserDashboard;