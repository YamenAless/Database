const thinksyria = require("../db");

const allPosts = (req, res) => {
  thinksyria.query(`SELECT * FROM thinksyria.posts`, (err, result) => {
    if (err) {
      return res.send({
        success: false,
        messages: err.message,
        data: [],
      });
    }
    if (result?.length > 0) {
      return res.send({
        success: true,
        messages: "you got all posts",
        data: result,
      });
    } else
      return res.send({ success: false, messages: "no posts yet", data: [] });
  });
};

const createPost = (req, res) => {
  const { content } = req.body;
  const token = req.headers.authorization?.split("Bearer")[1];
  const json = JSON.parse(token);
  if (content.length < 10) {
    return res.send({
      success: false,
      messages: "the content must be at least 10 chars",
    });
  }
  thinksyria.query(
    `INSERT INTO thinksyria.posts (content, userId) VALUES ('${content}', (SELECT ${json.id} FROM thinksyria.users WHERE id='${json.id}'))`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          messages: err.message,
        });
      }
      return res.send({
        success: true,
        messages: "Post Created Successfully",
      });
    }
  );
};

const getSinglePost = (req, res) => {
  const userId = req.params.id;
  if (userId == "") {
    return res.send({
      success: false,
      messages: "Id is require",
    });
  }
  thinksyria.query(
    `SELECT * FROM thinksyria.posts WHERE userId='${userId}'`,
    (err, result) => {
      if (result?.length > 0)
        return res.send({
          success: true,
          messages: "Your all posts",
          data: result,
        });
      return res.send({
        success: false,
        messages: "no posts ",
      });
    }
  );
};

const deletPost = (req, res) => {
  const { postId } = req.body;
};

const editPost = (req, res) => {
  const { content, postId } = req.body;
  const token = req.headers.authorization?.split("Bearer")[1];
  const json = JSON.parse(token);
  if (content.length < 10) {
    return res.send({
      success: false,
      messages: "the content must be at least 10 chars",
    });
  }

  thinksyria.query(
    ` UPDATE thinksyria.posts SET content='${content}' WHERE id='${postId}' AND userId='${json.id}'`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          messages: "the content or PostId is require",
          data: [],
        });
      }
      return res.send({
        success: true,
        messages: "Post Edited Successfully",
      });
    }
  );
};


module.exports = {
  allPosts,
  createPost,
  getSinglePost,
  deletPost,
  editPost,

};
