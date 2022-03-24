describe("Header", () => {
  describe("Unauthenticated users", () => {
    it("shows the sign in button", () => {
      cy.guestVisit("/");
      cy.findByRole("link", { name: "Sign in" }).should("exist");
    });
  });

  describe("Authenticated users", () => {
    it("shows the signed in user", () => {
      cy.authVisit("/");
      cy.findByRole("button", { name: "Sign out" }).should("exist");
      cy.findByText("Welcome").should("exist");
    });

    it("signs out user", () => {
      cy.authVisit("/");
      cy.findByRole("button", { name: "Sign out" }).should("exist").click();
      cy.findByRole("heading", { name: "Sign in" });
    });
  });

  it("passes lighthouse audits", () => {
    cy.authVisit("/");
    cy.lighthouseDesktop({
      performance: 46,
      seo: 80,
      accessibility: 100,
      "best-practices": 100,
    });
  });

  it("passes axe audits", () => {
    cy.authVisit("/");
    cy.pa11y({ actions: ["wait for element h1 to be added"] });
  });
});
