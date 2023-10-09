import { Router } from "express";
import { IRouteInterface } from "../../interfaces";
import { SaleRouter } from "./saleRoute";


class ProxyRouter {
  private static instance: ProxyRouter;
  private router: Router = Router();
  private readonly routes = [
    {segment: "/sales", provider: SaleRouter },
    
  ];

  private constructor() {}

  static get(): ProxyRouter {
    if (!ProxyRouter.instance) {
      ProxyRouter.instance = new ProxyRouter();
    }
    return ProxyRouter.instance;
  }

  map(): Router {
    this.routes.forEach((route: IRouteInterface) => {
      const instance = new route.provider() as { router: Router };
      this.router.use(route.segment, instance.router);
    });
    return this.router;
  }
}

const proxyRouter = ProxyRouter.get();

export { proxyRouter as ProxyRouter };
