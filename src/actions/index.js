import axios from "axios";
import history from "../history";

let instance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export const register = (creds) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post("/register", creds);
      dispatch({ type: "REGISTER", payload: data });
      if (history.action !== "POP") history.goBack();
      else history.push("/");
    })();
  };
};

export const login = (creds) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post("/login", creds);
      dispatch({ type: "LOG_IN", payload: data });
      if (history.action !== "POP") history.goBack();
      else history.push("/");
    })();
  };
};

export const logout = () => {
  return (dispatch) => {
    (async () => {
      await instance.post("/logout");
      dispatch({ type: "LOG_OUT" });
    })();
  };
};

export const createAttraction = (values) => {
  let { name, location, description, images } = values;
  let fd = new FormData();
  fd.append("name", name);
  fd.append("description", description);
  fd.append("location", location);
  for (let image of images) {
    fd.append("images", image);
  }
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post("/attractions", fd);
      dispatch({ type: "CREAT_ATTRACTION", payload: data });
      history.push(`/attractions/${data._id}`);
    })();
  };
};

export const editAttraction = (values) => {
  let { name, location, description, images, _id } = values;
  let fd = new FormData();
  fd.append("name", name);
  fd.append("description", description);
  fd.append("location", location);
  if (images) {
    for (let image of images) {
      fd.append("images", image);
    }
  }
  return (dispatch) => {
    (async () => {
      let { data } = await instance.put(`/attractions/${_id}`, fd);
      dispatch({ type: "CREAT_ATTRACTION", payload: data });
      history.push(`/attractions/${data._id}`);
    })();
  };
};

export const getAttraction = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/attractions/${id}`);
      dispatch({ type: "GET_ATTRACTION", payload: data });
    })();
  };
};

export const getAttractions = () => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get("/attractions");
      dispatch({ type: "GET_ATTRACTIONS", payload: data });
    })();
  };
};

export const searchAttractions = (query) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get(`/attractions/search?q=${query}`);
      dispatch({ type: "ATTRACTIONS_SEARCH_RESULTS", payload: data });
    })();
  };
};

export const getAllAttractions = () => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get("/attractions/all");
      dispatch({ type: "GET_ATTRACTIONS", payload: data });
    })();
  };
};

export const deleteAttraction = (id) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.delete(`/attractions/${id}`);
      dispatch({ type: "DELETE_ATTRACTION", payload: data });
      history.push("/");
    })();
  };
};

export const addAttractionReview = ({ attractionId, content, stars }) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(
        `/attractions/${attractionId}/reviews`,
        { content, stars }
      );
      dispatch({ type: "GET_ATTRACTION", payload: data });
    })();
  };
};

export const deleteAttrationReview = ({ attractionId, reviewId }) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.delete(
        `/attractions/${attractionId}/reviews/${reviewId}`
      );
      dispatch({ type: "GET_ATTRACTION", payload: data });
    })();
  };
};

export const addToBeenThere = (attractionId) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(
        `/attractions/${attractionId}/beenthere`
      );
      if (data !== "ALREADY ADDED")
        dispatch({ type: "UPDATE_USER_LIST", payload: data });
    })();
  };
};

export const addToWantToVisit = (attractionId) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(
        `/attractions/${attractionId}/wanttovist`
      );
      if (data !== "ALREADY ADDED")
        dispatch({ type: "UPDATE_USER_LIST", payload: data });
    })();
  };
};

export const addToList = (attractionId) => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.post(`/attractions/${attractionId}/list`);
      if (data !== "ALREADY ADDED")
        dispatch({ type: "UPDATE_USER_LIST", payload: data });
    })();
  };
};

export const getUserAttractions = () => {
  return (dispatch) => {
    (async () => {
      let first = await instance.get("/user/beenthere");
      let second = await instance.get("/user/wanttovist");
      let third = await instance.get("/user/list");

      dispatch({
        type: "UPDATE_USER_LIST",
        payload: {
          beenThere: first.data,
          wantToVisit: second.data,
          list: third.data,
        },
      });
    })();
  };
};

export const isLoggedIn = () => {
  return (dispatch) => {
    (async () => {
      let { data } = await instance.get("/loggedin");
      if (!data.isLoggedIn) dispatch({ type: "LOG_OUT" });
    })();
  };
};