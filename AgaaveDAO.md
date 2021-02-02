# Agaave DAO Deployment
- this guide assumes you have the aragonCLI setup with a rinkeby key.
- the permissions set in this guide are insecure, this is only for testing
<br>

## 0. env vars
Add your infura key and address for your deployer account, then paste these environment variables in your terminal
```
f="--env aragon:rinkeby --wsRpc wss://rinkeby.infura.io/ws/v3/<YOUR_INFURA_KEY>"
HUNDRED_THOUSAND=100000000000000000000000
TWENTY_THOUSAND=20000000000000000000000
FIVE_THOUSAND=5000000000000000000000
ANY=0xffffffffffffffffffffffffffffffffffffffff
me=<YOUR_DEPLOYER_ADDRESS>
```
<br>

## 1. create new dao
```  
dao new $f
```

create a new environment variable
```
dao=<DAO_ADDRESS>
```

<br>

## 2. install first apps & create voting token 
```
dao install $dao agent $f
dao install $dao token-manager.aragonpm.eth --app-init none $f 
dao token new "Token" "AG" $f
```

create a new environment variables
```
agent=
tokenManager=
AG=
```

## 3. initialise token manager Setup voting and 
```
dao install $dao finance --app-init-args $agent 2592000 $f
dao token change-controller $AG $tokenManager $f
dao acl create $dao $tokenManager MINT_ROLE $ANY $me $f
dao acl create $dao $tokenManager ISSUE_ROLE $ANY $me $f
dao acl create $dao $tokenManager ASSIGN_ROLE $ANY $me $f
dao exec $dao $tokenManager initialize $AG true 0 $f
dao install $dao voting --app-init-args $AG 500000000000000000 250000000000000000 86400 $f
aragon dao install $dao conviction-beta.open.aragonpm.eth --app-init-args $AG $agent $AG 9999599 2000000 20000 200000000000000000 --env aragon:rinkeby --wsRpc wss://rinkeby.infura.io/ws/v3/b4d9f393413d42a381bd955a310fbb66 --ipfsRpc https://ipfs.eth.aragon.network/ipfs/
```

create a new environment variables
```
finance=
voting=
cv=
```

<br>

## 4. set permissions
```
dao acl create $dao $voting CREATE_VOTES_ROLE $tokenManager $voting $f
dao acl create $dao $voting MODIFY_SUPPORT_ROLE $voting $voting $f
dao acl create $dao $voting MODIFY_QUORUM_ROLE $voting $voting $f
dao acl create $dao $agent TRANSFER_ROLE $voting $voting $f
dao acl create $dao $cv CREATE_PROPOSALS_ROLE 0xffffffffffffffffffffffffffffffffffffffff $voting $f
dao acl create $dao $finance CREATE_PAYMENTS_ROLE $voting $voting $f
dao acl create $dao $finance CHANGE_PERIOD_ROLE $voting $voting $f
dao acl create $dao $finance CHANGE_BUDGETS_ROLE $voting $voting $f
dao acl create $dao $finance EXECUTE_PAYMENTS_ROLE $voting $voting $f
dao acl create $dao $finance MANAGE_PAYMENTS_ROLE $voting $voting $f
```

<br>

## 5. Issue and assign tokens
```
dao exec $dao $tokenManager issue $HUNDRED_THOUSAND $f
dao exec $dao $tokenManager assign $agent $TWENTY_THOUSAND $f
dao exec $dao $tokenManager assign $cv $FIVE_THOUSAND $f
```

<br>

## 6. Vest tokens

add the Token Manager address to the [VestSeed](./scripts/vestSeed.js) script and run with 
````
❯ npx hardhat run ./scripts/vestSeed.js --network rinkeby
```
