import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stat from "./components/Stat";

const App = () => {
  const [items, setItems] = useState([]);

  const HandelAdditem = (item) => {
    setItems((c) => [...c, item]);
  };
  const HandelDeleteitem = (id) => {
    console.log(items);
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(items);
  };
  const HandelCheckitem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const HandelClearList = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    confirm && setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAdditem={HandelAdditem} />
      <PackingList
        items={items}
        onDeleteitem={HandelDeleteitem}
        onCheckitem={HandelCheckitem}
        onClearitem={HandelClearList}
      />
      <Stat items={items} />
    </div>
  );
};

export default App;
