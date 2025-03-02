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

// ミドルウェア
app.use((req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api", (req: Request, res: Response, next) => {
  console.log("API Request");
  next();
});

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: "サーバーエラーが発生しました" });
});

// リクエスト・レスポンスオブジェクト
app.post("/api/data", (req: Request, res: Response) => {
  const data = req.body;
  const contentType = req.get("Content-Type");

  res
    .status(201)
    .set("X-Custom", "value")
    .json({ received: data, contentType });
});
