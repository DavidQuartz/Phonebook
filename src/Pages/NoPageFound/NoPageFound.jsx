const NoPageFound = () => {
  const style = {
    textAlign: "center",
    fontSize: "1.5rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <h1 style={{ fontSize: "5rem", color: "#00955c" }}>404</h1>
      No Page found. <br />
      Click the Login button to be redirected to Login page
    </div>
  );
};

export default NoPageFound;
