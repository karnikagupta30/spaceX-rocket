import { Route } from "OpenApiRouter";
import { handleHello } from "operations/hello";
import { spacexRocketWithoutSpec } from "services/spaceX/spacexRocket";
import { rockets } from "services/spaceX/spacexRocketList";
import { rocketsOneWithSpec } from "services/spaceX/spacexRocketWithSpec";

export interface Result {
  body?: any;
  status: number;
  headers?: Record<string, string>;
}

export const dispatch = async (route: Route): Promise<Result | null> => {
  switch (route.operation.operationId) {
    case "hello":
      return await handleHello(route);
    case "rocketsOneWithSpec":
      return await rocketsOneWithSpec(route.pathParameters.rocketId);
    case "rocketsOne":
      return await spacexRocketWithoutSpec(route);
    case "rockets":
      return await rockets(route);
    default:
      return null;
  }
};
