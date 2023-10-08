// import { JsonRoutes } from 'meteor/simple:json-routes';
import { JsonRoutes } from "meteor/simple:json-routes";
import { readFileSync } from "fs";
import { FlagsCollection } from "../imports/api/FlagsCollection";
import path from "path";
const Joi = require("joi");

const insertFlag = (username, key) => FlagsCollection.insert({ username, key, createdAt: new Date() });


const rd = process.env.PWD;
const p = `${rd}/server/private/keys.json`;
console.log(rd,p)
const apiKeys = JSON.parse(readFileSync(path.relative(process.cwd(), p)));


const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  apiKey: Joi.string().alphanum().min(32).max(32).required()
});

JsonRoutes.add("post", "/api/flag", (req, res, next) => {
  try {
    body = req.body;

    const {value,error} = schema.validate(req.body)

    if(error) {
        console.log("oups");
        return JsonRoutes.sendResult(res, {
            code: 400,
            data: { message: "Requête mal formée", error },
        });
    }

    if (!apiKeys.includes(body.apiKey)) {
      JsonRoutes.sendResult(res, {
        code: 403,
        data: { error: "Mauvaise clé" },
      });
    }

    // Envoyez une réponse de succès.
    insertFlag(body.username, body.apiKey);
    return JsonRoutes.sendResult(res, {
      code: 200,
      data: { message: "Bravo" },
    });
  } catch (error) {
    // Gérez les erreurs et envoyez une réponse d'erreur en cas de problème.
    JsonRoutes.sendResult(res, {
      code: 500,
      data: { message: "Erreur inconnue", error: error },
    });
  }
});
