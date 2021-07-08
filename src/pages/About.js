import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'

const About = () => {
    const [markdown, setMarkdown] = useState('')
    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/adazol123/data-fetch-api/master/README.md')
            .then(response => response.data)
            .then(data => setMarkdown(prev => data.toString()))
    },[])
    console.log(markdown)
    return (
        <div>
            <h2 className='crypto-home-title'>About</h2>
            <Markdown>{markdown}</Markdown>
        </div>
    )
}

export default About
