import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Start Server" });
});

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/users/:id", (req: Request, res: Response) => {
  res.send({ id: req.params.id });
});

app.get("/search", (req: Request, res: Response) => {
  const query = req.query.q;
  res.send(`search: ${query}`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
