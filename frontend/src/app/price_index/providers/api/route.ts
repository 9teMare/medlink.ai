import { ProviderDetail } from "@/constants/types";
import ky from "ky";

export const runtime = "edge";

export async function POST(request: Request) {
    try {
        const { product, budget, consumerAddress, subscriptionId } = await request.json();

        const functionRequest = await ky.post(
            `${process.env.NEXT_PUBLIC_VERIFICATION_SERVER_LOCAL_HOST_URL}/api/chainlink-functions/function-request-provider`,
            {
                json: { drug: product, amount: budget, consumerAddress, subscriptionId },
            }
        );

        await functionRequest.json();

        await new Promise((resolve) => setTimeout(resolve, 12000));

        const functionResponse = await ky.post(
            `${process.env.NEXT_PUBLIC_VERIFICATION_SERVER_LOCAL_HOST_URL}/api/chainlink-functions/function-response-provider`,
            {
                json: { consumerAddress },
            }
        );

        return Response.json(await functionResponse.json());
    } catch (error) {
        return Response.json({ status: 500, message: "Internal Server Error", data: error });
    }
}
