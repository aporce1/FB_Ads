export const CapaInicio = () => {

    

    return (
        <div style={{
            position: "absolute", 
            height: "100vh", 
            width: "100vw", 
            backgroundColor: "white", 
            display: "flex", 
            zIndex: "10",
            justifyContent: "center",
            alignItems: "center", top: "0", left: "0", transition: "all 0.2s" }}>
              <button style={{ backgroundColor: "#395693", color: "#fff"}} onClick={handleInicio}>I need to create a Facebook Ad pronto!</button>
        </div>
    )
}
