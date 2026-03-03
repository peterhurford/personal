# THE CHAMPAIGN CELL

## A Crisis Vignette — March 2028

---

## PART I: THE FIRST 48 HOURS

### Tuesday, March 7, 2028

**05:17 CT — Champaign, Illinois.** FBI Hostage Rescue Team and Springfield field office agents execute simultaneous arrest warrants at three locations in Champaign-Urbana: a rental house on West Green Street near the University of Illinois campus, a studio apartment on South Neil Street, and a rented storage unit on North Market Street. Four individuals are taken into custody without incident. The storage unit yields two laptops, three external hard drives, and a stack of printed protocols annotated by hand. No biological materials or laboratory equipment are found at any location.

The four arrested:

- **Marcus Harwell**, 31, a former computational biology PhD student at UIUC who left the program ABD in 2026. Harwell had published two first-author papers on protein structure prediction before dropping out. He is assessed as the technical lead.
- **Danielle Xu**, 28, a self-taught ML engineer working remotely for a mid-tier AI startup. She handled model fine-tuning and inference infrastructure. No formal biology training.
- **Jerome Bassett**, 44, a former high school biology teacher in Decatur and moderator of several biosecurity-adjacent forums on Signal and an onion-routed board called /collapse/. Assessed as the ideological center of gravity.
- **Tyler Rennick**, 23, a UIUC senior in molecular biology. His role appears to have been literature review and protocol validation. He is the one with active institutional access to journal databases and preprint servers.

The arrests culminate a seven-week investigation triggered when **Twist Bioscience**'s automated screening system flagged an order placed January 19 for a set of synthetic gene fragments. The sequences matched no known select agents directly, but Twist's updated AI-assisted screening pipeline — deployed in late 2027 under the expanded framework from Executive Order 14128 — identified the fragments as components of a plausible transmissibility-enhancement cassette for **H5N1 influenza**. Twist reported the flag to the FBI's Weapons of Mass Destruction Directorate (WMDD) on January 22. A parallel order to **IDT** for overlapping fragments was identified retroactively on January 30.

**05:45 CT.** Suspects are transported to the FBI Springfield field office. Initial interviews begin. Harwell immediately requests a lawyer. Bassett begins talking without counsel — a decision that will later become a major point of legal contention. In the first 90 minutes, Bassett tells agents that the group "wanted to prove it could be done" and "force the government to take this seriously before someone does it for real." He references the Asilomar conference on recombinant DNA, the 2012 H5N1 ferret transmission studies, and a 2027 blog post by a biosecurity researcher he refers to as "the guy from Georgetown." He says they never intended to synthesize the complete construct and had no access to BSL-3 facilities. Agents note that Bassett appears nervous but not remorseful. He uses the phrase "demonstrative action" three times.

**06:30 CT.** FBI WMDD notifies the National Biodefense Analysis and Countermeasures Center (NBACC) at Fort Detrick and requests urgent technical assessment of the seized protocols. A two-person team is assigned. The request specifies: assess scientific viability, novelty, and potential consequence if executed.

**07:15 CT.** FBI Springfield SAC calls the Chicago field office and FBI HQ. Standard notification chain to DOJ National Security Division (NSD). At this point, the case is being handled as a potential 18 U.S.C. § 175 violation (Biological Weapons Anti-Terrorism Act). The central legal question is already apparent: § 175 criminalizes the development of biological agents "for use as a weapon." The suspects' stated intent — demonstration rather than deployment — doesn't clearly map onto existing case law.

**08:00 CT.** NSD Deputy AAG Catherine Olowe is briefed. She flags the case to AAG for National Security David Kim. Kim's office contacts the White House NSC Directorate for Biodefense at 08:20. Senior Director for Biodefense Priya Narayanan receives the call during a previously scheduled meeting on mpox surveillance funding.

**08:30 CT.** First media contact. A UIUC student who lives on West Green Street posts a TikTok of the FBI vehicles from his bedroom window. Caption: "they're raiding the house next to mine?? what is happening." It gets 4,000 views in the first hour. The News-Gazette (Champaign) assigns a reporter.

**09:00 CT.** The UIUC administration is notified by FBI that one current student is among those arrested. University counsel enters a rapid triage: FERPA implications, whether to issue a campus safety notification, whether to lock any lab access. The decision to issue a Clery Act notification is debated internally for several hours.

**09:40 CT.** The News-Gazette reporter, working off the TikTok and a neighbor's account, calls FBI Springfield. The FBI PIO provides a barebones confirmation: "FBI agents executed federal arrest warrants at multiple locations in Champaign-Urbana this morning. Four individuals were taken into custody. No further details at this time."

**10:15 CT.** NSC convenes a small deputies-level call. Participants: NSC biodefense, NSC cyber/tech, DOJ NSD (by phone), FBI WMDD (by phone), OSTP. The briefing is factual and preliminary. No one on the call has yet seen the actual protocols. Key questions raised: (1) How viable is this? (2) Is the model still circulating? (3) Are there other cells? NSC Cyber flags that the model provenance question — where the fine-tune came from and whether it's still available — may be as important as the immediate criminal case. OSTP notes they will need to loop in the recently established AI Safety Institute (now under Commerce/NIST).

**10:45 CT.** News-Gazette publishes online: "FBI arrests four in Champaign-Urbana; details unclear." The story contains no substantive information beyond the PIO statement.

**11:30 CT.** First leak. A source described as "a federal official familiar with the matter" contacts a Washington Post national security reporter. The tip: the arrests are related to a biological threat involving artificial intelligence. The reporter begins working the story. A nearly simultaneous but independent tip reaches an NBC News producer via a DHS contact. Neither source has the full picture.

