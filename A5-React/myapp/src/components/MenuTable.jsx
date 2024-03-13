export function MenuTable({ menuItems, tableClickHandler, selectedItem }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Vegetarian</th>
        </tr>
      </thead>
      <tbody>
        {menuItems.map((item) => {
          let res = (
            <tr
              key={item.id}
              onClick={() => tableClickHandler(item)}
              className={
                selectedItem && selectedItem.id === item.id
                  ? "table-warning"
                  : ""
              }
            >
              <td>{item.id}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.vegetarian ? "true" : "false"}</td>
            </tr>
          );
          return res;
        })}
      </tbody>
    </table>
  );
}
