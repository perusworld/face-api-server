import { NextFunction, Request, Response, Router } from "express";
import { FaceAPIImpl, FaceAPI, InMemoryCache, DetectedPerson, DataCache } from "ts-azure-cognitiveservices-face-api";

export class APIRoute {

  faceAPI: FaceAPI;
  personsCache: DataCache<DetectedPerson>;
  personGroupId: string;

  /**
   * Constructor
   *
   * @class APIRoute
   * @constructor
   */
  constructor() {
    this.faceAPI = new FaceAPIImpl({
      location: process.env.LOCATION || "westus",
      subscriptionKey: process.env.SUBSCRIPTION_KEY
    });
    this.personsCache = new InMemoryCache<DetectedPerson>();
    this.personGroupId = process.env.PERSON_GROUP_ID || "testpersongroupid";
  }

  public hello(req: Request, res: Response, next: NextFunction) {
    console.log('Got', JSON.stringify(req.body, null, 2));
    res.json({
      msg: 'hi there v1',
      youSent: req.body
    })
  }

  public detectPersons(req: Request, res: Response, next: NextFunction) {
    this.faceAPI.detectPersons(req.body, this.personGroupId, this.personsCache).then(persons => {
      res.json(persons);
    });
  }

  /**
   * buildRoutes
   */
  public buildRoutes(router: Router) {
    console.log("[APIRoute::create] Creating api route.");

    router.use((req: Request, res: Response, next: NextFunction) => {
      //TODO: Your API Request Authentication Logic
      next();
    })

    router.post("/hello", this.hello.bind(this));
    router.post("/detect-persons", this.detectPersons.bind(this));
  }


}