**12:00 CT — Washington, DC.** White House Chief of Staff is briefed during the daily schedule meeting. The recommendation from NSC is to not make any public statements until the NBACC technical assessment is complete, expected within 24-48 hours. Press Secretary is given a holding statement: "We are aware of the FBI law enforcement action in Illinois and are monitoring the situation." The President is briefed verbally during PDB at 12:30.

**13:00 CT.** FBI cyber forensics team in Springfield begins initial analysis of seized electronics. Within two hours, they identify the model: a fine-tuned variant of **LLaMA-4-Bio**, an open-weight biology-specialized model built on Meta's LLaMA 4 base (released October 2027, 405B parameter variant). The fine-tune adds approximately 18 months of post-release biological literature, protein structure databases, and — critically — a curated dataset of gain-of-function research papers, dual-use methodologies, and synthetic biology protocols scraped from both public and paywalled sources. The fine-tune was distributed on a Tor-hosted forum under the handle **"pandora_weights"** beginning in late December 2027. FBI cyber determines at least 200-300 downloads occurred before the forum thread was archived in February. The fine-tune's creator is not among the four arrested and has not yet been identified.

**14:20 CT.** The Washington Post calls DOJ and FBI for comment on a developing story about "AI-assisted bioterrorism arrests in Illinois." DOJ PIO declines to comment beyond confirming the arrests. Internally, this accelerates the timeline — NSD and FBI leadership recognize they have hours, not days, before the story breaks.

**15:00 CT.** FBI Director calls an emergency meeting of the WMDD, Cyber Division, and Counterterrorism Division leadership. The operational question is triage: the criminal case against the four is important but secondary to the question of whether the fine-tuned model represents an ongoing threat. If 200+ people downloaded it, what are the odds that another group is further along? The Director authorizes a national-level threat assessment and orders coordination with the IC through the NCTC.

**15:30 CT.** UIUC issues a campus notification. It is carefully vague: "A UIUC student has been arrested by federal authorities. The university is cooperating with the investigation. There is no ongoing threat to campus safety." This satisfies approximately no one.

**16:00 CT.** DOJ NSD begins internal debate on charging strategy. The core problem: the most natural charge is 18 U.S.C. § 175(a) — developing a biological agent for use as a weapon. But the suspects' stated intent complicates this. Bassett's statements to agents cut both ways. "Prove it could be done" suggests capability demonstration, not weaponization. But the statute's "for use as a weapon" language has been interpreted broadly in past cases (see *United States v. Levenderis*, 2018). A second option is 18 U.S.C. § 2332a (use of weapons of mass destruction) in its attempt/conspiracy prongs, but this requires showing intent to use, not merely intent to create. A third option — charges related to procurement fraud or false statements — feels underweight given the gravity of the situation. NSD requests expedited guidance from the Solicitor General's office on the "demonstration vs. deployment" intent question.

**17:45 CT.** Washington Post publishes: **"FBI Arrests Four in Illinois Over Alleged AI-Assisted Plot to Engineer Biological Weapon."** The story, roughly 800 words, is largely accurate in broad strokes but contains two significant errors that will take days to correct: (1) it describes the pathogen as "a weaponized form of anthrax," apparently conflating details from two different sources, and (2) it states the suspects "had obtained biological materials," which is false — they were caught at the computational and procurement stage. The story names no suspects (they have not yet been charged) but identifies UIUC as connected. It quotes an unnamed "senior administration official" saying the case represents "a new category of threat at the intersection of AI and biosecurity."

**17:50 CT.** The story detonates. Cable news picks it up immediately. CNN's chyron reads: **AI USED TO CREATE BIOWEAPON — 4 ARRESTED.** Fox News leads with: **BIDEN-ERA AI FAILURES LED TO BIOWEAPON PLOT.** (The current administration is Republican; Fox's framing points blame at the previous administration's AI governance framework.) MSNBC frames it around AI regulation. Within an hour, "AI bioweapon" is trending on X, Threads, and Bluesky.

**18:00 CT.** The anthrax error propagates rapidly. Multiple outlets repeat it. On X, a viral thread by a popular science communicator (@BioDefenseNow, 340K followers) correctly notes that the WaPo story's details don't add up — anthrax is a bacterium and the described synthesis screening protocol is more consistent with viral work — but the correction struggles against the initial wave. Cable news will repeat "anthrax" for approximately 14 more hours.

**18:30 CT.** Meta releases a statement: "We are aware of media reports regarding misuse of an open-weight model. Meta's LLaMA 4 models are released under a responsible use license that explicitly prohibits use for developing biological, chemical, nuclear, or radiological weapons. We are cooperating with law enforcement." The statement does not address the fact that the fine-tune, not the base model, is the operative tool — a distinction that will become one of the central policy debates of the next three months.

**19:00 CT.** Senate Intelligence Committee Chair (R-VA) and Vice Chair (D-CO) issue a joint statement calling for an immediate classified briefing. House Homeland Security Committee Ranking Member issues a separate statement calling for open hearings "within the week."

**19:15 CT.** NSC Principals Committee convenes via secure video. Participants include the National Security Advisor, DHS Secretary, Attorney General, FBI Director, DNI, HHS Secretary, OSTP Director, and Commerce Secretary. The AG briefs on the criminal case. FBI Director briefs on the model proliferation concern. DNI notes that foreign intelligence services are "almost certainly already aware of this model and its capabilities" and that a Chinese state-affiliated cyber unit was observed accessing the same Tor forum in January. The key decision: the President will make a brief statement tomorrow morning. No executive actions tonight. OSTP is directed to produce a 48-hour options memo on the open-weight model question.

**20:00 CT.** Arraignment logistics. The four suspects will be arraigned in the Central District of Illinois (Urbana courthouse) tomorrow. The AUSA assigned to the case, Rebecca Thornton, has bioterrorism prosecution experience from the 2019 ricin cases but has never handled anything involving AI. She begins a crash course with FBI technical agents.

