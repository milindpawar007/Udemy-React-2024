import { useState } from "react";
const Form = ({ onAdditem }) => {
  const [description, setDesdescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handeladd = (e) => {
    e.preventDefault();
    console.log(e);
    if (!description) return;

    let newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };
    onAdditem(newItem);
    console.log(newItem);
    setDesdescription("");
    setQuantity(1);
  };

  return (
    <form
      className="add-form"
      onSubmit={(e) => {
        handeladd(e);
      }}
    >
      <h3>What do you need for your trip😍</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        placeholder="Items..."
        onChange={(e) => {
          setDesdescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
};

export default Form;
