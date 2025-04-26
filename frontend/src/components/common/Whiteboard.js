import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Menu,
  IconButton,
  Tooltip,
  Divider,
  Slider,
  Typography,
} from '@mui/material';
import {
  Brush as BrushIcon,
  Create as PencilIcon,
  Clear as EraserIcon,
  Delete as ClearIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Save as SaveIcon,
  TextFields as TextIcon,
  PanTool as HandIcon,
  Add as ZoomInIcon,
  Remove as ZoomOutIcon
} from '@mui/icons-material';

/**
 * A reusable whiteboard component for interactive teaching
 * 
 * @param {Object} props - Component props
 * @param {string} props.initialData - Initial whiteboard data
 * @param {function} props.onChange - Callback when whiteboard changes
 * @param {boolean} props.readOnly - Whether whiteboard is read-only
 * @param {boolean} props.collaborative - Whether whiteboard is collaborative
 * @param {Object} props.sx - Additional styles to apply
 */
const Whiteboard = ({
  initialData,
  onChange,
  readOnly = false,
  collaborative = false,
  sx = {}
}) => {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [colorMenuAnchor, setColorMenuAnchor] = useState(null);
  const [brushMenuAnchor, setBrushMenuAnchor] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);
  
  // Available colors
  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;
    
    // Get context
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
    
    // Load initial data if provided
    if (initialData && context) {
      const img = new window.Image();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
      };
      img.src = initialData;
    }
    // Save to history after initialization
    saveToHistory();
    // eslint-disable-next-line
  }, [color, brushSize, initialData, saveToHistory]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Save current drawing
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempContext = tempCanvas.getContext('2d');
      tempContext.drawImage(canvas, 0, 0);
      
      // Resize canvas
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      
      // Get context
      const context = canvas.getContext('2d');
      context.scale(2, 2);
      context.lineCap = 'round';
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      contextRef.current = context;
      
      // Restore drawing
      context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [brushSize, color]);
  
  // Save canvas state to history
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Remove any "future" states if we're not at the end of history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(canvas.toDataURL());
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Notify parent component of change
    if (onChange) {
      onChange(canvas.toDataURL());
    }
  };
  
  // Start drawing
  const startDrawing = ({ nativeEvent }) => {
    if (readOnly) return;
    
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    
    if (tool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'destination-out';
    } else {
      contextRef.current.globalCompositeOperation = 'source-over';
    }
  };
  
  // Draw
  const draw = ({ nativeEvent }) => {
    if (!isDrawing || readOnly) return;
    
    const { offsetX, offsetY } = nativeEvent;
    
    if (tool === 'pencil' || tool === 'eraser') {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };
  
  // Stop drawing
  const stopDrawing = () => {
    if (!isDrawing || readOnly) return;
    
    contextRef.current.closePath();
    setIsDrawing(false);
    saveToHistory();
  };
  
  // Handle tool change
  const handleToolChange = (newTool) => {
    setTool(newTool);
    
    if (newTool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'destination-out';
    } else {
      contextRef.current.globalCompositeOperation = 'source-over';
    }
  };
  
  // Handle color change
  const handleColorChange = (newColor) => {
    setColor(newColor);
    contextRef.current.strokeStyle = newColor;
    setColorMenuAnchor(null);
  };
  
  // Handle brush size change
  const handleBrushSizeChange = (event, newSize) => {
    setBrushSize(newSize);
    contextRef.current.lineWidth = newSize;
  };
  
  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };
  
  // Undo
  const undo = () => {
    if (historyIndex <= 0) return;
    
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = history[newIndex];
  };
  
  // Redo
  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = history[newIndex];
  };
  
  // Save whiteboard
  const saveWhiteboard = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = dataUrl;
    link.click();
  };
  
  // Zoom in
  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };
  
  // Zoom out
  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };
  
  return (
    <Box sx={{ ...sx }}>
      {/* Toolbar */}
      <Paper 
        elevation={1} 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          p: 0.5,
          mb: 1,
          borderRadius: 2,
          flexWrap: 'wrap'
        }}
      >
        {/* Drawing tools */}
        <Tooltip title="Pencil">
          <IconButton 
            onClick={() => handleToolChange('pencil')}
            color={tool === 'pencil' ? 'primary' : 'default'}
          >
            <PencilIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Eraser">
          <IconButton 
            onClick={() => handleToolChange('eraser')}
            color={tool === 'eraser' ? 'primary' : 'default'}
          >
            <EraserIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Text">
          <IconButton 
            onClick={() => handleToolChange('text')}
            color={tool === 'text' ? 'primary' : 'default'}
          >
            <TextIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Hand (Pan)">
          <IconButton 
            onClick={() => handleToolChange('hand')}
            color={tool === 'hand' ? 'primary' : 'default'}
          >
            <HandIcon />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        {/* Color picker */}
        <Tooltip title="Color">
          <IconButton 
            onClick={(e) => setColorMenuAnchor(e.currentTarget)}
            sx={{ 
              color: color,
              '& svg': {
                filter: color === '#FFFFFF' ? 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))' : 'none'
              }
            }}
          >
            <BrushIcon />
          </IconButton>
        </Tooltip>
        
        <Menu
          anchorEl={colorMenuAnchor}
          open={Boolean(colorMenuAnchor)}
          onClose={() => setColorMenuAnchor(null)}
        >
          <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', width: 120 }}>
            {colors.map((c) => (
              <Box
                key={c}
                onClick={() => handleColorChange(c)}
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: c,
                  m: 0.5,
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  boxShadow: color === c ? '0 0 0 2px #000' : 'none'
                }}
              />
            ))}
          </Box>
        </Menu>
        
        {/* Brush size */}
        <Tooltip title="Brush Size">
          <IconButton onClick={(e) => setBrushMenuAnchor(e.currentTarget)}>
            <BrushIcon />
          </IconButton>
        </Tooltip>
        
        <Menu
          anchorEl={brushMenuAnchor}
          open={Boolean(brushMenuAnchor)}
          onClose={() => setBrushMenuAnchor(null)}
        >
          <Box sx={{ p: 2, width: 200 }}>
            <Typography gutterBottom>Brush Size: {brushSize}</Typography>
            <Slider
              value={brushSize}
              onChange={handleBrushSizeChange}
              min={1}
              max={20}
              valueLabelDisplay="auto"
            />
          </Box>
        </Menu>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        {/* History controls */}
        <Tooltip title="Undo">
          <span>
            <IconButton 
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              <UndoIcon />
            </IconButton>
          </span>
        </Tooltip>
        
        <Tooltip title="Redo">
          <span>
            <IconButton 
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <RedoIcon />
            </IconButton>
          </span>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        {/* Zoom controls */}
        <Tooltip title="Zoom In">
          <IconButton onClick={zoomIn}>
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Zoom Out">
          <IconButton onClick={zoomOut}>
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        {/* Other controls */}
        <Tooltip title="Clear All">
          <IconButton onClick={clearCanvas} color="error">
            <ClearIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Save as Image">
          <IconButton onClick={saveWhiteboard}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Paper>
      
      {/* Canvas */}
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%',
          height: 500,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            cursor: tool === 'pencil' ? 'crosshair' : 
                   tool === 'eraser' ? 'cell' : 
                   tool === 'hand' ? 'grab' : 'default'
          }}
        >
          <Box
            sx={{
              transform: `scale(${zoom})`,
              transformOrigin: '0 0',
              width: `${100 / zoom}%`,
              height: `${100 / zoom}%`
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white'
              }}
            />
          </Box>
        </Box>
        
        {/* Collaborative indicator */}
        {collaborative && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'success.main',
              color: 'white',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}
          >
            Collaborative
          </Box>
        )}
        
        {/* Read-only indicator */}
        {readOnly && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'warning.main',
              color: 'white',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}
          >
            Read Only
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Whiteboard;
