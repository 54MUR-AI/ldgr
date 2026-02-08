# LDGR
## Military-Grade File Security & API Key Management

Secure file storage and API key management system with AES-256 encryption, blockchain verification, and P2P transfer capabilities. Store files and API keys securely, share them across Ronin Media Group applications.

**Live Demo**: Access via [Ronin Media Group](https://ronin-media-group.netlify.app)  
**Part of**: [Ronin Media Group](https://ronin-media-group.netlify.app)

---

## Features

### File Storage & Management
- 🔐 **End-to-End Encryption**: AES-256 encryption for all files
- 📁 **Folder Organization**: Create, rename, and organize files in folders
- ☁️ **Cloud Storage**: Files stored securely in Supabase
- � **P2P Transfer**: Direct peer-to-peer file sharing (planned)
- ⛓️ **Blockchain Verification**: Immutable file verification (planned)
- 📊 **File Metadata**: Track upload dates, sizes, and file types
- 🗑️ **File Management**: Upload, download, move, and delete files

### API Key Management
- 🔑 **Centralized Key Storage**: Store all API keys in one secure location
- 🛡️ **AES-256 Encryption**: Keys encrypted with password-derived encryption
- 🔐 **Email-Based Key Derivation**: Your email is used as salt for encryption
- 📝 **Multiple Services**: Support for 15+ API services
- 🏷️ **Key Organization**: Name, describe, and categorize your keys
- ✅ **Active/Inactive Toggle**: Enable or disable keys without deleting
- 🔄 **Cross-App Integration**: Use keys in SCRP and other RMG apps
- 👁️ **Secure Key Reveal**: View keys only when needed
- 📋 **Copy to Clipboard**: Quick copy functionality
- 🔍 **Category Filtering**: Filter keys by service category

### Security Features
- �️ **Row-Level Security**: Users can only access their own data
- 🔒 **Client-Side Encryption**: Files encrypted before upload
- 🔐 **Password-Derived Keys**: PBKDF2 with 100,000 iterations
- 🚫 **No Plain Text Storage**: Keys never stored unencrypted
- 🔄 **Automatic Key Rotation**: Update keys without losing access

---

## Quick Start

### Accessing LDGR

1. **Visit** [Ronin Media Group](https://ronin-media-group.netlify.app)
2. **Sign in** or create an account
3. **Navigate to LDGR** from the main menu
4. **Choose a tab**: Files or API Keys

### Managing Files

**Upload Files**:
1. Click "Select Files" or drag and drop
2. Files are encrypted client-side before upload
3. Max 100MB per file (IPFS), 5GB (Cloud), Unlimited (P2P)

**Organize Files**:
1. Create folders with "New Folder" button
2. Move files by dragging or using move option
3. Rename or delete folders as needed

**Download Files**:
1. Click download icon on any file
2. Files are decrypted client-side automatically
3. Original filename and content restored

### Managing API Keys

**Add New Key**:
1. Navigate to "API Keys" tab
2. Click "+ Add Key"
3. Select service from dropdown
4. Enter a descriptive name
5. Paste your API key
6. Add optional description
7. Click "Add Key"

**Use Keys in Apps**:
1. Keys are automatically available in SCRP and other RMG apps
2. Select provider and key from dropdowns
3. Keys are decrypted client-side when needed

**Manage Keys**:
- **Toggle Active/Inactive**: Click toggle switch
- **View Key**: Click eye icon (requires authentication)
- **Copy Key**: Click copy icon
- **Edit Key**: Click edit icon
- **Delete Key**: Click delete icon (requires confirmation)

---

## Supported API Services

LDGR supports API keys for 15+ services across multiple categories:

### AI & Machine Learning
- **OpenAI**: GPT models, DALL-E, Whisper
- **Anthropic**: Claude models
- **Google AI**: Gemini, PaLM
- **Cohere**: Language models
- **Hugging Face**: Model hub access
- **Replicate**: AI model API

### Development & Cloud
- **GitHub**: Repository access, Actions
- **AWS**: Cloud services
- **Google Cloud**: GCP services
- **Azure**: Microsoft cloud
- **Vercel**: Deployment platform
- **Netlify**: Hosting platform

### Data & Analytics
- **Supabase**: Backend as a service
- **Firebase**: Google's app platform
- **MongoDB Atlas**: Database service

### Scraping & Data
- **ScraperAPI**: Web scraping service
- **Bright Data**: Proxy services

### Communication
- **Twilio**: SMS and voice
- **SendGrid**: Email service

### Payments
- **Stripe**: Payment processing

---

## Security Architecture

### File Encryption

```
User File → Client-Side Encryption (AES-256) → Encrypted Blob → Supabase Storage
                    ↓
            Encryption Key (derived from user password)
                    ↓
            Metadata stored in database (encrypted filename, size, etc.)
```

### API Key Encryption

```
User Email → PBKDF2 (100k iterations) → Encryption Key
                                              ↓
API Key → AES-GCM Encryption → Base64 Encoded → Supabase Database
                                                        ↓
                                              Row-Level Security
                                                        ↓
                                            Only user can access
```

**Decryption Flow**:
1. User requests key in SCRP
2. SCRP receives auth token from RMG via postMessage
3. Fetches encrypted key from Supabase
4. Derives decryption key from user email
5. Decrypts key client-side
6. Uses key for API calls
7. Key never stored in plain text

---

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Lucide React** for icons
- **React Router** for navigation

### Backend & Database
- **Supabase** (PostgreSQL)
  - Authentication
  - File storage
  - Database (API keys, metadata)
  - Row-Level Security (RLS)

### Encryption
- **Web Crypto API**
  - AES-256-GCM for encryption
  - PBKDF2 for key derivation
  - 100,000 iterations
  - Email as salt

### Integration
- **Part of Ronin Media Group**
- **Cross-app authentication**
- **Shared with SCRP, OMNI, and other RMG apps**

---

## Integration with RMG Apps

LDGR API keys are automatically available in all Ronin Media Group applications:

### SCRP (Smart Content Retrieval & Processing)
- Select AI provider from dropdown
- Choose API key from your LDGR keys
- Keys decrypted client-side when needed
- Seamless authentication via postMessage

### OMNI (Coming Soon)
- AI-powered code editor
- Use your LDGR API keys for AI features
- Same secure integration as SCRP

### Future Apps
- All RMG apps will integrate with LDGR
- Centralized key management
- No need to enter keys multiple times

---

## Troubleshooting

### File Upload Issues

**Problem**: File upload fails

**Solution**:
- Check file size (max 100MB for IPFS)
- Ensure you're logged in
- Check internet connection
- Try refreshing the page

**Problem**: File encryption takes too long

**Solution**:
- Large files take longer to encrypt
- Encryption happens client-side for security
- Wait for progress indicator to complete

### API Key Issues

**Problem**: Can't add API key

**Solution**:
- Ensure you're logged in
- Check that service is supported
- Verify key format is correct
- Try refreshing the page

**Problem**: Key not appearing in SCRP

**Solution**:
- Ensure key is marked as "Active"
- Refresh SCRP page
- Check that you're logged in with same account
- Verify key was added for correct service

**Problem**: "Failed to decrypt API key"

**Solution**:
- Must be logged in with same email that created the key
- Keys are encrypted with your email as salt
- Cannot decrypt keys created by different account
- Try re-adding the key

### Authentication Issues

**Problem**: Not logged in

**Solution**:
- Sign in via RMG main page
- LDGR requires authentication
- Create account if you don't have one

---

## Best Practices

### File Storage
- ✅ Organize files in folders
- ✅ Use descriptive filenames
- ✅ Delete unused files to save space
- ✅ Download important files as backup
- ❌ Don't upload sensitive unencrypted data (it's encrypted automatically)

### API Key Management
- ✅ Use descriptive key names (e.g., "OpenAI Production", "Claude Testing")
- ✅ Add descriptions to remember key purpose
- ✅ Disable keys instead of deleting when not in use
- ✅ Rotate keys regularly for security
- ✅ Use different keys for development and production
- ❌ Don't share your LDGR account credentials
- ❌ Don't screenshot or copy keys to insecure locations

---

## Roadmap

### Completed ✅
- File upload and encryption
- Folder organization
- API key storage and management
- Cross-app integration (SCRP)
- Row-level security
- Client-side encryption/decryption

### In Progress 🚧
- P2P file transfer
- Blockchain verification
- File sharing with other users
- OMNI integration

### Planned 📋
- File versioning
- Collaborative folders
- Advanced search and filtering
- Mobile app
- Desktop app
- API key usage analytics
- Key expiration dates
- Team/organization support

---

## Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Areas for Contribution**:
- P2P transfer implementation
- Blockchain integration
- UI/UX improvements
- Additional API service support
- Documentation enhancements
- Bug fixes

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Links

- **Live Demo**: Access via [Ronin Media Group](https://ronin-media-group.netlify.app)
- **GitHub**: [github.com/54MUR-AI/ldgr](https://github.com/54MUR-AI/ldgr)
- **RMG Portal**: [ronin-media-group.netlify.app](https://ronin-media-group.netlify.app)
- **SCRP**: [github.com/54MUR-AI/scraper](https://github.com/54MUR-AI/scraper)

---

**Built with ⚔️ by Ronin Media Group**
