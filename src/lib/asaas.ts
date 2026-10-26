const ASAAS_API_URL = process.env.NODE_ENV === "production" 
  ? "https://www.asaas.com/api/v3" 
  : "https://sandbox.asaas.com/api/v3";

export interface AsaasPaymentRequest {
  customer: string;
  billingType: "PIX" | "BOLETO" | "CREDIT_CARD";
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
}

export const createAsaasPayment = async (data: AsaasPaymentRequest, apiKey: string) => {
  const response = await fetch(`${ASAAS_API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access_token": apiKey,
    },
    body: JSON.stringify({
      ...data,
      postalService: false,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.description || "Erro ao criar pagamento no Asaas");
  }

  return response.json();
};

export const getPixQrCode = async (paymentId: string, apiKey: string) => {
  const response = await fetch(`${ASAAS_API_URL}/payments/${paymentId}/pixQrCode`, {
    headers: {
      "access_token": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao recuperar QR Code do Pix");
  }

  return response.json();
};
