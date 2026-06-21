import { useState } from 'react'
import { Upload, X } from 'lucide-react'

export default function ImageUpload({ value, onChange }) {
  const [loading, setLoading] = useState(false)

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    )
    const data = await res.json()
    onChange(data.secure_url)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      {value && (
        <div className="relative w-full h-40">
          <img src={value} alt="preview" className="w-full h-full object-cover rounded-xl" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}
      <label className={`flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-4 cursor-pointer hover:border-blue-700 transition ${loading ? 'opacity-50' : ''}`}>
        <Upload size={18} className="text-gray-400" />
        <span className="text-gray-500 text-sm">{loading ? 'A fazer upload...' : 'Clica para escolher imagem'}</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={loading} />
      </label>
    </div>
  )
}