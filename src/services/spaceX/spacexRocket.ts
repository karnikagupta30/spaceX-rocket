import { Result } from "dispatch";
import { Route } from "OpenApiRouter";

export const spacexRocketWithoutSpec = async (_route: Route): Promise<Result | null> => {
    try {
        const rocketId = _route.pathParameters['rocketId'];
        const url = `https://api.spacexdata.com/v3/rockets/${rocketId}`
        const res = await fetch(url);
        console.log(res.status);

        if (!res.ok) {
            throw new Error(`Something went wrong! ${res.status} ${res.statusText}`);
        }

        const getDataInJson = await res.json();
        const requestObj = {
            id: JSON.stringify(getDataInJson.id),
            company: getDataInJson.company.toUpperCase(),
            country: getDataInJson.country,
            main_image: getDataInJson.flickr_images[0],
            cost_per_launch: {
                amount: getDataInJson.cost_per_launch
            } 
        }
        return {
            status: 200,
            body: requestObj
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}