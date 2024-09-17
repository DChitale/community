const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const database = new sdk.Databases(client);
  const { postId, userId } = JSON.parse(req.payload);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
    return res.json({ error: 'Missing environment variables' });
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);

    try {
      // Fetch the post document
      const post = await database.getDocument('66e320860035088d27b7', '66e3208e0035ff5f42ff', postId);

      let likedUsers = post.likedUsers || [];
      let newLikes = post.likes || 0;

      // Check if the user has already liked the post
      if (likedUsers.includes(userId)) {
        // Unlike the post
        likedUsers = likedUsers.filter(id => id !== userId);
        newLikes -= 1;
      } else {
        // Like the post
        likedUsers.push(userId);
        newLikes += 1;
      }

      // Update the post document with the new like status
      const updatedPost = await database.updateDocument(
        '66e320860035088d27b7', // Database ID
        '66e3208e0035ff5f42ff', // Collection ID
        postId, // Document ID
        { likes: newLikes, likedUsers } // Update the likes and likedUsers fields
      );

      return res.json({ data: updatedPost });
    } catch (error) {
      console.error('Error updating post:', error);
      return res.json({ error });
    }
  }
};
