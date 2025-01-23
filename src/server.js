// server.js
// Copyright © 2025 Joel A Mussman. All rights reserved.
//

import express from 'express'
import { readFileSync } from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();
let assertion = null

app.use('/assets', express.static('./src/assets'))
app.use(express.urlencoded({ extended: true }));

app.all([ '/', '/index.html' ], (request, response) => {

    // If there is a SAML assertion in the request body cache it to deliver with
    // the config.js file below.

    const { SAMLResponse } = request.body

    assertion = SAMLResponse

    // Send the index file to the browser.

    const index = `/${__dirname}/index.html`
    
    response.sendFile(index, (err) => {

        if (err) {

            console.error(err)
            response.status(500).send('Error retrievng index.html')
        }
    })
})

app.get('/config.js', (request, response) => {

    // Load the config file as data.

    const configpath = `/${__dirname}/config.js`
    let config = readFileSync(configpath).toString()

    if (assertion) {

        // Append the SAML assertion to the end of the JavaScript configuration.

        config = config + `\n\nvar SAMLAssertion = '${assertion}'`
    }

    response.send(config)
})

app.listen(port, () => {

  console.log(`Server listening on port http://localhost:${port}`);
})