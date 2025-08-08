import React, { useState, useEffect, useCallback, useRef } from 'react';
import Split from 'react-split';
import { Download, FileText, File, AlertCircle, Upload } from 'lucide-react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:8000';

const defaultMarkdown = `# Markdown to PDF Converter

Welcome to the **Markdown to PDF Converter**! This is a powerful tool that allows you to write in Markdown and export to PDF or DOCX formats.

## Features

- ✨ **Live Preview**: See your formatted text in real-time
- 📄 **PDF Export**: Generate beautiful PDF documents
- 📝 **DOCX Export**: Create Microsoft Word compatible files
- 🎨 **Syntax Highlighting**: Code blocks with beautiful formatting
- 📋 **Tables**: Full table support
- 🔗 **Links**: Clickable links in your documents

## Advanced Capabilities

- Multi-region deployment
- Advanced AI capabilities  
- Comprehensive analytics
- Automated optimization

## Markdown Syntax Examples

### Headers
Use \`#\` for headers. More \`#\` means smaller headers.

### Text Formatting
- **Bold text** with \`**bold**\`
- *Italic text* with \`*italic*\`
- \`Inline code\` with backticks
- ~~Strikethrough~~ with \`~~text~~\`

### Lists
1. Numbered list item 1
2. Numbered list item 2
   - Nested bullet point
   - Another nested item

### Code Blocks
\`\`\`javascript
function greetUser(name) {
    console.log(\`Hello, \${name}!\`);
}

greetUser('World');
\`\`\`

### Tables
| Feature | Status | Description | Priority |
|---------|--------|-------------|----------|
| Live Preview | ✅ | Real-time markdown rendering | High |
| PDF Export | ✅ | High-quality PDF generation | High |
| DOCX Export | ✅ | Microsoft Word compatible | Medium |
| Syntax Highlighting | ✅ | Beautiful code formatting | High |
| Table Support | ✅ | Responsive table layouts | Medium |

### Code Examples

JavaScript example:
\`\`\`javascript
function generatePDF(markdown) {
    const converter = new MarkdownToPDF();
    return converter.convert(markdown, {
        format: 'A4',
        styling: 'beautiful'
    });
}

// Usage
const pdf = generatePDF('# Hello World');
\`\`\`

Python example:
\`\`\`python
def process_markdown(content):
    """Process markdown content and return formatted PDF"""
    processor = MarkdownProcessor()
    
    # Configure beautiful styling
    processor.set_style({
        'font': 'Arial',
        'colors': ['#3498db', '#e74c3c'],
        'syntax_highlighting': True
    })
    
    return processor.to_pdf(content)
\`\`\`

### Blockquotes
> "The best way to predict the future is to create it."
> — Peter Drucker

> **Pro Tip:** Use this tool to create professional documentation, reports, and presentations with beautiful formatting!

### Links and More
Visit [GitHub](https://github.com) for more awesome projects!

---

**Ready to start?** Simply replace this text with your own markdown content and watch the live preview update automatically! The PDF export now includes beautiful tables, syntax-highlighted code blocks, and professional styling.`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('My Document');
  const [fontFamily, setFontFamily] = useState("-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif");
  const [h1Size, setH1Size] = useState(24);
  const [h2Size, setH2Size] = useState(20);
  const [h3Size, setH3Size] = useState(16);
  const [pSize, setPSize] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  // Debounced preview update
  const updatePreview = useCallback(
    debounce(async (content) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/convert/html`, {
          content,
          title,
          settings: {
            font_family: fontFamily,
            h1_size: h1Size,
            h2_size: h2Size,
            h3_size: h3Size,
            p_size: pSize
          }
        });
        setPreview(response.data.html);
      } catch (error) {
        console.error('Preview update failed:', error);
        setPreview('<p>Preview unavailable</p>');
      }
    }, 300),
    [title, fontFamily, h1Size, h2Size, h3Size, pSize]
  );

  useEffect(() => {
    updatePreview(markdown);
  }, [markdown, updatePreview]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      setMarkdown(text);
      const name = file.name.replace(/\.(md|markdown|txt)$/i, '');
      if (name) setTitle(name);
      showNotification('Markdown file imported');
    } catch (err) {
      console.error('Failed to read file', err);
      showNotification('Failed to import file', 'error');
    } finally {
      // reset the input so the same file can be selected again
      event.target.value = '';
    }
  };

  const handleExport = async (format) => {
    if (!markdown.trim()) {
      showNotification('Please enter some markdown content first!', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/convert/${format}`, {
        content: markdown,
        title,
        settings: {
          font_family: fontFamily,
          h1_size: h1Size,
          h2_size: h2Size,
          h3_size: h3Size,
          p_size: pSize
        }
      });

      if (response.data.success) {
        // Download the file
        const downloadUrl = `${API_BASE_URL}${response.data.download_url}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${title}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification(`${format.toUpperCase()} exported successfully!`);
      } else {
        showNotification(response.data.message || 'Export failed', 'error');
      }
    } catch (error) {
      console.error('Export failed:', error);
      showNotification('Export failed. Please check your connection.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <FileText className="header-icon" size={24} />
            <div>
              <h1 className="header-title">Markdown to PDF</h1>
              <p className="header-subtitle">Convert your markdown to beautiful documents</p>
            </div>
          </div>
          
          <div className="header-center" style={{display:'flex',gap:12,alignItems:'center'}}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input title-text"
              placeholder="Document title..."
            />
            <select value={fontFamily} onChange={(e)=>setFontFamily(e.target.value)} className="title-input control-input" style={{maxWidth:200}}>
              <option value="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif">System</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Times New Roman, Times, serif">Times</option>
              <option value="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">Inter</option>
              <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica</option>
              <option value="'Courier New', Courier, monospace">Courier New</option>
            </select>
            <input type="number" min={10} max={48} value={h1Size} onChange={(e)=>setH1Size(parseInt(e.target.value||'24',10))} className="title-input control-input" style={{maxWidth:90}} title="H1 size" />
            <input type="number" min={10} max={40} value={h2Size} onChange={(e)=>setH2Size(parseInt(e.target.value||'20',10))} className="title-input control-input" style={{maxWidth:90}} title="H2 size" />
            <input type="number" min={10} max={32} value={h3Size} onChange={(e)=>setH3Size(parseInt(e.target.value||'16',10))} className="title-input control-input" style={{maxWidth:90}} title="H3 size" />
            <input type="number" min={10} max={20} value={pSize} onChange={(e)=>setPSize(parseInt(e.target.value||'12',10))} className="title-input control-input" style={{maxWidth:90}} title="Paragraph size" />
          </div>

          <div className="header-right">
            <input
              ref={fileInputRef}
              type="file"
              accept=".md,.markdown,.txt,text/markdown"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button onClick={handleImportClick} className="export-btn import-btn">
              <Upload size={16} />
              Import MD
            </button>
            <button
              onClick={() => handleExport('pdf')}
              disabled={isLoading}
              className="export-btn pdf-btn"
            >
              <Download size={16} />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('docx')}
              disabled={isLoading}
              className="export-btn docx-btn"
            >
              <File size={16} />
              Export DOCX
            </button>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <AlertCircle size={16} />
          {notification.message}
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <Split
          className="split"
          sizes={[50, 50]}
          minSize={200}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          {/* Editor Panel */}
          <div className="editor-panel">
            <div className="panel-header">
              <h3>Markdown Editor</h3>
            </div>
            <div className="editor-container">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="editor-textarea"
                placeholder="Start typing your markdown here..."
                spellCheck={false}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="preview-panel">
            <div className="panel-header">
              <h3>Live Preview</h3>
            </div>
            <div className="preview-container">
              <div 
                className="preview-content"
                style={{
                  ['--font-family']: fontFamily,
                  ['--h1-size']: `${h1Size}px`,
                  ['--h2-size']: `${h2Size}px`,
                  ['--h3-size']: `${h3Size}px`,
                  ['--p-size']: `${pSize}px`,
                }}
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            </div>
          </div>
        </Split>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Generating document...</p>
        </div>
      )}
    </div>
  );
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default App;
