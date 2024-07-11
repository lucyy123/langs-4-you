import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialStateType } from "../vite-env";
import { saveResult } from "../redux/reducers/rootReducer";
import { useNavigate } from "react-router-dom";


const Quize = () => {
  const [result, setResult] = useState<string[]>([]);
  const [ans, setAns] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate()
const dispatch = useDispatch();

const {words} = useSelector((state:{rootReducer:initialStateType}) =>state.rootReducer)


  const nexthandler = (): void => {
    setResult((pre) => [...pre, ans]);
    setCount((pre) => pre + 1);
    setAns("");
  };

useEffect(()=>{
if(count+1 > words.length) navigate("/result")

  dispatch(saveResult(result))
},[result])
  return (
    <Container maxWidth="sm">
      <Typography
        padding={"2rem 0rem"}
        variant="h6"
        sx={{
          color: "gray",
        }}
      >
        Quiz
      </Typography>

      <Stack
        direction={"row"}
        justifyContent={"cente"}
        alignItems={"center"}
        spacing={"0.75rem"}
      >
        <Typography variant="h4">{count + 1} -</Typography>

        <Typography variant="h3">{words[count]?.word}</Typography>
      </Stack>
      <FormControl>
        <FormLabel
          sx={{
            mt: "2rem",
            mb: "1rem",
            color: "red",
          }}
        >
          Meaning
        </FormLabel>

{
  words[count]?.options.map((ele)=>
  
  <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
  <FormControlLabel
  key={ele+1}
    value={ele}
    control={<Radio />}
    label={ele}
  />
</RadioGroup>)
}

       
      </FormControl>
      <Button
        onClick={nexthandler}
        fullWidth
        disabled={ans === ""}
        variant="contained"
        sx={{
          margin: "3rem 0rem",
        }}
      >
        {count == 7 ? "Submit" : "Next"}
      </Button>
    </Container>
  );
};

export default Quize;
