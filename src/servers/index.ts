export default (webserver) => {
    webserver.get("/", (req, res) => res.send("mikan, so delicious"));
};
