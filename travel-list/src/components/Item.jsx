const Item = ({ obj, onDeleteitem, onCheckitem }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={obj.packed}
        onClick={() => {
          onCheckitem(obj.id);
        }}
      />
      <span style={obj.packed ? { textDecoration: "line-through" } : {}}>
        {obj.quantity} {obj.description}
      </span>

      <button
        onClick={() => {
          onDeleteitem(obj.id);
        }}
      >
        ❌
      </button>
    </li>
  );
};

export default Item;
