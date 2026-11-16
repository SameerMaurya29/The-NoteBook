/**
 * Tricky interview questions — deep, confusing, or commonly-missed questions
 * with detailed technical answers. 40-50 per subject.
 *
 * @typedef {Object} TrickyQuestion
 * @property {string} id
 * @property {string} question
 * @property {string} answer        — detailed technical explanation
 * @property {string} category     — grouping label (e.g. "memory", "concurrency")
 * @property {"medium"|"hard"} difficulty
 */

import java from "./java";
import python from "./python";
import c from "./c";
import dsa from "./dsa";
import os from "./os";
import dbms from "./dbms";
import networks from "./networks";
import coa from "./coa";
import html from "./html";
import css from "./css";
import js from "./js";

export const trickySubjects = [
  { id: "java", name: "Java", glyph: "☕", questions: java },
  { id: "python", name: "Python", glyph: "🐍", questions: python },
  { id: "c", name: "C", glyph: "🔧", questions: c },
  { id: "dsa", name: "DSA", glyph: "📊", questions: dsa },
  { id: "os", name: "OS", glyph: "🖥️", questions: os },
  { id: "dbms", name: "DBMS", glyph: "🗄️", questions: dbms },
  { id: "networks", name: "Networks", glyph: "🌐", questions: networks },
  { id: "coa", name: "COA", glyph: "⚡", questions: coa },
  { id: "html", name: "HTML", glyph: "📄", questions: html },
  { id: "css", name: "CSS", glyph: "🎨", questions: css },
  { id: "js", name: "JavaScript", glyph: "⚡", questions: js },
];

export const trickySubjectMap = Object.fromEntries(trickySubjects.map((s) => [s.id, s]));

export function getTrickySubject(id) {
  return trickySubjectMap[id];
}