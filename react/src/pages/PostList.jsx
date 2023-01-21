import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PostItem from "../components/PostItem";
import { useStateContext } from "../ContextProvider";

export default function PostList() {
  const { posts } = useStateContext();

  function onDelete(post) {
    setPostList(postList.filter((p) => p.id != post.id));
  }

  return (
    <>
      <p>
        <Link to="/new" className="btn btn-success">
          Add new
        </Link>
      </p>
      <div>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
