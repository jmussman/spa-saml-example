// authn.js
// Copyright © 2025 Joel A Mussman. All rights reserved.
//
// This script provides the components to handle the SAML request and response. The sequence of
// functions runs from the window load event at the bottom.
//

let assertionViaRedirect = false

function initiateRequest() {

    // Send the user to the SAML IdP.

    location.href = IdPLoginURL
}

function checkResponse() {

    // As of January 2025 both Okta and Auth0 force assertion delivery via POS, even though the available
    // documentation hints that "redirect" is available. This function never finds a SAML assertion.

    let params = new URLSearchParams(document.location.search);
    let SAMLResponse = params.get(IdPResponseParameter)

    if (SAMLResponse) {

        assertionViaRedirect = true
        SAMLAssertion = SAMLResponse // SAMLAssertion is global from config.js
    }
}

function paint() {

    // Show the configuration values for the current IdP.

    document.getElementById('idp-login-url').innerText = IdPLoginURL
    document.getElementById('idp-entityid').innerText = IdPEntityID
    document.getElementById('idp-certificate').innerText = IdPCertificate
    document.getElementById('idp-saml-response-param').innerText = IdPResponseParameter

    // Show the configuration values for the service provider.

    document.getElementById('sp-entityid').innerText = SPEntityID
    document.getElementById('sp-login-url').innerText = SPLoginURL

    // Locate the initiate and response divisions.

    let initiate = document.getElementById('initiate');
    let response = document.getElementById('response');

    if (typeof SAMLAssertion === 'undefined') {

        // Show the initiate sign-in button and hide the response.

        initiate.style.display = 'block'
        response.style.display = 'none'

    } else {

        // Hide the initiate sign-in button and show the response.

        initiate.style.display = 'none'
        response.style.display = 'block'

        // Update the response header to show how the response was delivered to the application.

        const header = document.getElementById('saml-response')
        
        header.innerText = `${header.innerText} - Delivered ${assertionViaRedirect ? 'delivered directly to the application via redirect' : 'via POST to the server and then forwared via JavaScript'}`

        // Format and show the XML assertion.

        document.getElementById('saml-assertion').innerText = prettyPrintXML(atob(SAMLAssertion))
    }
}

function prettyPrintXML(sourceXml)
{

    var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
    var xsltDoc = new DOMParser().parseFromString([
        // describes how we want to modify the XML - indent everything
        '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:strip-space elements="*"/>',
        '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
        '    <xsl:value-of select="normalize-space(.)"/>',
        '  </xsl:template>',
        '  <xsl:template match="node()|@*">',
        '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '  </xsl:template>',
        '  <xsl:output indent="yes"/>',
        '</xsl:stylesheet>',
    ].join('\n'), 'application/xml');

    var xsltProcessor = new XSLTProcessor();    
    xsltProcessor.importStylesheet(xsltDoc);
    var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
    var resultXml = new XMLSerializer().serializeToString(resultDoc);

    return resultXml;
};

window.addEventListener('load', () => {

    // When the window finishes loading check for the response and show the data.

    checkResponse()
    paint()
})