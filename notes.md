# Agaave DAO Deployment
this guide assumes you have the aragonCLI setup with a rinkeby key.

## 0. env vars
```
f="--env aragon:rinkeby --wsRpc wss://rinkeby.infura.io/ws/v3/b4d9f393413d42a381bd955a310fbb66"
HUNDRED_THOUSAND=100000000000000000000000
TWENTY_THOUSAND=20000000000000000000000
FIVE_THOUSAND=5000000000000000000000
ANY=0xffffffffffffffffffffffffffffffffffffffff
me=0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb
```

## 1. create new dao  
dao new $f

dao=

## 2. install first apps & create voting token 
dao install $dao agent $f
dao install $dao token-manager.aragonpm.eth --app-init none $f 
dao token new "Agaave" "AG" $f

agent=
tokenManager=
AG=


## initialise token manager Setup voting and 
dao install $dao finance --app-init-args $agent 2592000 $f
dao token change-controller $AG $tokenManager $f
dao acl create $dao $tokenManager MINT_ROLE $ANY $me $f
dao acl create $dao $tokenManager ISSUE_ROLE $ANY $me $f
dao acl create $dao $tokenManager ASSIGN_ROLE $ANY $me $f
dao exec $dao $tokenManager initialize $AG true 0 $f
dao install $dao voting --app-init-args $AG 500000000000000000 250000000000000000 86400 $f
aragon dao install $dao conviction-beta.open.aragonpm.eth --app-init-args $AG $agent $AG 9999599 2000000 20000 200000000000000000 --env aragon:rinkeby --wsRpc wss://rinkeby.infura.io/ws/v3/b4d9f393413d42a381bd955a310fbb66 --ipfsRpc https://ipfs.eth.aragon.network/ipfs/

finance=
voting=
cv=




## set permissions

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




## Issue and vest tokens
dao exec $dao $tokenManager issue $HUNDRED_THOUSAND $f
dao exec $dao $tokenManager assign $agent $TWENTY_THOUSAND $f
dao exec $dao $tokenManager assign $cv $FIVE_THOUSAND $f






================================================================



start=`date +%s` && declare -i start
cliff=start+120 && declare -i cliff
vested=start+480 && declare -i vested
echo $start
echo $cliff
echo $vested

0x6850CFeB3e500dE4d9FA13EBD55779c4F1C02101,
0x99691618eD6cf96d6eF42e2493055fdbD3AA1ed8,
0x6850CFeB3e500dE4d9FA13EBD55779c4F1C02101,
0xDD7f94A7Ac8970fa3777441914e3E96262C9B41e,
0x94903F4F2a938f6280da444FC8daFC3589959650

