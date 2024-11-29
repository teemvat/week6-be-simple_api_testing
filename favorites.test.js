import { request, expect } from "./config.js";

describe("Favorites API", function () {
  describe("POST /favorites", function () {
    describe("when creating a favorite airport", function () {
      it("requires authentication", async function () {
        const response = await request.post("/favorites").send({
          airport_id: "YBR",
          note: "Going to Canada",
        });
        expect(response.status).to.eql(401);
      });

      it("allows a user to save a favorite airport", async function () {
        const postResponse = await request
          .post("/favorites")
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
          .send({
            airport_id: "YBR",
            note: "Going to Canada",
          });

        expect(postResponse.status).to.eql(201);
        expect(postResponse.body.data.attributes.airport.name).to.eql(
          "Brandon Municipal Airport"
        );
        expect(postResponse.body.data.attributes.note).to.eql("Going to Canada");
      });
    });
  });

  describe("GET /favorites", function () {
    it("allows a user to get their favorite airports", async function () {
      const getResponse = await request
        .get("/favorites")
        .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");
      expect(getResponse.status).to.eql(200);
      console.log(getResponse.body.data);
    });
  });

  describe("PUT /favorites/:id", function () {
    it("allows a user to update their favorite airport note", async function () {
      const postResponse = await request
        .post("/favorites")
        .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
        .send({
          airport_id: "YBR",
          note: "Going to Canada",
        });

      const favoriteId = postResponse.body.data.id;

      const putResponse = await request
        .put(`/favorites/${favoriteId}`)
        .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
        .send({
          note: "My usual layover when visiting family and friends",
        });

      expect(putResponse.status).to.eql(200);
      expect(putResponse.body.data.attributes.note).to.eql(
        "My usual layover when visiting family and friends"
      );
    });
  });

  describe("DELETE /favorites/:id", function () {
    it("allows a user to delete their favorite airport", async function () {
      const postResponse = await request
        .post("/favorites")
        .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
        .send({
          airport_id: "YBR",
          note: "Going to Canada",
        });

      console.log("id test: ", postResponse);
      const favoriteId = postResponse.body.data.id;

      const deleteResponse = await request
        .delete(`/favorites/${favoriteId}`)
        .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");

      expect(deleteResponse.status).to.eql(200);
    });
  });
});