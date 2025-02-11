'use client';
import React from 'react';
import { CodeBlock, CopyBlock, hybrid } from 'react-code-blocks';
const Code = ({ children, className, showLineNumbers }) => {
    const language = className?.replace('lang-', '');
    console.log(language)
    return (
        <div className='code-block'>
            {/* <div className='language'>
                <p>{language}</p>

            </div> */}
            <CodeBlock
                text={children}
                language={language}
                showLineNumbers={showLineNumbers}
                theme={hybrid}
            >
            </CodeBlock>
        </div>

    );
}

export default Code;


