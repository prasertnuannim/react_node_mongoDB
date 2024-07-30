import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
   try {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.sendStatus(400);
    }
    const user = getUserByEmail(email).select('+authentication.salt +authentication.password');
    if (!user) {
        return res.sendStatus(400);
    }
   
    const expectedHash = authentication((await user).authentication.salt, password);
    if ((await user).authentication.password !== expectedHash) {
        return res.sendStatus(403);
    }
    
    const salt = random();
    (await user).authentication.sessionToken = authentication(salt, (await user)._id.toString());

    await (await user).save();
    res.cookie('SERT-AUTH', (await user).authentication.sessionToken, {domain: 'localhost', path: '/'});
    return res.sendStatus(200);
   } catch (error) {
    console.log(error);
    return res.sendStatus(400);
   }
}

export const register = async (req: express.Request, res: express.Response) => {
   try {
    const {email, password, username} = req.body;

    if (!email || !password || !username) {
        return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    const salt = random();
    const user = await createUser({
        email,
        username,
        authentication: {
            salt,
          password: authentication(salt, password)
        }
    });

    return res.status(200).json(user).end();
   } catch (error) {
    console.log(error);
    return res.sendStatus(400);
   }
}