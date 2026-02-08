import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import FileUpload from './components/FileUpload'
import FileList from './components/FileList'
import FolderView from './components/FolderView'
import Auth from './components/Auth'
import { Lock, Shield, Zap, LogOut } from 'lucide-react'
import { uploadFile, getUserFiles, downloadFile, deleteFile, moveFile } from './lib/storage'
import type { FileMetadata } from './lib/storage'
import { getFoldersByParent, createFolder, renameFolder, deleteFolder, getFolderPath, countFilesInFolder } from './lib/folders'
import type { Folder } from './lib/folders'

function MainApp() {
  const [files, setFiles] = useState<FileMetadata[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState<Folder[]>([])
  const [folderFileCounts, setFolderFileCounts] = useState<Record<string, number>>({})
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user, signOut } = useAuth()

  // Load user's files and folders on mount and when folder changes
  useEffect(() => {
    if (user) {
      loadFiles()
      loadFolders()
      loadFolderPath()
    }
  }, [user, currentFolderId])

  const loadFiles = async () => {
    if (!user) return
    try {
      setLoading(true)
      const userFiles = await getUserFiles(user.id, currentFolderId)
      setFiles(userFiles)
    } catch (error) {
      console.error('Error loading files:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadFolders = async () => {
    if (!user) return
    try {
      const userFolders = await getFoldersByParent(user.id, currentFolderId)
      setFolders(userFolders)
      
      // Load file counts for each folder and current location
      const counts: Record<string, number> = {}
      for (const folder of userFolders) {
        counts[folder.id] = await countFilesInFolder(folder.id)
      }
      // Add count for current folder/root
      counts[currentFolderId || 'root'] = await countFilesInFolder(currentFolderId)
      setFolderFileCounts(counts)
    } catch (error) {
      console.error('Error loading folders:', error)
    }
  }

  const loadFolderPath = async () => {
    if (!user) return
    try {
      const path = await getFolderPath(currentFolderId)
      setCurrentPath(path)
    } catch (error) {
      console.error('Error loading folder path:', error)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!user) return
    
    try {
      setUploading(true)
      const metadata = await uploadFile(file, user.id, user.email!, currentFolderId)
      setFiles(prev => [metadata, ...prev])
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileDownload = async (file: FileMetadata) => {
    if (!user) return
    
    try {
      await downloadFile(file, user.id, user.email!)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download file. Please try again.')
    }
  }

  const handleFileDelete = async (file: FileMetadata) => {
    if (!user) return
    
    if (!confirm(`Delete "${file.name}"?`)) return
    
    try {
      await deleteFile(file)
      setFiles(prev => prev.filter(f => f.id !== file.id))
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete file. Please try again.')
    }
  }

  const handleFolderClick = (folderId: string | null) => {
    setCurrentFolderId(folderId)
  }

  const handleCreateFolder = async (name: string, parentId: string | null) => {
    if (!user) return
    try {
      const newFolder = await createFolder(user.id, name, parentId)
      setFolders(prev => [...prev, newFolder])
    } catch (error) {
      console.error('Create folder failed:', error)
      alert('Failed to create folder. Please try again.')
    }
  }

  const handleRenameFolder = async (folderId: string, newName: string) => {
    try {
      await renameFolder(folderId, newName)
      setFolders(prev => prev.map(f => f.id === folderId ? { ...f, name: newName } : f))
    } catch (error) {
      console.error('Rename folder failed:', error)
      alert('Failed to rename folder. Please try again.')
    }
  }

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteFolder(folderId)
      setFolders(prev => prev.filter(f => f.id !== folderId))
    } catch (error) {
      console.error('Delete folder failed:', error)
      alert('Failed to delete folder. Please try again.')
    }
  }

  const handleMoveFile = async (fileId: string, folderId: string | null) => {
    try {
      await moveFile(fileId, folderId)
      // Reload files and folder counts to reflect the change
      await loadFiles()
      await loadFolders()
    } catch (error) {
      console.error('Move file failed:', error)
      alert('Failed to move file. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-samurai-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-samurai-red bg-samurai-grey-darker shadow-lg">
        <div className="flex items-center justify-between px-6 py-3">
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
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-slide-up">
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
        <FileUpload onFileUpload={handleFileUpload} uploading={uploading} />

        {/* Folder Navigation */}
        <div className="mt-8">
          <FolderView
            folders={folders}
            currentPath={currentPath}
            onFolderClick={handleFolderClick}
            onCreateFolder={handleCreateFolder}
            onRenameFolder={handleRenameFolder}
            onDeleteFolder={handleDeleteFolder}
            fileCount={folderFileCounts}
            onMoveFile={handleMoveFile}
          />
        </div>

        {/* File List */}
        {loading ? (
          <div className="mt-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-samurai-red/30 border-t-samurai-red rounded-full animate-spin" />
            <p className="mt-4 text-white/70">Loading your files...</p>
          </div>
        ) : files.length > 0 ? (
          <div className="mt-12">
            <FileList 
              files={files} 
              onDownload={handleFileDownload}
              onDelete={handleFileDelete}
              onMoveFile={handleMoveFile}
            />
          </div>
        ) : (
          <div className="mt-12 text-center text-white/50">
            <p>No files yet. Upload your first file above!</p>
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
        <div className="text-center relative z-10 w-full max-w-md px-6">
          <Lock className="w-16 h-16 text-samurai-red mx-auto mb-4 animate-glow-pulse" />
          <h2 className="text-2xl font-bold text-white">Loading LDGR...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
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
