const items = require("../Items");

//last part
const {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/items");

//third part
//Item schema
const Item = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
  },
};

//second part
//options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        // items: {
        //   type: "object",
        //   properties: {
        //     id: {
        //       type: "integer",
        //     },
        //     name: {
        //       type: "string",
        //     },
        //   },
        // },
        items: Item,
      },
    },
  },
  //last part
  //   handler: (req, reply) => {
  //     reply.send(items);
  //   },
  handler: getItems,
};

//second option
const getItemOpts = {
  schema: {
    response: {
      //   200: {
      //     type: "object",
      //     properties: {
      //       id: {
      //         type: "integer",
      //       },
      //       name: {
      //         type: "string",
      //       },
      //     },
      //   },
      200: Item,
    },
  },
  //   handler: (req, reply) => {
  //     const { id } = req.params;
  //     const item = items.find((item) => item.id === Number(id));
  //     reply.send(item);
  //   },
  handler: getItem,
};

// const postItemOpts = {
//   schema: {
//     response: {
//       201: Item,
//     },
//   },
//   handler: addItem,
// };

// add this after finishing post request
const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
  handler: deleteItem,
};

const updateItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: updateItem,
};

//move this function last to this file
function itemRoutes(fastify, options, done) {
  //Get all items
  //   fastify.get("/items", getItemsOpts, (req, reply) => {
  //     reply.send(items);
  //   });

  //second time
  fastify.get("/items", getItemsOpts);

  //get single items
  //   fastify.get("/items/:id", getItemOpts, (req, reply) => {
  //     const { id } = req.params;
  //     const item = items.find((item) => item.id === Number(id));
  //     reply.send(item);
  //   });

  //second time
  fastify.get("/items/:id", getItemOpts);

  //after creating swagger documentation
  fastify.post("/items", postItemOpts);

  //after finishing body validation
  fastify.delete("/items/:id", deleteItemOpts);

  //after finishing delete request
  fastify.put("/items/:id", updateItemOpts);

  done();
}

module.exports = itemRoutes;
