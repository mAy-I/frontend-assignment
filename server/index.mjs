import jsonServer from "json-server";
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";

const server = jsonServer.create();
const router = jsonServer.router("server/db.json");
const middlewares = jsonServer.defaults();

server.use(bodyParser.json());
server.use(middlewares);

server.post(
  "/lines",
  [
    check("coordinates")
      .isArray({ min: 2, max: 2 })
      .withMessage("Coordinates should be an array of length 2"),
    check("coordinates.*.x").isNumeric().withMessage("x should be a number"),
    check("coordinates.*.y").isNumeric().withMessage("y should be a number"),
  ],
  validatePayload
);

server.patch(
  "/lines/:id",
  [
    check("coordinates")
      .optional()
      .isArray({ min: 2, max: 2 })
      .withMessage("Coordinates, if present, should be an array of length 2"),
    check("coordinates.*.x")
      .optional()
      .isNumeric()
      .withMessage("x, if present, should be a number"),
    check("coordinates.*.y")
      .optional()
      .isNumeric()
      .withMessage("y, if present, should be a number"),
    check("id").notEmpty().withMessage("id cannot be changed"),
  ],
  validatePayload
);

function validatePayload(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
}

server.use(router);
server.listen(8000, () => {
  console.log("JSON Server is running");
});
