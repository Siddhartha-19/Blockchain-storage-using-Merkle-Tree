const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  var our_tree=new MerkleTree(niceList);
  // console.log(process.argv[2]);
  var proof=our_tree.getProof(10,our_tree.leaves,[]);
  // console.log(proof[0]);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof:proof,
    leaf:niceList[10]
  });

  console.log({ gift });
}

main();