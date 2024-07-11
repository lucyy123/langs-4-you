import { Button, Container, Stack, Typography } from "@mui/material";
import { LanuagesTypes } from "../vite-env";
import { useNavigate } from "react-router-dom";

const languages: LanuagesTypes[] = [
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {

  const navigate=useNavigate()
  const languageSelectionHandler=(lanuage:string):void=>{
navigate(`/learning?language=${lanuage}`)

  }
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" textAlign={"center"} padding={"2rem"}>
        Welcome, Let us begin your wonder-full journey of <b>Learning.</b>
      </Typography>

      <Stack
        direction={"row"}
        justifyContent={"center"}
        padding={"2rem"}
        spacing={"2rem"}
      >
        {languages.map((ele) => (
          <Button  onClick={()=>languageSelectionHandler(ele.code)} variant="contained" key={ele.code}>
            {ele.name}
          </Button>
        ))}
      </Stack>

      <Typography
        textAlign={"center"}
        sx={{
          color: "gray",
        }}
      >
        Choose one languge from above
      </Typography>
    </Container>
  );
};

export default Home;
