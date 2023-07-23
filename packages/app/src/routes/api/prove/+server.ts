import { SismoConnect as SismoConnectServer, type SismoConnectConfig, type SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { type SismoConnectResponse } from "@sismo-core/sismo-connect-client";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async (event) => {

  // Parse the request body as JSON
  // const body = await json(request);
  const body = await event.request.json();

  // const response = await fetch("https://jsonplaceholder.typicode.com/photos/1");
  // const photos = await response.json();
  const config: SismoConnectConfig = {
    // you will need to get an appId from the Factory
    appId: "0x12ef63401068271a38bed3209b4d2edd",
  };

  const sismoConnectServer = SismoConnectServer({ config });


  async function verifyResponse(sismoConnectResponse: SismoConnectResponse) {
    // verifies the proofs contained in the sismoConnectResponse
    // with respect to the different claims
    const result: SismoConnectVerifiedResult = await sismoConnectServer.verify(
      sismoConnectResponse,
      {
        // proofs in the sismoConnectResponse should be valid
        // with respect to a group membership
        claims: [{ groupId: "0x1cde61966decb8600dfd0749bd371f12" }], // Git passport
      }
    );
    return result
  }

  let verification = await verifyResponse(body);

  return json({ "isVerified": verification ? true : false });
};
