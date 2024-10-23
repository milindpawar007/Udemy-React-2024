const Stat = ({ items }) => {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding something 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const precentage = Math.round((numPacked / numItems) * 100)
    ? Math.round((numPacked / numItems) * 100)
    : 0;
  return (
    <footer className="stats">
      <em>
        {precentage === 100
          ? "You got everything✅"
          : `🎒You have ${numItems} items on your list ,and you packed ${numPacked}(${precentage}%)`}
      </em>
    </footer>
  );
};

export default Stat;
