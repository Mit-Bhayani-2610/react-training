import { Button } from "@mui/material";
import { useUserContext } from "./UserContext";

export const HomePage = () => {
  const onHomePageButtonClick = () => {};
  const { userName } = useUserContext();
  return (
    <div>
      Home Page 🏠
      {/* <Button variant="contained" onClick={onHomePageButtonClick} className="">
        Hello World
      </Button> */}
      <p>{userName}</p>
    </div>
  );
};
