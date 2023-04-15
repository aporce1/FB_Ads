import { useState } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import  './App.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import facebookAD from './assets/FB-icon.png';
import { Generating } from './components/generating';
import Processing from './assets/7Fmb.gif';

const API_KEY = "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";

const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you're talking to a professional ads manager with more than 10 years of experience."
}

function App() {
  const [ inicio, setInicio] = useState(true);
  const [ generating, setGenerating] = useState(false);
  const [ AdGenerated, setAdGenerated] = useState(false);
  const [ adTitle, setadTitle] = useState('Ad title');
  const [ adContent, setadContent] = useState('');
  const [ adImage, setadImg] = useState('');
  const [ keyImage, setKeyImage ] = useState('');

  const [messages, setMessages] = useState([
    {
      message: "Hello.. I am your Facebook Ad Genie! Let's build your new Ad... what do you have in mind?",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
// Funcion de enviar y recibir mensajes
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };
// start Generating ADS

const generateAd = (content) => {
    setGenerating(true);
    console.log("final contnet: ",content);

    const ParametrosImage = JSON.parse(content).image_description;
    setKeyImage(ParametrosImage);
    console.log("Image: ", ParametrosImage);
    const Headline = JSON.parse(content).title;
    console.log("Headline: ", Headline);
    const Content = JSON.parse(content).content;
    console.log("Content: ", Content);
    setadImg(Processing);
    fetch ("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify({
        prompt: ParametrosImage,
        n: 1,
        size:"1024x1024",
      }),
    })
    .then((response) => response.json())
    .then((img) => {
        setadImg(img.data[0].url);
        setadTitle(Headline);
        setadContent(Content);
        setGenerating(false);
        setAdGenerated(true);
    })
   
}

const GenerateImage = (key) => {
  setadImg(Processing);
  fetch ("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify({
      prompt: keyImage,
      n: 1,
      size:"1024x1024",
    }),
  })
  .then((response) => response.json())
  .then((img) => {

    setadImg(img.data[0].url);
  })
}

//end generating ads


