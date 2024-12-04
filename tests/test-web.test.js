const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { expect } = chai;
const Hapi = require("@hapi/hapi");

describe("checking method", () => {
  let server;
  //   before(async () => {
  //     server = Hapi.server({ port: 3000 });
  //     server.route({
  //       method: "GET",
  //       path: "/hello",
  //       handler: (request, h) => "Hello Node.js!",
  //     });
  //     await server.start();
  //     console.log("test server is starts");
  //   });

  //   after(async () => {
  //     await server.stop();
  //   });

  it("should return Hello Node.js!", async () => {
    const res = await chai.request("http://localhost:3000").get("/hello");
    // expect(res).to.have.status(200);
    expect(res.text).to.equal("Hello Node.js!");
  });
});
