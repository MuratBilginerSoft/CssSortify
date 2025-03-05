# Change Log

All notable changes to the "CssSortify" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.3.0] - 2025-03-05

### Added
- Added new "Sort by Category with Spacing" feature
  - Sorts CSS properties by category and adds spacing between different category groups
  - Accessible via context menu and keyboard shortcut (Ctrl+Alt+S)
- Added CSS Minify feature
  - Minifies CSS code and saves it as a .min.css file
  - Accessible via context menu and keyboard shortcut (Ctrl+Alt+M)
  - Removes comments, whitespace, and unnecessary characters
- Added CSS Minify In-Place feature
  - Minifies CSS code directly in the editor without creating a new file
  - Works on selected text or entire document
  - Accessible via context menu and keyboard shortcut (Ctrl+Alt+I)
- Added HTML support
  - Now works with HTML and HTM files
  - Automatically detects and processes CSS within <style> tags
  - Only shows sorting options (not minify) in HTML files
  - Maintains proper indentation within style tags
  - Preserves HTML document structure
  - Improved style tag indentation to ensure style tags are one tab inside their parent and CSS is one tab inside style tags
- Added Extract CSS from HTML feature
  - Extracts all CSS from style tags in an HTML file and creates a separate CSS file
  - Automatically removes style tags and adds a link to the external CSS file
  - Asks for a filename or generates a random one if none provided
  - Accessible via context menu and keyboard shortcut (Ctrl+Alt+E)
- Added feature to extract CSS from HTML files to external CSS files
- Added feature to convert inline styles to classes in HTML files
  - Uses "mb" prefix followed by celestial body names for class naming (e.g., mbVenusDiv123, mbJupiterSpan456)
  - Creates camelCase class names with element type and random number (1-1000)
  - Two options available: convert all inline styles or just the selected element
- Added minification feature for CSS files

### Changed
- Refactored codebase to use a modular architecture
- Moved sorting functions to separate modules in the 'pages' directory
- Improved code organization and maintainability
- Added JSDoc comments for better code documentation
- Organized context menu items under a "CssSortify" submenu for cleaner UI
- Enhanced display:flex property handling to always appear at the top of its group
- Improved flex property ordering to follow a logical sequence
- Improved error handling and user feedback
- Updated localization messages

## [0.2.0] - 2025-03-05

### Added
- Added new "Sort by Category" feature
- CSS properties are now grouped into 8 logical categories:
  - Box Model (width, height, margin, padding, border, etc.)
  - Positioning (position, display, flex, grid, etc.)
  - Typography (font, text, line-height, etc.)
  - Visual/Color (color, background, opacity, etc.)
  - Animation (transition, animation, transform, etc.)
  - List and Table (list-style, table-layout, etc.)
  - User Interface (cursor, user-select, etc.)
  - Other (content, clip-path, etc.)
- Added keyboard shortcut (Ctrl+Alt+C) for category sorting
- Updated documentation with new feature details

## [0.1.3] - 2025-02-12

### Added
- Added validation for CSS selector selection
- Added error messages for invalid selections
- Added support for nested CSS selectors
- Added proper indentation for media queries

### Fixed
- Fixed property formatting and semicolon issues
- Fixed indentation in media queries and nested selectors
- Fixed multiple spaces between properties

### Changed
- Improved code organization with webpack bundling
- Optimized extension size

## [0.1.2] - 2025-02-12

### Changed
- Optimized extension to work exclusively with CSS files
- Added webpack bundling to reduce extension size
- Removed HTML support

## [0.0.4] - 2025-02-12

### Added

- New extension icon
- Added Windsurf and Cursor IDE support
- Additional keywords for better marketplace visibility

## [0.0.3] - 2025-02-12

### Changed

- Updated package.json categories and keywords

## [0.0.2] - 2025-02-12

### Changed

- Updated extension icon

## [0.0.1] - 2025-02-12

### Added

- Initial release
- Multiple sorting options (length ascending/descending, alphabetical A-Z/Z-A)
- Multi-language support (English, Turkish, German, Simplified Chinese, Traditional Chinese)
- Smart CSS property formatting
