import { React, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {
  const [showAddFriend, SetShowAddFriend] = useState(false);
  const [selectedFriend, SetSelectedFriend] = useState(null);
  const [frindsDB, SetfrindsDB] = useState(initialFriends);
  const handelShowAddFriend = () => {
    SetShowAddFriend((prev) => !prev);
  };

  const handelAddfriend = (friendObj) => {
    SetfrindsDB((prev) => [...prev, friendObj]);
  };
  const handelSelection = (friendObj) => {
    SetSelectedFriend((current) =>
      current?.id === friendObj?.id ? null : friendObj
    );
    SetShowAddFriend(false);
  };

  const handelSplitBill = (value) => {
    console.log(value);

    SetfrindsDB((friend) =>
      friend.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  };

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            frindsDB={frindsDB}
            onSelection={handelSelection}
            selectedFriend={selectedFriend}
          ></FriendsList>
          {showAddFriend && <FormAddForm onAddFriend={handelAddfriend} />}
          <Button onClick={handelShowAddFriend}>
            {showAddFriend ? `Close` : `Add Friend`}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handelSplitBill}
            SetSelectedFriend={SetSelectedFriend}
          />
        )}
      </div>
    </>
  );
};
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

const FriendsList = ({ frindsDB, onSelection, selectedFriend }) => {
  return (
    <ul>
      {frindsDB.map((friend) => {
        return (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </ul>
  );
};
const Friend = ({ friend, onSelection, selectedFriend }) => {
  const isSelectd = selectedFriend?.id === friend?.id;

  return (
    <>
      <li className={isSelectd ? "selected" : ""}>
        <img src={friend.image} alt={friend.name}></img>
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">{`You owe ${friend.name} ${Math.abs(
            friend.balance
          )}$`}</p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {`${friend.name} owe you ${Math.abs(friend.balance)}$`}
          </p>
        )}
        {friend.balance === 0 && <p>{`You and ${friend.name} are even`}</p>}
        <Button
          onClick={() => {
            onSelection(friend);
          }}
        >
          {isSelectd ? "Close" : "Select"}
        </Button>
      </li>
    </>
  );
};

const FormAddForm = ({ onAddFriend }) => {
  const [friendName, SetfriendName] = useState("");
  const [imageUrl, SetimageUrl] = useState("https://i.pravatar.cc/48");
  const handelFormAddForm = (e) => {
    e.preventDefault();
    if (!friendName || !imageUrl) {
      return;
    }
    let id = crypto.randomUUID();
    let friendObj = {
      id: id,
      name: friendName,
      image: `${imageUrl}?=${id}`,
      balance: 0,
    };
    onAddFriend(friendObj);
    SetfriendName("");
    SetimageUrl("https://i.pravatar.cc/48");
  };
  return (
    <form
      className="form-add-friend"
      onSubmit={(e) => {
        handelFormAddForm(e);
      }}
    >
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => {
          SetfriendName(e.target.value);
        }}
      ></input>
      <label>📸Image Url</label>
      <input
        type="text"
        value={imageUrl}
        placeholder="https://i.pravatar.cc/48?u=499476"
        onChange={(e) => {
          SetimageUrl(e.target.value);
        }}
      ></input>
      <Button>Add</Button>
    </form>
  );
};

function FormSplitBill({ selectedFriend, onSplitBill, SetSelectedFriend }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setwhoIsPaying] = useState("user");

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    SetSelectedFriend(null);
  };
  return (
    <form
      className="form-split-bill"
      onSubmit={(e) => {
        handelSubmit(e);
      }}
    >
      <h2> Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill Value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => {
          setBill(Number(e.target.value));
        }}
      ></input>
      <label>🧍‍♂️ Your Expense</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) => {
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          );
        }}
      ></input>
      <label>🧑‍🤝‍🧑 {selectedFriend.name} Expense</label>
      <input type="text" disabled value={paidByFriend}></input>
      <label>🤑Who is paying the Bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => {
          setwhoIsPaying(e.target.value);
        }}
      >
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
