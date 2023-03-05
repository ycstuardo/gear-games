const clientDB = require("../../database");

const createNote = (req, res) => {
  const { title, url, description, likes } = req.body;

  const querySql = `INSERT INTO POSTS(TITULO, IMG, DESCRIPCION, LIKES) VALUES ('${title}', '${url}', '${description}', ${likes})`;
  clientDB.query(querySql, function (err, result) {
    if (err) {
      console.log("[ERROR]:\n" + err);
      res.status(400);
      res.send("hubo un error al crear el un post");

      throw err;
    }

    res.status(201);
    res.json(req.body);

    return;
  });
};

module.exports = createNote;
