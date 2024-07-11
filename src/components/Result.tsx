import { Button, Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { initialStateType } from "../vite-env";
import { useNavigate } from "react-router-dom";
import { clearState } from "../redux/reducers/rootReducer";
import { getCorrectChoosedAns } from "../utils/fetchData";

const Result = () => {

const {result,words} = useSelector((state:{
  rootReducer:initialStateType
})=>state.rootReducer)

const dispatch=useDispatch()

const navigate = useNavigate()


const correctchoosedAns:number=getCorrectChoosedAns(result,words.map((ele)=>ele.meaning))
const percentage = Math.round(correctchoosedAns / words.length *100)

const handleReset=():void=>{

dispatch(clearState())
navigate("/")

}


  return (
    <Container maxWidth={"sm"}>
      <Typography padding={"2.0rem 0rem"} variant="h3" color={"primary"}>
        Result
      </Typography>

      <Stack padding={"0rem 1.2rem"} >
        <Typography color={"black"} fontSize={"1.5rem"} fontWeight={"semibold"}>You got {correctchoosedAns} out of {words.length}</Typography>
<Stack direction={"row"} spacing={"3rem"} justifyContent={"center"}>

  {/* chosed options */}
  <Stack >
          <Typography
            variant="h6"
            fontWeight={"bold"}
            margin={"1.0rem 0rem"}
          >
            Your Options
          </Typography>
{result.map((ele,index)=>
 <Stack direction={"row"}>
 <Typography fontWeight={"bold"}>{index+1}</Typography>
 <Typography fontWeight={"bold"}>- {ele}</Typography>
</Stack>

)}
         
        </Stack>

        {/* // correct options */}
        <Stack >
          <Typography
            variant="h6"
            fontWeight={"bold"}
            margin={"1.0rem 0rem"}
          >
            Correct Options
          </Typography>

          {words.map((ele,index)=>
 <Stack direction={"row"}>
 <Typography fontWeight={"bold"}>{index+1}</Typography>
 <Typography fontWeight={"bold"}>- {ele.meaning}</Typography>
</Stack>

)}


          
        </Stack>

</Stack>

      <Typography color={ percentage > 5 ? "green":"red"} padding={"1.5rem"} variant="h4" textTransform={"uppercase"}>

      { percentage > 5 ? "pass🥳🥳":"fail😔😔 , next time"}
      </Typography>

      
      </Stack>
      <Button onClick={handleReset} variant="contained"  >
        Reset
      </Button>
    </Container>
  );
};

export default Result;
