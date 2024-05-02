import { getOpenApiSpec, getBasePathByOpenApiSpec } from "src/utils/openApi";
import { Result } from "dispatch";

export const rocketsOneWithSpec = async (rocketId: string):Promise<Result|null> => {

  const spec = await getOpenApiSpec("src/services/spaceX/spacexSpec.yaml");

  if (!spec) {
    console.log("Error: Unable to load OpenAPI spec");
    return null;
  }

  const basePath = getBasePathByOpenApiSpec(spec);

  const url = `${basePath}/rockets/${rocketId}`;

  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    if (response.status === 200) {

      const formattedData = {
        id: JSON.stringify(jsonData.id),
        company: jsonData.company.toUpperCase(),
        country: jsonData.country,
        main_image: jsonData.flickr_images[0],
        cost_per_launch: {
          amount: jsonData.cost_per_launch
        }
      };
      return {
        status: 200,
        body: formattedData,
      };
    } else {
      console.log("Error:", jsonData);
      return null;
    }
  } catch (error) {
    console.error("Request Error:", error);
    return null;
  }
};