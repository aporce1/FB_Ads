import imgProcessing from '../assets/processing.gif'

export const Generating = () => {


    return (
        <div style={{
            position: "absolute", 
            height: "100vh", 
            width: "100vw", 
            backgroundColor: "white", 
            display: "flex",
            flexDirection: "column", 
            zIndex: "10",
            justifyContent: "center",
            alignItems: "center", top: "0", left: "0", transition: "all 0.2s" }}>
              <p style={{color: "#000", fontWeight: "bold"}}>Please hold on for a moment, your awesome ad is being created!</p>
              <img src={imgProcessing} alt="Generating Ads ..." style={{width: "200px"}}/>
        </div>
    )
}