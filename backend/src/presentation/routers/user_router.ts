import express, { CookieOptions, Request, Response } from "express";
const session = require("express-session");
import { LoginUseCase } from "../../domain/interfaces/use-cases/user/login_usecase";
import dotenv from "dotenv";
import passport from "passport";
import { HandleLDAPRedirectUseCase } from "../../domain/interfaces/use-cases/user/handle_ldap_redirect_usecase";
dotenv.config();



export default function UserRouter(
  loginUseCase: LoginUseCase,
  handleLDAPRedirectUsecase: HandleLDAPRedirectUseCase
) {
  const router = express.Router();

  router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  
  router.get(
    "/login",
    passport.authenticate("azuread-openidconnect", {
      failureRedirect: "/api/v1/ad/fail",
    }),
    async (req: Request, res: Response) => {
      console.log("Login was called in the Sample");
      res.redirect("/");
    }
  );

  router.post(
    "/signin",
    function (req, res, next) {
      passport.authenticate("azuread-openidconnect", {
        failureRedirect: "/api/v1/ad/login",
      })(req, res, next);
    },
    async (req: any, res: Response) => {
      let tokens = await handleLDAPRedirectUsecase.execute(req.user);
      let userData = req.user; 
      console.log(userData);
      req.session.destroy(function (err:any) {
        res.redirect(
          "https://cbnlnxprojectajalafrontenddevtest.azurewebsites.net" +
            `?adlogininfo=${JSON.stringify({ ...tokens, userData})}`
        );
      });
    }
  );
  

  

  router.get("/fail", async (req: Request, res: Response) => {
    res.send("<h2>LDAP Login failed</h2>");
  });

  return router;
}
