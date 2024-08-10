const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      text: req.body.text,
      likes: 0
    });
    res.json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