**21:30 CT.** Jerome Bassett's ex-wife gives a phone interview to the Chicago Tribune from her home in Bloomington. She describes him as "always online, always talking about the end of the world" and says she left him in 2024 after he became "obsessed with AI killing everyone." She says he was "not violent" but "convinced he was the only one who could see what was coming." The interview introduces the "accelerationist doomer" frame into public discourse for the first time, though the Tribune doesn't use that term.

**22:00 CT.** Independent journalist and AI policy commentator Kelvin Zhao publishes a long thread on X identifying the likely model as a LLaMA-4-Bio fine-tune, linking to a cached version of the Tor forum listing from a web archive. The thread goes viral. Within it, Zhao notes that the fine-tune's training data likely included several publicly available gain-of-function papers, including the controversial 2012 Fouchier and Kawaoka H5N1 studies, and argues that "the model didn't create new biology — it made existing dangerous knowledge enormously more accessible and actionable." This framing will prove influential.

**23:00 CT.** Multiple biosecurity researchers begin receiving press inquiries. Most decline to comment. Dr. Ananya Patel at Johns Hopkins Center for Health Security agrees to go on CNN at 6 AM. She will later describe this decision as "the worst night of sleep I've ever had, trying to figure out what I could say that was honest without being either alarmist or dismissive."

**23:45 CT.** FBI WMDD receives preliminary findings from the NBACC team at Fort Detrick. The assessment, marked SECRET//NOFORN, concludes: the protocol recovered from the suspects' materials describes a plausible approach to enhancing human-to-human transmissibility of H5N1 influenza through a series of targeted modifications to the hemagglutinin and PB2 genes. The approach is novel in its specific combination of modifications but draws on well-established principles from published gain-of-function research. The protocol includes detailed synthesis and assembly steps that, if executed competently in a BSL-3 or equivalent facility, "would have a non-trivial probability of producing a viable enhanced pathogen." The assessment rates the protocol as **"scientifically viable and representing a genuine threat if executed."** It notes significant uncertainties — the predicted transmissibility enhancement relies on computational modeling that has not been empirically validated, and several assembly steps would require specialized expertise — but concludes that the overall approach "could not be dismissed as aspirational or fantastical." The assessment is transmitted to DOJ, NSC, and the FBI Director's office.

---

### Wednesday, March 8, 2028

**00:00–06:00 CT.** Overnight, the story dominates social media and cable news. Several dynamics are already visible:

The **anthrax misidentification** continues to circulate despite corrections. The WaPo issues a correction at 01:30 ("An earlier version of this article incorrectly identified the pathogen involved. Law enforcement sources now indicate the protocol targeted a respiratory virus, not anthrax.") but the correction propagates slowly.

**Partisan framing** crystallizes quickly along predictable lines. Republican messaging emphasizes: (a) failure of Biden-era AI executive orders, (b) the impossibility of controlling open-source AI, (c) the need for stronger biosurveillance and law enforcement powers. Democratic messaging emphasizes: (a) the need for AI regulation that Republicans blocked in the 118th and 119th Congresses, (b) the vindication of biosecurity researchers who warned about this, (c) the irresponsibility of releasing powerful open-weight models without safeguards.

A third narrative emerges from the **AI open-source community**: the fine-tune is the problem, not the base model; Meta shouldn't be blamed for downstream misuse; and any regulatory response that restricts open-weight releases will be catastrophically counterproductive. This narrative, initially confined to Hacker News and AI-specific forums, will grow significantly in the coming weeks.

**06:00 CT.** Morning shows lead with the story. Dr. Patel on CNN is careful and effective, emphasizing that "the screening system worked" and that "no biological material was produced." She avoids speculating on the protocol's viability. Fox & Friends hosts press her on whether AI should be "banned from biology," a framing she gently rejects. On NBC's Today, a former DHS official inaccurately states that the suspects "had a functional bioweapon" — a claim NBC does not correct on air until the 9 AM hour.

**07:30 CT.** FBI releases the names of the four arrested in advance of the arraignment. The naming triggers a second wave of media activity. Tyler Rennick's status as a current UIUC student generates significant campus and local coverage. Danielle Xu's employer, a Bay Area AI startup called Helion Applied (no relation to the fusion company), immediately fires her and issues a statement. Marcus Harwell's former PhD advisor at UIUC declines to comment through a university spokesperson. Jerome Bassett's online history becomes the subject of immediate deep-dives by multiple outlets.

**08:00 CT.** Bassett's forum posts on /collapse/ are extensively screenshotted and circulated. The posts, dating back to mid-2026, describe an escalating fixation on AI-enabled biosecurity risks. Representative excerpts are quoted across media: "Nobody is going to do anything until somebody proves it can be done. And by then it will be too late unless somebody proves it NOW, in a way that's controllable." (August 2027) And: "The responsible thing — the actually ethical thing — might be to cross the line in a way that wakes people up. Controlled flight into terrain to prove the plane is broken." (November 2027) These posts will become central to both the prosecution and defense strategies.

**08:45 CT.** The President delivers a brief statement from the White House. It is 4 minutes long. Key lines: "Yesterday, the FBI arrested four individuals in Illinois who used artificial intelligence to design what our experts assess was a viable biological threat. I want to be clear: the system worked. These individuals were identified before any dangerous material was created, thanks to the screening systems our government has invested in. But this case is a warning. I have directed my national security team to provide me with a full assessment and recommendations within 30 days." The statement is deliberately unspecific. It does not name AI or any company. It does not propose legislation. It threads a needle — credit-claiming for the screening catch, signaling seriousness, buying time.

