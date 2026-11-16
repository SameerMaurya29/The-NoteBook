import java from "./java";
import python from "./python";
import dsa from "./dsa";
import c from "./c";
import os from "./os";
import dbms from "./dbms";
import networks from "./networks";
import coa from "./coa";
import html from "./html";
import css from "./css";
import js from "./js";
import aptitude from "./aptitude";
import systemdesign from "./systemdesign";
import { EXTRA_MCQS } from "./extra-mcqs";

export const subjects = [java, python, c, dsa, os, dbms, networks, coa, html, css, js, aptitude, systemdesign];

export const subjectMap = Object.fromEntries(subjects.map((s) => [s.id, s]));

export function getSubject(id) {
  return subjectMap[id];
}

export function findTopic(subjectId, topicId) {
  const s = subjectMap[subjectId];
  if (!s) return null;
  return s.topics.find((t) => t.id === topicId) || null;
}

/** Full-text search across every topic in the archive. */
export function searchTopics(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  for (const s of subjects) {
    for (const t of s.topics) {
      const hay = (t.title + " " + t.definition + " " + t.coreUnderstanding + " " + t.howItWorks + " " + (t.marginNotes || []).join(" ")).toLowerCase();
      if (hay.includes(q)) {
        results.push({ subjectId: s.id, subjectName: s.name, topicId: t.id, title: t.title, difficulty: t.difficulty });
      }
    }
  }
  return results;
}

/** Gather every MCQ across subjects, tagged with origin. */
export function allMCQs() {
  const out = [];
  for (const s of subjects) {
    for (const t of s.topics) {
      for (const m of t.mcqs) {
        out.push({ ...m, subjectId: s.id, subjectName: s.name, topicId: t.id, topicTitle: t.title });
      }
    }
  }
  for (const m of EXTRA_MCQS) {
    out.push({ ...m, subjectName: subjectMap[m.subjectId]?.name || m.subjectId });
  }
  return out;
}

export function mcqsForSubject(subjectId, difficulty) {
  const s = subjectMap[subjectId];
  if (!s) return [];
  let pool = [];
  for (const t of s.topics) {
    for (const m of t.mcqs) pool.push({ ...m, topicId: t.id, topicTitle: t.title });
  }
  for (const m of EXTRA_MCQS) {
    if (m.subjectId === subjectId) pool.push({ ...m, topicId: m.topicId, topicTitle: m.topicTitle });
  }
  if (difficulty && difficulty !== "all") pool = pool.filter((m) => m.difficulty === difficulty);
  return pool;
}