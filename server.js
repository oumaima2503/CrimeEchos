import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 4000;

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the image paths (replace with actual image paths if necessary)
const user = '/assets/user.jpg'; // Example path to a user image
const kid = '/assets/kid.png'; // Example path to a post image (kid)
const thief = '/assets/thief.jpg'; // Example path to a post image (thief)
const heist = '/assets/heist.jpg'; // Example path to a post image (heist)

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer to store images in the 'uploads' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Sample posts array
let posts = [
  {
    id: 1,
    author: 'Ikram',
    userImage: user,
    titre: 'Incident Report: Tragic Child Accident',
    content: 'In my neighborhood, two children were playing when a tragic accident occurred...',
    postImage: kid,
    comments: [{ id: 1, author: 'Chaymae', content: 'This is heartbreaking.' }],
    likes: 5,
  },
  {
    id: 2,
    author: 'Oumaima',
    userImage: user,
    titre: 'The Gleam of Trouble',
    content: 'Late at night, under the dim glow of a flickering streetlamp...',
    postImage: thief,
    comments: [{ id: 1, author: 'Rim', content: 'this is so sad :(' }],
    likes: 10,
  },
  {
    id: 3,
    author: 'Souad',
    userImage: user,
    titre: 'The Silent Heist',
    content: 'Under the cover of darkness, a figure silently approached a quiet jewelry store...',
    postImage: heist,
    comments: [{ id: 1, author: 'Hanan', content: 'OOOH Noooo' }],
    likes: 0,
  },
];

// Serve static files (images)
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Add a new post (with image upload)
app.post('/api/posts', upload.single('image'), (req, res) => {
  const { titre, content } = req.body;
  const image = req.file ? req.file.path : null;

  const newPost = {
    id: posts.length + 1,
    titre,
    content,
    image,
    comments: [],
    likes: 0,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// Like a post
app.post('/api/posts/:id/like', (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (post) {
    post.likes += 1;
    res.json({ likes: post.likes });
  } else {
    res.status(404).send('Post not found');
  }
});

// Add a new comment to a post
app.post('/api/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const { author, content } = req.body;
  
    // Find the post by ID
    const post = posts.find((p) => p.id === postId);
    
    if (post) {
      // Create a new comment
      const newComment = {
        id: post.comments.length + 1, // Increment the comment ID
        author,
        content,
      };
  
      // Add the comment to the post's comments array
      post.comments.push(newComment);
  
      // Respond with the updated post
      res.status(201).json(post);
    } else {
      res.status(404).send('Post not found');
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
