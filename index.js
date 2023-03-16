const PORT = process.env.PORT || 5000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

app.get('/', (req, res) => {
    res.json("Hello, I'm Kamikaizi")
})

app.get('/danger/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber
    const source = `https://www.white-pages.gr/arithmos/${phoneNumber}`

    axios.get(source)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const jsonResponse = []

            $('div#progress-bar-inner', html).each(function () {
                const danger = $(this).text()

                jsonResponse.push({
                    danger,
                    source
                })
            })

            res.json(jsonResponse)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))