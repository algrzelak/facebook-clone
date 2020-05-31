import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../../graphql/queries";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostItem from "../../components/post/PostItem";
import { FeedData } from "../../types";
import InfiniteScroll from "react-infinite-scroller";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
}));

function Feed() {
  const classes = useStyles();
  const { data, fetchMore } = useQuery<FeedData>(GET_FEED, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (!data?.feed) return <CircularProgress />;

  const {
    edges: posts,
    pageInfo: { hasNextPage, endCursor },
  } = data.feed;

  async function loadMore() {
    await fetchMore({
      query: GET_FEED,
      variables: { cursor: endCursor },
      updateQuery: (previousResult: FeedData, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return previousResult;

        const {
          edges: newEdges,
          pageInfo: newPageInfo,
          __typename,
        } = fetchMoreResult.feed;

        const { edges: previousEdges } = previousResult.feed;

        return {
          feed: {
            __typename,
            edges: [...previousEdges, ...newEdges],
            pageInfo: newPageInfo,
          },
        };
      },
    });
  }

  return (
    <div className={classes.root}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasNextPage}
        loader={<div key={endCursor}>Loading...</div>}
      >
        {posts.map((post) => (
          <PostItem post={post} key={post.id} user={post.user} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Feed;