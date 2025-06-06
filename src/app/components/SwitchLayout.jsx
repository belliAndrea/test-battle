import { usePlayer } from '../playerContex';

const SwitchLayout = ({ children }) => {
  const player = usePlayer();

  return (
    <>
      {children[player === "The Monster" ? 1 : 0]}
      {children[player === "The Monster" ? 0 : 1]}
    </>
  );
};


export { SwitchLayout }
