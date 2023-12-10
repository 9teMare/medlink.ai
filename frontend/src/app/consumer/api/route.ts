import { Consumer } from "@/constants/types";
import ky from "ky";

export const runtime = "edge";

export async function POST(request: Request) {
    const res = await ky.post(
        `${process.env.NEXT_PUBLIC_VERIFICATION_SERVER_LOCAL_HOST_URL}/api/chainlink-functions/functions-consumer-subscription`
    );
    const data = await res.json();

    return Response.json(data);
}
