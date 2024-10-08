const sdk = require("node-appwrite");



module.exports = async function (req, res) {
  const client = new sdk.Client();

  const database = new sdk.Databases(client);
  const { postId, likes } = JSON.parse(req.payload)

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
    
    let newPost = {}
    if (postId) {
      try {
        newPost = await database.updateDocument(
          '66e320860035088d27b7',
          '66e3208e0035ff5f42ff',
          postId,
          { likes }
        );
        console.log('NEW POST: ', newPost)
        return res.json({ data: newPost });
      } catch (error) {
        console.log(error)
        return res.json({error})
      }
    }
  }
};