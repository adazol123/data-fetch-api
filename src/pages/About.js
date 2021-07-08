import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'


const About = () => {
    const [markdown, setMarkdown] = useState('')
    const readme = 'README.md'
    useEffect(() => {
        import(`../md/${readme}`)
            .then( res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setMarkdown(prev => res))
            })
            .catch(error => console.log(error))
    },[])
    // console.log(markdown)
    return (
        <div className='about'>
            <Markdown options={{ wrapper: 'article' }}>{markdown}</Markdown>
        </div>
    )
}

export default About
