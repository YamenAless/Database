const thinksyria = require("../db");

const createComment = (req, res) => {
  const { post_id } = req.body;
  const { content } = req.body;
  const token = req.headers.authorization?.split("Bearer")[1];

  const json = JSON.parse(token);
  if (content.length < 10) {
    return res.send({
      success: false,
      messages: "content must be at least 10 char's",
    });
  }

  thinksyria.query(
    `INSERT INTO thinksyria.comments  (content , postId , userId)  VALUES ('${content}' ,'${post_id}', '${json.id}')`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          messages: err.message,
          data: [],
        });
      }
      return res.send({
        success: true,
        messages: "comment has been created",
      });
    }
  );
};

const getAllPosts = (req, res) => {
  thinksyria.query(`SELECT * FROM thinksyria.comments`, (err, result) => {
    if (err) {
      return res.send({
        success: false,
        messages: err.message,
      });
    }
    return res.send({
      success: true,
      messages: "You got all comments",
      data: result,
    });
  });
};

const getCommentsByPostId = (req, res) => {
  const { post_id } = req.body;
  if (post_id) {
    thinksyria.query(
      `SELECT * FROM thinksyria.comments WHERE postId='${post_id}'`,
      (err, result) => {
        if (result?.length > 0)
          return res.send({
            success: true,
            messages: "You got all comments",
            data: result,
          });
        return res.send({
          success: false,
          messages: "no comments",
        });
      }
    );
  }
};

const editComment = (req, res) => {
  const { content, commentId } = req.body;
  const token = req.headers.authorization?.split("Bearer")[1];
  const json = JSON.parse(token);
  if (content.length < 10) {
    return res.send({
      success: false,
      messages: "the content must be at least 10 chars",
    });
  }
  if (!commentId) {
    return res.send({
      success: false,
      messages: " CommentId is required",
    });
  }
  thinksyria.query(
    ` UPDATE thinksyria.comments SET content='${content}' WHERE id='${commentId}' AND userId='${json.id}'`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          messages: "the content or commentId is require",
          data: [],
        });
      }
      return res.send({
        success: true,
        messages: "Comment Edited Successfully",
      });
    }
  );
};

module.exports = {
  createComment,
  getAllPosts,
  getCommentsByPostId,
  editComment,
};
