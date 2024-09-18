# Chalenges in accepting money

### Multiple modes of payment
Netbanking -> rtgs, imps, neft
UPI
CC
DC
Wallets
Crypto
SWIFT

### Follow multiple compliances
    * Follow security standards
        * CC payment -> PCI DSS -> Payment card industry standard
        * International -> Swift

Licenses and regulations
You must have licenses to access payment
Every country has different regulations
Different countries accept payment in diff modes -> UPI and Rupay

Fraud detection
Prvent any fraudulant transaction ->

Specialized service that only deals with payment, it is going to take a cut

Process of payment acceptance
Config -> API keys
            public key
            private key

verification
webhook -> you need to share a route that your payment gateway can access to confirm about your status of payment
expose our server publicly so that payment gateway is able to access the webhook route
