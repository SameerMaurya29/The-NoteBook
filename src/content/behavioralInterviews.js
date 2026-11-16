// Original educational prompts and fictional examples written for The Notebook.
export const interviewCategories = [
  {
    "id": "teamwork",
    "title": "Teamwork",
    "headline": "Make the team better",
    "description": "How you help people work together, not just finish your own tasks."
  },
  {
    "id": "conflict",
    "title": "Conflict",
    "headline": "Disagree with care",
    "description": "How you handle competing views without avoiding the hard conversation."
  },
  {
    "id": "ownership",
    "title": "Ownership",
    "headline": "Move things forward",
    "description": "How you act when responsibility is unclear or a plan needs attention."
  },
  {
    "id": "failure",
    "title": "Failure & learning",
    "headline": "Own the hard parts",
    "description": "How you acknowledge mistakes, repair harm and change your approach."
  },
  {
    "id": "leadership",
    "title": "Leadership",
    "headline": "Create direction",
    "description": "How you help others make progress, with or without a formal title."
  },
  {
    "id": "communication",
    "title": "Communication",
    "headline": "Make the complex clear",
    "description": "How you adapt a message, listen and keep people informed."
  }
];
export const interviewQuestions = [
  {
    "id": "teamwork-1",
    "category": "teamwork",
    "short": "Help outside your role",
    "prompt": "Tell me about a time you helped a teammate when it was not part of your assigned work.",
    "intent": "Recognise a real need and help without quietly abandoning your own commitments.",
    "followUp": "How did you agree on what to pause?",
    "pitfall": "Do not make yourself the hero and the teammate incompetent.",
    "example": {
      "situation": "A teammate was struggling with a flaky integration test before a release.",
      "task": "I needed to help them unblock the release while keeping my API change on track.",
      "action": "I agreed a time box with my lead, reproduced the failure with the teammate and split investigation from verification.",
      "result": "We isolated a shared test fixture. I resumed my API work, and we documented the fixture ownership."
    }
  },
  {
    "id": "teamwork-2",
    "category": "teamwork",
    "short": "Share the credit",
    "prompt": "Describe a project where the result depended on several people. What did you personally contribute?",
    "intent": "Separate your contribution from the team\u2019s achievement.",
    "followUp": "What would have been harder without the others?",
    "pitfall": "Avoid both vague \u201cwe\u201d answers and claiming the whole result.",
    "example": {
      "situation": "Our student team built an event-registration site.",
      "task": "I owned validation and needed it to work with a teammate\u2019s form design.",
      "action": "We agreed error states together. I wrote server validation and test cases; my teammate adapted the interface.",
      "result": "The flow handled the cases we had listed. In our demo I named each person\u2019s contribution and the remaining accessibility work."
    }
  },
  {
    "id": "teamwork-3",
    "category": "teamwork",
    "short": "Join an existing team",
    "prompt": "Tell me about a time you joined a team with an established way of working.",
    "intent": "Learn the context before proposing changes.",
    "followUp": "Which existing practice did you decide to keep?",
    "pitfall": "Do not treat unfamiliar processes as automatically wrong.",
    "example": {
      "situation": "I joined a project that used a release checklist I had not seen before.",
      "task": "I needed to ship a small fix without disrupting the team\u2019s review process.",
      "action": "I shadowed one release, asked why each check existed and used the checklist before suggesting a clearer test step.",
      "result": "My fix followed the normal release path. The team adopted the wording change without replacing a process that already worked."
    }
  },
  {
    "id": "teamwork-4",
    "category": "teamwork",
    "short": "Coordinate dependencies",
    "prompt": "Give an example of coordinating work that depended on another person or team.",
    "intent": "Make dependencies visible early and agree on a workable contract.",
    "followUp": "What did you do when the dependency moved?",
    "pitfall": "Do not describe waiting as your only action.",
    "example": {
      "situation": "A reporting screen depended on an endpoint another team was still designing.",
      "task": "I needed to keep the interface work useful without guessing the final data contract.",
      "action": "I arranged a short contract review, wrote example payloads and separated mocked development from final integration checks.",
      "result": "When one field changed, we updated a single adapter and reran contract tests rather than rebuilding the screen."
    }
  },
  {
    "id": "teamwork-5",
    "category": "teamwork",
    "short": "Support a quieter voice",
    "prompt": "Describe a time you helped a teammate\u2019s idea receive a fair hearing.",
    "intent": "Create space without speaking for someone unnecessarily.",
    "followUp": "How did you check that they wanted your support?",
    "pitfall": "Do not assume quietness means lack of confidence or ability.",
    "example": {
      "situation": "In a design review, a colleague\u2019s concern about retries was repeatedly interrupted.",
      "task": "I wanted the team to evaluate the concern before choosing the design.",
      "action": "I asked whether they wanted to walk through their failure example, then suggested we pause questions until the trace was complete.",
      "result": "The trace revealed duplicate writes. The colleague led the follow-up and we added an idempotency requirement."
    }
  },
  {
    "id": "conflict-1",
    "category": "conflict",
    "short": "Disagree on design",
    "prompt": "Tell me about a technical disagreement with a teammate.",
    "intent": "Use evidence and shared constraints rather than status.",
    "followUp": "What evidence could have changed your mind?",
    "pitfall": "Avoid saying you simply proved the other person wrong.",
    "example": {
      "situation": "We disagreed about adding a cache to a small service.",
      "task": "I needed to help choose an approach within our maintenance budget.",
      "action": "We listed latency and freshness needs, measured a representative query and compared a cache with a simpler index change.",
      "result": "We chose the index first and documented when a cache would become justified. I changed my original proposal after the measurements."
    }
  },
  {
    "id": "conflict-2",
    "category": "conflict",
    "short": "Receive difficult feedback",
    "prompt": "Describe feedback that you initially found hard to accept.",
    "intent": "Show how you tested the feedback and acted on it.",
    "followUp": "What did you change on the next task?",
    "pitfall": "Do not disguise a compliment as difficult feedback.",
    "example": {
      "situation": "A reviewer said my pull requests were difficult to review.",
      "task": "I needed to understand whether size, explanation or design was causing the problem.",
      "action": "I asked for one concrete example, split my next change by behaviour and added a short test plan.",
      "result": "The next review produced more focused comments. I kept the smaller-change habit and asked again after a few reviews."
    }
  },
  {
    "id": "conflict-3",
    "category": "conflict",
    "short": "Push back on scope",
    "prompt": "Tell me about a time you pushed back on a request.",
    "intent": "Protect an important constraint while offering an alternative.",
    "followUp": "Who made the final decision?",
    "pitfall": "Do not present refusal alone as good judgement.",
    "example": {
      "situation": "A stakeholder requested a new export format just before a scheduled release.",
      "task": "I needed to explain the testing risk without dismissing their use case.",
      "action": "I clarified the deadline behind the request and proposed a temporary CSV workflow plus a separately tested format change.",
      "result": "They used the temporary workflow for their deadline. We scheduled the format change with explicit validation cases."
    }
  },
  {
    "id": "conflict-4",
    "category": "conflict",
    "short": "Repair a working relationship",
    "prompt": "Describe a misunderstanding that affected how you worked with someone.",
    "intent": "Take responsibility for your part and make working agreements explicit.",
    "followUp": "What did you do if the misunderstanding returned?",
    "pitfall": "Avoid guessing the other person\u2019s motives.",
    "example": {
      "situation": "A teammate read my short review comments as dismissive.",
      "task": "I needed to repair the conversation and still communicate technical concerns.",
      "action": "I asked for a private conversation, acknowledged my tone and agreed to distinguish blockers from optional suggestions.",
      "result": "Our next review was less defensive. We kept the labels and checked in when written comments felt ambiguous."
    }
  },
  {
    "id": "conflict-5",
    "category": "conflict",
    "short": "Commit after disagreement",
    "prompt": "Tell me about a decision you disagreed with but still helped implement.",
    "intent": "Distinguish a reasonable disagreement from a safety or ethical concern.",
    "followUp": "What concern did you keep monitoring?",
    "pitfall": "Do not imply every decision should be followed without question.",
    "example": {
      "situation": "The team selected a familiar library rather than one I preferred.",
      "task": "Once the decision was made, I needed to help deliver while making migration risk visible.",
      "action": "I recorded my compatibility concern, accepted the trade-off and wrote a focused integration test for the risky path.",
      "result": "The implementation shipped with that test. I did not reopen the preference debate during routine development."
    }
  },
  {
    "id": "ownership-1",
    "category": "ownership",
    "short": "Notice an unowned problem",
    "prompt": "Tell me about a problem you noticed before anyone assigned it to you.",
    "intent": "Show initiative with boundaries and communication.",
    "followUp": "How did you avoid duplicating someone else\u2019s work?",
    "pitfall": "Do not equate ownership with doing everything alone.",
    "example": {
      "situation": "I noticed that failed nightly imports were not reaching the support dashboard.",
      "task": "I needed to establish who owned the gap and whether it was causing missed follow-ups.",
      "action": "I gathered a failed-run example, checked with the import owner and proposed an alert change with a rollback plan.",
      "result": "The owner and I tested the alert on a controlled failure. We added an explicit contact to the runbook."
    }
  },
  {
    "id": "ownership-2",
    "category": "ownership",
    "short": "Work with ambiguity",
    "prompt": "Describe a task where the requirements were unclear.",
    "intent": "Turn uncertainty into explicit assumptions and small checks.",
    "followUp": "Which assumption turned out to be wrong?",
    "pitfall": "Do not pretend you eliminated all uncertainty before starting.",
    "example": {
      "situation": "A request said the search screen should be \u201cfaster\u201d without defining what that meant.",
      "task": "I needed a testable target before choosing an optimisation.",
      "action": "I observed the user workflow, separated typing delay from query time and agreed on a representative dataset and measurement.",
      "result": "We improved the part users were waiting on and recorded the workloads we had not tested."
    }
  },
  {
    "id": "ownership-3",
    "category": "ownership",
    "short": "Escalate early",
    "prompt": "Tell me about a risk you escalated before it became a bigger problem.",
    "intent": "Escalate with evidence, options and appropriate urgency.",
    "followUp": "What did you try before asking for help?",
    "pitfall": "Avoid making the story only about sending a warning.",
    "example": {
      "situation": "A vendor API change made our integration tests fail before a launch.",
      "task": "I needed the launch owner to understand the impact while we investigated.",
      "action": "I reproduced the failure, identified affected flows and shared two options: delay the dependent feature or test a compatibility patch.",
      "result": "The owner narrowed the launch scope. We validated the patch separately and updated the dependency checklist."
    }
  },
  {
    "id": "ownership-4",
    "category": "ownership",
    "short": "Prioritise competing work",
    "prompt": "Describe a time you had more important work than you could finish.",
    "intent": "Make trade-offs visible rather than silently overcommitting.",
    "followUp": "What did you explicitly decide not to do?",
    "pitfall": "Do not glorify working without rest as the only solution.",
    "example": {
      "situation": "A bug fix and a planned demo both needed work on the same day.",
      "task": "I needed to agree on priority instead of promising both unchanged.",
      "action": "I estimated the smallest safe fix, explained the demo impact and asked the owner to choose between reduced demo scope and a later fix.",
      "result": "We chose the fix and a smaller demo. I communicated the revised expectation before others depended on the original plan."
    }
  },
  {
    "id": "ownership-5",
    "category": "ownership",
    "short": "Follow through after launch",
    "prompt": "Tell me about something you owned after the implementation was finished.",
    "intent": "Include monitoring, handoff and unresolved work.",
    "followUp": "How did you know the handoff was usable?",
    "pitfall": "Avoid treating merge as the end of ownership.",
    "example": {
      "situation": "I finished a scheduled-report feature that another team would operate.",
      "task": "I needed to make failure handling understandable to the people on call.",
      "action": "I added a failure runbook, walked through a controlled timeout with an operator and created a follow-up for a retry limitation.",
      "result": "The operator could identify the failure and recover the job using the runbook. The limitation remained visible rather than being called solved."
    }
  },
  {
    "id": "failure-1",
    "category": "failure",
    "short": "Own a mistake",
    "prompt": "Tell me about a mistake you made and how you handled it.",
    "intent": "Name your decision, repair the impact and change the process.",
    "followUp": "What did you tell the people affected?",
    "pitfall": "Do not shift blame to a tool or an absent reviewer.",
    "example": {
      "situation": "I shipped a filter that excluded records with an optional field.",
      "task": "I needed to restore the correct results and explain the scope of the bug.",
      "action": "I reproduced the issue, coordinated a rollback and added tests for missing and empty values. I notified the feature owner of affected cases.",
      "result": "The corrected filter passed those cases. I added optional-field examples to future acceptance reviews."
    }
  },
  {
    "id": "failure-2",
    "category": "failure",
    "short": "Miss an estimate",
    "prompt": "Describe a time your work took longer than expected.",
    "intent": "Explain the missed assumption and how you revised expectations.",
    "followUp": "When did you first know the estimate was at risk?",
    "pitfall": "Do not use hidden complexity as a complete excuse.",
    "example": {
      "situation": "I estimated a migration from happy-path records only.",
      "task": "I needed to handle older record formats without repeatedly moving the deadline.",
      "action": "I sampled historical data, listed unsupported formats and communicated a staged migration plan with checkpoints.",
      "result": "The team accepted a revised schedule based on the sample. My next estimate included a discovery step before committing to delivery."
    }
  },
  {
    "id": "failure-3",
    "category": "failure",
    "short": "Change after a failed approach",
    "prompt": "Tell me about an approach that did not work.",
    "intent": "Notice failure signals and change course deliberately.",
    "followUp": "What stopped you from changing earlier?",
    "pitfall": "Avoid rewriting the story so the first attempt was secretly a success.",
    "example": {
      "situation": "I tried to make a large test suite reliable by increasing timeouts.",
      "task": "I needed to reduce intermittent failures rather than hide them.",
      "action": "After another failure, I traced shared state between tests, isolated fixtures and removed the timeout increases that were no longer justified.",
      "result": "The targeted failures stopped in repeated local runs. We still monitored CI rather than claiming all flakiness was eliminated."
    }
  },
  {
    "id": "failure-4",
    "category": "failure",
    "short": "Respond to a setback",
    "prompt": "Describe a setback on a project you cared about.",
    "intent": "Show a practical recovery without minimising the disappointment.",
    "followUp": "What did you stop doing?",
    "pitfall": "Do not turn the answer into motivation slogans.",
    "example": {
      "situation": "A demo environment failed just before a student showcase.",
      "task": "I needed to represent the work honestly while helping the team recover.",
      "action": "I explained what could not be demonstrated, showed a recorded local flow with its limits and arranged a later live walkthrough.",
      "result": "The later walkthrough worked. We added a pre-event environment check and a fallback that did not pretend to be a live system."
    }
  },
  {
    "id": "failure-5",
    "category": "failure",
    "short": "Ask for help",
    "prompt": "Tell me about a time you realised you needed help.",
    "intent": "Know when further solo effort is no longer productive.",
    "followUp": "What information made your request useful?",
    "pitfall": "Do not frame asking for help as personal failure.",
    "example": {
      "situation": "I spent too long debugging a race that only appeared in CI.",
      "task": "I needed another perspective while keeping the investigation reproducible.",
      "action": "I wrote a minimal trace, listed what I had ruled out and asked a teammate familiar with the runner to pair for a short session.",
      "result": "They identified a worker-order assumption. I fixed the assumption and wrote down the runner behaviour for the team."
    }
  },
  {
    "id": "leadership-1",
    "category": "leadership",
    "short": "Lead without authority",
    "prompt": "Tell me about a time you led work without being the formal leader.",
    "intent": "Build agreement around a concrete need, not a title.",
    "followUp": "How did people opt into the plan?",
    "pitfall": "Do not confuse doing all the work with leading it.",
    "example": {
      "situation": "A shared repository had a growing queue of unclear review requests.",
      "task": "I wanted to improve review flow without assigning work I did not own.",
      "action": "I proposed a small weekly triage, asked for volunteers and created a template showing risk and requested feedback.",
      "result": "The team tried the process and kept the useful parts. I handed facilitation around so it did not depend on me."
    }
  },
  {
    "id": "leadership-2",
    "category": "leadership",
    "short": "Help someone grow",
    "prompt": "Describe a time you taught or mentored someone.",
    "intent": "Adapt to what the learner needs and let them do the work.",
    "followUp": "How did you check understanding?",
    "pitfall": "Avoid presenting a one-way explanation as mentoring.",
    "example": {
      "situation": "A new contributor was learning how our API tests were organised.",
      "task": "I needed them to become able to add a test independently.",
      "action": "We traced one existing test, I modelled a small change and then asked them to add the next case while explaining their reasoning.",
      "result": "They submitted their own case and identified a missing fixture. We updated the onboarding notes with their questions."
    }
  },
  {
    "id": "leadership-3",
    "category": "leadership",
    "short": "Align a team",
    "prompt": "Tell me about a time you helped a group choose a direction.",
    "intent": "Make goals and decision criteria explicit.",
    "followUp": "Which viewpoint changed the plan?",
    "pitfall": "Do not describe agreement as everyone accepting your first idea.",
    "example": {
      "situation": "Our project group disagreed on which feature to demonstrate.",
      "task": "We needed a coherent demo within the time available.",
      "action": "I asked each person to name the user outcome they wanted to show, then compared options against readiness and demo risk.",
      "result": "We combined a stable core flow with a clearly labelled prototype. The final plan was different from my initial preference."
    }
  },
  {
    "id": "leadership-4",
    "category": "leadership",
    "short": "Make a difficult trade-off",
    "prompt": "Describe a decision where every option had a downside.",
    "intent": "Make the cost of the chosen option visible.",
    "followUp": "How did you revisit the decision later?",
    "pitfall": "Avoid presenting a trade-off as an obvious win.",
    "example": {
      "situation": "We could add a requested dashboard or finish recovery tooling before release.",
      "task": "I needed to recommend a scope that matched the service\u2019s operational risk.",
      "action": "I outlined likely failure handling without the tools, recommended recovery first and documented what dashboard users would need temporarily.",
      "result": "We shipped recovery tooling and communicated the delayed dashboard. We revisited that scope after the first operational review."
    }
  },
  {
    "id": "leadership-5",
    "category": "leadership",
    "short": "Improve a process",
    "prompt": "Tell me about a process you improved.",
    "intent": "Start from a repeated problem and test a small change.",
    "followUp": "What showed the new process was worth keeping?",
    "pitfall": "Do not claim a process is better only because you introduced it.",
    "example": {
      "situation": "Bug reports often lacked steps to reproduce.",
      "task": "I wanted to reduce clarification loops without creating a long reporting form.",
      "action": "I drafted a short template, tried it on recent bugs with support and removed fields nobody used.",
      "result": "New reports contained more reproducible examples. We kept an escape hatch for urgent incidents rather than blocking reports on form completion."
    }
  },
  {
    "id": "communication-1",
    "category": "communication",
    "short": "Explain to a non-specialist",
    "prompt": "Tell me about explaining a technical issue to someone without your technical background.",
    "intent": "Adapt the explanation to the decision the listener needs to make.",
    "followUp": "How did you check they understood?",
    "pitfall": "Avoid describing the listener as incapable of understanding.",
    "example": {
      "situation": "A manager needed to decide whether to delay a release because of a migration risk.",
      "task": "I needed to explain the risk without a database-internals lecture.",
      "action": "I described which user actions could fail, the recovery time we had tested and the options available. I asked them to restate the trade-off.",
      "result": "They chose a staged release with a rollback window. We recorded the assumptions in the release note."
    }
  },
  {
    "id": "communication-2",
    "category": "communication",
    "short": "Give a difficult update",
    "prompt": "Describe a time you had to communicate bad news.",
    "intent": "Be timely, specific and accountable.",
    "followUp": "What could you say with confidence, and what remained unknown?",
    "pitfall": "Do not bury the impact under a long explanation.",
    "example": {
      "situation": "A planned integration would not be ready for a partner\u2019s test date.",
      "task": "I needed to reset expectations before they prepared for a test we could not support.",
      "action": "I stated the missed date first, separated completed work from blockers and offered a smaller testable interface with clear limitations.",
      "result": "The partner adjusted their plan. I followed up at the agreed checkpoint even when the blocker had not changed."
    }
  },
  {
    "id": "communication-3",
    "category": "communication",
    "short": "Listen and revise",
    "prompt": "Tell me about a time listening changed your understanding of a problem.",
    "intent": "Show what you learned before proposing the solution.",
    "followUp": "What question uncovered the real need?",
    "pitfall": "Avoid making the discovery sound like the user described the problem badly.",
    "example": {
      "situation": "I assumed a user wanted a faster export because they asked for a progress bar.",
      "task": "I needed to understand the workflow before adding UI.",
      "action": "I asked them to show the task and learned they mainly needed confirmation that the request was received, not a faster file.",
      "result": "We added a clear queued state and a download notification. We checked that this addressed the uncertainty before changing export performance."
    }
  },
  {
    "id": "communication-4",
    "category": "communication",
    "short": "Write a useful handoff",
    "prompt": "Describe a time your written communication helped someone work independently.",
    "intent": "Give the next person context, actions and boundaries.",
    "followUp": "What did the reader still need to ask?",
    "pitfall": "Do not equate a long document with a useful handoff.",
    "example": {
      "situation": "A teammate needed to continue an investigation while I was away.",
      "task": "I needed to transfer the current evidence without suggesting an unproven diagnosis was fact.",
      "action": "I wrote reproduction steps, observed logs, discarded hypotheses and a short list of next tests, then asked them to follow the reproduction once.",
      "result": "They reproduced the failure and continued the next test. We corrected one missing environment detail before I left."
    }
  },
  {
    "id": "communication-5",
    "category": "communication",
    "short": "Handle changing requirements",
    "prompt": "Tell me about communicating a change that affected several people.",
    "intent": "Identify who needs to know what and confirm the new agreement.",
    "followUp": "How did you find people who were indirectly affected?",
    "pitfall": "Avoid treating a broadcast message as confirmed understanding.",
    "example": {
      "situation": "An API field changed while frontend and reporting work was in progress.",
      "task": "I needed all consumers to agree on the transition rather than discovering it through failures.",
      "action": "I listed consumers with the API owner, shared before-and-after payloads and agreed on a compatibility period with each owner.",
      "result": "Both known consumers moved during the overlap. We kept a deprecation check to find overlooked callers before removal."
    }
  }
];
export const STAR_FIELDS = [
  {
    "id": "situation",
    "label": "Situation",
    "hint": "Set the scene briefly. What was happening, and why did it matter?"
  },
  {
    "id": "task",
    "label": "Task",
    "hint": "What were you personally responsible for? Name the constraint or goal."
  },
  {
    "id": "action",
    "label": "Action",
    "hint": "What did you actually do, in what order, and why? Make your own contribution clear."
  },
  {
    "id": "result",
    "label": "Result & reflection",
    "hint": "What changed? Include evidence, limits and what you would do differently. Never invent metrics."
  }
];
export const selfReviewItems = [
  "I used a real, specific experience without confidential details.",
  "My own responsibility and decisions are clear.",
  "I explained actions, not just the final outcome.",
  "I gave an honest result, including limits or uncertainty.",
  "I can explain what I learned and answer a follow-up."
];
