import { FileText, Lock, Download, Share2, Trash2 } from 'lucide-react'

interface FileItem {
  id: string
  name: string
  size: number
  encrypted: boolean
  uploadedAt: Date
}

interface FileListProps {
  files: FileItem[]
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export default function FileList({ files }: FileListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Vault</h2>
        <span className="text-white/70">{files.length} files</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-samurai-grey-darker border-2 border-samurai-red/30 rounded-xl p-6 hover:border-samurai-red transition-all duration-300 shadow-xl hover:shadow-samurai-red/20 transform hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-samurai-red to-samurai-red-dark flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{file.name}</h3>
                  <p className="text-sm text-white/70">{formatFileSize(file.size)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm">
              {file.encrypted && (
                <span className="flex items-center gap-1 px-3 py-1 bg-samurai-red/20 border border-samurai-red/50 rounded-full text-samurai-red">
                  <Lock className="w-3 h-3" />
                  Encrypted
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-samurai-grey-dark hover:bg-samurai-red/20 border border-samurai-red/30 hover:border-samurai-red rounded-lg transition-all duration-300">
                <Download className="w-4 h-4" />
                <span className="text-sm font-semibold">Download</span>
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-samurai-grey-dark hover:bg-samurai-red/20 border border-samurai-red/30 hover:border-samurai-red rounded-lg transition-all duration-300">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center px-4 py-2 bg-samurai-grey-dark hover:bg-red-900/20 border border-samurai-red/30 hover:border-red-500 rounded-lg transition-all duration-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