// Funcion de Inicio del Ciclo 
  const handleInicio = async (message) => {
    setInicio(false);
    const newMessage = {
//      message: "I​ ​want​ ​to​ ​create a​ ​Facebook​ ​ad.​ ​Can​ ​you​ ​ask​ ​me one question at a time, asking a maximum of 7 questions in total so that you have ​enough​ information​ ​to​ ​make​ ​an​ ​effective​ ​ad. Ask​ ​one​ ​question​ ​at​ ​a​ ​time.When you make the facebook ad, please write SPARKY and generate an image, title and content",
//            message: `I want to create a Facebook ad. Can you ask me one question at a time, so that you have enough information to make an effective ad. 
//      Ask one question at a time.When you make the facebook ad, please write "[FB]" in the begining of the ad, "[endFB]" at the end of the ad, and generate an image, title and content. 
//      Return each item separated by comma, in lowercase, and without a line break.`,      

// I want to create a Facebook ad. Can you ask me one question at a time, so that you have enough information to make an effective ad.  Ask one question at a time. When you finish the facebook ad, please return in JSON format like [{"title":"","content":"","image":"","call_to_ation":""}]
/*
      message: `I want to create a Facebook ad. Can you ask me one question at a time, so that you have enough information to make an effective ad.  Ask one question at a time. When you finish the facebook ad, please return in JSON format like [{"title":"","content":"","image":"","call_to_ation":""}]`,
*/
/*
      message: `I want to create a Facebook ad. Can you ask me one question at a time, so that you have enough information to make an effective ad. Based on the information i need you generate title, content and image and return to me in JSON format without line breaks and spaces between < and >, return just the JSON format nothing else`,
*/ 
 /*
      message: `Create a Facebook ad. Can you ask me one question at a time, so that you have enough information to make an effective ad. Based on the information you can generate title, content and image and put into a JSON with keys "title", "image", "content"`,
*/
/*
    message: `Create a Facebook ad. Can you ask me one question at a time, so that you have enough information to make an effective ad. Based on the information generate title, content and image with a good descriptio, and put into a JSON with keys "title", "content", "image", "image_description"`,
*/
/*
      message: `Create a Facebook ad. In order to create the most effective and professiona facebook ad possible, ask me as many questions as you need but ask you must one question at a time, wait for my answer and then ask the following question. Based on the information generate title, content and image with a good descriptio, and put into a JSON with keys "title", "content", "image", "image_description"`,
*/
      message: `Create a Facebook ad. In order to create the most effective and professional facebook ad possible, ask me as many questions as you need but ask you must one question at a time, wait for my answer and then ask the following question. Ask me at least a few questions before creating the ad. Based on the information generate title, content and image with a good descriptio, and put into a JSON with keys "title", "content", "image", "image_description"`,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };
// Procesamiento chatGPT
  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);

      let answerToCheck = data.choices[0].message.content;
      let msgToShow = '';

      console.log("----: ", answerToCheck);
  
      if ( (answerToCheck.includes("{")) && (answerToCheck.includes("}"))) {
            let posicionInicio = answerToCheck.indexOf("{");
            let posicionFinal = answerToCheck.indexOf("}");
            let cadenaInicial = answerToCheck.substring(0,posicionInicio);
            let cadenaFinal = answerToCheck.substring(posicionFinal+7);
            let cadenaToGenerate = answerToCheck.substring(posicionInicio, posicionFinal+1);

            msgToShow = cadenaInicial + cadenaFinal; 

            msgToShow.replace('json', '');
            msgToShow.replace('JSON', '');
            msgToShow.replace("```", '');
            msgToShow.replace("Here's the JSON format:", '');
            msgToShow.replace("JSON Format:",'');
            msgToShow.replace("```json",'');
            msgToShow.replace("[JSON]",'');

            setMessages([...chatMessages, {
                message: msgToShow,
                sender: "ChatGPT"
            }]);
            console.log("----> ", msgToShow);
            console.log("-JSON-->",cadenaToGenerate );
            setIsTyping(false);
            generateAd(cadenaToGenerate);
      } else {
            setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
            }]);
            setIsTyping(false);
        }

    });
  }

  return (
    <div className="App">
      
    { inicio &&
          <div style={{
            position: "absolute", 
            height: "100vh", 
            width: "100vw", 
            backgroundColor: "white", 
            display: "flex", 
            zIndex: "10",
            justifyContent: "center",
            alignItems: "center", top: "0", left: "0", transition: "all 0.2s" }}>
              <button style={{ backgroundColor: "#395693", color: "#fff"}} onClick={handleInicio}>Please help me create a great facebook ad</button>
        </div>
    }
    { generating &&
        <Generating />
    }
    
      <div className={ AdGenerated ? "mainChat halfChat" : "mainChat" } >
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Facebook Ads Generatos is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                if ( i>= 2 ) {

                  return <Message key={i} model={message} />
                }
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>

      { AdGenerated &&
      <div className = "CapaInicio" >

            <p className="f16 black bold" style={{marginBottom: "10px"}}> Here's your <span style={{color:"#395693"}}>Facebook Ad</span></p>


            <div className='Fb_ad_Container'>
              <div className="facebook_components" style={{display: "flex"}}>
                <div className='logoFb' style={{maxWidth: "10%", width: "100%", marginRight: "10px"}}>
                  <img src={facebookAD} width="40" height="40" />
                </div>
                <div className='Account' style={{width: "79%", textAlign: "left"}}>
                    <p className="f16 black">Your Product or Service</p>
                    <p className="f12 cinza">Facebook Genie</p>
                </div>
                <div style={{fontWeight: "bold",fontSize: "16px", fontFamily: "'Roboto', sans-serif", color: "#8a8d91"}}>...</div>
              </div>
              <p className="black f14"  style={{textAlign: "justify"}}>{adContent}</p>
              { adImage && 
                <img src={adImage} alt="Generating Ads ..." style={{width: "100%"}}/>
              }
              <div className="facebook_components" style={{display: "flex", backgroundColor: "#ededed", padding: "10x", marginTop: "-5px"}}>
                <p className='f14 black bold'>{adTitle}</p>
                <p style={{minWidth: "120px", display: "flex", alignContent: "center", alignItems: "center", marginLeft: "5px", justifyContent: "flex-end"}}>
                  <a className="btn" href="#" >BUY NOW</a>
                </p>
              </div>
            </div>

            <button style={{fontSize: "14px", maxWidth: "100%", backgroundColor: "#395693", marginTop: "20px"}} onClick={GenerateImage}>Let's try a different image</button>
      </div>
    }


    </div>
  )
}

export default App
