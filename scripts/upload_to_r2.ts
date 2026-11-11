import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || "https://1cfab13e4d7d62d5ea0d99f5a6d75d17.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "0add1088e3e68b1becdff86eabeb85cb",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "413e6f985cba9d8a96803b79d1b5958b26b7b57455160631be56ae2f33e39db0"
  }
});

const BUCKET_NAME = process.env.R2_BUCKET || "piscinasev";

function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png": return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".svg": return "image/svg+xml";
    case ".webp": return "image/webp";
    case ".ico": return "image/x-icon";
    case ".pdf": return "application/pdf";
    default: return "application/octet-stream";
  }
}

async function uploadFile(fullPath: string, key: string) {
  const fileContent = fs.readFileSync(fullPath);
  const contentType = getContentType(fullPath);

  console.log(`Enviando: ${key} (${(fileContent.length / 1024).toFixed(1)} KB)...`);
  
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: contentType
  }));

  console.log(`✅ OK: ${key}`);
}

async function uploadDirectory(dir: string, baseDir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await uploadDirectory(fullPath, baseDir);
    } else {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
      await uploadFile(fullPath, relativePath);
    }
  }
}

async function main() {
  console.log("=== INICIANDO UPLOAD PARA O CLOUDFLARE R2 ===");
  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log(`Endpoint: ${process.env.R2_ENDPOINT || 'https://1cfab13e4d7d62d5ea0d99f5a6d75d17.r2.cloudflarestorage.com'}`);

  // Teste de conexão listando o bucket
  try {
    const listRes = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET_NAME, MaxKeys: 5 }));
    console.log(`Conexão com R2 bem-sucedida! Objetos existentes no bucket: ${listRes.KeyCount ?? 0}`);
  } catch (err: any) {
    console.error("Falha ao conectar no bucket:", err.message);
    throw err;
  }

  // 1. Upload da pasta public/
  const publicDir = path.resolve(process.cwd(), "public");
  if (fs.existsSync(publicDir)) {
    console.log(`\nSubindo arquivos de: ${publicDir}`);
    await uploadDirectory(publicDir, publicDir);
  }

  // 2. Upload de mídias extras na raiz se houver
  const parentDir = path.resolve(process.cwd(), "..");
  const parentFiles = [
    "29feedb2-7053-4c9b-8831-a6bb08b916f5.jpg",
    "WhatsApp Image 2026-04-26 at 15.59.19.jpeg",
    "WhatsApp Image 2026-04-26 at 16.01.05.jpeg"
  ];

  console.log("\nSubindo mídias adicionais da pasta de documentos...");
  for (const file of parentFiles) {
    const fullPath = path.join(parentDir, file);
    if (fs.existsSync(fullPath)) {
      await uploadFile(fullPath, `extras/${file}`);
    }
  }

  console.log("\n🎉 TODAS AS MÍDIAS FORAM ENVIADAS COM SUCESSO PARA O CLOUDFLARE R2!");
  console.log("URL Pública: https://pub-a6c5fcfc372a41ccadd1ed1ebcaa3acd.r2.dev");
}

main().catch(err => {
  console.error("Erro fatal no upload:", err);
  process.exit(1);
});
