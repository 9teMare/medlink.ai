import "./App.css";
import { useState, useEffect } from "react";
import PolygonIDVerifier from "./PolygonIDVerifier";
import VcGatedDapp from "./VcGatedDapp";
import { Center, Container } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [provedPrescription, setProvedPrescription] = useState(true);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/api/chainlink-functions/function-response-provider");
        setApiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts

  return (
    <>
      {provedPrescription ? (
        <VcGatedDapp />
      ) : (
        <Center className="vc-check-page">
        <Container>
          {apiData.map((item, index) => {
            return (
              <PolygonIDVerifier
                key={index}
                publicServerURL={process.env.REACT_APP_VERIFICATION_SERVER_PUBLIC_URL}
                localServerURL={process.env.REACT_APP_VERIFICATION_SERVER_LOCAL_HOST_URL}
                credentialType={"PrescriptionMedicine"}
                onVerificationResult={setProvedPrescription}
                schema={`ipfs://QmYVMoLtzVBsRXUizZj4JxgbiGhnskrLF42fbKjd5bJ993`}
                verifier={item.provider}
                max_range={item.max_range}
                min_range={item.min_range}
                patient_wallet_address={"0xbdA087c59180Ee0E6e660591e907F59DcC30f0EF"}
                item={item}
              />
            );
          })}
        </Container>
      </Center>
      )}
    </>
  );
}

export default App;
