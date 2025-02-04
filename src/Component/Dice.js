const Dice = ({ dice, hold }) => {
  return (
    <div>
      <button
        style={{ backgroundColor: dice.isHeld ? "blue" : "#2f182a" }}
        onClick={() => hold(dice.id)}
      >
        {dice.value}
      </button>
    </div>
  );
};

export default Dice;
