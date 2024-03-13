export function AddUpdatePanel({
  selectedItem,
  panelItem,
  inputChangeHandler,
  doneClickHandler,
  resetClickHandler,
  cancelClickHandler,
}) {
  return (
    <div>
      <div className="row">
        <div className="col">ID: </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            id="id"
            onChange={(evt) =>
              inputChangeHandler(
                "id",
                selectedItem ? selectedItem.id : Number(evt.target.value)
              )
            }
            value={panelItem ? panelItem.id : ""}
            disabled={selectedItem}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col">Category: </div>
        <div className="col">
          <select
            id="categorySelect"
            onChange={(evt) => inputChangeHandler("category", evt.target.value)}
          >
            <option value="APP">Appetizer</option>
            <option value="ENT">Entree</option>
            <option value="DES">Dessert</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">Description: </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={(evt) =>
              inputChangeHandler("description", evt.target.value)
            }
            //defaultValue={selectedItem ? selectedItem.description : ""}
            value={panelItem ? panelItem.description : ""}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col">Price: </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            id="price"
            onChange={(evt) =>
              inputChangeHandler("price", Number(evt.target.value))
            }
            value={panelItem ? panelItem.price : ""}
            //value={selectedItem ? Number(selectedItem.price) : 0}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col">Vegetarian: </div>
        <div className="col">
          <input
            className="form-check-input"
            type="checkbox"
            id="vegetarian"
            onChange={(evt) =>
              inputChangeHandler("vegetarian", evt.target.checked)
            }
            checked={panelItem ? panelItem.vegetarian : false}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <button className="btn btn-success" onClick={doneClickHandler}>
            Done
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-warning" onClick={resetClickHandler}>
            Reset
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-danger" onClick={cancelClickHandler}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
