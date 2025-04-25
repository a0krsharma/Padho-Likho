import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Toolbar,
  Divider,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme
} from '@mui/material';
import {
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  FormatListBulleted as FormatListBulletedIcon,
  FormatListNumbered as FormatListNumberedIcon,
  FormatQuote as FormatQuoteIcon,
  Code as CodeIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignRight as FormatAlignRightIcon,
  FormatAlignJustify as FormatAlignJustifyIcon,
  FormatColorText as FormatColorTextIcon,
  FormatColorFill as FormatColorFillIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  RemoveFormat as RemoveFormatIcon
} from '@mui/icons-material';

/**
 * A reusable rich text editor component
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Editor content
 * @param {function} props.onChange - Callback when content changes
 * @param {number} props.minHeight - Minimum height of the editor
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.toolbar - Whether to show the toolbar
 * @param {Array} props.toolbarOptions - Toolbar options to show
 * @param {Object} props.sx - Additional styles to apply
 */
const RichTextEditor = ({
  value = '',
  onChange,
  minHeight = 200,
  placeholder = 'Start typing...',
  toolbar = true,
  toolbarOptions = ['basic', 'format', 'align', 'list', 'link', 'image'],
  sx = {}
}) => {
  const theme = useTheme();
  const [editorContent, setEditorContent] = useState(value);
  const [editorRef, setEditorRef] = useState(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  
  // Update content when value prop changes
  useEffect(() => {
    if (value !== editorContent) {
      setEditorContent(value);
      
      if (editorRef) {
        editorRef.innerHTML = value;
      }
    }
  }, [value]);
  
  // Handle content change
  const handleContentChange = () => {
    if (editorRef) {
      const newContent = editorRef.innerHTML;
      setEditorContent(newContent);
      
      if (onChange) {
        onChange(newContent);
      }
    }
  };
  
  // Execute command
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    handleContentChange();
    
    // Focus back on editor
    if (editorRef) {
      editorRef.focus();
    }
  };
  
  // Format text
  const handleFormat = (format) => {
    execCommand(format);
  };
  
  // Set heading
  const handleHeading = (event) => {
    const heading = event.target.value;
    
    if (heading === 'p') {
      execCommand('formatBlock', 'p');
    } else {
      execCommand('formatBlock', heading);
    }
  };
  
  // Set text alignment
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      execCommand(`justify${newAlignment}`);
    }
  };
  
  // Insert link
  const handleOpenLinkDialog = () => {
    // Get selected text
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setLinkText(selection.toString());
    }
    
    setLinkDialogOpen(true);
  };
  
  const handleInsertLink = () => {
    if (linkUrl) {
      // If text is selected, create link with selected text
      const selection = window.getSelection();
      
      if (selection.rangeCount > 0 && selection.toString().length > 0) {
        execCommand('createLink', linkUrl);
      } else if (linkText) {
        // Insert new link with provided text
        execCommand('insertHTML', `<a href="${linkUrl}" target="_blank">${linkText}</a>`);
      } else {
        // Insert link URL as text
        execCommand('insertHTML', `<a href="${linkUrl}" target="_blank">${linkUrl}</a>`);
      }
      
      setLinkDialogOpen(false);
      setLinkUrl('');
      setLinkText('');
    }
  };
  
  // Insert image
  const handleOpenImageDialog = () => {
    setImageDialogOpen(true);
  };
  
  const handleInsertImage = () => {
    if (imageUrl) {
      const imgHtml = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%;" />`;
      execCommand('insertHTML', imgHtml);
      
      setImageDialogOpen(false);
      setImageUrl('');
      setImageAlt('');
    }
  };
  
  // Undo/Redo
  const handleUndo = () => {
    execCommand('undo');
  };
  
  const handleRedo = () => {
    execCommand('redo');
  };
  
  // Remove formatting
  const handleRemoveFormat = () => {
    execCommand('removeFormat');
  };
  
  // Render toolbar based on options
  const renderToolbar = () => {
    return (
      <Toolbar 
        variant="dense" 
        disableGutters 
        sx={{ 
          flexWrap: 'wrap', 
          gap: 0.5,
          p: 1
        }}
      >
        {/* Basic formatting */}
        {toolbarOptions.includes('basic') && (
          <>
            <ToggleButtonGroup size="small" aria-label="text formatting">
              <ToggleButton 
                value="bold" 
                aria-label="bold" 
                onClick={() => handleFormat('bold')}
              >
                <Tooltip title="Bold">
                  <FormatBoldIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton 
                value="italic" 
                aria-label="italic" 
                onClick={() => handleFormat('italic')}
              >
                <Tooltip title="Italic">
                  <FormatItalicIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton 
                value="underline" 
                aria-label="underline" 
                onClick={() => handleFormat('underline')}
              >
                <Tooltip title="Underline">
                  <FormatUnderlinedIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          </>
        )}
        
        {/* Paragraph format */}
        {toolbarOptions.includes('format') && (
          <>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="paragraph-format-label">Format</InputLabel>
              <Select
                labelId="paragraph-format-label"
                id="paragraph-format"
                label="Format"
                defaultValue="p"
                onChange={handleHeading}
              >
                <MenuItem value="p">Paragraph</MenuItem>
                <MenuItem value="h1">Heading 1</MenuItem>
                <MenuItem value="h2">Heading 2</MenuItem>
                <MenuItem value="h3">Heading 3</MenuItem>
                <MenuItem value="h4">Heading 4</MenuItem>
                <MenuItem value="pre">Code Block</MenuItem>
                <MenuItem value="blockquote">Quote</MenuItem>
              </Select>
            </FormControl>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          </>
        )}
        
        {/* Alignment */}
        {toolbarOptions.includes('align') && (
          <>
            <ToggleButtonGroup
              size="small"
              exclusive
              aria-label="text alignment"
              onChange={handleAlignment}
            >
              <ToggleButton value="Left" aria-label="left aligned">
                <Tooltip title="Align Left">
                  <FormatAlignLeftIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="Center" aria-label="centered">
                <Tooltip title="Align Center">
                  <FormatAlignCenterIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="Right" aria-label="right aligned">
                <Tooltip title="Align Right">
                  <FormatAlignRightIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="Full" aria-label="justified">
                <Tooltip title="Justify">
                  <FormatAlignJustifyIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          </>
        )}
        
        {/* Lists */}
        {toolbarOptions.includes('list') && (
          <>
            <ToggleButtonGroup size="small" aria-label="list formatting">
              <ToggleButton 
                value="bullet" 
                aria-label="bullet list" 
                onClick={() => execCommand('insertUnorderedList')}
              >
                <Tooltip title="Bullet List">
                  <FormatListBulletedIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton 
                value="number" 
                aria-label="numbered list" 
                onClick={() => execCommand('insertOrderedList')}
              >
                <Tooltip title="Numbered List">
                  <FormatListNumberedIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          </>
        )}
        
        {/* Link */}
        {toolbarOptions.includes('link') && (
          <>
            <Tooltip title="Insert Link">
              <IconButton size="small" onClick={handleOpenLinkDialog}>
                <LinkIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
        
        {/* Image */}
        {toolbarOptions.includes('image') && (
          <>
            <Tooltip title="Insert Image">
              <IconButton size="small" onClick={handleOpenImageDialog}>
                <ImageIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          </>
        )}
        
        {/* Undo/Redo */}
        <Tooltip title="Undo">
          <IconButton size="small" onClick={handleUndo}>
            <UndoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton size="small" onClick={handleRedo}>
            <RedoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        
        {/* Clear formatting */}
        <Tooltip title="Clear Formatting">
          <IconButton size="small" onClick={handleRemoveFormat}>
            <RemoveFormatIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  };
  
  return (
    <Box sx={{ ...sx }}>
      <Paper 
        elevation={1} 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        {/* Toolbar */}
        {toolbar && (
          <>
            {renderToolbar()}
            <Divider />
          </>
        )}
        
        {/* Editor */}
        <Box
          ref={(el) => setEditorRef(el)}
          contentEditable
          suppressContentEditableWarning
          onInput={handleContentChange}
          onBlur={handleContentChange}
          dangerouslySetInnerHTML={{ __html: editorContent }}
          sx={{
            p: 2,
            minHeight,
            outline: 'none',
            overflowY: 'auto',
            '&:empty:before': {
              content: `"${placeholder}"`,
              color: 'text.disabled',
              display: 'block'
            }
          }}
        />
      </Paper>
      
      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)}>
        <DialogTitle>Insert Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="link-url"
            label="URL"
            type="url"
            fullWidth
            variant="outlined"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="link-text"
            label="Link Text"
            type="text"
            fullWidth
            variant="outlined"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            helperText="Leave empty to use the URL as text"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleInsertLink} variant="contained">Insert</Button>
        </DialogActions>
      </Dialog>
      
      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)}>
        <DialogTitle>Insert Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="image-url"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="image-alt"
            label="Alternative Text"
            type="text"
            fullWidth
            variant="outlined"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            helperText="Describe the image for accessibility"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleInsertImage} variant="contained">Insert</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RichTextEditor;
