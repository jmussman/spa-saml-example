// config.js
// Copyright © 2025 Joel A Mussman. All rights reserved.
//

// Select 'Okta' or 'Auth0' to determine the identity provider. Unfortunately at
// now Okta (and Okta CIC formally known as Auth0) force SAML response via POST.

const use = 'Auth0'

if (use == 'Okta') {

    var IdPLoginURL = 'https://pid.pyrates.live/app/dev-43633848_pyratessaml_1/exkmpppr2mj8hIaq05d7/sso/saml'
    var IdPEntityID = 'http://www.okta.com/exkmpppr2mj8hIaq05d7'
    var IdPCertificate = `MIIDqDCCApCgAwIBAgIGAYCVpEasMA0GCSqGSIb3DQEBBQUAMIGUMQswCQYDVQQGEwJVUzETMBEG 
A1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEU 
MBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGRldi00MzYzMzg0ODEcMBoGCSqGSIb3DQEJ 
ARYNaW5mb0Bva3RhLmNvbTAeFw0yMjA1MDUxOTEyMzJaFw0zMjA1MDUxOTEzMzJaMIGUMQswCQYD 
VQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsG 
A1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFTATBgNVBAMMDGRldi00MzYzMzg0ODEc 
MBoGCSqGSIb3DQEJARYNaW5mb0Bva3RhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC 
ggEBAI2rzbnEUqsERl0Dy1OnzUWKddLe9QwJwKrEoENQUA+lUPQaXP4lRm5Pep4P5lUo9ewzmcYM 
rZxXCHcpaGQnwEP9rY3e5t2w1t/XNgJ4LU0VOkeLgvYsCtuUZLJF0/yBBzKL7JUU0hELmWPOPJWO 
x3VYBLA2xBdOk8iqCi5+g/Zc29ZJ/03VVbm/ZSwxwJ4WSOAQVVJzKtwmyxq1Tl4dwrbvm77m553P 
EdvauBCzgbsmko67p7cBiYpSj51e/4VDcCQfSto/p49paXhYXEz6LcDtuCzPrUf4ENne7kltWEXs 
viUAuuGVFlB9UbBm6ytQfU7aH4IS9VmNYPZVD3E4zvkCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEA 
MbeogXB6BckkOBT1QGLYValY+ByXj9KVlxxAcgjnsbFDf/opZxIcklEsVsQJd+ST5OjaRnw6gpcv 
HcT0yqO4EO3H+kntcA3OH71sZJKa/mMFWzVi4Kh0Pgk9enHWzKw7VdDvs2N83KQ27iSViuhpCWl6 
vmX+5kCoWeJ6nAfPLTDdZ+8tC+kXVctVDLNcb5tt0CXKVafZne99VIUEr5fXAMN5k9Qhpf7bGxQ2 
XEtW3Qk6s6R9/GxlAfc1HXxCnFD/zC9Hu09fh7hqOVw7drBlZun23qd/amwZHZu1wKOJOPM370ow 
r0FEHTH66PinPAYq1+jgrt+0FTe2mLw/gkuyfA==`
    var IdPResponseParameter = 'SAMLResponse'

    var SPEntityID = 'pyrates'
    var SPLoginURL = 'http://localhost:3000'
}

if (use == 'Auth0') {

    var IdPLoginURL = 'https://pid-alt.pyrates.live/samlp/sd9M01FHP37oWmqIYk2GcMITx3jQ9FjL'
    var IdPEntityID = 'urn:pid-alt.pyrates.live'
    var IdPCertificate = `MIIDAzCCAeugAwIBAgIJZ4wgU2MCMxA+MA0GCSqGSIb3DQEBCwUAMB8xHTAbBgNV
BAMTFHB5cmF0ZXMudXMuYXV0aDAuY29tMB4XDTI0MDExNTIzMzIzNloXDTM3MDky
MzIzMzIzNlowHzEdMBsGA1UEAxMUcHlyYXRlcy51cy5hdXRoMC5jb20wggEiMA0G
CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCbUz5PY8+0+8M4YHcUi629O7J9VnYA
t2s9LTgIg8TKOj7/1xj1mzq+cHAfhlsh9bbod+1AlYuqMxJjhwfZ65sBbjIzyS96
0xD5ejaP9TYqgpittt82l6En8ukgJXfMG1DZg1ghKco6g8Ao1Xk9FbAZqUDOtoMs
Np9dylcDB1SoqwuTavVZOm4crocOPUCCKYSwbxMTr0qOQ9LiZsYar3Ba4rUQOm1I
bXQSBwJpi9DnDcF4oFdugREPw4ecYUQzVHDRrQMlcnBGcTa5ndoaY8swucf5jnwR
d4PH5JYp6mCGMRAuVvLAY9yv+jcy7rsGOdhhpVVE/eOCv9uB8HHHwSRPAgMBAAGj
QjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFKxUPZwJ5QvRWgn4Sl6gjAKi
sq4eMA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAGe9GL7XMGy+X
eUheK/lLrIAfGqN7irWdrMfhU6y2TOPM+DQhFumaSYVtXe82Q8RVM/hyHYiObsz4
Iuu4KgUsEwB6Jiq9hZJ6lEGbzSa6ZvGDQiSPuCbtXsHcFcnsw3KAOtcz+5Qz0+3w
SsS0l05+I9sm4jaGRzeoyH+wzXzLR+0rznoA0Tc+H8QySDKB6uEGyh9oQ8n62r9P
U4KMsqzOPE9GomMzAwp/qBwzP6XMU8Ehm51HFwKi5LaVYdDio4gsitiVrOXnzCgF
YIJK+4jPoWMG0sCAwYWyyFlnbehQ8fFZ2aRWfpSRuE/ST7etW/muZY98poMIqX0Y
7sf18iK00A==`
    var IdPResponseParameter = 'SAMLResponse'

    var SPEntityID = 'http://localhost:3000'    // Auth0 maps the entity ID to the login URL, unless the request overrides it.
    var SPLoginURL = 'http://localhost:3000'
}