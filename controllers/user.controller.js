const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
//  POST
exports.create = async (req, res) => {
  const  { name, email, role, password } = req.body;
	// Validate request
	if (!email || !password || !role || !name) {
    res.status(400).json({
      error: "credentials can not be empty!"
    });
		return;
	}

	// Create a User
	const new_user = {
		name,
		email,
    password,
    role
	};

  // Save User in the database
  const user = await User.create(new_user);
  if (!user) {
    res.status(500).json({
      error: "server error while creating user"
    })
  }
  res.status(200).json({
    token: user.id
  })
  // User.create(user)
  //   .then(data => {
	// 		res.send(data);
  //   })
  //   .catch(err => {
	// 		res.status(500).send({
	// 		message:
	// 			err.message || "Some error occurred while creating the User."
	// 		});
  //   });
};

// Retrieve all Users from the database.
//  GET
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
  console.log(`
  in the controller of get all users and user is: 
  ${JSON.stringify(req.user)}
  `);

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
//  GET /:id
exports.findOne = async (req, res) => {
  const {email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({
      error: "creadentals not provided"
    })
  }

  const user = User.findOne({where : {email}});
  if (!user) {
    res.status(400).send({
      error: "creadentals not provided"
    })
  }
  else res.status(200).json({
    token: user.id
  })
};

// Update a User by the id in the request
//  PUT /:id
exports.update = (req, res) => {
	const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
//  DELETE /:id
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
//  DELETE /
exports.deleteAll = (req, res) => {
	User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// Find all published Users
//  GET ?published == true
exports.findAllPublished = (req, res) => {
	User.findAll({ where: { published: true } })
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message:
				err.message || "Some error occurred while retrieving users."
		});
	});
};