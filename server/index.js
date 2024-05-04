const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList= require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
var our_tree=new MerkleTree(niceList);
const MERKLE_ROOT = our_tree._getRoot(our_tree.leaves);

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const proof=body.proof;
  const leaf=body.leaf;
  // TODO: prove that a name is in the list 
  var isInTheList = false;
  // console.log(verifyProof(proof,leaf,MERKLE_ROOT));
  isInTheList=verifyProof(proof,leaf,MERKLE_ROOT);
    
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
