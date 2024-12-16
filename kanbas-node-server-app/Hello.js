export default function HelloRoutes(app) {
  app.get("/hello", (req, res) => {
    res.send("Life is Good !");
  });

  app.get("/", (req, res) => {
    res.send("Welcone to Web Server Development!");
  });
}
