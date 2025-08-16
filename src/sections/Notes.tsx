import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  ChevronRight,
  Edit,
  Download,
  FileText,
  Palette,
  Type,
  Bold,
  Italic,
  Undo,
  Redo,
} from "lucide-react";

// Types
interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  fontSize: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Project {
  id: string;
  title: string;
  notes: Note[];
  createdAt: Date;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const InkBoard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  // Note editor states
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("#1e40af");
  const [fontSize, setFontSize] = useState(18);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = [
    { name: "Blue Ink", value: "#1e40af" },
    { name: "Black Ink", value: "#1f2937" },
    { name: "Red Ink", value: "#dc2626" },
    { name: "Green Ink", value: "#059669" },
    { name: "Purple Ink", value: "#7c3aed" },
    { name: "Brown Ink", value: "#92400e" },
  ];

  // Initialize with sample data
  useEffect(() => {
    const sampleProject: Project = {
      id: "1",
      title: "My First Project",
      notes: [
        {
          id: "1",
          title: "Welcome Note",
          content: "Welcome to InkBoard! This is your first handwritten note.",
          color: "#1e40af",
          fontSize: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          title: "Sample Ideas",
          content:
            "Here are some ideas for using InkBoard:\n\n• Journal entries\n• Meeting notes\n• Creative writing\n• Study notes",
          color: "#059669",
          fontSize: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
    };
    setProjects([sampleProject]);
    setCurrentProject(sampleProject);
  }, []);

  // Create paper texture
  const createPaperTexture = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Base paper color - cream/off-white
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#fefcf8");
    gradient.addColorStop(0.5, "#fdf9f3");
    gradient.addColorStop(1, "#fcf6ef");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle paper texture
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 800; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      const opacity = Math.random() * 0.1;
      ctx.fillStyle = `rgba(180, 140, 100, ${opacity})`;
      ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;

    // Add ruled lines (light blue)
    ctx.strokeStyle = "#e0f2fe";
    ctx.lineWidth = 1;
    const lineSpacing = 32;
    for (let y = 60; y < height - 40; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(width - 40, y);
      ctx.stroke();
    }

    // Add left margin (red line)
    ctx.strokeStyle = "#fecaca";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 40);
    ctx.lineTo(100, height - 40);
    ctx.stroke();
  };

  // Generate handwriting effect
  const addHandwritingEffect = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    color: string,
    size: number,
    bold: boolean = false,
    italic: boolean = false
  ) => {
    let fontStyle = "";
    if (italic) fontStyle += "italic ";
    if (bold) fontStyle += "bold ";

    ctx.font = `${fontStyle}${size}px "Caveat", cursive`;
    ctx.fillStyle = color;

    const words = text.split(" ");
    let currentX = x;
    let currentY = y;
    const lineHeight = size * 1.4;
    const maxWidth = 500;

    words.forEach((word, index) => {
      const wordWidth = ctx.measureText(word + " ").width;

      if (currentX + wordWidth > maxWidth && currentX > x) {
        currentY += lineHeight;
        currentX = x;
      }

      // Add slight randomness for handwritten feel
      const jitterX = (Math.random() - 0.5) * 1;
      const jitterY = (Math.random() - 0.5) * 1;

      // Draw word with slight variation
      ctx.fillText(word, currentX + jitterX, currentY + jitterY);
      currentX += wordWidth;
    });

    return currentY + lineHeight;
  };

  // Generate handwritten image
  const generateHandwrittenImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Create paper background
    createPaperTexture(ctx, canvas.width, canvas.height);

    // Add title
    let currentY = 90;
    if (noteTitle.trim()) {
      ctx.font = `bold ${fontSize + 4}px "Caveat", cursive`;
      ctx.fillStyle = selectedColor;
      const titleJitterX = (Math.random() - 0.5) * 2;
      const titleJitterY = (Math.random() - 0.5) * 2;
      ctx.fillText(noteTitle, 120 + titleJitterX, currentY + titleJitterY);
      currentY += (fontSize + 4) * 1.5;
    }

    // Add content
    if (noteContent.trim()) {
      const paragraphs = noteContent.split("\n").filter((p) => p.trim());

      paragraphs.forEach((paragraph) => {
        currentY = addHandwritingEffect(
          ctx,
          paragraph,
          120,
          currentY,
          selectedColor,
          fontSize,
          isBold,
          isItalic
        );
        currentY += 10;
      });
    }
  };

  // Download image
  const downloadNote = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a larger canvas for download
    const downloadCanvas = document.createElement("canvas");
    const downloadCtx = downloadCanvas.getContext("2d");
    if (!downloadCtx) return;

    downloadCanvas.width = 800;
    downloadCanvas.height = 1000;

    // Create paper background
    createPaperTexture(
      downloadCtx,
      downloadCanvas.width,
      downloadCanvas.height
    );

    // Add title
    let currentY = 120;
    if (noteTitle.trim()) {
      downloadCtx.font = `bold ${fontSize + 8}px "Caveat", cursive`;
      downloadCtx.fillStyle = selectedColor;
      downloadCtx.fillText(noteTitle, 120, currentY);
      currentY += (fontSize + 8) * 1.8;
    }

    // Add content with proper spacing
    if (noteContent.trim()) {
      const paragraphs = noteContent.split("\n").filter((p) => p.trim());

      paragraphs.forEach((paragraph) => {
        const words = paragraph.split(" ");
        let currentX = 120;
        const lineHeight = (fontSize + 4) * 1.6;
        const maxWidth = 600;

        downloadCtx.font = `${fontSize + 4}px "Caveat", cursive`;
        downloadCtx.fillStyle = selectedColor;

        words.forEach((word) => {
          const wordWidth = downloadCtx.measureText(word + " ").width;

          if (currentX + wordWidth > maxWidth && currentX > 120) {
            currentY += lineHeight;
            currentX = 120;
          }

          const jitterX = (Math.random() - 0.5) * 2;
          const jitterY = (Math.random() - 0.5) * 2;
          downloadCtx.fillText(word, currentX + jitterX, currentY + jitterY);
          currentX += wordWidth;
        });

        currentY += lineHeight * 1.2;
      });
    }

    // Download
    const link = document.createElement("a");
    link.download = `${noteTitle || "note"}_handwritten.png`;
    link.href = downloadCanvas.toDataURL("image/png", 1.0);
    link.click();
  };

  // Project operations
  const createProject = () => {
    if (newProjectTitle.trim()) {
      const newProject: Project = {
        id: generateId(),
        title: newProjectTitle,
        notes: [],
        createdAt: new Date(),
      };
      setProjects([...projects, newProject]);
      setCurrentProject(newProject);
      setNewProjectTitle("");
      setShowNewProjectForm(false);
    }
  };

  // Note operations
  const createNote = () => {
    if (!currentProject) return;

    const newNote: Note = {
      id: generateId(),
      title: "Untitled",
      content: "",
      color: selectedColor,
      fontSize: fontSize,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedProject = {
      ...currentProject,
      notes: [...currentProject.notes, newNote],
    };

    setProjects(
      projects.map((p) => (p.id === currentProject.id ? updatedProject : p))
    );
    setCurrentProject(updatedProject);
    setCurrentNote(newNote);
    setNoteTitle(newNote.title);
    setNoteContent(newNote.content);
  };

  const selectNote = (note: Note) => {
    setCurrentNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setSelectedColor(note.color);
    setFontSize(note.fontSize);
  };

  const saveNote = () => {
    if (!currentNote || !currentProject) return;

    const updatedNote: Note = {
      ...currentNote,
      title: noteTitle,
      content: noteContent,
      color: selectedColor,
      fontSize: fontSize,
      updatedAt: new Date(),
    };

    const updatedProject = {
      ...currentProject,
      notes: currentProject.notes.map((n) =>
        n.id === currentNote.id ? updatedNote : n
      ),
    };

    setProjects(
      projects.map((p) => (p.id === currentProject.id ? updatedProject : p))
    );
    setCurrentProject(updatedProject);
    setCurrentNote(updatedNote);
  };

  const deleteNote = (noteId: string) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      notes: currentProject.notes.filter((n) => n.id !== noteId),
    };

    setProjects(
      projects.map((p) => (p.id === currentProject.id ? updatedProject : p))
    );
    setCurrentProject(updatedProject);

    if (currentNote && currentNote.id === noteId) {
      setCurrentNote(null);
      setNoteTitle("");
      setNoteContent("");
    }
  };

  // Auto-save when content changes
  useEffect(() => {
    if (currentNote) {
      const timeoutId = setTimeout(() => {
        saveNote();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [noteTitle, noteContent, selectedColor, fontSize]);

  // Update canvas when note changes
  useEffect(() => {
    generateHandwrittenImage();
  }, [noteTitle, noteContent, selectedColor, fontSize, isBold, isItalic]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Add Caveat font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Edit className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900">InkBoard</h1>
            </div>
            <button
              onClick={() => setShowNewProjectForm(true)}
              className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              New Project
            </button>
          </div>
          <p className="text-sm text-gray-500">Pen-on-paper notes</p>
        </div>

        {/* New Project Form */}
        {showNewProjectForm && (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              placeholder="Project name..."
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && createProject()}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={createProject}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewProjectForm(false);
                  setNewProjectTitle("");
                }}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Projects */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Projects</h2>
          <div className="space-y-1">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setCurrentProject(project)}
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                  currentProject?.id === project.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronRight
                  size={16}
                  className={
                    currentProject?.id === project.id ? "rotate-90" : ""
                  }
                />
                <FileText size={16} />
                <span className="text-sm truncate">{project.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {currentProject && (
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-700">Notes</h2>
              <button
                onClick={createNote}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {currentProject.notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => selectNote(note)}
                  className={`p-3 rounded-lg cursor-pointer border ${
                    currentNote?.id === note.id
                      ? "border-indigo-200 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-sm text-gray-900 truncate">
                      {note.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="p-1 hover:bg-red-100 rounded"
                    >
                      <Trash2
                        size={12}
                        className="text-gray-400 hover:text-red-600"
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {note.content || "Empty note"}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {note.updatedAt.toLocaleDateString()}
                    </span>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: note.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Notes</span>
            </div>
            <button
              onClick={createNote}
              className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
            >
              <Plus size={16} />
              <span>New</span>
            </button>
          </div>

          {currentNote && (
            <div className="flex items-center space-x-4">
              {/* Formatting Controls */}
              <div className="flex items-center space-x-2 border-r pr-4">
                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium">
                  H1
                </button>
                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium">
                  H2
                </button>
                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium">
                  H3
                </button>
                <button
                  onClick={() => setIsBold(!isBold)}
                  className={`p-1.5 rounded ${
                    isBold
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Bold size={16} />
                </button>
                <button
                  onClick={() => setIsItalic(!isItalic)}
                  className={`p-1.5 rounded ${
                    isItalic
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Italic size={16} />
                </button>
              </div>

              {/* Color Picker */}
              <div className="flex items-center space-x-1">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: selectedColor }}
                />
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-6 h-6 rounded border-2 ${
                      selectedColor === color.value
                        ? "border-gray-400"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-2 border-l pl-4">
                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                  <Undo size={16} />
                </button>
                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                  <Redo size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {currentNote ? (
            <>
              {/* Editor */}
              <div className="flex-1 p-6">
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full text-2xl font-semibold text-gray-900 bg-transparent border-none outline-none mb-4"
                  style={{ fontFamily: '"Caveat", cursive' }}
                />
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Start writing..."
                  className="w-full h-full bg-transparent border-none outline-none resize-none text-lg text-gray-800"
                  style={{
                    fontFamily: '"Caveat", cursive',
                    lineHeight: "1.6",
                  }}
                />
              </div>

              {/* Preview */}
              <div className="w-80 bg-white border-l border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Preview</h3>
                  <button
                    onClick={downloadNote}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-auto"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Handwritten preview
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Edit size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a note to edit
                </h3>
                <p className="text-gray-500">
                  Choose a note from the sidebar or create a new one
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InkBoard;
