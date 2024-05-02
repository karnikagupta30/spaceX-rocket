import { Result } from "dispatch";
import { Route } from "OpenApiRouter";

export const rockets = async (_route: Route): Promise<Result | null> => {

  const response = await fetch('https://api.spacexdata.com/v3/rockets')

  const rocketsData = await response.json()

  const transformedRockets = rocketsData.map((rocket: any) => ({
    id: JSON.stringify(rocket.id),
    company: rocket.company.toUpperCase(),
    country: rocket.country,
    main_image: rocket.flickr_images[0],
    cost_per_launch: {
      amount: rocket.cost_per_launch
    }
  }))

  return {
    status: 200,
    body: transformedRockets
  };
}