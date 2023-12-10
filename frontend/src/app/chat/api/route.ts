import ky from "ky";
import { isUndefined } from "lodash";

export const runtime = "edge";

export async function POST(request: Request) {
    let previousResponse = "";

    try {
        const { prompt } = await request.json();

        const functionRequest = await ky.post(
            `${process.env.NEXT_PUBLIC_VERIFICATION_SERVER_LOCAL_HOST_URL}/api/chainlink-functions/function-request-openai-prompt`,
            {
                json: { prompt: prompt },
            }
        );
        await functionRequest.json();

        let functionResponse: string | undefined;

        while (isUndefined(functionResponse) || previousResponse === functionResponse) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            const res = await ky.post(
                `${process.env.NEXT_PUBLIC_VERIFICATION_SERVER_LOCAL_HOST_URL}/api/chainlink-functions/function-response-openai-prompt`
            );

            functionResponse = (await res.json()) as string;
        }

        previousResponse = functionResponse;
        return Response.json(functionResponse);
    } catch (error) {
        return Response.json({ status: 500, message: "Internal Server Error", data: error });
    }
}