**09:15 CT.** Initial public reaction to the President's statement splits predictably. Critics from both parties call it "insufficient." Senator Elizabeth Warren (D-MA) posts: "A 30-day review is not enough. We need emergency legislation now." Senator Ted Cruz (R-TX) posts: "The President is punting. This happened on his watch and he wants a study?" The AI policy community is somewhat more measured. Several policy researchers note that the "system worked" framing, while technically accurate, obscures the deeper question of what happens when the screening systems don't catch the next attempt.

**10:00 CT.** Arraignment proceedings, U.S. District Court, Central District of Illinois, Urbana. All four are charged under 18 U.S.C. § 175(a) (development of biological agents for use as a weapon) and 18 U.S.C. § 175b (possession of select agents — a stretch charge, since no actual agent was possessed, but the government argues the designed genetic sequences constitute a "precursor" under the 2024 amendments to the statute). Bail is denied for Harwell and Bassett; a contested bail hearing for Xu and Rennick is scheduled for Friday. Federal Public Defender Julia Kwan represents Rennick. Harwell retains private counsel (firm not yet disclosed). Xu and Bassett are assigned public defenders.

**10:30 CT.** The legal ambiguity becomes front-page news in its own right. Multiple legal commentators note the novelty of the charges. Law professor Andrea Kessler at Georgetown publishes a rapid-turnaround analysis on Lawfare: "The Champaign case may be the first serious test of whether 'computational design of a pathogen' — without any physical creation — constitutes 'development' under § 175. The statute's text supports the government's theory, but the legislative history is ambiguous, and the intent question is genuinely difficult." The piece is widely shared.

**11:00 CT.** Senate HELP Committee Chair Bill Cassidy (R-LA) announces a hearing for the following Tuesday, March 14: "AI and Biosecurity: The Champaign Case and the Path Forward." He invites FBI, HHS, Commerce (NIST/AISI), and outside experts. This is fast by Senate standards.

**12:00 CT.** NCTC distributes an intelligence community assessment (ICA) to congressional intelligence committees. Classified, but key judgments leak within hours: (1) The LLaMA-4-Bio fine-tune is assessed to be the work of a single individual, likely based in Western Europe, who is not connected to the Champaign four. (2) The fine-tune has been downloaded an estimated 200-400 times, with confirmed downloads in at least 12 countries. (3) The IC has "moderate confidence" that at least two foreign intelligence services have obtained copies. (4) There is no current intelligence suggesting another active plot using this specific model, but the IC "cannot rule out" parallel efforts.

**13:00 CT.** This is when things get complicated.

Dr. Samuel Okafor-Briggs, a computational biologist at the Broad Institute affiliated with MIT, uploads a preprint to bioRxiv titled: **"Systematic Evaluation of Large Language Model Capabilities for Predicting Gain-of-Function Modifications in Influenza A Subtypes."** The paper, which has been in review at *Nature Biotechnology* since January, describes a systematic evaluation of multiple frontier and open-weight LLMs' ability to predict viable gain-of-function modifications to influenza viruses, including H5N1. The paper uses a red-teaming methodology, prompting models with varying levels of specificity, and finds that several models — including both API-gated frontier models and open-weight models — can, with appropriate prompting, generate "scientifically plausible and potentially viable" modification protocols. The paper does not provide the specific protocols. It provides aggregate results and capability assessments.

Okafor-Briggs has been in communication with *Nature Biotechnology* editors about information hazard concerns since December. The journal convened a biosecurity review panel. The paper was under revision. Okafor-Briggs made the decision to post the preprint on the morning of March 8 because — as he explains in a thread on X — "the Champaign arrests make the core finding public knowledge. The question is no longer whether this is possible. It's how widespread the capability is and what we do about it. This paper provides the systematic evidence policymakers need."

**13:30 CT.** The bioRxiv preprint begins circulating among biosecurity researchers. Reactions range from "this is exactly the right thing to do" to "this is reckless and irresponsible regardless of timing." Dr. Kevin Esvelt at MIT (a longtime advocate for proactive biosecurity disclosure) posts support. Dr. Tom Inglesby at Johns Hopkins posts concern. The biosecurity community, which broadly agrees on the underlying risk, fractures on the information hazard question within hours.

**14:00 CT.** NSC is informed of the Okafor-Briggs preprint. A staffer describes the reaction as "you have got to be kidding me." The preprint creates a second, parallel crisis track. It's not illegal — it's a legitimate scientific publication. But it validates the core capability that the Champaign case represents, using different models and methods. And it threatens to undercut the prosecution by raising the question: if a legitimate researcher can demonstrate the same capability and publish it, how is what the Champaign four did different in kind?

**15:00 CT.** FBI issues a formal public statement correcting the record: the case involves "a computationally designed protocol for enhancing transmissibility of an influenza virus," not anthrax. The statement notes that "no biological material was created, obtained, or weaponized" and that "the subjects were apprehended during the design and procurement phase." This helps, but the anthrax narrative persists in some coverage for another 48 hours.

**16:00 CT.** House Science, Space, and Technology Committee announces its own hearing, scheduled for March 16, focused on "AI Model Security and Dual-Use Research of Concern." Jurisdictional tension with House Homeland Security begins immediately.

**17:00 CT.** Meta's stock drops 6.2% on the day. Other AI companies decline 2-4%. Biotech stocks are mixed — DNA synthesis companies (Twist, IDT, Ginkgo) actually rise on the argument that their screening systems worked and will see increased demand.

**18:00 CT.** The identity debate intensifies. Cable news begins airing the suspects' photos. Bassett is described variously as a "domestic terrorist" (Fox), "AI doomsday cultist" (CNN panel), and "misguided activist" (one MSNBC guest, who is immediately challenged by the host). The "accelerationist doomer" label, coined on X, begins appearing in mainstream coverage. A lengthy profile of the doomer/accelerationist subculture appears on Vox by 9 PM, written by a reporter who had been working on the piece since 2027 and quickly adapted it to the news.

