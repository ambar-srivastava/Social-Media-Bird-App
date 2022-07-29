import React, { useState, useContext, useRef, useEffect } from "react";
import { SocialMediaAppContext } from "../Helpers/Contexts";
import "../App.css";
import {
  getLocalStorageData,
  storeInLocalStorage,
} from "../Helpers/LocalStorageUtility";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

const Dashboard = () => {
  const {
    appState,
    setAppState,
    usersList,
    setUsersList,
    currentUserName,
    setCurrentUserName,
    currentPasswd,
    setCurrentPasswd,
  } = useContext(SocialMediaAppContext);

  const [feedsList, setFeedsList] = useState(
    getShuffledLocaleStorageData("allFeeds")
  );
  const [currentFeed, setCurrentFeed] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [changeId, setChangeId] = useState(-1);
  const [logout, setLogout] = useState(false);

  const inputFeed = useRef(null);
  const [loadFeedDone, setLoadFeedDone] = useState(false);
  let retrieveStoredFeed = "";

  function getShuffledLocaleStorageData(key) {
    const tmpfeedsList = getLocalStorageData("allFeeds");
    shuffle(tmpfeedsList);
    return tmpfeedsList;
  }

  function shuffle(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }

  function currentFeedTextFn(event) {
    setCurrentFeed(event.target.value);
  }

  function saveFeedFn(event) {
    if (currentFeed === "") {
      setIsEditing(false);
      return;
    }

    let maxID = -1;
    if (!isEditing) {
      feedsList.forEach((element, index) => {
        if (element.postID >= maxID) {
          maxID = element.postID;
        }
      });

      let postid = maxID + 1;
      const contents = currentFeed;
      const postAuthor = currentUserName;

      const createdOn = Math.floor(Date.now() / 1000);
      const updatedOn = "";
      const newFeed = {
        postID: postid,
        contents: contents,
        postAuthor: postAuthor,
        createdOn: createdOn,
        updatedOn: updatedOn,
      };

      if (feedsList !== null) {
        setFeedsList([...feedsList, newFeed]);
      } else {
        setFeedsList([newFeed]);
      }

      setCurrentFeed("");
      inputFeed.current.value = "";
      setTotalPosts(feedsList.length);
    } else {
      setChangeId(-1);
      feedsList.forEach((element, index) => {
        if (element.postID === changeId) {
          element.contents = currentFeed;
          element.updatedOn = Math.floor(Date.now() / 1000);
        }
      });
      inputFeed.current.value = "";
      setIsEditing(false);
    }
  }

  function handleEdit(id) {
    setIsEditing(true);
    setChangeId(id);
    feedsList.forEach((element, index) => {
      if (element.postID === id) {
        inputFeed.current.value = element.contents;
      }
    });
  }

  function handleDelete(id) {
    const tmpfeedsList = feedsList.filter((feed) => feed.postID !== id);
    setFeedsList(tmpfeedsList);
  }

  function convertDate(secs) {
    if (secs !== "") {
      var d = (new Date(secs * 1000) + "").split(" ");
      d[2] = d[2] + ",";
      let d1 = d[4].split(":");
      let dTime = [d1[0], d1[1]].join(":");
      return [dTime, d[1], d[2], d[3]].join(" ");
    }
  }

  function logoutFn() {
    setLogout(true);
    setAppState("login");
  }

  useEffect(() => {
    storeInLocalStorage("allFeeds", feedsList);
  }, [feedsList]);

  return (
    <div className="main">
      <LeftPanel currentUserName={currentUserName} logoutFn={logoutFn} />
      <div className="centerPanel">
        <div className="home"> Home</div>
        <div className="Tweet">
          <div className="TweetText">
            <textarea
              ref={inputFeed}
              className="textarea"
              type="text"
              placeholder="What's hapenning?"
              onChange={currentFeedTextFn}
            />
          </div>

          <div>
            {!isEditing ? (
              <button className="editButton" onClick={saveFeedFn}>
                Tweet
              </button>
            ) : (
              <button className="editButton" onClick={saveFeedFn}>
                Update Tweet
              </button>
            )}
          </div>
        </div>
        <div></div>

        <div className="feed">
          {feedsList.map((feed) => {
            return (
              <div className="feedChild">
                <p className="author">
                  <b> {feed.postAuthor}</b> @{feed.postAuthor}
                </p>
                <p className="contentShow"> {feed.contents} </p>
                <p className="content">
                  Created : {convertDate(feed.createdOn)}
                </p>
                {feed.updatedOn !== "" ? (
                  <p className="content">
                    Updated : {convertDate(feed.updatedOn)}
                  </p>
                ) : null}

                {feed.postAuthor === currentUserName ? (
                  <p className="edit">
                    <button
                      className="editButton"
                      onClick={() => handleEdit(feed.postID)}
                    >
                      Edit
                    </button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(feed.postID)}
                    >
                      Delete
                    </button>
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <RightPanel />
    </div>
  );
};

export default Dashboard;
