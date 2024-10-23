import { useState } from "react";
import Item from "./Item";
const PackingList = ({ items, onDeleteitem, onCheckitem, onClearitem }) => {
  const [sortby, setSortby] = useState("input");

  let sortedItem;
  if (sortby === "input") {
    sortedItem = items;
  }
  if (sortby === "description") {
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortby === "packed") {
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItem.map((obj, id) => {
          return (
            <>
              <Item
                key={obj.id}
                obj={obj}
                onDeleteitem={onDeleteitem}
                onCheckitem={onCheckitem}
              ></Item>
            </>
          );
        })}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
          <option value="input"> sort by input order</option>
          <option value="description"> sort by description</option>
          <option value="packed"> sort by packed status</option>
        </select>
        <button onClick={onClearitem}>Clear the List</button>
      </div>
    </div>
  );
};
export default PackingList;