**19:00 CT.** Okafor-Briggs gives a 30-minute interview to STAT News, published online at 20:00. Key quote: "I want to be absolutely clear about what I am and am not saying. I am not saying these models can produce a pandemic pathogen. I am saying they can generate protocols that a competent biologist could use as a starting point. The gap between 'starting point' and 'functional pathogen' is real but narrower than most people assume, and it is narrowing." He also directly addresses the Champaign case: "I don't know the specifics of their protocol. But based on what's been publicly reported, it's consistent with the capabilities I document in the paper. This is not surprising to anyone in this field."

**21:00 CT.** First signs of economic second-order effects. Two biotech conferences scheduled for the following week — one in Boston, one in San Diego — begin receiving cancellation notices from sponsors. The reasoning is not safety; it's PR risk. "Nobody wants to be seen at a biology conference right now," one organizer tells STAT.

---

## PART II: WEEK 1 (March 9–14)

### Thursday, March 9

The bail hearing for Xu and Rennick proceeds. The government argues both are flight risks and that the severity of the charges warrants detention. Defense attorneys argue that neither suspect has a criminal history, that no biological material was produced, and that the government's theory of the case — that computational design alone constitutes "development" of a biological weapon — is untested and may not survive a motion to dismiss. Judge Sarah Whitfield denies bail for Xu (citing her technical skills and lack of local ties) but grants bail for Rennick under strict conditions: GPS monitoring, surrender of passport, no internet access, no contact with co-defendants or any university laboratory. Rennick's parents post $250,000 bond. The split decision is read by both sides as vindicating their position.

Separately, *Nature Biotechnology* issues a statement on the Okafor-Briggs preprint: "This paper has been under review with our journal, including biosecurity review, since January. The authors' decision to post a preprint was made independently and without the journal's endorsement of that timing. We are continuing our review process." The statement satisfies no one but achieves its goal of distancing the journal from the decision.

### Friday, March 10

The OSTP options memo on open-weight models is delivered to the President. It is leaked in its entirety to the New York Times by Saturday morning. The memo presents three options:

1. **Status quo with enhanced enforcement**: No new restrictions on open-weight model releases. Increase FBI and DHS capacity for monitoring misuse. Strengthen DNA synthesis screening mandates.
2. **Mandatory pre-release safety evaluation**: Require all models above a defined capability threshold to undergo government-administered safety evaluation before public release, including open-weight releases. This would require legislation.
3. **Restricted release framework**: Prohibit open-weight release of models above a defined capability threshold. Allow only API-gated access with monitoring. This would also require legislation and faces significant First Amendment questions.

The memo notes that Options 2 and 3 would not have prevented the Champaign incident, since the base model (LLaMA 4) was released before such a framework would have been in place, and the fine-tune was the critical vector. This caveat is buried on page 7 and is largely ignored in press coverage.

### Saturday, March 11–Sunday, March 12

Weekend coverage cycles through several beats:

**The "who is pandora_weights?" mystery.** Multiple journalists and OSINT researchers attempt to identify the creator of the fine-tune. A Dutch cybersecurity firm, Fox-IT, publishes a preliminary analysis suggesting the creator may be based in the Netherlands or Belgium based on linguistic analysis of forum posts. Europol is reportedly in contact with the FBI. The creator has not posted since February 14.

**The Okafor-Briggs debate escalates.** A group of 43 biosecurity researchers publishes an open letter calling the preprint "ill-timed and irresponsible" and urging bioRxiv to consider removing it. A counter-letter signed by 61 researchers and AI safety advocates defends it as "exactly the kind of systematic evidence that responsible policy requires." Okafor-Briggs himself appears on a Sunday podcast (Future Perfect) and is notably more subdued than in his initial X thread, acknowledging "I understand why people are upset" but maintaining the publication was "the right call given that the cat was already out of the bag."

**International reactions.** The EU AI Office issues a statement noting that the EU AI Act's provisions on general-purpose AI models "anticipated precisely this type of dual-use risk" and calling for "urgent transatlantic coordination." China's Ministry of Foreign Affairs spokesperson says the case "demonstrates the irresponsibility of the United States in allowing unrestricted proliferation of dangerous AI capabilities" — a framing that is simultaneously self-serving (China restricts open-weight releases domestically) and not entirely wrong. The UK AI Security Institute offers technical cooperation to the FBI.

### Monday, March 13

Markets open down. Meta drops another 3.8%. The broader AI sector selloff deepens, with the NASDAQ AI index down 5.1% over two days. This triggers a secondary wave of coverage: "AI stocks plunge on biosecurity fears." Republican congressional leadership begins to worry about the economic narrative and moderates their rhetoric slightly. House Speaker convenes a leadership meeting to discuss a coordinated response.

A previously scheduled meeting of the Senate AI Caucus becomes standing-room-only. Both AI hawks and doves attend. The meeting does not produce consensus but reveals the emerging fault lines:

- **Hawk coalition** (bipartisan but Dem-leaning): wants mandatory pre-release evaluation, open-weight restrictions above certain capability thresholds, expanded AISI authority. Includes Senators Warner, Blumenthal, Hawley (on the R side, for different reasons).
- **Innovation coalition** (bipartisan but R-leaning): opposes open-weight restrictions, wants narrowly targeted biosecurity measures (DNA synthesis screening, procurement monitoring), frames regulation as helping China. Includes Senators Young, Heinrich, and much of the House R conference.
- **Biosecurity-specific coalition** (small, bipartisan, technocratic): wants to separate biosecurity measures from broader AI regulation, focus on pathogen-specific controls rather than model-level controls. Led by Senators Cassidy and Murphy in the HELP Committee. This coalition will prove the most legislatively productive but the least politically visible.

