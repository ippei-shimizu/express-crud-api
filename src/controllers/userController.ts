import { Request, Response } from "express";
import { UserModel } from "../models/user";

export const UserController = {
  getAllUsers: (req: Request, res: Response) => {
    const users = UserModel.findAll();
    res.json(users);
  },

  getUserById: (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const user = UserModel.findById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  },

  createUser: (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }

    const newUser = UserModel.create({ name, email });
    res.status(201).json(newUser);
  },

  updateUser: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    if (!name && !email) {
      res.status(400).json({ error: "Name or email is required" });
      return;
    }

    const updateUser = UserModel.update(id, { name, email });

    if (!updateUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(updateUser);
  },

  deleteUser: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const deletedUser = UserModel.delete(id);

    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(deletedUser);
  },
};
