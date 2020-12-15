import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MovieTabs extends React.Component {
  render() {
    const { sort_by, updateSortBy } = this.props;

    const handleClick = (value) => () => updateSortBy(value);

    const getClass = (value) => `nav-link ${sort_by === value ? "active" : ""}`;

    return (
      <ul className="nav nav-tabs nav-pills">
        <li className="nav-item">
          <div
            className={getClass("popularity.desc")}
            role="button"
            onClick={handleClick("popularity.desc")}
          >
            Popularity
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClass("revenue.desc")}
            role="button"
            onClick={handleClick("revenue.desc")}
          >
            Revenue
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClass("vote_average.desc")}
            role="button"
            onClick={handleClick("vote_average.desc")}
          >
            Vote average
          </div>
        </li>
      </ul>
    );
  }
}
