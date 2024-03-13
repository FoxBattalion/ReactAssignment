export function ButtonPanel({
  addClickHandler,
  updateClickHandler,
  deleteClickHandler,
  selectedItem,
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <button className="btn btn-primary" onClick={addClickHandler}>
            Add
          </button>
        </div>
        <div className="col-3">
          <button
            className="btn btn-primary"
            onClick={updateClickHandler}
            disabled={!selectedItem}
          >
            Update
          </button>
        </div>
        <div className="col-3">
          <button
            className="btn btn-primary"
            onClick={deleteClickHandler}
            disabled={!selectedItem}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
