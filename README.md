# Markdown to PDF Converter

A beautiful, full-stack web application that converts Markdown to PDF and DOCX formats with live preview.

![Markdown to PDF Converter](https://img.shields.io/badge/Markdown-to%20PDF-blue?style=for-the-badge&logo=markdown)

## ✨ Features

- 📝 **Live Markdown Editor** - Write markdown with syntax highlighting
- 👀 **Real-time Preview** - See your formatted document instantly
- 📄 **Beautiful PDF Export** - Generate professional PDFs with:
  - 🎨 Gradient headers and styled elements
  - 📊 Beautiful tables with gradients and shadows
  - 💻 Syntax-highlighted code blocks with decorative borders
  - 🎯 Perfect typography and spacing
  - 📱 Responsive layouts and page breaks
- 📝 **DOCX Export** - Create Microsoft Word compatible files
- 🎨 **Modern UI** - Clean, responsive design with split-pane layout
- ⚡ **Fast & Responsive** - Built with React, FastAPI, and Playwright

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Playwright** - Modern browser automation for beautiful PDF generation
- **python-docx** - Create and modify Word documents
- **Markdown** - Python markdown processor with extensions
- **Pygments** - Syntax highlighting for code blocks

### Frontend
- **React** - Modern JavaScript UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **React Split Pane** - Resizable split layout
- **Lucide React** - Beautiful icons

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd markdowntopdf
   ```

2. **Set up the backend**
   ```bash
   # Install Python dependencies using uv
   uv sync
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

#### Option 1: Quick Start (Recommended)

Run both services with a single command:

```bash
./start.sh
```

This will start both the backend (port 8000) and frontend (port 3000) automatically. Press `Ctrl+C` to stop both services.

#### Option 2: Manual Setup

1. **Start the backend** (Terminal 1)
   ```bash
   uv run run_backend.py
   ```
   Backend will be available at http://localhost:8000

2. **Start the frontend** (Terminal 2)
   ```bash
   cd frontend
   npm start
   ```
   Frontend will be available at http://localhost:3000

#### Option 3: Using Individual Commands

**Backend:**
```bash
uv run uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend && npm start
```

## 📖 Usage

1. **Open your browser** and navigate to http://localhost:3000
2. **Write Markdown** in the left panel editor
3. **See Live Preview** in the right panel
4. **Set Document Title** in the header input field
5. **Export to PDF** using the "Export PDF" button
6. **Export to DOCX** using the "Export DOCX" button

### Supported Markdown Features

- **Headers** (H1-H6)
- **Text Formatting** (Bold, Italic, Strikethrough)
- **Code Blocks** with syntax highlighting
- **Inline Code**
- **Lists** (Ordered and Unordered)
- **Tables**
- **Blockquotes**
- **Links**
- **Images**
- **Horizontal Rules**

## 🎨 Customization

### Styling PDF Output

You can customize the PDF output by modifying the CSS in the `convert_to_pdf` function in `backend/main.py`:

```python
styled_html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        /* Your custom styles here */
        body {{ font-family: 'Your Font', sans-serif; }}
        h1 {{ color: #your-color; }}
    </style>
</head>
<body>{html_content}</body>
</html>
"""
```

### Frontend Theming

Modify `frontend/src/App.css` to customize the application's appearance.

## 🔧 API Endpoints

### Convert to HTML
```http
POST /api/convert/html
Content-Type: application/json

{
  "content": "# Your markdown here",
  "title": "Document Title"
}
```

### Convert to PDF
```http
POST /api/convert/pdf
Content-Type: application/json

{
  "content": "# Your markdown here", 
  "title": "Document Title"
}
```

### Convert to DOCX
```http
POST /api/convert/docx
Content-Type: application/json

{
  "content": "# Your markdown here",
  "title": "Document Title"
}
```

### Download File
```http
GET /api/download/{file_id}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the excellent web framework
- [WeasyPrint](https://weasyprint.org/) for PDF generation
- [React](https://reactjs.org/) for the amazing frontend library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 🐛 Issues & Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/markdowntopdf/issues) on GitHub.

---

Made with ❤️ by [Your Name]
