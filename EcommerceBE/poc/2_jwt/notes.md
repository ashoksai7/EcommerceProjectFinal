**HTTP packet**
* Header : metadata about the packet
* Body: actual payload
* Cookies -> part of header

## cookies
* cooki is a client side storage
* It stores data in the format 'key : value' pairs. These pairs should be of type string
* Server sends thes cookies to the client
* On client side, these cookies are stored and mapped to the server that has sent the cookies
* For the next request -> client will automatically attach these cookies with the server

## Identification vs Authentication vs Authorization

**Identification** : Identification is the process of stating or claiming who you are. It's the initial step where a user asserts an identity, but it doesn't validate the authenticity of the claim.
 * User preferences are solved

**Authentication** : Is the process of verifying whether the claimed identity is valid and accurate. It ensures that the user's identity is genuine before granting  access to protected resources or functionalities.
 * login, otp, biometric
 * web token

**Authorization** : is the process of determining what actions or resources an authenticated user is permitted to access within a system or application
