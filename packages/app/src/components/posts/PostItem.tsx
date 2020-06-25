import React, { useState } from "react";
import { Avatar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import { StyledPaper } from "../../styled/StyledPaper";
import { UserPreview, Post } from "../../types";
import PostMenu from "./PostMenu";
import { useApolloClient } from "@apollo/client";
import { GET_ME } from "../../graphql/queries";
import Like from "./Like";
import Comment from "./Comment";
import Comments from "./Comments";

interface Props {
  post: Post;
  user: UserPreview;
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(0, 0, 3),
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    "&:visited": {
      color: "inherit",
    },
  },
  flex: {
    display: "flex",
  },
  postInfo: {
    marginLeft: theme.spacing(1),
  },

  actions: {
    display: "flex",
    "& > *": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

function PostItem({ post, user }: Props) {
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME });
  const classes = useStyles();
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const toggleComments = () => setIsCommentsVisible(!isCommentsVisible);

  console.log(isCommentsVisible);

  return (
    <StyledPaper>
      <div className={classes.header}>
        <div className={classes.flex}>
          <Link to={`/users/${user.id}`}>
            <Avatar src={user.avatar} alt={user.fullName} />
          </Link>
          <div className={classes.postInfo}>
            <Typography
              className={classes.link}
              variant="subtitle1"
              component={Link}
              to={`/users/${user.id}`}
            >
              {user.fullName}
            </Typography>
            <Typography variant="subtitle2">
              <Moment fromNow date={post.createdAt} />
            </Typography>
          </div>
        </div>
        {data.me.id === user.id && <PostMenu id={post.id} />}
      </div>

      <div>
        <Typography>{post.content}</Typography>
      </div>
      <div className={classes.actions}>
        <Like postId={post.id} likesInfo={post.likesInfo} />
        <Comment
          postId={post.id}
          commentsInfo={post.commentsInfo}
          toggleComments={toggleComments}
        />
      </div>
      {isCommentsVisible && <Comments postId={post.id} />}
    </StyledPaper>
  );
}

export default PostItem;