### Tuesday, March 14 — Senate HELP Committee Hearing

The hearing runs four hours. Witnesses include:

- **FBI WMDD Section Chief**, who testifies in limited open session that the protocol was assessed as "scientifically viable" and describes the screening-based detection process. Under questioning, he confirms this is the first known case of AI-assisted bioweapon design reaching the procurement stage.
- **Commerce Under Secretary for Standards and Technology** (overseeing AISI), who describes existing model evaluation frameworks and their limitations. He acknowledges under questioning that the fine-tune used in this case would not have been caught by any existing pre-release evaluation, since the base model was not dangerous and the fine-tuning was done post-release.
- **Dr. Ananya Patel** (Johns Hopkins), who provides context on the biosecurity landscape and argues for "layered defense" rather than any single regulatory intervention.
- **Dr. Samuel Okafor-Briggs** (Broad Institute), whose appearance is the most contentious. Senator Hawley asks him directly: "Did your paper make it easier for someone to create a bioweapon?" Okafor-Briggs responds: "No. My paper describes capability levels without providing protocols. But I understand why you're asking the question." Senator Cassidy is more sympathetic, pressing Okafor-Briggs on what specific policy interventions his research supports. Okafor-Briggs advocates for mandatory screening at all DNA synthesis providers worldwide, compute monitoring for biology-specific fine-tuning runs, and government-funded red-teaming of frontier models.

The hearing produces no legislation but establishes the informational baseline for congressional action. It is widely viewed as substantive by policy standards.

---

## PART III: WEEKS 2–4 (March 15 – April 4)

### Week 2 (March 15–21)

**The legal case develops.** Harwell's private attorney, a former AUSA named David Marchetti, files a motion to dismiss the § 175 charges, arguing that "computational design of a genetic sequence, without any synthesis, assembly, or possession of biological material, does not constitute 'development' of a biological agent within the meaning of the statute." The motion is extensively covered. Legal scholars are genuinely divided. The government opposes, arguing that the 2024 amendments to § 175b, which expanded the definition of "select agent" to include "digitally encoded sequences that could be used to reconstruct a select agent," support their theory. This statutory interpretation question is novel and will not be resolved quickly.

Bassett's attorney files a separate motion arguing his client's statements should be suppressed because he was not adequately Mirandized given signs of a possible manic episode at the time of arrest. This motion will become its own subplot.

**The model proliferation problem.** FBI and international partners identify the LLaMA-4-Bio fine-tune on at least four additional file-sharing platforms beyond the original Tor forum. Copies are confirmed in the possession of researchers, hobbyists, and unknown entities across at least 15 countries. The model cannot be "recalled." This fact, once it becomes public via a CNN report on March 17, significantly shifts the policy debate. The argument for restricting open-weight releases begins to sound less like prevention and more like stable-door-closing. The innovation coalition seizes on this: "You cannot uninvent knowledge. Regulation should focus on defenses, not restrictions."

**Economic ripple effects intensify.** Insurance companies begin quietly revising terrorism risk models to include AI-assisted CBRN scenarios. Lloyd's of London issues an advisory bulletin. Two major biotech IPOs scheduled for Q2 are postponed. VC funding for synthetic biology startups — which had been on a significant upswing — slows noticeably, with multiple firms requesting "regulatory clarity" before proceeding with planned investments. The National Venture Capital Association publishes a letter warning against "regulatory overreaction that would cripple American leadership in biotechnology."

**The "doomer" discourse.** The Champaign case triggers an intense and not entirely productive public debate about the relationship between AI safety advocacy and extremism. Multiple op-eds draw a line from "mainstream AI safety concerns" to the Champaign cell's ideology, arguing that doomer rhetoric created a "permission structure" for radical action. AI safety researchers push back fiercely, noting that the overwhelming majority of the community advocates for policy solutions, not criminal action, and that blaming safety advocates for the Champaign case is "like blaming climate scientists for eco-terrorism." This debate generates enormous heat and almost no light but absorbs significant media oxygen.

Effective altruism and AI safety organizations receive a wave of negative press coverage and hostile congressional inquiries. Several organizations issue statements distancing themselves from the Champaign defendants. The discourse is further complicated when it emerges that Bassett had donated $200 to a mainstream AI safety nonprofit in 2026, a fact that is technically irrelevant but generates two news cycles.

### Week 3 (March 22–28)

**Europol identifies "pandora_weights."** On March 23, Dutch police arrest **Maarten de Vries**, 26, a bioinformatics PhD student at Leiden University, at his apartment in The Hague. De Vries is cooperative and immediately admits to creating and distributing the fine-tune. In interviews with Europol (portions of which are shared with the FBI under an MLAT), de Vries says he created the fine-tune "to study dual-use capabilities" and "didn't think anyone would use it for something like this." He describes himself as a biosecurity researcher, not an accelerationist. His academic advisor confirms he had been working on a thesis related to AI-assisted protein design. The arrest raises its own legal questions: de Vries's actions may not be criminal under Dutch law, and the fine-tune itself — training data, model weights — is arguably protected expression under EU fundamental rights law. Dutch prosecutors are uncertain how to proceed.

The de Vries arrest creates a new transatlantic tension. The US government wants extradition or at minimum access to his full cooperation. The Dutch government is skeptical. The EU AI Office uses the case to push for its proposed international AI governance framework. The situation is further complicated by the fact that de Vries's research, stripped of the distribution decision, is not materially different from Okafor-Briggs's work.

**Executive action.** On March 25, the President signs an Executive Order: "Strengthening Biosecurity in the Age of Artificial Intelligence." Key provisions:

