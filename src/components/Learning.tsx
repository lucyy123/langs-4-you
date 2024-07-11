import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { initialStateType, LanguagesCodeTypes } from "../vite-env";
import { getTranslations, textToAudio } from "../utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/reducers/rootReducer";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc,setAudioSrc] = useState<string>("")
  
  const audioRef=useRef(null)


  const params = useSearchParams()[0].get("language") as LanguagesCodeTypes;
  const navigate = useNavigate();
  
  
  const dispatch = useDispatch();
  const {words,loading,error}=useSelector((state:{
    rootReducer:initialStateType
  })=>state.rootReducer)



// increase count value handler
  const handleNext = (): void => {
    setCount((pre) => pre + 1);
    setAudioSrc("")
  };

const hanldeVolume= async ()=>{


  const player:HTMLAudioElement=audioRef.current!



if(player){
  player.play()
}else{

  
  const res= await textToAudio(words[count].word,params)
  setAudioSrc(res)
}

}




  useEffect(() => {
    dispatch(getWordsRequest());
    getTranslations(params)
      .then((res) => 
        dispatch(getWordsSuccess(res)))
      .catch(err => dispatch(getWordsFail(err)));
      if(error){
        console.log(error)
        dispatch(clearState())
      }
  }, []);






  if(loading) return <Loader/>


  return (
    <Container maxWidth={"xl"} sx={{
      padding:"1rem"
    }}>

      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}
      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((pre) => pre - 1)
        }
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // background:,
          background: "rgb(0, 118, 139)",
          margin: "1.2rem",
          ":hover": {
            background: "skyblue",
          },
        }}
      >
        <ArrowBack
          sx={{
            color: "white",
            ":hover": {
              color: "black",
            },
          }}
        />
      </Button>

      <Container maxWidth="sm">
        <Typography
          sx={{
            color: "gray",
          }}
        >
          Learning Made Easy
        </Typography>

        <Stack padding={"2rem"} direction={"row"} spacing={"0.75rem"} textAlign={"center"}>
          <Typography variant="h4">
            {count + 1} - {words[count]?.word} :
          </Typography>

          <Typography variant="h4">{words[count]?.meaning}</Typography>

          <Button onClick={hanldeVolume}>
            <VolumeUp />
          </Button>
        </Stack>
        <Button
          onClick={count == words.length-1 ? () => navigate("/quize") : () => handleNext()}
          variant="contained"
          fullWidth
        >
          {count == words.length-1 ? "Test" : "Next"}
        </Button>
      </Container>
    </Container>
  );
};

export default Learning;
