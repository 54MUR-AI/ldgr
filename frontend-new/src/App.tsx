import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import FloatingEmbers from './components/FloatingEmbers'
import FileUpload from './components/FileUpload'
import FileList from './components/FileList'
import Auth from './components/Auth'
import { Lock, Shield, Zap, LogOut } from 'lucide-react'

interface FileItem {
  id: string
  name: string
  size: number
  encrypted: boolean
  uploadedAt: Date
}

function MainApp() {
  const [files, setFiles] = useState<FileItem[]>([])
  const { user, signOut } = useAuth()

  const handleFileUpload = (file: File) => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      encrypted: true,
      uploadedAt: new Date()
    }
    setFiles(prev => [newFile, ...prev])
  }

  return (
    <div className="min-h-screen bg-samurai-black text-white">
      <FloatingEmbers />
      
      {/* Header */}
      <header className="relative z-10 border-b-2 border-samurai-red bg-samurai-grey-darker px-6 py-5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Lock className="w-8 h-8 text-samurai-red" />
            <h1 className="text-3xl font-black neon-text">LDGR</h1>
            <span className="text-white/70 text-sm font-medium">Secure Vault</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm">{user?.email}</span>
            <button 
              onClick={signOut}
              className="flex items-center gap-2 px-6 py-2.5 bg-samurai-grey-dark border-2 border-samurai-red hover:bg-samurai-red/10 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-samurai-red/30"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl font-black mb-4 neon-text">
            Military-Grade File Security
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Store and share files with AES-256 encryption, blockchain verification, and P2P transfer
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-6 py-3 bg-samurai-grey-darker border-2 border-samurai-red/30 rounded-full">
              <Lock className="w-5 h-5 text-samurai-red" />
              <span className="font-semibold">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-samurai-grey-darker border-2 border-samurai-red/30 rounded-full">
              <Shield className="w-5 h-5 text-samurai-red" />
              <span className="font-semibold">Blockchain Verified</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-samurai-grey-darker border-2 border-samurai-red/30 rounded-full">
              <Zap className="w-5 h-5 text-samurai-red" />
              <span className="font-semibold">P2P Transfer</span>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <FileUpload onFileUpload={handleFileUpload} />

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-12">
            <FileList files={files} />
          </div>
        )}
      </main>
    </div>
  )
}

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-samurai-black flex items-center justify-center">
        <FloatingEmbers />
        <div className="text-center relative z-10">
          <Lock className="w-16 h-16 text-samurai-red mx-auto mb-4 animate-glow-pulse" />
          <h2 className="text-2xl font-bold text-white">Loading LDGR...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <FloatingEmbers />
        <Auth />
      </>
    )
  }

  return <MainApp />
}

export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