1. Mandatory DNA synthesis screening for all US-based providers, with specific requirements for AI-designed sequence detection (codifying and expanding the 2023 EO framework).
2. Direction to Commerce/AISI to develop, within 90 days, a "dual-use capability evaluation framework" for biological applications of AI models.
3. Direction to DOD and IC to assess foreign AI-enabled biosecurity threats within 60 days.
4. Establishment of an interagency task force on "computational biosecurity" co-chaired by OSTP and NSC.
5. No restrictions on open-weight model releases.

The EO is criticized from all directions. AI hawks call it "toothless." The open-source community calls it "a camel's nose." Biosecurity researchers call it "a reasonable start." The market reaction is mildly positive — AI stocks recover slightly on the absence of open-weight restrictions.

**The defense case takes shape.** Defense attorneys begin articulating what will become the central defense theory: the Champaign four are "biosecurity whistleblowers who chose the wrong method." This framing is legally tenuous but rhetorically powerful. Bassett's online writings are repackaged by the defense as evidence of genuine concern about AI biosecurity risks, not terrorist motivation. The defense hires Dr. Gregory Allen, a former CSIS AI fellow, as an expert witness to testify about the broader AI biosecurity threat landscape and the inadequacy of government response prior to the arrests. The implication: these individuals felt compelled to act precisely because the system was failing.

The government counters that "you don't get to commit a federal crime to make a policy point" and cites the long line of case law holding that political motivation does not negate criminal intent. The analogy to classified information leakers (Ellsberg, Manning, Snowden) becomes a recurring reference point in legal commentary.

### Week 4 (March 29 – April 4)

**Legislative action accelerates.** Three distinct bills are introduced:

1. **The Biosecurity Screening Enhancement Act** (Cassidy-Murphy, Senate HELP). Narrowly targeted: mandates universal DNA synthesis screening, establishes federal standards, creates a reporting framework. This bill has the broadest bipartisan support and the best chance of passage.
2. **The AI Model Security Act** (Warner-Hawley, Senate Intelligence). Broader: requires pre-release safety evaluation for models above a defined capability threshold, with specific provisions for dual-use biological capabilities. Controversial among both the AI industry and open-source advocates. The "capability threshold" definition becomes an immediate point of contention.
3. **The SAFE AI Act** (Rep. Lieu-Rep. Buck, House bipartisan). Modeled on the proposed but never-passed legislation from the 118th Congress. Comprehensive AI safety framework including liability provisions, evaluation mandates, and incident reporting requirements. Viewed as aspirational rather than immediately passable.

None of these will see a floor vote within the 90-day window of this vignette. The Cassidy-Murphy bill will advance through committee markup in late April. The Warner-Hawley bill will stall on the threshold definition. The Lieu-Buck bill will be referred to three committees and effectively die.

**The Okafor-Briggs paper is published.** *Nature Biotechnology* publishes the paper on April 1 after an expedited review process, with an accompanying editorial on information hazards. The paper is substantially unchanged from the preprint. The editorial committee's decision to publish is itself controversial and is the subject of a pointed letter from the NIH Director suggesting the journal "reconsider its information hazard review process." Okafor-Briggs becomes a permanent fixture in the discourse — simultaneously cited by regulators as evidence for action and by civil libertarians as evidence that "you can't regulate knowledge."

---

## PART IV: MONTHS 2–3 (April 5 – June 7)

### Month 2 (April 5 – May 4)

**The legal proceedings grind forward.** Judge Whitfield denies Harwell's motion to dismiss in a 34-page opinion that becomes immediately significant. Key holding: "The Biological Weapons Anti-Terrorism Act's prohibition on 'development' of biological agents is not limited to physical creation. The computational design of a viable pathogen protocol, coupled with affirmative steps toward procurement of necessary materials, constitutes development within the meaning of the statute." The opinion relies heavily on the 2024 amendments and on analogy to computer fraud cases where "mere code" was held to constitute a weapon. Harwell's attorney immediately signals an interlocutory appeal to the Seventh Circuit.

The Bassett suppression motion is denied after a two-day evidentiary hearing. The judge finds the Miranda warnings were adequate.

A plea negotiation begins for Rennick. His attorney argues that his role was limited, that he is 23 years old, and that he has cooperated extensively with the FBI since arrest. The government is initially resistant — any plea deal will be seen as lenient — but recognizes that Rennick's cooperation could be valuable for the model proliferation investigation and the trial of the remaining three.

**The international dimension expands.** The Dutch prosecution of de Vries stalls. The Dutch public prosecutor's office concludes in late April that creating and distributing a fine-tuned model is not clearly criminal under Dutch law. An extradition request from the US is filed but faces significant legal and political obstacles. The case becomes a symbol of the mismatch between national legal frameworks on AI and biosecurity. The EU Commission uses it to push for harmonized dual-use AI regulations under the AI Act's implementing provisions, but member states are divided.

Intelligence reporting (leaked in fragments to the FT and Bloomberg) indicates that the Chinese Academy of Sciences has conducted its own internal assessment of LLM-assisted pathogen design and concluded it represents a "significant and underappreciated biosecurity risk." China begins quietly restricting domestic access to biology-specific model fine-tunes. The irony — the US and China arriving at similar threat assessments while publicly blaming each other for the problem — is noted by commentators but does not translate into any form of cooperation.

**Economic and institutional effects compound.**

- Two major DNA synthesis companies (Twist, Ansa Biotechnologies) announce significant expansions of their screening capabilities, funded partly by anticipated government contracts. Screening capacity becomes a growth sector.
- The NIH issues revised guidance for AI-assisted biological research, requiring institutional biosafety committee (IBC) review for any research using LLMs to design or modify pathogenic sequences. The guidance is well-intentioned but creates immediate compliance confusion, particularly for computational research that doesn't involve any physical biological work.
- Several universities impose interim moratoriums on biology-specific AI model fine-tuning, pending development of institutional review processes. This slows legitimate research and generates backlash from faculty.
- The cyber insurance market begins pricing "AI-enabled CBRN" as a distinct risk category. Premiums for biotech companies rise 12-18%.

