import express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);
    return res.json(deleteUser).end();
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

export const updateUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {id} = req.params
    const {username } = req.body;

    if(!username) {
      return res.sendStatus(400);
    }
     const user = await getUserById(id);

     user.username = username;
     await user.save();
     return res.status(200).json(user).end();

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
