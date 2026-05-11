const bcrypt = require('bcryptjs');

async function test() {
  // Test admin
  const hash1 = '$2b$10$55hJtojam1yvP';  // partial, need full hash
  
  // Re-hash and compare
  const testPass = "admin";
  const newHash = await bcrypt.hash(testPass, 10);
  console.log("New hash for 'admin':", newHash);
  
  const isMatch = await bcrypt.compare(testPass, newHash);
  console.log("bcrypt compare works:", isMatch);
  
  // Test client PIN
  const testPin = "807522";
  const pinHash = await bcrypt.hash(testPin, 10);
  const pinMatch = await bcrypt.compare(testPin, pinHash);
  console.log("PIN compare works:", pinMatch);
}

test().catch(console.error);
