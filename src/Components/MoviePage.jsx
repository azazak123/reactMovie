import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MoviePage extends React.Component {
  render() {
    const { page, total_pages, updatePage } = this.props;
    const changePage = (value) => () => updatePage(value);
    return (
      <div className="container">
        <div className="row">
          {page > 1 ? (
            <button onClick={changePage(page - 1)} className="col">
              {page - 1}
            </button>
          ) : (
            ""
          )}
          <div className="col text-center">{page}</div>
          {page < total_pages ? (
            <button onClick={changePage(page + 1)} className="col">
              {page + 1}
            </button>
          ) : (
            ""
          )}
          <div className="col text-center">{total_pages}</div>
        </div>
      </div>
    );
  }
}
