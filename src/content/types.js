/**
 * Shared content types (JSDoc — this is a JS project, not TS).
 * Every subject renders through the same components using these shapes.
 */

/**
 * @typedef {Object} MCQ
 * @property {string} question
 * @property {string[]} options
 * @property {number} answer        — index into options
 * @property {string[]} explanations — one per option
 * @property {"easy"|"medium"|"hard"} difficulty
 */

/**
 * @typedef {Object} Topic
 * @property {string} id
 * @property {string} title
 * @property {"easy"|"medium"|"hard"} difficulty
 * @property {string} definition
 * @property {string} coreUnderstanding
 * @property {string} howItWorks
 * @property {{ code: string, lang?: string, output?: string, note?: string }[]} codeExamples
 * @property {string[]} marginNotes
 * @property {string[]} commonMistakes
 * @property {string[]} relatedTopics
 * @property {{ label: string, url: string }[]} externalLinks
 * @property {MCQ[]} mcqs
 */

/**
 * @typedef {Object} Subject
 * @property {string} id
 * @property {string} name
 * @property {string} blurb
 * @property {string} glyph            — single char / symbol used as hand-drawn mark
 * @property {string[]} tags
 * @property {Topic[]} topics
 */