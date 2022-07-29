import React from "react";

const RightPanel = () => {
  return (
    <div className="rightPanel">
      <div className="search">Search Twitter</div>

      <div className="relevant">
        <div className="relevantTitle">
          <h1> Relevant people</h1>
          <p>
            React.JS @reactjs &nbsp; <button className="white">Follow </button>
          </p>
          <p>
            A JavaScript Library - created by &nbsp;
            <snap>@facebook</snap>
          </p>
        </div>
      </div>

      <div className="news">
        <div className="newsTitle">
          <h1>What's happening </h1>
          <br />
          <p>Entertainment · LIVE</p>
          <h3>Kichcha Sudeepa's Vikrant Rona is here 🎬</h3>
          <p>
            Trending with
            <snap>#VikrantRonaFDFS, #KicchaSudeep</snap>
          </p>
          <p>Entertainment · LIVE</p>
          <h3>
            Taarak Mehta Ka Ooltah Chashmah · Trending &nbsp; &nbsp;
            <snap>#trending</snap>
          </h3>
          <p>Trending in India</p>
          <h3>#BoycottbollywoodForever</h3>
          <p>Politics · Trending</p>
          <h3>#VanakkamModi</h3>
          <br /> <br />
          <br />
          <snap>Show more</snap>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