**Public attention fades, then spikes.** By mid-April, the Champaign case has largely faded from cable news rotation, replaced by other stories. But it remains a live topic in policy, legal, and scientific circles. Attention spikes again on April 22 when a cybersecurity researcher publishes evidence that a modified version of the LLaMA-4-Bio fine-tune — stripped of the specific H5N1 content but retaining the broader biological capability enhancement — is being actively marketed on a Russian-language cybercrime forum for $15,000 in cryptocurrency. The FBI confirms they are aware. This development underscores the model proliferation problem and briefly returns the story to front-page status.

### Month 3 (May 5 – June 7)

**Rennick pleads guilty.** On May 8, Tyler Rennick pleads guilty to a single count of conspiracy to violate 18 U.S.C. § 175, in exchange for cooperation and a government recommendation of 18-36 months. The plea allocution is closely watched. Rennick states that he "understood the protocol was designed to enhance a dangerous pathogen" and that he "participated knowing the group intended to demonstrate the feasibility of AI-assisted bioweapon design." He also states, per the plea agreement, that "at no point did any member of the group express an intention to actually synthesize or deploy a biological agent." This last statement is a win for both sides: the prosecution gets the guilty plea, and the remaining defendants get ammunition for their "demonstration, not weapon" theory.

**The Seventh Circuit hears argument on Harwell's interlocutory appeal.** On May 15, a three-judge panel hears 90 minutes of argument on the question of whether computational design constitutes "development" under § 175. The argument is sharp and closely contested. Judge Easterbrook (senior status, sitting by designation) asks the government attorney: "If I write down the formula for a chemical weapon on a napkin, have I 'developed' a chemical weapon?" The government distinguishes: "A napkin is not a verified computational protocol with demonstrated scientific viability, presented alongside procurement steps for the necessary materials." The decision is reserved. It will not come down within this vignette's timeframe, but early court-watcher consensus puts it at roughly 60-40 in favor of the government.

**Legislative progress — slow and selective.** The Cassidy-Murphy Biosecurity Screening Enhancement Act passes the Senate HELP Committee on a 17-4 vote in early May. It is the only Champaign-related legislation to advance through committee. Its success is attributed to its narrow scope: it regulates DNA synthesis screening, not AI models. The AI-specific bills remain stalled. The Warner-Hawley bill is revised twice to address threshold definition concerns, but the revisions satisfy neither the AI industry nor the safety hawks. Congressional attention begins to shift toward appropriations season and other priorities. A defense authorization amendment incorporating some Champaign-related provisions (DoD AI biosecurity testing requirements) is drafted for inclusion in the FY2029 NDAA markup process.

**The discourse settles into semi-permanent grooves.** By June, the Champaign case has established several ongoing fault lines that show no signs of resolution:

1. **Open-weight vs. closed:** The case is the primary reference point for the ongoing debate over open-weight model release. Neither side has conceded. The open-weight advocates note correctly that the base model wasn't the problem. The restriction advocates note correctly that the base model enabled the fine-tune. Both are right.

2. **Information hazard norms:** The Okafor-Briggs publication has triggered a broader renegotiation of information hazard norms in the biosecurity and AI research communities. A joint NAS-NAE committee is convened in May to develop recommendations. Its report is not expected before 2029.

3. **The legal frontier:** The § 175 "computational development" question is genuinely unsettled and will likely require Supreme Court resolution if the Seventh Circuit rules for the government and the defendants appeal. Regardless of outcome, the case has revealed a gap between the legal system's categories and the technical reality of AI-enabled threats.

4. **The "accelerationist doomer" problem:** The case has not resolved the underlying tension between those who believe radical action is justified to highlight AI risks and those who believe such action is counterproductive and criminal. If anything, the case has entrenched both positions. Bassett has become a minor folk hero in certain corners of the internet, which is disturbing to mainstream AI safety advocates who share many of his substantive concerns but reject his methods entirely.

5. **International governance vacuum:** The transatlantic divide on AI regulation, the de Vries extradition standoff, and the absence of any US-China cooperation on biosecurity screening have collectively demonstrated that the international governance infrastructure for AI-enabled biosecurity threats does not exist. Multiple proposals are circulating — a Biological Weapons Convention protocol, an OECD AI biosecurity framework, bilateral arrangements — but none have traction as of June 2028.

**The quiet coda.** In the first week of June, an internal FBI after-action review (portions of which are later obtained by ProPublica under FOIA) concludes that the Twist Bioscience screening catch was "partly fortuitous." The specific sequence order that triggered the flag was marginally above the detection threshold. A slightly different design approach — one that used more standard-appearing gene fragments assembled in a less obviously suspicious pattern — might not have triggered the screen. The review recommends "significant investment in next-generation screening capabilities, including contextual analysis of ordering patterns and customer risk profiling." It also notes that the current screening mandate covers only US-based synthesis companies, and that offshore synthesis — particularly from companies in Southeast Asia and the Middle East — represents a growing gap. The review is not public, but its conclusions filter into the policy community and further strengthen the case for the Cassidy-Murphy bill.

The trial of Harwell, Bassett, and Xu is scheduled for October 2028. Pre-trial motions will consume the summer. The case will almost certainly not be fully resolved before the November midterm elections, which ensures it remains a live political issue.

No pathogen was created. No one was harmed. The system, narrowly defined, worked. But the Champaign case demonstrated that the distance between "the system worked" and "the system failed" was a matter of a few detection thresholds and one alert screening algorithm — and that next time, the variables might break differently.

---

*End of vignette.*
