import React, { useState, useEffect } from 'react';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import kid from '../assets/image.png'; // Ensure this path is correct

const Witness = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('witnessPosts');
    try {
      return savedPosts && JSON.parse(savedPosts).length > 0
        ? JSON.parse(savedPosts)
        : [
            {
              id: 1,
              author: 'John Doe',
              titre: 'Incident Report: Tragic Child Accident',
              content:
                'In my neighborhood, two children were playing when a tragic accident occurred. They were mock sword fighting with sticks when one child accidentally struck the other on the head. The injured child collapsed and was unresponsive. Despite quick action by adults and paramedics, the child later passed away. This heartbreaking event reminds us of the importance of ensuring safety, even during innocent play.',
              image: kid, // Default image
              comments: [],
              likes: 0,
              hidden: false,
            },
          ];
    } catch (e) {
      return [
        {
          id: 1,
          author: 'John Doe',
          titre: 'Incident Report: Tragic Child Accident',
          content:
            'In my neighborhood, two children were playing when a tragic accident occurred. They were mock sword fighting with sticks when one child accidentally struck the other on the head. The injured child collapsed and was unresponsive. Despite quick action by adults and paramedics, the child later passed away. This heartbreaking event reminds us of the importance of ensuring safety, even during innocent play.',
          image: kid, // Default image
          comments: [],
          likes: 0,
          hidden: false,
        },
      ];
    }
  });

  const [newPost, setNewPost] = useState({
    content: '',
    titre: '',
    image: null,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('witnessPosts', JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPost.content.trim()) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosts([
          ...posts,
          {
            id: posts.length + 1,
            author: 'Anonymous',
            titre: newPost.titre,
            content: newPost.content,
            image: reader.result, // Store image as Base64
            comments: [],
            likes: 0,
            hidden: false,
          },
        ]);
        setNewPost({ content: '', titre: '', image: null });
        setShowForm(false);
      };
      if (newPost.image) {
        reader.readAsDataURL(newPost.image); // Convert image to Base64
      } else {
        setPosts([
          ...posts,
          {
            id: posts.length + 1,
            author: 'Anonymous',
            titre: newPost.titre,
            content: newPost.content,
            image: null,
            comments: [],
            likes: 0,
            hidden: false,
          },
        ]);
        setShowForm(false);
      }
    }
  };

  const handleAddComment = (postId, comment, author) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { author, text: comment }] }
          : post
      )
    );
  };

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleHidePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, hidden: !post.hidden } : post
      )
    );
  };

  return (
    <div
      className={`h-screen bg-cover bg-no-repeat flex flex-col relative`}
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%' }}
    >
      <img className="absolute z-0 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
      <div className="z-10 flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Witness Reports</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Add a Post
        </button>
        <div className="space-y-6">
          {posts.map(
            (post) =>
              !post.hidden && (
                <div
                  key={post.id}
                  className="bg-white p-4 rounded shadow-lg space-y-2 relative"
                >
                  <h2 className="text-lg font-bold">{post.titre}</h2>
                  <h3 className="text-md text-gray-700">{post.author}</h3>
                  <p>{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image} // Default image or Base64
                      alt="Post Image"
                      className="w-full h-64 object-cover rounded"
                    />
                  )}
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      className="text-sm text-blue-500"
                      onClick={() => handleLikePost(post.id)}
                    >
                      Like ({post.likes})
                    </button>
                    <button
                      className="text-sm text-red-500"
                      onClick={() => handleHidePost(post.id)}
                    >
                      Hide Post
                    </button>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-bold">Comments</h3>
                    {post.comments.map((comment, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        <strong>{comment.author}: </strong>{comment.text}
                      </p>
                    ))}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const comment = e.target.comment.value;
                        const author = 'Anonymous'; // Replace with logged-in user if available
                        if (comment.trim()) {
                          handleAddComment(post.id, comment, author);
                          e.target.comment.value = '';
                        }
                      }}
                      className="mt-2"
                    >
                      <input
                        type="text"
                        name="comment"
                        className="border rounded w-full p-1 text-sm"
                        placeholder="Add a comment"
                      />
                    </form>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add a Witness Report</h2>
            <form onSubmit={handleAddPost} className="space-y-4">
              <input
                type="text"
                value={newPost.titre}
                onChange={(e) =>
                  setNewPost({ ...newPost, titre: e.target.value })
                }
                className="border w-full p-2 rounded"
                placeholder="Enter title..."
              />
              <textarea
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                className="border w-full p-2 rounded"
                rows="3"
                placeholder="Describe the incident..."
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewPost({ ...newPost, image: e.target.files[0] })
                }
                className="border rounded p-1"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Witness;
