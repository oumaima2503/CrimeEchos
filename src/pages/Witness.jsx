import React, { useState, useEffect } from 'react';
import blood from '../assets/blood.svg';
import arriere from '../assets/arriere.png';
import Header from '../component/Header';
import kid from '../assets/image.png';
import user from '../assets/user.jpg';
import profil from '../assets/profil.jpg';
import '../App.css';
import { FaHandHoldingHeart, FaComments, FaEyeSlash } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { MdClose } from "react-icons/md";

const Witness = () => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('witnessPosts');
    try {
      return savedPosts && JSON.parse(savedPosts).length > 0
        ? JSON.parse(savedPosts)
        : [
            {
              id: 1,
              author: 'Oumaima Ikram',
              titre: 'Incident Report: Tragic Child Accident',
              content: 'In my neighborhood, two children were playing when a tragic accident occurred. They were mock sword fighting with sticks when one child accidentally struck the other on the head. The injured child collapsed and was unresponsive. Despite quick action by adults and paramedics, the child later passed away. This heartbreaking event reminds us of the importance of ensuring safety, even during innocent play.',
              image: kid,
              comments: [],
              likes: 0,
              hidden: false,
              showComments: false,
            },
          ];
    } catch (e) {
      return [
        {
          id: 1,
          author: 'Oumaima Ikram',
          titre: 'Incident Report: Tragic Child Accident',
          content: 'In my neighborhood, two children were playing when a tragic accident occurred. They were mock sword fighting with sticks when one child accidentally struck the other on the head. The injured child collapsed and was unresponsive. Despite quick action by adults and paramedics, the child later passed away. This heartbreaking event reminds us of the importance of ensuring safety, even during innocent play.',
          image: kid,
          comments: [],
          likes: 0,
          hidden: false,
          showComments: false,
        },
      ];
    }
  });

  const [newPost, setNewPost] = useState({ content: '', titre: '', image: null });
  const [showForm, setShowForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // State for the selected post for comments popup

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
            author: 'Oumaima Ikram',
            titre: newPost.titre,
            content: newPost.content,
            image: reader.result,
            comments: [],
            likes: 0,
            hidden: false,
            showComments: false,
          },
        ]);
        setNewPost({ content: '', titre: '', image: null });
        setShowForm(false);
      };
      if (newPost.image) {
        reader.readAsDataURL(newPost.image);
      } else {
        setPosts([
          ...posts,
          {
            id: posts.length + 1,
            author: 'Oumaima Ikram',
            titre: newPost.titre,
            content: newPost.content,
            image: null,
            comments: [],
            likes: 0,
            hidden: false,
            showComments: false,
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
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: post.comments.length + 1, author, text: comment, hidden: false },
              ],
            }
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

  const handleHideComment = (postId, commentId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, hidden: !comment.hidden }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const openCommentsPopup = (postId) => {
    const post = posts.find((post) => post.id === postId);
    setSelectedPost(post); // Set the selected post for the popup
  };

  const closeCommentsPopup = () => {
    setSelectedPost(null); // Close the popup by resetting the selected post
  };

  return (
    <div
      className={`h-screen bg-cover bg-no-repeat flex flex-col relative `}
      style={{ backgroundImage: `url(${arriere})`, backgroundPosition: '90% 0%'  }}
      
    >
       
      <img className="absolute -z-10 opacity-80" src={blood} alt="Blood Icon" />
      <Header />
      <div className="flex justify-between pl-10 mr-10 z-0">
        <div>
          <h1 className="text-2xl font-bold text-[#580B0B] nosifer max-[700px]:text-lg max-[480px]:text-xs max-[700px]:mt-2 max-[480px]:mt-4">Witness Reports</h1>
          <h1 className="text-2xl font-bold text-white -mt-9 nosifer max-[700px]:text-lg max-[480px]:text-xs max-[480px]:-mt-6 ">Witness Reports</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#982222] text-white px-4 py-2 rounded text-sm max-[480px]:px-1
           hover:bg-[#580B0B] items-center nosifer max-[700px]:text-xs max-[480px]:text-[8px]"
        >
          Add a Post
        </button>
      </div>
      <div className="z-0  flex-grow overflow-auto no-scrollbar pl-10 mr-10  justify-center">
        <div className="space-y-4 flex-col   ">
          {posts.map(
            (post) =>
              !post.hidden && (
                <div key={post.id} className="text-white p-4 rounded shadow-lg space-y-2 relative ">
                  <div className="flex  gap-10 justify-center max-[630px]:flex-col">
                    {post.image && (
                      <div className='space-y-2 max-[630px]:order-1 '>
                        <div className='flex gap-2 mb-3'>
                          <img className="hidden xl:block xl:h-6 xl:w-6 rounded-full " src={profil} alt="" />
                          <strong className='text-white/60 '>{post.author}</strong>
                        </div>
                        <img
                          src={post.image}
                          alt="Post Image"
                          className="size-60 rounded order-1  border-white border-2  max-[630px]:w-full items-center"
                        />
                      </div>
                    )}
                    <div className="max-[630px]:order-2  w-1/2 mt-7 max-[630px]:w-full max-[630px]:-mt-4
                     max-[900px]:bg-black/80 max-[900px]:px-4 py-4 rounded-lg shadow-lg">
                      <h2 className="text-lg font-bold koulen neon">{post.titre}</h2>

                      <p className="text-md font-semibold text-white/90">{post.content}</p>

                      <div className="flex items-center space-x-4 mt-2 justify-between font-bold ">
                        <div className='flex gap-6 '>
                          <button
                            className="text-sm  flex gap-2  text-red-500 items-center max-[700px]:text-xs "
                            onClick={() => handleLikePost(post.id)}
                          >
                            <FaHandHoldingHeart /> {post.likes}
                          </button>

                          <button
                            className="text-sm text-yellow-400 flex gap-2 items-center max-[700px]:text-xs "
                            onClick={() => openCommentsPopup(post.id)} // Open the comments popup
                          >
                            <FaComments /> Comments ({post.comments.filter((c) => !c.hidden).length})
                          </button>
                        </div>

                        <button 
                          className="text-sm flex gap-2 items-center neon max-[700px]:text-xs "
                          onClick={() => handleHidePost(post.id)}
                        >
                          <FaEyeSlash /> Hide Post
                        </button>
                      </div>
                      <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const comment = e.target.comment.value;
                              const author = 'Anonymous';
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
                              className="border rounded w-full p-1 text-sm bg-black/0"
                              placeholder="Add a comment"
                            />
                          </form>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Comments Popup */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20"  onClick={closeCommentsPopup}>
          <div
        className="relative p-6 rounded-lg  bg-black bg-opacity-50 
         text-white shadow-lg  max-[900px]:text-[15px] max-[600px]:text-[10px]    "
        style={{
          backgroundImage: `url(${arriere})`,
          backgroundPosition: '90% 30%',
          backgroundBlendMode: 'overlay',
          opacity:0.9,
          
        }}
      >
            <div className='text-[#eed7d7] text-2xl flex items-end justify-end -mt-2 mb-4 cursor-pointer  '
              onClick={closeCommentsPopup}><MdClose /></div>
             <h2 className='text-center nosifer neon max-[630px]:hidden'>{selectedPost.titre}</h2>
             <div className='flex justify-between gap-10 mt-6 max-[630px]:flex-col'>
          <div >
          <div className='space-y-2 max-[630px]:order-1 max-[630px]:hidden'>
            
                        <div className='flex gap-2 mb-3'>
                          <img className="hidden xl:block xl:h-6 xl:w-6 rounded-full " src={profil} alt="" />
                          <strong className='text-white/60 '>{selectedPost.author}</strong>
                        </div>
                        <img
                          src={selectedPost.image}
                          alt="Post Image"
                          className="size-60 rounded order-1  border-white border-2  max-[630px]:w-full items-center"
                        />
                      </div>

          </div>
          <div className="bg-white/90 w-[1px] max-[630px]:hidden"></div>
          <div className='mt-2 max-[630px]:mt-0'>
            
           <h2 className="text-lg font-bold mb-4 koulen  text-yellow-500 text-center "> Comments section:</h2>
            {/* <h2 className="text-lg font-bold mb-4 koulen text-center text-white neon "> {selectedPost.titre}</h2> */}
           
            <div className="space-y-2 text-white mt-6">
              {selectedPost.comments.map((comment) => (
                !comment.hidden && (
                  <p key={comment.id} className="text-sm flex justify-between">
                    <div className='flex justify-center gap-2 '>
                      <div className='flex gap-2 mb-3 items-center'>
                        <img className="hidden xl:block xl:h-4 xl:w-4 rounded-full " src={user} alt="" />
                        <p className='text-white/70 font-bold '>{comment.author} :</p>
                      </div>
                      
                      {comment.text}
                    </div>
                    <button
                      className="text-sm text-[#eed7d7] ml-2 flex items-center gap-2 font-bold"
                      onClick={() => handleHideComment(selectedPost.id, comment.id)}
                    >
                      <FaEyeSlash /> 
                    </button>
                  </p>
                )
              ))}
            </div>
            </div>
            </div>
            
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-20 max-[450px]:m-10 text-sm ">
          <div className="bg-white/90 p-6 rounded shadow-lg w-96 mt-12">
            <h2 className="text-xl font-bold mb-4 nosifer  text-[#580B0B]">Add a Witness Report</h2>
            <form onSubmit={handleAddPost} className="space-y-4">
              <input
                type="text"
                value={newPost.titre}
                onChange={(e) =>
                  setNewPost({ ...newPost, titre: e.target.value })
                }
                className="border border-[#580B0B] w-full p-2 rounded text-[#580B0B] "
                placeholder="Enter title..." required
              />
              <textarea
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                className="border border-[#580B0B] w-full p-2 rounded text-[#580B0B]"
                rows="3"
                placeholder="Describe the incident..." required
              ></textarea>
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 justify-center koulen px-4 py-2 text-[#580B0B] border border-[#580B0B] text-center font-bold hover:scale-105 bg-gray-100 rounded-md cursor-pointer mb-2"
              >
                <MdPhotoLibrary />
                Add a photo to your post
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewPost({ ...newPost, image: file, preview: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>

              {/* Preview the selected image */}
              {newPost.preview && (
                <div className="flex justify-center mb-4">
                  <img
                    src={newPost.preview}
                    alt="Preview"
                    className="w-40 h-40 border border-gray-300 rounded"
                  />
                </div>
              )}

              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#982222] text-white px-4 py-2 rounded hover:bg-[#580B0B]"
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
