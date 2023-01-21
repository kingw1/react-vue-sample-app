import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import router from "../router";
import { useStateContext } from "../ContextProvider";

export default function PostForm() {
  const [model, setModel] = useState([
    {
      id: "",
      title: "",
      body: "",
    },
  ]);

  const params = useParams();
  const { getSinglePost, savePost } = useStateContext();

  useEffect(() => {
    if (!params.id) {
      return;
    }

    setModel(getSinglePost(params.id));
  }, []);

  function onSubmit(ev) {
    ev.preventDefault();

    savePost(model);
    router.navigate("/");
  }

  return (
    <>
      <p>
        <Link to="/" className="btn btn-outline-secondary">
          Go back to post list
        </Link>
      </p>
      <div>
        <form onSubmit={onSubmit}>
          <h1>{model.id ? "Edit Post" : "Create new post"}</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={model.title}
              onInput={(ev) => setModel({ ...model, title: ev.target.value })}
              placeholder="Post Title"
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              className="form-control"
              value={model.body}
              onInput={(ev) => setModel({ ...model, body: ev.target.value })}
              placeholder="Post body"
            ></textarea>
          </div>
          <p>
            <button
              disabled={!model.title || !model.body}
              type="submit"
              className="btn btn-success"
            >
              Submit
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
