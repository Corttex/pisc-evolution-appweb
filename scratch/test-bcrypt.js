const bcrypt = require('bcryptjs');

async function test() {
  console.log("Testing bcrypt...");
  const hash = await bcrypt.hash("123456", 10);
  console.log("Hash generated:", hash);
  const match = await bcrypt.compare("123456", hash);
  console.log("Match:", match);
}

test();
