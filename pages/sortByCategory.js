/**
 * CSS property category sorting module
 * Sorts CSS properties by logical categories
 */

const { parseProperties } = require('./cssUtils');

/**
 * Sorts CSS properties by category
 * @param {string} properties - CSS properties string
 * @param {boolean} isNested - Whether the properties are nested
 * @returns {string} - Sorted CSS properties string
 */
function sortByCategory(properties, isNested = false) {
    // Parse the properties into a list
    const propertyList = parseProperties(properties);
    
    // Sort the properties by category
    const sortedList = propertyList.sort((a, b) => {
        const propA = a.split(':')[0].trim();
        const propB = b.split(':')[0].trim();
        
        const categoryA = getCssPropertyCategory(propA);
        const categoryB = getCssPropertyCategory(propB);
        
        // First sort by category
        if (categoryA !== categoryB) {
            return categoryA - categoryB;
        }
        
        // Special ordering for flex properties
        const flexProps = [
            'display',
            'flex-direction', 'flex-wrap', 'flex-flow',
            'justify-content', 'align-items', 'align-content',
            'gap', 'row-gap', 'column-gap',
            'flex', 'flex-grow', 'flex-shrink', 'flex-basis', 
            'align-self', 'order'
        ];
        
        // If both are flex properties, sort them according to the order in flexProps
        if (flexProps.includes(propA) && flexProps.includes(propB)) {
            return flexProps.indexOf(propA) - flexProps.indexOf(propB);
        }
        
        // Then sort alphabetically within the same category
        return propA.localeCompare(propB);
    });
    
    // Format the output with appropriate indentation
    const indent = isNested ? '\n        ' : '\n    ';
    return sortedList.join(indent);
}

/**
 * Determines the category of a CSS property
 * @param {string} property - CSS property name
 * @returns {number} - Category number (1-9)
 */
function getCssPropertyCategory(property) {
    // Box Model properties (Category 1)
    const boxModelProps = [
        'width', 'min-width', 'max-width', 'height', 'min-height', 'max-height',
        'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'box-sizing', 'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
        'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
        'border-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
        'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
        'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'
    ];
    
    // Positioning properties (Category 2)
    const positioningProps = [
        'position', 'top', 'right', 'bottom', 'left', 'z-index', 'float', 'clear',
        'visibility', 'overflow', 'overflow-x', 'overflow-y',
        'display', 'flex-direction', 'flex-wrap', 'flex-flow',
        'justify-content', 'align-items', 'align-content',
        'gap', 'row-gap', 'column-gap',
        'flex', 'flex-grow', 'flex-shrink', 'flex-basis', 'align-self', 'order',
        'grid', 'grid-template', 'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
        'grid-column', 'grid-column-start', 'grid-column-end', 'grid-row', 'grid-row-start', 'grid-row-end',
        'grid-area', 'grid-gap', 'grid-column-gap', 'grid-row-gap'
    ];
    
    // Typography properties (Category 3)
    const typographyProps = [
        'font', 'font-family', 'font-size', 'font-weight', 'font-style', 'font-variant',
        'line-height', 'letter-spacing', 'word-spacing', 'text-align', 'text-decoration',
        'text-transform', 'text-indent', 'text-shadow', 'text-overflow', 'white-space',
        'word-break', 'word-wrap', 'overflow-wrap', 'hyphens', 'vertical-align'
    ];
    
    // Visual/Color properties (Category 4)
    const visualProps = [
        'color', 'background', 'background-color', 'background-image', 'background-position',
        'background-size', 'background-repeat', 'background-attachment', 'background-origin',
        'background-clip', 'opacity', 'box-shadow', 'filter', 'backdrop-filter',
        'outline', 'outline-width', 'outline-style', 'outline-color', 'outline-offset'
    ];
    
    // Animation properties (Category 5)
    const animationProps = [
        'transition', 'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay',
        'animation', 'animation-name', 'animation-duration', 'animation-timing-function', 'animation-delay',
        'animation-iteration-count', 'animation-direction', 'animation-fill-mode', 'animation-play-state',
        'transform', 'transform-origin', 'transform-style', 'perspective', 'perspective-origin', 'backface-visibility'
    ];
    
    // List and Table properties (Category 6)
    const listTableProps = [
        'list-style', 'list-style-type', 'list-style-position', 'list-style-image',
        'table-layout', 'border-collapse', 'border-spacing', 'caption-side', 'empty-cells'
    ];
    
    // User Interface properties (Category 7)
    const uiProps = [
        'cursor', 'pointer-events', 'user-select', 'resize', 'appearance', 'caret-color',
        'scroll-behavior', 'scroll-snap-type', 'scroll-snap-align', 'touch-action'
    ];
    
    // Other properties (Category 8)
    const otherProps = [
        'content', 'quotes', 'counter-reset', 'counter-increment', 'clip', 'clip-path',
        'object-fit', 'object-position', 'mask', 'mask-image', 'mask-position', 'mask-size',
        'will-change', 'isolation', 'mix-blend-mode', 'page-break-before', 'page-break-after',
        'page-break-inside', 'break-before', 'break-after', 'break-inside'
    ];
    
    // Check which category the property belongs to
    if (boxModelProps.includes(property)) return 1;
    if (positioningProps.includes(property)) return 2;
    if (typographyProps.includes(property)) return 3;
    if (visualProps.includes(property)) return 4;
    if (animationProps.includes(property)) return 5;
    if (listTableProps.includes(property)) return 6;
    if (uiProps.includes(property)) return 7;
    if (otherProps.includes(property)) return 8;
    
    // Default to category 9 for unknown properties
    return 9;
}

module.exports = {
    sortByCategory
};
