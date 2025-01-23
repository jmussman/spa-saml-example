[//]: # (README.md)
[//]: # (Copyright © 2025 Joel A Mussman. All rights reserved.)
[//]: #

![Banner Light](https://raw.githubusercontent.com/jmussman/cdn-fun/main/banners/banner-spa-saml-example-light.png#gh-light-mode-only)
![banner Dark](https://raw.githubusercontent.com/jmussman/cdn-fun/main/banners/banner-spa-saml-example-dark.png#gh-dark-mode-only)

# SPA-SAML-Example

## Overview

Sometimes the question arises of how to initiate a SAML request from a single-page application (SPA), and
if it is possible to do this without any server-side implementation.
This project has been written to work with either a redirect or POST delivery, in order
to show both the client-side and server-side implementation.
In regards to the second question, it is possible to do the redirection without server-side changes
providing two things are true:

1. The identity provider (IdP) wilLl send the assertion using "redirect" instead of POST.
This means that
it is appended to the query string in the URl, usually as the "SAMLResponse" attribute.
1. The server will ignore the query string in the request and still serve the SPA normally.
The SPA already has the query string, that is not the issue.
The issue is the server balking at seeing the query string and throwing an error.

Unfortunately, both of the popular the Okta and Auth0 tenants now force the response to be sent via POST and
offer no option for redirect.
That does not mean that other IdPs will not allow it.
Okta's reason for this is twofold:

1. The length of the assertion may exceed the limits of the query string.
1. The query string will be logged by the browser and may be compromised.
The solution for this of course would be encryption, which should be used in all circumstances anyhow.

Note: this application does not verify the SAML assertion by checking the signature, issuer, or audience.

## Configuration and Test

NodeJS 13.2 or later is required.

1. Clone this project to your local computer.
1. Run npm install in the project folder to install the necessary JavaScript packages.
1. Run "npm start" to launch the server at http://localhost:3000.
1. When the server launches and shows the URL, ctrl/cmd-click the link to launch the web page.
1. The default configuration points and Okta IdP at https://pid.pyrates.live, which is a public-facing IdP you can test with.
Click the button to initiate a SAML request, and sign in with "calicojack@pyrates.live", password "P!rates17".
The application will show you the SAML assertion and how it was delivered.

### Change to another IdP

If you open the src/config.js file, you will see that you can change the configuration to
a public Auth0 IdP at https://pid-alt.pyrates.live.

Both of these providers force POST delivery of the SAML assertion.
This is handled by the code in src/server.js, where the assertion is forwarded to the SPA.
Of course you can configure your own IdPs at other identity as a service (IDSaaS) providers and test with them,
and perhaps you know of one that will perform a redirect delivery.
Look at the code in src/authn.js, this application can handle a redirect.

## License

The code is licensed under the MIT license. You may use and modify all or part of it as you choose, as long as attribution to the source is provided per the license. See the details in the [license file](./LICENSE.md) or at the [Open Source Initiative](https://opensource.org/licenses/MIT).


<hr>
Copyright © 2025 Joel A Mussman. All rights reserved.