import { FaCopy } from 'react-icons/fa';
import { useState } from 'react';
import { MdCheck } from 'react-icons/md';

function syntaxHighlight(json: string) {
    return json.replace(/(&|\"|<|>)/g, (match) => {
        switch (match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            default: return match;
        }
    }).replace(
        /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(?=\s*:))|("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
        (match, key) => {
            let cls = 'text-black dark:text-white';
            if (key) cls = 'text-yellow-600 dark:text-amber-300';
            else if (/^"/.test(match)) cls = 'text-green-600 dark:text-green-400';
            else if (/true/.test(match)) cls = 'text-purple-600 dark:text-purple-400';
            else if (/false/.test(match)) cls = 'text-red-600 dark:text-red-400';
            else if (/null/.test(match)) cls = 'text-gray-600 dark:text-gray-400';
            else if (/\"/.test(match)) cls = 'text-orange-600 dark:text-orange-400';
            else if (/^-?\d/.test(match)) cls = 'text-blue-600 dark:text-blue-400';
            return `<span class="${cls}">${match}</span>`;
        }
    );
}

export const JsonViewer = ({ title = 'JSON Viewer', data }: { title?: string; data: object }) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div className="bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md rounded-2xl w-full max-w-4xl mx-auto shadow-2xl border border-gray-200 dark:border-[#1e1e1e] relative">
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 dark:border-[#0e0e0e]/80 p-4">
                <h2 className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400">
                    {title}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                        aria-label="Copy JSON"
                    >
                        {copied ? <MdCheck size={18} className="text-green-500" /> : <FaCopy size={14} color="#22d3ee" />}
                    </button>
                </div>
            </div>
            <pre
                className="overflow-auto whitespace-pre-wrap text-sm font-mono px-4 pb-4 text-black dark:text-white"
                dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonStr) }}
            />
        </div>
    );
};
