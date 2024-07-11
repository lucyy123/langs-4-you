import { FetchDataType, LanguagesCodeTypes, Wordtype } from "./../vite-env.d";
import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateOptions = (
  meaning: {
    Text: string;
  }[],
  index: number
): string[] => {
  const correctOption: string = meaning[index].Text;

  // an array of incorrect options
  const incorrectOptionsArr = meaning.filter(
    (ele) => ele.Text !== correctOption
  );

  // an array of 3 incorrect options
  const incorrectOtions = _.sampleSize(incorrectOptionsArr, 3);
  const passingOptionsArr = incorrectOtions.map((ele) => ele.Text);

  const shuffleOptions = _.shuffle([...passingOptionsArr, correctOption]);

  return shuffleOptions;
};

export const getTranslations = async (
  langugetoTranslate: LanguagesCodeTypes
): Promise<Wordtype[]> => {
  try {
    const key = import.meta.env.VITE_API_TRANSLATION_KEY;
    const words = generate(
      Number(import.meta.env.VITE_WORDS_LENGTH)
    ) as string[];
    const sendData = words.map((ele: string) => ({
      Text: ele,
    }));

    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "to[0]": langugetoTranslate,
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: sendData,
    };

    const response = await axios(options);

    const received: FetchDataType[] = response.data;
    const arr: Wordtype[] = received.map((ele, index) => {
      const options: string[] = generateOptions(sendData, index);

      return {
        word: ele.translations[0].text,
        meaning: sendData[index].Text,
        options,
      };
    });

    return arr;
  } catch (error) {
    console.log("error:", error);
    throw new Error("Failed to fetched Data");
  }
};

export const getCorrectChoosedAns = (
  choosedAns: string[],
  correctAns: string[]
): number => {
  if (choosedAns.length !== correctAns.length)
    throw new Error(
      "length of choosed options array is not equal to correct ans"
    );

  let matchedOptions = 0;

  for (let i = 0; i < choosedAns.length; i++) {
    if (choosedAns[i] === correctAns[i]) {
      matchedOptions++;
    }
  }

  return matchedOptions;
};

export const textToAudio = async (
  text: string,
  lanuage: LanguagesCodeTypes
): Promise<string> => {
  try {
    const key = import.meta.env.VITE_TEXT_TO_SPEECH_KEY;
    const apiKey = import.meta.env.VITE_API_TEXT_TO_SPEECH_KEY;

    let voice_code: string = "";

    //  lnguages code-  "hi" | "fr" | "es" | "ja"
    switch (lanuage) {
      case "ja":
        voice_code = "ja-jp";
        break;
      case "fr":
        voice_code = "fr-fr";
        break;
      case "es":
        voice_code = "es-es";
        break;
      default:
        voice_code = "hi-in";
        break;
    }

    const sendData = new FormData();
    sendData.append("src", text);
    sendData.append("hl", voice_code);
    sendData.append("r", "0");
    sendData.append("c", "mp3");
    sendData.append("f", "8khz_8bit_mono");
    sendData.append("b64", "true");

    const options = {
      method: "POST",
      url: "https://voicerss-text-to-speech.p.rapidapi.com/",
      params: {
        key,
      },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
      },
      data: sendData,
    };

    const { data }: { data: string } = await axios(options);
    console.log("data:", data);

    return data;
  } catch (error) {
    console.log("error:", error);
    throw new Error("error to convert text into audio");
  }
};
