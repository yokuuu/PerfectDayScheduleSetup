import React, { useState } from 'react'

const TagsInput = () => {
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState<string[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setTag(value)
    }

    const handleSave = () => {
        setTags((prevTags) => [...prevTags, tag])
        setTag('')
    }

    const removeTags = (index: number) =>
        setTags((prevTags) => prevTags.filter((tag, i) => i !== index))

    return (
        <div>
            <div className="flex items-center p-4">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="m-2 w-fit stroke block py-3 px-4 text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400"
                    >
                        <span className="m-2">{tag}</span>
                        <button onClick={() => removeTags(index)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <input type="text" value={tag} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
        </div>
    )
}

export default TagsInput
