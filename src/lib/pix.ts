

function crc16(str: string) {
  let crc = 0xFFFF;
  for (let c = 0; c < str.length; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000)
        crc = (crc << 1) ^ 0x1021;
      else
        crc = crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

const pad = (str: string) => {
  return str.length.toString().padStart(2, '0') + str;
}

export async function gerarPixCobranca(
  chavePix: string,
  nomeRecebedor: string,
  cidadeRecebedor: string,
  valor: number
) {
  const ID_PAYLOAD_FORMAT_INDICATOR = "00";
  const ID_MERCHANT_ACCOUNT_INFORMATION = "26";
  const ID_MERCHANT_ACCOUNT_INFORMATION_GUI = "00";
  const ID_MERCHANT_ACCOUNT_INFORMATION_KEY = "01";
  const ID_MERCHANT_CATEGORY_CODE = "52";
  const ID_TRANSACTION_CURRENCY = "53";
  const ID_TRANSACTION_AMOUNT = "54";
  const ID_COUNTRY_CODE = "58";
  const ID_MERCHANT_NAME = "59";
  const ID_MERCHANT_CITY = "60";
  const ID_ADDITIONAL_DATA_FIELD_TEMPLATE = "62";
  const ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = "05";
  const ID_CRC16 = "63";

  let payload = "";
  payload += ID_PAYLOAD_FORMAT_INDICATOR + "0201";

  let accountInfo = "";
  accountInfo += ID_MERCHANT_ACCOUNT_INFORMATION_GUI + pad("br.gov.bcb.pix");
  accountInfo += ID_MERCHANT_ACCOUNT_INFORMATION_KEY + pad(chavePix);

  payload += ID_MERCHANT_ACCOUNT_INFORMATION + pad(accountInfo);
  payload += ID_MERCHANT_CATEGORY_CODE + "040000";
  payload += ID_TRANSACTION_CURRENCY + "03986";
  
  if (valor > 0) {
    payload += ID_TRANSACTION_AMOUNT + pad(valor.toFixed(2));
  }
  
  // Clean special chars for name and city
  const cleanName = nomeRecebedor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").substring(0, 25).trim();
  const cleanCity = cidadeRecebedor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").substring(0, 15).trim();
  
  payload += ID_COUNTRY_CODE + "02BR";
  payload += ID_MERCHANT_NAME + pad(cleanName);
  payload += ID_MERCHANT_CITY + pad(cleanCity);

  let additionalData = ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID + "03***";
  payload += ID_ADDITIONAL_DATA_FIELD_TEMPLATE + pad(additionalData);

  payload += ID_CRC16 + "04";

  let crc = crc16(payload);
  const pixCopiaECola = payload + crc;

  // O QR Code será gerado diretamente no frontend via API para evitar dependência do Canvas na Vercel.
  return {
    pixCopiaECola,
    pixQrCode: ""
  };
}
